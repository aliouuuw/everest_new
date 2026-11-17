/* Moteur du formulaire d'ouverture de compte de EVEREST Finance.
   Lit un schéma déclaratif (schema.js), affiche les seuls champs utiles, valide, récapitule.
   Sécurité : aucune saisie n’est écrite dans le stockage du navigateur ; aucun innerHTML de donnée client ;
   effacement automatique après 15 minutes d’inactivité. */
(function () {
  "use strict";
  const SCHEMA = window.EF_SCHEMA;
  const PROFILS = [
    { n: "Prudent", d: "Priorité à la préservation du capital ; placements peu exposés aux variations de marché." },
    { n: "Conservateur", d: "Recherche de revenus réguliers avec une exposition limitée aux actions." },
    { n: "Équilibré", d: "Équilibre entre revenus et croissance ; variations de valeur acceptées." },
    { n: "Croissance", d: "Recherche de croissance à long terme ; variations importantes acceptées." },
    { n: "Dynamique", d: "Exposition élevée aux actions ; fortes variations acceptées sur un horizon long." }
  ];
  const IDLE_WARN = 13 * 60 * 1000, IDLE_WIPE = 15 * 60 * 1000;
  let MAX_FILE = 5 * 1024 * 1024;   // plafond absolu par pièce (le serveur applique le même)

  /* configuration : bloc JSON #ef-config posé par la page (api = adresse du serveur ; demo = parcours de démonstration) */
  const CFG = (() => { try { return JSON.parse((document.getElementById("ef-config") || {}).textContent || "{}"); } catch { return {}; } })();
  const LIVE = !!CFG.api;       // production : pièces et dossier envoyés au serveur
  let SERVER = null;            // { id, jeton } du dossier côté serveur, en mémoire uniquement

  const api = {
    async call(method, path, body, raw) {
      const headers = { accept: "application/json" };
      if (SERVER) headers.authorization = "Bearer " + SERVER.jeton;
      let payload;
      if (body instanceof FormData) payload = body; else if (body !== undefined) { headers["content-type"] = "application/json"; payload = JSON.stringify(body); }
      let r;
      try { r = await fetch(CFG.api + path, { method, headers, body: payload, credentials: "omit", cache: "no-store" }); }
      catch { throw new Error("Connexion impossible. Vérifiez votre accès à Internet puis réessayez."); }
      if (raw && r.ok) return r;
      const data = await r.json().catch(() => ({}));
      if (!r.ok) { const e = new Error(data.erreur || "Une erreur technique est survenue. Réessayez dans quelques instants."); e.status = r.status; e.code = data.code; throw e; }
      return data;
    },
    async dossier() { if (!SERVER) SERVER = await api.call("POST", "/dossiers"); return SERVER; },
    async upload(cle, file) { await api.dossier(); const fd = new FormData(); fd.append("fichier", file, file.name); return api.call("PUT", `/dossiers/${SERVER.id}/pieces/${encodeURIComponent(cle)}`, fd); },
    async remove(cle) { if (SERVER) return api.call("DELETE", `/dossiers/${SERVER.id}/pieces/${encodeURIComponent(cle)}`); },
    async envoi(p) { await api.dossier(); return api.call("POST", `/dossiers/${SERVER.id}/envoi`, p); },
    etat() { return api.call("GET", `/dossiers/${SERVER.id}/etat`); },
    kyc(cle) { return api.call("POST", `/dossiers/${SERVER.id}/personnes/${cle}/verification`, {}); },
    bio(cle) { return api.call("POST", `/dossiers/${SERVER.id}/personnes/${cle}/authentification`, {}); },
    docs(cle) { return api.call("GET", `/dossiers/${SERVER.id}/personnes/${cle}/documents`); },
    zoho(cle) { return api.call("POST", `/dossiers/${SERVER.id}/personnes/${cle}/signature/zoho`, {}); },
    signer(cle, documents) { return api.call("POST", `/dossiers/${SERVER.id}/personnes/${cle}/signature`, { consentement: true, documents }); },
    async pdf(doc) { const r = await api.call("GET", `/dossiers/${SERVER.id}/documents/${doc}`, undefined, true); return URL.createObjectURL(await r.blob()); }
  };

  if (CFG.maxMo) MAX_FILE = CFG.maxMo * 1024 * 1024;
  const CIBLE_IMAGE = (CFG.cibleImageKo || 1500) * 1024;   // taille visée après optimisation d’une photo
  const COTE_MAX = 2400, COTE_MIN_LISIBLE = 1000, COTE_REFUS = 600; // pixels du grand côté
  const mo = n => (n / 1048576).toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " Mo";

  /* Optimisation des photos dans le navigateur : redressement, redimensionnement, recompression JPEG
     jusqu’à la taille cible, suppression des métadonnées (dont la position GPS). Les PDF ne sont pas modifiés. */
  async function optimiserImage(file) {
    let bmp;
    try { bmp = await createImageBitmap(file, { imageOrientation: "from-image" }); }
    catch { return { erreur: "Cette image n’a pas pu être lue. Photographiez de nouveau la pièce, ou joignez un PDF." }; }
    const grand = Math.max(bmp.width, bmp.height);
    if (grand < COTE_REFUS) return { erreur: "Cette image est trop petite pour être lisible. Photographiez la pièce en entier, bien éclairée." };
    const toBlob = (c, q) => new Promise(r => c.toBlob(r, "image/jpeg", q));
    let cote = Math.min(grand, COTE_MAX), blob = null;
    const optimisee = () => blob && blob.size < file.size * 0.95;
    for (let tour = 0; tour < 6; tour++) {
      const k = cote / grand, c = document.createElement("canvas");
      c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
      for (const q of [0.88, 0.8, 0.72, 0.64]) { blob = await toBlob(c, q); if (blob && blob.size <= CIBLE_IMAGE) break; }
      if (blob && blob.size <= CIBLE_IMAGE) break;
      if (cote <= COTE_MIN_LISIBLE) break;                 // on ne descend pas sous le seuil de lisibilité
      cote = Math.max(COTE_MIN_LISIBLE, Math.round(cote * 0.8));
    }
    bmp.close && bmp.close();
    if (!blob) return { erreur: "Cette image n’a pas pu être optimisée. Joignez un PDF ou une autre photo." };
    if (blob.size > MAX_FILE) return { erreur: `Même optimisée, cette image dépasse ${mo(MAX_FILE)}. Photographiez la pièce seule, sans arrière-plan.` };
    const nom = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return { fichier: new File([blob], nom, { type: "image/jpeg" }), avant: file.size, apres: blob.size, reduite: optimisee(), petite: grand < COTE_MIN_LISIBLE };
  }

  let S = blank();
  let fileStore = {};           // objets File en mémoire uniquement
  let registry = [];            // champs affichés dans l’étape courante
  let idleWarnT, idleWipeT, countdownT;

  function blank() { return { answers: {}, files: {}, deferred: {}, step: 0, touched: {}, refs: false, done: null, attempted: {}, finished: {} }; }

  /* ---------- utilitaires ---------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "hidden") el.hidden = !!v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : document.createTextNode(String(c)));
    return el;
  }
  const $ = s => document.querySelector(s);
  const put = (el, ...k) => el.append(...k.flat().filter(x => x != null && x !== false));
  const A = () => S.answers;
  function addrInfo(n) {
    const e = ((window.EF_PAYS || {}).pays || {})[n]; if (!e) return { has: {} };
    const sub = e.sub || null, zip = e.zip || null;
    return { rue: e.rue, quartierLabel: e.ql || "Quartier", loc: e.loc, subLabel: sub && sub.l,
      subs: sub && sub.list ? sub.list.map(x => ({ v: x, l: x })) : [], zipLabel: zip && zip.l, zipHelp: zip && zip.ex ? "Exemple : " + zip.ex : "",
      has: { quartier: !!e.q, quartierOblig: e.q === 2, repere: !!e.bp, subList: !!(sub && sub.list), subLibre: !!(sub && !sub.list), subReq: !!(sub && sub.req), zip: !!zip, zipReq: !!(zip && zip.req), bp: !!e.bp } };
  }
  function res(x, scope) {
    if (x == null || typeof x === "string" || Array.isArray(x)) return x;
    if (x.addr) { const v = addrInfo(lookup(x.addr, scope))[x.key]; return (v === undefined || v === "" || v === null) ? x.fb : v; }
    if (x.map) { const m = ((window.EF_PAYS || {}).maps || {})[x.map] || {}; return (m[lookup(x.by, scope)] || []).map(v => ({ v, l: v })); }
    const a = A();
    return x[a.cat] ?? x[a.gestion] ?? x._;
  }
  function today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function parseDate(s) { if (!s) return null; const d = new Date(s + "T00:00:00"); return isNaN(d) ? null : d; }
  function ageOn(s) { const d = parseDate(s); if (!d) return null; const t = today(); let a = t.getFullYear() - d.getFullYear(); if (t < new Date(t.getFullYear(), d.getMonth(), d.getDate())) a--; return a; }
  const fmtDate = s => { const d = parseDate(s); return d ? d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""; };
  const fmtMoney = n => (n === "" || n == null || isNaN(n)) ? "" : Number(n).toLocaleString("fr-FR").replace(/ /g, " ");
  const fid = path => "f-" + path.join("-");

  /* ---------- accès aux valeurs ---------- */
  function getPath(path) { let o = A(); for (const k of path) { if (o == null) return undefined; o = o[k]; } return o; }
  function setPath(path, v) {
    let o = A();
    for (let i = 0; i < path.length - 1; i++) { if (o[path[i]] == null) o[path[i]] = typeof path[i + 1] === "number" ? [] : {}; o = o[path[i]]; }
    o[path[path.length - 1]] = v;
  }
  function lookup(field, scope) {
    if (scope && scope.local && Object.prototype.hasOwnProperty.call(scope.local, field)) return scope.local[field];
    return A()[field];
  }

  /* ---------- conditions ---------- */
  function ev(c, scope) {
    if (c == null) return true;
    if (c === true || c === false) return c;
    if (c.always) return true;
    if (c.all) return c.all.every(x => ev(x, scope));
    if (c.any) return c.any.some(x => ev(x, scope));
    if (c.not) return !ev(c.not, scope);
    if (c.compute) return !!COMPUTE[c.compute]?.(scope)?.flag;
    if (c.addr) return !!addrInfo(lookup(c.addr, scope)).has[c.has];
    if (c.repeaterHas) return (A()[c.repeaterHas] || []).some(it => it && it[c.field] === c.eq);
    const v = lookup(c.field, scope);
    if ("eq" in c) return v === c.eq;
    if ("in" in c) return c.in.includes(v);
    if ("includes" in c) return Array.isArray(v) && v.includes(c.includes);
    if ("gte" in c) return Number(v) >= c.gte;
    if ("truthy" in c) return !!v === c.truthy;
    return true;
  }
  function isRequired(f, scope) { return f.required === true || (f.required && typeof f.required === "object" && ev(f.required, scope)); }
  const visibleSteps = () => SCHEMA.steps.filter(s => ev(s.visibleIf));

  function templateFields(name, f) {
    return [...(f.prepend || []), ...(name ? SCHEMA.templates[name] : []), ...(f.extraFields || [])];
  }
  function newItem(fields) { const o = {}; fields.forEach(x => { if (x.type !== "info" && x.type !== "computed") o[x.id] = x.type === "checkboxes" ? [] : ""; }); return o; }

  /* ---------- calculs ---------- */
  const COMPUTE = {
    majorite() {
      const d = parseDate(A().enfant?.dateNaissance);
      if (!d) return { text: "La date de majorité s’affiche dès que la date de naissance est saisie.", tone: "muted" };
      const m = new Date(d); m.setFullYear(m.getFullYear() + 18);
      if (m <= today()) return { text: "Cet enfant est majeur : le compte doit être ouvert à son nom propre.", tone: "warn" };
      return { text: `L’enfant sera majeur le ${m.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}. Il signera alors une nouvelle convention à son nom, après une mise à jour de sa connaissance client.`, tone: "note" };
    },
    seuilBE() {
      const a = A();
      if (a.cat === "association") return { text: "Pour une association, déclarez les personnes qui en exercent le contrôle effectif : président, trésorier et membres du bureau qui décident de l’emploi des fonds.", tone: "note" };
      const s = a.extractif === "oui" ? "2 %" : "25 %";
      return { text: `Déclarez toute personne physique qui détient, directement ou indirectement, plus de ${s} du capital ou des droits de vote, ou qui contrôle la société par un autre moyen.${a.extractif === "oui" ? " Le seuil de 2 % s’applique parce que la société relève du secteur extractif." : ""}`, tone: "note" };
    },
    profil() {
      const a = A(), ids = ["qExperience", "qConnaissance", "qObjectif", "qHorizon", "qLiquidite", "qPart", "qPerte", "qReaction"];
      const answered = ids.filter(i => a[i]);
      if (answered.length < ids.length) return { profile: null, answered: answered.length, total: ids.length };
      const s = ids.reduce((t, i) => t + Number(a[i]), 0);
      const band = s <= 14 ? 0 : s <= 20 ? 1 : s <= 27 ? 2 : s <= 33 ? 3 : 4;
      const caps = [];
      if (a.qLiquidite === "1") caps.push([1, "Besoin d’une part importante des fonds dans les 24 mois"]);
      if (a.qHorizon === "1") caps.push([1, "Horizon de placement inférieur à deux ans"]);
      if (a.qPerte === "1") caps.push([1, "Capacité limitée à supporter une perte durable"]);
      if (a.qConnaissance === "1" && a.qExperience === "1") caps.push([2, "Connaissances et expérience limitées"]);
      const final = Math.min(band, ...caps.map(c => c[0]));
      return { profile: final, band, score: s, caps: caps.filter(c => c[0] < band).map(c => c[1]) };
    },
    adequation() {
      const a = A();
      if (!a.qExperience || !a.qConnaissance) return { text: "", tone: "muted", flag: false };
      const weak = Number(a.qExperience) <= 1 && Number(a.qConnaissance) <= 2;
      return weak
        ? { flag: true, tone: "warn", text: "Vos réponses indiquent une expérience limitée des marchés. Les actions et les obligations comportent un risque de perte en capital. Nous vous recommandons d’échanger avec votre chargé de clientèle avant votre premier ordre, ou d’envisager la gestion sous mandat." }
        : { flag: false, tone: "ok", text: "Vos réponses indiquent une expérience suffisante pour passer vous-même vos ordres sur les marchés de la BRVM." };
    },
    inexperimente() { return { flag: COMPUTE.adequation().flag }; }
  };

  /* ---------- validation ---------- */
  function fieldError(f, v, scope) {
    const empty = v == null || v === "" || (Array.isArray(v) && v.length === 0) || v === false;
    if (empty) return isRequired(f, scope) ? (f.type === "check" ? "Cochez cette case pour continuer." : f.type === "checkboxes" ? "Choisissez au moins une réponse." : (f.type === "radio" || f.type === "cards" || f.type === "select") ? "Choisissez une réponse." : "Ce champ est obligatoire.") : null;
    if (f.type === "select" && f.options && !Array.isArray(f.options) && (f.options.addr || f.options.map)) {
      const o = res(f.options, scope) || [];
      if (!o.some(x => x.v === v)) return "Choisissez une réponse dans la liste.";
    }
    switch (f.rule) {
      case "residence": {
        /* cohérence entre la réponse « résidence » de l’étape Votre projet et le pays de l’adresse du titulaire ou du siège */
        if (scope) break;
        const r = A().residence, U = ["Sénégal", "Côte d'Ivoire", "Mali", "Burkina Faso", "Niger", "Togo", "Bénin", "Guinée-Bissau"];
        const ok = r === "sn" ? v === "Sénégal" : r === "umoa" ? U.includes(v) && v !== "Sénégal" : r === "hors" ? !U.includes(v) : true;
        if (!ok) return "Ce pays ne correspond pas à votre réponse de l’étape Votre projet (" + ({ sn: "Sénégal", umoa: "autre pays de l’UMOA", hors: "hors UMOA" })[r] + "). Corrigez le pays ou modifiez cette réponse.";
        break;
      }
      case "zip": { const e = ((window.EF_PAYS || {}).pays || {})[lookup(f.zipOf, scope)]; if (e && e.zip && !new RegExp("^(?:" + e.zip.re + ")$", "i").test(String(v).trim())) return "Format attendu : " + (e.zip.ex || "celui de votre courrier") + "."; break; }
      case "email": if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Saisissez une adresse de courriel complète, par exemple nom@domaine.sn."; break;
      case "tel": { const d = String(v).replace(/[^\d]/g, ""); if (d.length < 8 || d.length > 15) return "Saisissez un numéro de 8 à 15 chiffres, indicatif compris."; break; }
      case "past": if (parseDate(v) > today()) return "Cette date ne peut pas être dans le futur."; break;
      case "future": if (parseDate(v) <= today()) return "Cette date doit être postérieure à aujourd’hui."; break;
      case "adult": { const g = ageOn(v); if (g == null || g < 0) return "Date invalide."; if (g < 18) return "Cette personne doit être majeure. Pour un enfant, choisissez « Pour un enfant mineur » à la première étape."; if (g > 120) return "Vérifiez l’année de naissance."; break; }
      case "minor": { const g = ageOn(v); if (g == null || g < 0) return "Date invalide."; if (g >= 18) return "Cet enfant est majeur : le compte doit être ouvert à son nom propre."; break; }
      case "rib": { const r = String(v).replace(/\s/g, "").toUpperCase(); if (!/^[A-Z]{2}[A-Z0-9]{22}$/.test(r)) return "Le RIB compte 24 caractères et commence par le code pays, par exemple SN012."; break; }
      case "placementAutorise": if (v === "non") return "Le placement doit être autorisé par vos statuts ou par une décision de l’assemblée générale. Joignez cette décision pour poursuivre."; break;
    }
    if (f.type === "percent" && (isNaN(v) || v < 0 || v > 100)) return "Saisissez un pourcentage entre 0 et 100.";
    if (f.type === "money" && (isNaN(v) || v < 0)) return "Saisissez un montant en francs CFA.";
    return null;
  }
  function repeaterError(f) {
    const items = A()[f.id] || [];
    if (items.length < f.min) return `Ajoutez au moins ${f.min} ${f.itemLabel.toLowerCase()}${f.min > 1 ? "s" : ""}.`;
    if (f.rule === "unRepresentantLegal" && !items.some(i => i.role === "legal")) return "Déclarez au moins un représentant légal.";
    return null;
  }

  /* recense tous les champs d'une étape, avec leur portée, sans rien afficher */
  function walkStep(step, cb) {
    const all = step.groups ? step.groups.filter(g => ev(g.visibleIf)).flatMap(g => g.fields) : (step.fields || []);
    const visit = (f, path, scope) => {
      if (!ev(f.visibleIf, scope)) return;
      if (f.type === "repeater") {
        cb(f, path, scope);
        (A()[f.id] || []).forEach((it, i) => templateFields(f.template, f).forEach(x => visit(x, [f.id, i, x.id], { local: it })));
      } else if (f.type === "group") {
        const it = A()[f.id] || {};
        SCHEMA.templates[f.template].forEach(x => visit(x, [f.id, x.id], { local: it }));
      } else cb(f, path, scope);
    };
    all.forEach(f => visit(f, [f.id], null));
  }
  function stepErrors(step) {
    const errs = [];
    if (step.special === "pieces") {
      docsNeeded().forEach(d => { if (S.files[d.key] && S.files[d.key].envoi) errs.push({ id: "doc-" + d.key + "-row", msg: `${d.label} : envoi en cours, patientez quelques secondes.` }); else if (!S.files[d.key] && !S.deferred[d.key]) errs.push({ id: "doc-" + d.key + "-row", msg: `${d.label} : joignez le fichier ou indiquez que vous l’apporterez.` }); });
      return errs;
    }
    if (step.special === "recap") {
      SCHEMA.engagements.forEach(e => { if (!A()[e.id]) errs.push({ id: "f-" + e.id, msg: "Cochez chaque engagement pour envoyer votre demande." }); });
      return errs;
    }
    walkStep(step, (f, path, scope) => {
      if (f.type === "info" || f.type === "computed") return;
      if (f.type === "repeater") { const m = repeaterError(f); if (m) errs.push({ id: "rep-" + f.id, msg: m }); return; }
      const m = fieldError(f, getPath(path), scope);
      if (m) errs.push({ id: fid(path), msg: `${labelText(f, scope)} : ${m}` });
    });
    if (step.id === "profil" && A().gestion === "mandat") { /* le profil se calcule seul */ }
    return errs;
  }
  function labelText(f, scope) { const l = res(f.label, scope); return l ? l.replace(/\s*[?:]\s*$/, "") : "Champ"; }

  /* ---------- pièces justificatives ---------- */
  function itemName(it) { return [it.prenoms, it.nomNaissance || it.nom].filter(Boolean).join(" ") || null; }
  // pièce d’identité : la CNI se joint recto et verso, le passeport par sa page d’identité (page portant la photo)
  const FACES = { cni: [["recto", "Carte nationale d’identité, recto"], ["verso", "Carte nationale d’identité, verso"]], passeport: [[null, "Passeport, page d’identité portant la photo"]] };
  function pushId(out, d, key, label, who, type) {
    const faces = FACES[type];
    if (!faces) { out.push({ key, label: who ? `${label} : ${who}` : label, ref: d.ref }); return; }
    faces.forEach(([suffixe, l]) => out.push({ key: suffixe ? `${key}-${suffixe}` : key, label: who ? `${l} : ${who}` : l, ref: d.ref }));
  }
  function docsNeeded() {
    const out = [];
    SCHEMA.documents.forEach(d => {
      if (!ev(d.when)) return;
      const label = res(d.label);
      if (d.per) (A()[d.per] || []).forEach((it, i) => {
        const who = itemName(it) || `${d.per === "cotitulaires" ? "Co-titulaire" : d.per === "signataires" ? "Signataire" : d.per === "representants" ? "Représentant légal" : "Bénéficiaire"} ${i + 1}`;
        if (d.identite != null) pushId(out, d, `${d.id}-${i}`, label, who, it.pieceType);
        else out.push({ key: `${d.id}-${i}`, label: `${label} : ${who}`, ref: d.ref });
      });
      else if (d.identite != null) pushId(out, d, d.id, label, null, d.identite ? (A()[d.identite] || {}).pieceType : A().pieceType);
      else out.push({ key: d.id, label, ref: d.ref });
    });
    return out;
  }
  async function sniff(file) {
    const b = new Uint8Array(await file.slice(0, 8).arrayBuffer());
    const hex = Array.from(b).map(x => x.toString(16).padStart(2, "0")).join("");
    if (hex.startsWith("25504446")) return "application/pdf";
    if (hex.startsWith("89504e47")) return "image/png";
    if (hex.startsWith("ffd8ff")) return "image/jpeg";
    const ftyp = new TextDecoder().decode(b.slice(4, 8)) === "ftyp" ? new TextDecoder().decode(new Uint8Array(await file.slice(8, 12).arrayBuffer())) : "";
    if (/^(heic|heix|hevc|mif1|msf1|avif)$/.test(ftyp)) return "image/heic";   // photo d’iPhone : convertie en JPEG si le navigateur sait la lire
    return null;
  }

  /* ---------- rendu des champs ---------- */
  function renderField(f, path, scope) {
    const id = fid(path), v = getPath(path), wrap = h("div", { class: "field " + (f.width === "full" || f.type === "cards" || f.type === "checkboxes" ? "full" : ""), "data-type": f.type, "data-field": f.id });
    const entry = { f, path, scope, el: wrap };
    registry.push(entry);
    const ref = f.ref ? h("span", { class: "ref", text: f.ref, title: "Référence dans la matrice des mentions obligatoires" }) : null;
    const helpText = res(f.help, scope);
    const help = f.help ? h("p", { class: "help", id: id + "-help", text: helpText || "", hidden: !helpText }) : null;
    entry.helpEl = help;
    const err = h("p", { class: "err", id: id + "-err", role: "alert", hidden: true });
    entry.err = err;
    const describedby = [help && id + "-help", id + "-err"].filter(Boolean).join(" ");
    const reqMark = () => isRequired(f, scope) ? null : h("span", { class: "opt", text: "facultatif" });

    if (f.type === "info" && f.tone === "heading") {
      wrap.classList.add("full", "section-heading");
      put(wrap, h("h4", { class: "subsection-title", text: res(f.text) }));
      return wrap;
    }
    if (f.type === "info") {
      wrap.classList.add("full");
      put(wrap, h("div", { class: "callout " + (f.tone || "note") }, res(f.text)), ref);
      return wrap;
    }
    if (f.type === "computed") {
      wrap.classList.add("full");
      const out = h("div", { class: "computed", "aria-live": "polite" });
      entry.computed = out; entry.render = () => renderComputed(f, out);
      entry.render();
      put(wrap, f.label ? h("span", { class: "label-sm", text: res(f.label, scope) }) : null, out, ref);
      return wrap;
    }
    if (f.type === "check") {
      const inp = h("input", { type: "checkbox", id, "aria-describedby": describedby });
      inp.checked = !!v;
      inp.addEventListener("change", () => change(entry, inp.checked));
      const lab = h("label", { class: "check", for: id }, inp, h("span", { class: "check-box", "aria-hidden": "true" }), h("span", { class: "check-text", text: res(f.label, scope) }));
      entry.labelEl = lab.querySelector(".check-text");
      put(wrap, lab, ref, help, err);
      return wrap;
    }
    if (f.type === "radio" || f.type === "cards" || f.type === "checkboxes") {
      const multi = f.type === "checkboxes";
      const legend = h("legend", { class: "label" }, h("span", { text: res(f.label, scope) }), reqMark(), ref);
      entry.labelEl = legend.firstChild;
      const list = h("div", { class: f.type === "cards" ? "cards" : multi ? "checks" : (f.options.length <= 3 && f.options.every(o => o.l.length < 22) ? "radios inline" : "radios") });
      f.options.forEach((o, i) => {
        const oid = id + "-" + i;
        const inp = h("input", { type: multi ? "checkbox" : "radio", name: id, id: oid, value: o.v, "aria-describedby": describedby });
        inp.checked = multi ? (v || []).includes(o.v) : v === o.v;
        inp.addEventListener("change", () => {
          if (multi) { const cur = new Set(getPath(path) || []); inp.checked ? cur.add(o.v) : cur.delete(o.v); change(entry, f.options.map(x => x.v).filter(x => cur.has(x))); }
          else change(entry, o.v);
        });
        put(list, h("label", { class: f.type === "cards" ? "card-opt" : "opt-row", for: oid, "data-value": o.v }, inp,
          h("span", { class: "mark", "aria-hidden": "true" }),
          h("span", { class: "opt-text" }, h("span", { class: "opt-l", text: o.l }), o.d ? h("span", { class: "opt-d", text: o.d }) : null)));
      });
      if (f.type === "radio" || f.type === "cards") list.setAttribute("role", "radiogroup");
      put(wrap, h("fieldset", { id }, legend, help, list, err));
      return wrap;
    }
    // champs de saisie
    const lab = h("label", { class: "label", for: id }, h("span", { text: res(f.label, scope) }), reqMark(), ref);
    entry.labelEl = lab.firstChild;
    let inp;
    if (f.type === "select") {
      /* liste à saisie : filtre au fil de la frappe, option « Autre » avec précision obligatoire */
      const norm = x => String(x || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’‘]/g, "'").toLowerCase();
      inp = h("input", { id, type: "text", role: "combobox", "aria-autocomplete": "list", "aria-expanded": "false", "aria-controls": id + "-list",
        autocomplete: "off", spellcheck: "false", "aria-describedby": describedby, class: "combo-input", placeholder: "Tapez pour rechercher" });
      const list = h("ul", { id: id + "-list", role: "listbox", class: "combo-list", hidden: true, "aria-label": labelText(f, scope) });
      inp.__box = h("div", { class: "combo" }, inp, h("span", { class: "combo-chevron", "aria-hidden": "true" }), list);
      let opts = [], shown = [], active = -1;
      const isOther = o => o.v === "autre";
      const labelOf = val => { const o = opts.find(x => x.v === val); return o ? o.l : ""; };
      const otherPath = f.other ? path.slice(0, -1).concat(f.other) : null;
      const setActive = i => {
        list.querySelectorAll(".combo-opt.active").forEach(x => x.classList.remove("active"));
        active = i;
        const el = i >= 0 ? document.getElementById(id + "-opt-" + i) : null;
        if (el) { el.classList.add("active"); inp.setAttribute("aria-activedescendant", el.id); el.scrollIntoView({ block: "nearest" }); }
        else inp.removeAttribute("aria-activedescendant");
      };
      const close = () => { list.hidden = true; inp.setAttribute("aria-expanded", "false"); setActive(-1); };
      const draw = q => {
        const nq = norm(q.trim()), toks = nq.split(/\s+/).filter(Boolean);
        let found = opts;
        if (toks.length) {
          const seen = new Set();
          found = opts.filter(o => !isOther(o) && toks.every(t => norm(o.l).includes(t)) && !seen.has(o.v) && seen.add(o.v));
          found.sort((a, b) => Number(norm(b.l).startsWith(nq)) - Number(norm(a.l).startsWith(nq)));
          const oth = opts.find(isOther); if (oth) found.push(oth);
        }
        shown = found.slice(0, 300);
        list.replaceChildren();
        if (!shown.length) list.append(h("li", { class: "combo-empty", role: "presentation", text: "Aucun résultat. Vérifiez l’orthographe." }));
        let lastG = null;
        shown.forEach((o, i) => {
          if (!toks.length && o.g && o.g !== lastG) { lastG = o.g; list.append(h("li", { class: "combo-group", role: "presentation", text: o.g })); }
          const li = h("li", { id: id + "-opt-" + i, role: "option", class: "combo-opt" + (isOther(o) ? " combo-other" : ""), "aria-selected": o.v === getPath(path) ? "true" : "false", text: o.l });
          li.addEventListener("mousedown", e => { e.preventDefault(); pick(o); });
          list.append(li);
        });
        list.hidden = false; inp.setAttribute("aria-expanded", "true");
        setActive(toks.length ? (shown.length ? 0 : -1) : shown.findIndex(o => o.v === getPath(path)));
      };
      const pick = o => {
        const typed = inp.value.trim();
        if (isOther(o) && otherPath && typed && norm(typed) !== norm(o.l) && !opts.some(x => norm(x.l) === norm(typed)) && !getPath(otherPath)) {
          setPath(otherPath, typed); const t = document.getElementById(fid(otherPath)); if (t) t.value = typed;
        }
        inp.value = o.l; close(); change(entry, o.v);
        if (isOther(o) && otherPath) setTimeout(() => { const t = document.getElementById(fid(otherPath)); if (t) t.focus(); }, 0);
      };
      inp.addEventListener("click", () => { if (list.hidden) draw(""); else close(); });
      inp.addEventListener("input", () => draw(inp.value));
      inp.addEventListener("keydown", e => {
        if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) draw(""); else setActive(Math.min(active + 1, shown.length - 1)); }
        else if (e.key === "ArrowUp") { e.preventDefault(); if (!list.hidden) setActive(Math.max(active - 1, 0)); }
        else if (e.key === "Enter") { if (!list.hidden && active >= 0) { e.preventDefault(); pick(shown[active]); } }
        else if (e.key === "Escape") { if (!list.hidden) { e.preventDefault(); close(); inp.value = labelOf(getPath(path)); } }
        else if (e.key === "Tab") { if (!list.hidden && active >= 0 && inp.value.trim() && inp.value.trim() !== labelOf(getPath(path))) pick(shown[active]); }
      });
      inp.addEventListener("blur", () => {
        if (!list.hidden) close();
        const txt = inp.value.trim(), cur = getPath(path) ?? "";
        if (!txt) { if (cur !== "") change(entry, ""); return; }
        if (txt === labelOf(cur)) return;
        const exact = opts.find(o => norm(o.l) === norm(txt));
        if (exact) { inp.value = exact.l; change(entry, exact.v); return; }
        const seenP = new Set(), partial = opts.filter(o => !isOther(o) && norm(o.l).includes(norm(txt)) && !seenP.has(o.v) && seenP.add(o.v));
        if (partial.length === 1) { inp.value = partial[0].l; change(entry, partial[0].v); return; }
        const oth = opts.find(isOther);
        if (oth && otherPath) {
          if (!getPath(otherPath)) { setPath(otherPath, txt); const t = document.getElementById(fid(otherPath)); if (t) t.value = txt; }
          inp.value = oth.l; change(entry, "autre"); return;
        }
        inp.value = labelOf(cur);
      });
      entry.fillOptions = () => {
        opts = f.optionsFrom ? (A()[f.optionsFrom] || []).map((it, i) => ({ v: String(i), l: itemName(it) || `Co-titulaire ${i + 1}` })) : (res(f.options, scope) || []);
        const cur = getPath(path) ?? "";
        if (cur !== "" && !opts.some(o => o.v === cur)) setPath(path, "");
        if (document.activeElement !== inp) inp.value = labelOf(getPath(path) ?? "");
      };
      entry.fillOptions();
    } else if (f.type === "textarea") {
      inp = h("textarea", { id, rows: "3", "aria-describedby": describedby, maxlength: "1000" });
      inp.value = v || "";
      inp.addEventListener("input", () => change(entry, inp.value, true));
    } else if (f.type === "money" || f.type === "percent") {
      inp = h("input", { id, type: "text", inputmode: "decimal", autocomplete: "off", "aria-describedby": describedby, class: "num" });
      inp.value = f.type === "money" ? fmtMoney(v) : (v ?? "");
      inp.addEventListener("input", () => { const raw = inp.value.replace(/[^\d,.]/g, "").replace(",", "."); change(entry, raw === "" ? "" : Number(raw), true); });
      inp.addEventListener("blur", () => { if (f.type === "money") inp.value = fmtMoney(getPath(path)); });
      if (f.type === "percent") wrap.classList.add("narrow");
    } else {
      const type = { text: "text", email: "email", tel: "tel", date: "date" }[f.type] || "text";
      inp = h("input", { id, type, autocomplete: f.autocomplete || "off", spellcheck: "false", "aria-describedby": describedby, maxlength: "200", class: f.mono ? "mono" : null });
      if (f.type === "date") { inp.max = "2100-12-31"; inp.min = "1900-01-01"; }
      inp.value = v || "";
      inp.addEventListener("input", () => change(entry, f.rule === "rib" ? inp.value.toUpperCase() : inp.value, true));
    }
    inp.addEventListener("blur", () => { S.touched[id] = true; showFieldError(entry); });
    entry.input = inp;
    put(wrap, lab, inp.__box || inp, help, err);
    return wrap;
  }

  function renderComputed(f, out) {
    out.replaceChildren();
    if (f.compute === "profil") {
      const p = COMPUTE.profil();
      if (p.profile == null) { put(out, h("div", { class: "callout muted", text: `Votre profil s’affiche dès que les ${p.total} questions sont renseignées (${p.answered} sur ${p.total}).` })); return; }
      const scale = h("ol", { class: "scale", "aria-label": "Échelle des profils" }, PROFILS.map((x, i) => h("li", { class: i === p.profile ? "on" : i < p.profile ? "past" : "", "aria-current": i === p.profile ? "true" : null, text: x.n })));
      put(out, h("div", { class: "profile" },
        h("span", { class: "eyebrow", text: "Profil proposé" }),
        h("p", { class: "profile-name", text: PROFILS[p.profile].n }),
        h("p", { class: "profile-d", text: PROFILS[p.profile].d }),
        scale,
        p.caps.length ? h("div", { class: "caps" }, h("p", { text: `Vos réponses situaient votre profil en « ${PROFILS[p.band].n} ». Il est ramené à « ${PROFILS[p.profile].n} » pour la raison suivante :` }), h("ul", null, p.caps.map(c => h("li", { text: c })))) : null,
        h("p", { class: "small", text: "Votre gérant confirme ce profil et établit avec vous la fiche de synthèse, qui fixe la répartition par classe d’actifs." })));
      return;
    }
    const r = COMPUTE[f.compute]();
    if (r.text) put(out, h("div", { class: "callout " + r.tone, text: r.text }));
  }

  function showFieldError(entry, force) {
    const id = fid(entry.path);
    if (!entry.err || (!S.touched[id] && !force && !S.attempted[S.step])) return;
    const val = getPath(entry.path), isEmpty = val == null || val === "" || val === false || (Array.isArray(val) && !val.length);
    const m = (!force && !S.attempted[S.step] && isEmpty) ? null : fieldError(entry.f, val, entry.scope);
    entry.err.hidden = !m; entry.err.textContent = m || "";
    const target = entry.input || entry.el.querySelector("fieldset, input");
    if (target) target.setAttribute("aria-invalid", m ? "true" : "false");
    entry.el.classList.toggle("invalid", !!m);
  }

  function change(entry, v, typing) {
    setPath(entry.path, v);
    if (!typing) S.touched[fid(entry.path)] = true;
    showFieldError(entry);
    if (entry.f.id === "cat" || entry.f.id === "gestion") onConfigChange(entry.f.id);
    refresh();
  }
  function onConfigChange(which) {
    const a = A();
    if (which === "cat") {
      if (a.cat === "joint" && !(a.cotitulaires || []).length) a.cotitulaires = [newItem(SCHEMA.templates.personne), newItem(SCHEMA.templates.personne)];
      if (a.cat === "mineur" && !(a.representants || []).length) { a.enfant = a.enfant || newItem(SCHEMA.templates.enfant); a.representants = [newItem(templateFields("personne", stepField("mineur", "representants")))]; }
      if ((a.cat === "societe" || a.cat === "association") && !(a.signataires || []).length) {
        const f = stepField("signataires", "signataires"); a.signataires = [newItem(templateFields(f.template, f))];
        const b = stepField("beneficiaires", "beneficiaires"); a.beneficiaires = [newItem(templateFields(b.template, b))];
      }
    }
  }
  function stepField(stepId, fieldId) {
    return SCHEMA.steps.filter(x => x.id === stepId || x.parentId === stepId)
      .flatMap(s => s.groups ? s.groups.flatMap(g => g.fields) : s.fields || []).find(f => f.id === fieldId);
  }

  function refresh() {
    registry.forEach(e => {
      const vis = ev(e.f.visibleIf, e.scope);
      e.el.hidden = !vis;
      if (e.labelEl && typeof e.f.label === "object") e.labelEl.textContent = res(e.f.label, e.scope);
      if (e.helpEl && e.f.help && typeof e.f.help === "object") { const t = res(e.f.help, e.scope); e.helpEl.textContent = t || ""; e.helpEl.hidden = !t; }
      if (e.render) e.render();
      if (e.fillOptions && (e.f.optionsFrom || (e.f.options && !Array.isArray(e.f.options) && (e.f.options.addr || e.f.options.map)))) e.fillOptions();
      const o = e.el.querySelector(".opt");
      if (o) o.hidden = isRequired(e.f, e.scope);
    });
    document.querySelectorAll("[data-group-if]").forEach(g => { g.hidden = !ev(JSON.parse(g.dataset.groupIf)); });
    renderRail();
    if (S.attempted[S.step]) renderErrorSummary(stepErrors(currentStep()), false);
  }

  /* ---------- répéteurs ---------- */
  function renderRepeater(f, scope) {
    const items = A()[f.id] || (A()[f.id] = []);
    while (items.length < f.min) items.push(newItem(templateFields(f.template, f)));
    const box = h("div", { class: "repeater full", id: "rep-" + f.id, tabindex: "-1" });
    const fields = templateFields(f.template, f);
    items.forEach((it, i) => {
      const card = h("section", { class: "rep-item", "aria-label": `${f.itemLabel} ${i + 1}` });
      const title = h("h3", { class: "rep-title" }, h("span", { class: "rep-n", text: String(i + 1).padStart(2, "0") }), h("span", { text: itemName(it) || `${f.itemLabel} ${i + 1}` }));
      const head = h("div", { class: "rep-head" }, title,
        items.length > f.min ? h("button", { type: "button", class: "btn-text danger", onclick: () => { items.splice(i, 1); renderStep(); }, text: "Retirer" }) : null);
      const grid = h("div", { class: "grid" });
      fields.forEach(x => put(grid, renderField(x, [f.id, i, x.id], { local: it })));
      put(card, head, grid);
      put(box, card);
    });
    const err = h("p", { class: "err", role: "alert", hidden: true, id: "rep-" + f.id + "-err" });
    if (items.length < f.max) put(box, h("button", { type: "button", class: "btn-add", onclick: () => { items.push(newItem(fields)); renderStep(); setTimeout(() => { const t = document.querySelectorAll(`#rep-${f.id} .rep-item`); t[t.length - 1]?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }, 0); } },
      h("span", { "aria-hidden": "true", text: "+" }), ` Ajouter un ${f.itemLabel.toLowerCase()}`));
    put(box, err);
    registry.push({ f: { ...f, type: "repeaterBox" }, path: [f.id], scope, el: box, render: () => { const m = S.attempted[S.step] ? repeaterError(f) : null; err.hidden = !m; err.textContent = m || ""; } });
    return box;
  }

  /* ---------- étapes ---------- */
  const currentStep = () => visibleSteps()[S.step] || visibleSteps()[0];

  function renderStep() {
    registry = [];
    const steps = visibleSteps();
    if (S.step >= steps.length) S.step = steps.length - 1;
    const step = steps[S.step];
    document.body.dataset.stage = step.id;
    $("#why-details").open = false;
    const main = $("#step");
    main.replaceChildren();
    const siblings = steps.filter(s => s.phase === step.phase);
    $("#eyebrow").textContent = `${PHASES[step.phase].label} · ${siblings.indexOf(step) + 1} / ${siblings.length}`;
    $("#title").textContent = step.title;
    $("#intro").textContent = res(step.intro) || "";
    $("#errsum").hidden = true;

    if (S.done) return renderDone();
    if (step.special === "pieces") renderPieces(main);
    else if (step.special === "recap") renderRecap(main);
    else {
      const blocks = step.groups || [{ fields: step.fields }];
      blocks.forEach(g => {
        const sec = h(g.title ? "fieldset" : "div", { class: "group" });
        if (g.visibleIf) { sec.dataset.groupIf = JSON.stringify(g.visibleIf); sec.hidden = !ev(g.visibleIf); }
        if (g.title) put(sec, h("legend", { class: "group-title", text: g.title }));
        const grid = h("div", { class: "grid" });
        g.fields.forEach(f => {
          if (f.type === "repeater") put(grid, renderRepeater(f, null));
          else if (f.type === "group") { const it = A()[f.id] || (A()[f.id] = newItem(SCHEMA.templates[f.template])); SCHEMA.templates[f.template].forEach(x => put(grid, renderField(x, [f.id, x.id], { local: it }))); }
          else put(grid, renderField(f, [f.id], null));
        });
        put(sec, grid);
        put(main, sec);
      });
    }
    $("#prev").hidden = false;
    $("#next").textContent = step.special === "recap" ? (LIVE ? "Envoyer ma demande →" : "Terminer la simulation →") : S.reviewReturn ? "Enregistrer la modification →" : "Continuer →";
    $("#review-return").hidden = !S.reviewReturn;
    $("#nav").hidden = false;
    refresh();
  }

  function renderPieces(main) {
    const docs = docsNeeded();
    const list = h("div", { class: "docs" });
    docs.forEach(d => {
      const id = "doc-" + d.key, meta = S.files[d.key], def = S.deferred[d.key];
      const status = h("span", { class: "doc-status " + (meta ? (meta.envoi ? "later" : "ok") : def ? "later" : "todo"), text: meta ? (meta.envoi ? "Envoi en cours" : LIVE ? "Reçu" : "Joint") : def ? "Au rendez-vous" : "À fournir" });
      const fileInp = h("input", { type: "file", id, accept: ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/jpeg,image/png,image/heic,image/heif", class: "sr-only" });
      const msg = h("p", { class: "err", role: "alert", hidden: true });
      if (S.uploadErr && S.uploadErr.key === d.key) { msg.textContent = S.uploadErr.msg; msg.hidden = false; S.uploadErr = null; }
      fileInp.addEventListener("change", async () => {
        if (!fileInp.files[0]) return;
        msg.hidden = true;
        let file = fileInp.files[0], optim = null;
        let real = await sniff(file);
        if (!real) { msg.textContent = "Format non accepté. Joignez un PDF, une photo JPEG ou PNG."; msg.hidden = false; return; }
        if (real === "application/pdf" && file.size > MAX_FILE) {
          msg.textContent = `Ce PDF fait ${mo(file.size)}, au-delà de la limite de ${mo(MAX_FILE)}. Photographiez plutôt la pièce : la photo sera optimisée automatiquement. Vous pouvez aussi enregistrer le PDF en qualité « écran » ou n’en garder que les pages utiles.`;
          msg.hidden = false; return;
        }
        if (real !== "application/pdf") {   // toute photo est redressée, contrôlée et débarrassée de ses métadonnées
          const st = $("#" + id + "-row .doc-status"); if (st) st.textContent = "Optimisation…";
          const r = await optimiserImage(file);
          if (r.erreur) { msg.textContent = r.erreur; msg.hidden = false; if (st) st.textContent = "À fournir"; return; }
          file = r.fichier; real = "image/jpeg"; optim = r;
        }
        fileStore[d.key] = file;
        delete S.deferred[d.key];
        const note = !optim ? null : (optim.reduite ? `photo optimisée de ${mo(optim.avant)} à ${mo(optim.apres)}` : "photo contrôlée") + (optim.petite ? " ; image de faible définition, vérifiez qu’elle reste bien lisible" : "");
        if (!LIVE) { S.files[d.key] = { nom: file.name, taille: file.size, type: real, note }; renderStep(); return; }
        S.files[d.key] = { nom: file.name, taille: file.size, type: real, envoi: true, note }; renderStep();
        try {
          const r = await api.upload(d.key, file);
          S.files[d.key] = { nom: r.nom, taille: r.taille, type: r.type, sha256: r.sha256, note };
        } catch (e) {
          delete S.files[d.key]; delete fileStore[d.key];
          S.uploadErr = { key: d.key, msg: e.message };
        }
        renderStep();
      });
      const later = h("input", { type: "checkbox", id: id + "-later" }); later.checked = !!def;
      later.addEventListener("change", () => {
        if (later.checked) { if (LIVE && S.files[d.key]) api.remove(d.key).catch(() => {}); S.deferred[d.key] = true; delete S.files[d.key]; delete fileStore[d.key]; }
        else delete S.deferred[d.key];
        renderStep();
      });
      put(list, h("div", { class: "doc", id: id + "-row" },
        h("div", { class: "doc-main" }, h("p", { class: "doc-l" }, d.label, h("span", { class: "ref", text: d.ref })),
          meta ? h("p", { class: "doc-file mono", text: `${meta.nom} · ${(meta.taille / 1024).toFixed(0)} Ko · ${meta.envoi ? "envoi sécurisé en cours…" : LIVE ? "reçu et contrôlé" : "format vérifié"}` }) : null,
          meta && meta.note ? h("p", { class: "doc-file", text: meta.note.charAt(0).toUpperCase() + meta.note.slice(1) + "." }) : null, msg),
        h("div", { class: "doc-act" }, status,
          h("label", { class: "btn-sm", for: id, text: meta ? "Remplacer" : "Joindre" }), fileInp,
          h("label", { class: "check small", for: id + "-later" }, later, h("span", { class: "check-box", "aria-hidden": "true" }), h("span", { class: "check-text", text: "Je l’apporterai" })))));
    });
    const n = docs.length, ok = docs.filter(d => S.files[d.key]).length, later = docs.filter(d => S.deferred[d.key]).length;
    put(main, h("div", { class: "doc-sum" },
      h("span", null, h("strong", { text: String(n) }), " pièces demandées"), h("span", null, h("strong", { text: String(ok) }), " jointes"), h("span", null, h("strong", { text: String(later) }), " au rendez-vous")),
      list,
      h("p", { class: "small", text: `Formats acceptés : PDF, photo JPEG, PNG ou HEIC. Les photos sont optimisées automatiquement avant l’envoi ; un PDF ne doit pas dépasser ${mo(MAX_FILE)}. Le format réel de chaque fichier est contrôlé.` }));
  }

  function summaryRows(step) {
    const rows = [];
    walkStep(step, (f, path, scope) => {
      if (["info", "computed", "repeater", "check"].includes(f.type)) return;
      let v = getPath(path);
      if (v == null || v === "" || (Array.isArray(v) && !v.length)) return;
      const opts = f.optionsFrom ? (A()[f.optionsFrom] || []).map((it, i) => ({ v: String(i), l: itemName(it) || `Co-titulaire ${i + 1}` })) : res(f.options, scope);
      if (opts) v = (Array.isArray(v) ? v : [v]).map(x => (opts.find(o => o.v === x) || {}).l || x).join(", ");
      else if (f.type === "date") v = fmtDate(v);
      else if (f.type === "money") v = fmtMoney(v) + " FCFA";
      else if (f.type === "percent") v = v + " %";
      const prefix = typeof path[1] === "number" ? `${({ cotitulaires: "Co-titulaire", representants: "Représentant", signataires: "Signataire", beneficiaires: "Bénéficiaire" })[path[0]]} ${path[1] + 1} · ` : path[0] === "enfant" ? "Enfant · " : path[0] === "mandataireP" ? "Mandataire · " : "";
      rows.push([prefix + labelText(f, scope), String(v)]);
    });
    return rows;
  }

  function renderRecap(main) {
    const steps = visibleSteps().filter(s => !s.special);
    steps.forEach(s => {
      const idx = visibleSteps().indexOf(s), errs = stepErrors(s), rows = summaryRows(s);
      const dl = h("dl", { class: "kv" });
      rows.forEach(([k, v]) => dl.append(h("div", null, h("dt", { text: k }), h("dd", { text: v }))));

      if (s.id === "profil-synthese" && A().gestion === "mandat") { const p = COMPUTE.profil(); if (p.profile != null) dl.prepend(h("div", { class: "hl" }, h("dt", { text: "Profil proposé" }), h("dd", { text: PROFILS[p.profile].n }))); }
      put(main, h("details", { class: "recap review-section" + (errs.length ? " incomplete" : ""), open: !!errs.length },
        h("summary", { class: "recap-head" }, h("span", { class: "review-title", text: s.title }),
          errs.length ? h("span", { class: "doc-status todo", text: `${errs.length} à compléter` }) : h("span", { class: "doc-status ok", text: "Complet" }),
          h("span", { class: "expand-review", "aria-hidden": "true", text: "+" })),
        h("button", { type: "button", class: "btn-text review-edit", onclick: () => editStep(idx), "aria-label": "Modifier : " + s.title, text: "Modifier ces réponses →" }),
        rows.length ? dl : h("p", { class: "small", text: "Aucune réponse pour l’instant." })));
    });
    const docs = docsNeeded();
    put(main, h("section", { class: "recap" },
      h("div", { class: "recap-head" }, h("h2", { text: "Pièces justificatives" }), h("button", { type: "button", class: "btn-text", onclick: () => editStep(visibleSteps().findIndex(s => s.special === "pieces")), "aria-label": "Modifier les pièces justificatives", text: "Modifier" })),
      h("p", { class: "small", text: `${docs.filter(d => S.files[d.key]).length} jointes, ${docs.filter(d => S.deferred[d.key]).length} apportées au rendez-vous, ${docs.filter(d => !S.files[d.key] && !S.deferred[d.key]).length} manquantes.` })));
    put(main, h("section", { class: "recap sign" },
      h("h2", { text: "Documents que vous signerez au rendez-vous" }),
      h("ul", { class: "contracts" }, SCHEMA.contrats.filter(c => ev(c.when)).map(c => h("li", { text: c.label })))));
    const eng = h("fieldset", { class: "group" }, h("legend", { class: "group-title", text: "Vos engagements" }));
    const grid = h("div", { class: "grid" });
    SCHEMA.engagements.forEach(e => put(grid, renderField({ id: e.id, ref: e.ref, type: "check", required: true, width: "full", label: e.text }, [e.id], null)));
    put(eng, grid); put(main, eng);
  }

  function renderErrorSummary(errs, focus) {
    const box = $("#errsum");
    if (!errs.length) { box.hidden = true; return; }
    box.replaceChildren(h("h2", { text: errs.length === 1 ? "Un point à corriger" : `${errs.length} points à corriger` }),
      h("ul", null, errs.slice(0, 8).map(e => h("li", null, h("a", { href: "#" + e.id, onclick: ev => { ev.preventDefault(); const t = document.getElementById(e.id); if (t) { t.scrollIntoView({ block: "center" }); const ft = t.matches("input,select,textarea,fieldset") ? (t.matches("fieldset") ? t.querySelector("input") : t) : (t.querySelector("input:not([type=file]),select,textarea,button,label") || t); if (ft && ft.focus) ft.focus({ preventScroll: true }); } }, text: e.msg }))),
        errs.length > 8 ? h("li", { text: `et ${errs.length - 8} autres` }) : null));
    box.hidden = false;
    if (focus) { box.focus(); box.scrollIntoView({ block: "start" }); }
  }

  function editStep(i) { S.reviewReturn = true; go(i); }
  function go(i) {
    S.step = Math.max(0, Math.min(i, visibleSteps().length - 1));
    if (currentStep().special === "recap") S.reviewReturn = false;
    enterJourney();
    renderStep();
    history.pushState({efStep: S.step}, "");
    $("#main").scrollIntoView({ block: "start" });
    $("#title").focus({ preventScroll: true });
  }
  function next() {
    const step = currentStep();
    S.attempted[S.step] = true;
    const errs = stepErrors(step);
    registry.forEach(e => { if (e.err && !e.el.hidden) showFieldError(e, true); if (e.render && e.f.type === "repeaterBox") e.render(); });
    if (errs.length) { renderErrorSummary(errs, true); return; }
    S.finished = S.finished || {}; S.finished[step.id] = true;
    if (step.special === "recap") return submit();
    go(S.reviewReturn ? visibleSteps().findIndex(s => s.special === "recap") : S.step + 1);
  }
  function submit() {
    const missing = visibleSteps().filter(s => s.special !== "recap").map((s, i) => ({ s, i: visibleSteps().indexOf(s), n: stepErrors(s).length })).filter(x => x.n);
    if (missing.length) {
      const box = $("#errsum");
      box.replaceChildren(h("h2", { text: "Votre demande est incomplète" }), h("ul", null, missing.map(m => h("li", null, h("button", { type: "button", class: "btn-text", onclick: () => go(m.i), text: `${m.s.title} : ${m.n} point${m.n > 1 ? "s" : ""} à compléter` })))));
      box.hidden = false; box.focus(); return;
    }
    if (LIVE) return sendLive();
    const ref = "EVF-" + new Date().getFullYear() + "-" + Array.from(crypto.getRandomValues(new Uint8Array(4))).map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    S.done = { ref, at: new Date().toISOString(), payload: payload(ref) };
    renderDone();
  }
  async function sendLive() {
    const btn = $("#next"), box = $("#errsum");
    btn.disabled = true; btn.textContent = "Envoi en cours…"; box.hidden = true;
    try {
      const p = payload(null);
      const etat = await api.envoi({ schema: p.schema, reponses: p.reponses, profil: p.profil, pieces: p.pieces.map((x, i) => ({ cle: docsNeeded()[i].key, statut: x.statut, libelle: x.piece })) });
      S.done = { ref: etat.reference, at: new Date().toISOString(), etat, live: true };
      fileStore = {};
      renderDone(); startPolling();
    } catch (e) {
      box.replaceChildren(h("h2", { text: "Votre demande n’a pas pu être envoyée" }), h("p", { text: e.message }));
      box.hidden = false; box.focus();
    } finally { btn.disabled = false; btn.textContent = "Envoyer ma demande →"; }
  }
  function payload(ref) {
    const p = COMPUTE.profil();
    return {
      reference: ref, schema: SCHEMA.version, horodatage: new Date().toISOString(),
      configuration: { categorie: A().cat, gestion: A().gestion, residence: A().residence },
      reponses: A(),
      profil: A().gestion === "mandat" && p.profile != null ? { propose: PROFILS[p.profile].n, score: p.score, plafonnements: p.caps } : null,
      pieces: docsNeeded().map(d => ({ piece: d.label, ref: d.ref, statut: S.files[d.key] ? "jointe" : "au rendez-vous", fichier: S.files[d.key] || null })),
      documentsASigner: SCHEMA.contrats.filter(c => ev(c.when)).map(c => c.label)
    };
  }
  /* ---------- après l’envoi : vérification d’identité puis signature ---------- */
  const KYC_TXT = { "Non commencée": "À faire", "Not Started": "À faire", "In Progress": "En cours", "Awaiting User": "En attente de votre part", "In Review": "En cours d’examen", "Approved": "Vérifiée", "Declined": "Non validée", "Resubmitted": "Nouvel envoi demandé", "Abandoned": "Interrompue", "Expired": "Expirée", "Kyc Expired": "Expirée" };
  let pollT = null;
  function startPolling() {
    clearInterval(pollT);
    pollT = setInterval(async () => {
      if (!S.done || !S.done.live) return clearInterval(pollT);
      if (document.hidden) return;
      try {
        const e = await api.etat();
        const changed = JSON.stringify(e) !== JSON.stringify(S.done.etat);
        if (changed) { S.done.etat = e; armIdle(); if (!S.signing) renderDone(); }
        if (e.etape === "examen") clearInterval(pollT);
      } catch { /* nouvelle tentative au prochain cycle */ }
    }, 5000);
  }
  // ouverture du parcours Didit dans un nouvel onglet : la page du dossier reste ouverte et suit l’avancement
  async function openExternal(fn, btn, note) {
    const w = window.open("about:blank", "_blank");
    btn.disabled = true; note.textContent = "Préparation…"; note.hidden = false;
    try {
      const { url } = await fn();
      if (w) { w.opener = null; w.location.href = url; note.textContent = "La vérification s’est ouverte dans un nouvel onglet. Revenez ici une fois terminée : cette page se met à jour seule."; }
      else { note.replaceChildren("Votre navigateur a bloqué l’ouverture. ", h("a", { href: url, target: "_blank", rel: "noopener noreferrer", text: "Ouvrir la vérification" })); }
    } catch (e) { if (w) w.close(); note.textContent = e.message; }
    finally { btn.disabled = false; }
  }
  function renderLiveDone() {
    const e = S.done.etat;
    const fini = e.etape === "examen";
    $("#eyebrow").textContent = fini ? "Dossier complet" : "Demande enregistrée";
    $("#title").textContent = fini ? "Merci, votre dossier est complet" : e.etape === "signature" ? "Dernière étape : la signature" : "Vérifions votre identité";
    $("#intro").textContent = fini ? `Votre dossier complet est bien reçu ; un accusé de réception vous a été envoyé par courriel. Nos équipes l’examinent : le délai moyen de traitement est de ${e.delai_traitement || 5} jours ouvrés. Vous recevrez l’avis d’ouverture de votre compte par courriel.`
      : "Votre demande est enregistrée. Chaque personne concernée vérifie son identité avec sa pièce et son visage, puis les signataires signent les documents en ligne.";
    const people = e.personnes.filter(p => p.verifie);
    const kycList = h("ol", { class: "live-list" }, people.map(p => {
      const ok = p.kyc === "Approved", note = h("p", { class: "small live-note", hidden: true, "aria-live": "polite" });
      const btn = h("button", { type: "button", class: "btn-sm", text: ["Non commencée", "Not Started"].includes(p.kyc) ? "Commencer" : "Reprendre" });
      btn.addEventListener("click", () => openExternal(() => api.kyc(p.cle), btn, note));
      return h("li", { class: "live-item" }, h("div", null, h("strong", { text: p.libelle }), h("span", { class: "small", text: " · " + p.role })),
        h("span", { class: "doc-status " + (ok ? "ok" : p.kyc === "Declined" ? "todo" : "later"), text: KYC_TXT[p.kyc] || p.kyc }), ok || p.kyc === "In Review" ? null : btn, note);
    }));
    const signers = e.personnes.filter(p => p.signe);
    const sigList = h("ol", { class: "live-list" }, signers.map(p => {
      const done = p.signature.faits === p.signature.attendus, ready = p.kyc === "Approved";
      const note = h("p", { class: "small live-note", hidden: true, "aria-live": "polite" });
      const btn = h("button", { type: "button", class: "btn-sm", text: "Signer mes documents", disabled: !ready });
      btn.addEventListener("click", () => signFlow(p, note, btn));
      return h("li", { class: "live-item" }, h("div", null, h("strong", { text: p.libelle }), h("span", { class: "small", text: ` · ${p.signature.faits} / ${p.signature.attendus} documents signés` })),
        h("span", { class: "doc-status " + (done ? "ok" : "later"), text: done ? "Signé" : ready ? "À signer" : "Après vérification" }), done ? null : btn, note);
    }));
    const docLinks = h("ul", { class: "live-docs" }, e.documents.map(d => {
      const b = h("button", { type: "button", class: "btn-text", text: d.libelle + (d.finalise ? " (signé)" : "") });
      b.addEventListener("click", async () => { const w = window.open("about:blank", "_blank"); try { const u = await api.pdf(d.id); if (w) w.location.href = u; } catch (err) { if (w) w.close(); } });
      return h("li", null, b);
    }));
    $("#step").replaceChildren(
      h("div", { class: "done-box" }, h("span", { class: "eyebrow", text: "Référence de votre dossier" }), h("p", { class: "done-ref mono", text: e.reference })),
      h("section", { class: "live-section" }, h("h2", { text: "1. Vérification d’identité" }), h("p", { class: "small", text: "Munissez-vous de votre pièce d’identité. Sur ordinateur, un code QR vous permet de poursuivre sur votre téléphone. Comptez cinq minutes." }), kycList),
      h("section", { class: "live-section" }, h("h2", { text: "2. Signature électronique" }), h("p", { class: "small", text: "Avant de signer, une courte vérification de votre visage confirme que c’est bien vous. Vous relisez ensuite les documents, puis vous les signez." }), sigList),
      h("section", { class: "live-section" }, h("h2", { text: "Vos documents" }), docLinks),
      h("p", { class: "small", text: "Gardez cette page ouverte jusqu’à la fin : pour votre sécurité, elle ne conserve rien et s’efface après 15 minutes sans activité." }),
      h("p", { class: "small", text: "Vous préférez une vérification en personne ? Votre chargé de clientèle vous reçoit sur rendez-vous, avec la référence de votre dossier." }));
  }
  async function signFlow(p, note, btn) {
    note.hidden = false;
    let info;
    try { info = await api.docs(p.cle); } catch (e) { note.textContent = e.message; return; }
    if (!info.authentifie) {
      await openExternal(() => api.bio(p.cle), btn, note);
      note.textContent = "Vérifiez votre visage dans l’onglet ouvert. Les documents à signer s’afficheront ici ensuite.";
      const t0 = Date.now();
      const wait = setInterval(async () => {
        if (Date.now() - t0 > 10 * 60e3) { clearInterval(wait); note.textContent = "Délai dépassé. Recommencez."; return; }
        try { const i = await api.docs(p.cle); if (i.authentifie) { clearInterval(wait); showSigning(p, i); } } catch { }
      }, 3000);
      return;
    }
    showSigning(p, info);
  }
  // signature avec Zoho Sign : l’identité vient d’être confirmée par Didit, la signature se fait dans un onglet Zoho
  function showZoho(p, info) {
    S.signing = p.cle;
    const note = h("p", { class: "small live-note", hidden: true, "aria-live": "polite" });
    const go = h("button", { type: "button", class: "btn btn-primary", text: "Signer" });
    const list = h("ul", { class: "live-docs" }, info.documents.map(d => {
      const b = h("button", { type: "button", class: "btn-text", text: "Lire : " + d.libelle });
      b.addEventListener("click", async () => { const w = window.open("about:blank", "_blank"); try { const u = await api.pdf(d.id); if (w) w.location.href = u; } catch { if (w) w.close(); } });
      return h("li", null, b);
    }));
    go.addEventListener("click", async () => {
      let ouvert = false;
      await openExternal(async () => { const r = await api.zoho(p.cle); ouvert = true; return r; }, go, note);
      if (!ouvert) return;   // erreur affichée par openExternal (authentification expirée, etc.)
      if (!note.querySelector("a")) note.textContent = "Signez dans l’onglet de signature qui vient de s’ouvrir. Cette page se mettra à jour une fois la signature enregistrée.";
      go.disabled = true;
      const t0 = Date.now();
      const wait = setInterval(async () => {
        if (Date.now() - t0 > 20 * 60e3) { clearInterval(wait); note.textContent = "Délai dépassé. Recommencez la signature."; S.signing = null; return; }
        try {
          const e = await api.etat(), me = e.personnes.find(x => x.cle === p.cle);
          if (me && me.signature.faits === me.signature.attendus) { clearInterval(wait); S.signing = null; S.done.etat = e; renderDone(); }
        } catch { }
      }, 4000);
    });
    const cancel = h("button", { type: "button", class: "btn-ghost", text: "Annuler" });
    cancel.addEventListener("click", () => { S.signing = null; renderDone(); });
    $("#title").textContent = `Signature de ${p.libelle}`;
    $("#intro").textContent = "Identité confirmée. Relisez chaque document, puis signez. La signature s’ouvre dans un onglet sécurisé de notre prestataire de signature électronique, Zoho Sign.";
    $("#step").replaceChildren(h("section", { class: "live-section" }, list,
      h("p", { class: "small", text: "Le lien de signature est personnel et valable deux minutes ; il ne peut servir qu’une fois. Si le délai est dépassé, une nouvelle vérification du visage vous sera demandée." }),
      note, h("div", { class: "nav" }, cancel, go)));
    $("#title").focus();
  }
  function showSigning(p, info) {
    if (info.fournisseur === "zoho") return showZoho(p, info);
    S.signing = p.cle;
    const consent = h("input", { type: "checkbox", id: "sign-consent" });
    const err = h("p", { class: "err", role: "alert", hidden: true });
    const go = h("button", { type: "button", class: "btn btn-primary", text: "Signer électroniquement" });
    const list = h("ul", { class: "live-docs" }, info.documents.map(d => {
      const b = h("button", { type: "button", class: "btn-text", text: "Lire : " + d.libelle });
      b.addEventListener("click", async () => { const w = window.open("about:blank", "_blank"); try { const u = await api.pdf(d.id); if (w) w.location.href = u; } catch { if (w) w.close(); } });
      return h("li", null, b);
    }));
    go.addEventListener("click", async () => {
      err.hidden = true;
      if (!consent.checked) { err.textContent = "Cochez la case pour confirmer votre accord."; err.hidden = false; return; }
      go.disabled = true; go.textContent = "Signature en cours…";
      try {
        await api.signer(p.cle, info.documents.map(d => ({ id: d.id, sha256: d.sha256 })));
        S.signing = null; S.done.etat = await api.etat(); renderDone();
      } catch (e) { err.textContent = e.message; err.hidden = false; go.disabled = false; go.textContent = "Signer électroniquement"; if (e.code === "authentification" || e.code === "empreinte") { S.signing = null; } }
    });
    const cancel = h("button", { type: "button", class: "btn-ghost", text: "Annuler" });
    cancel.addEventListener("click", () => { S.signing = null; renderDone(); });
    $("#title").textContent = `Signature de ${p.libelle}`;
    $("#intro").textContent = "Identité confirmée. Relisez chaque document avant de signer.";
    $("#step").replaceChildren(h("section", { class: "live-section" }, list,
      h("label", { class: "check", for: "sign-consent" }, consent, h("span", { class: "check-box", "aria-hidden": "true" }), h("span", { class: "check-text", text: info.consentement })),
      err, h("div", { class: "nav" }, cancel, go)));
    $("#title").focus();
  }

  function renderDone() {
    $("#nav").hidden = true; $("#errsum").hidden = true;
    if (S.done.live) { document.body.dataset.stage = "done"; renderLiveDone(); renderRail(); return; }
    document.body.dataset.stage = "done";
    $("#eyebrow").textContent = "Simulation terminée";
    $("#title").textContent = "Votre dossier de démonstration est prêt";
    $("#intro").textContent = "Aucune demande n’a été transmise. Voici un aperçu des prochaines étapes lors d’une ouverture réelle.";
    const json = JSON.stringify(S.done.payload, null, 2);
    const pre = h("pre", { class: "payload", tabindex: "0", text: json });
    const copy = h("button", { type: "button", class: "btn-sm", text: "Copier" });
    copy.addEventListener("click", () => navigator.clipboard.writeText(json).then(() => { copy.textContent = "Copié"; }, () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copy.textContent = "Texte sélectionné"; }));
    $("#step").replaceChildren(
      h("div", { class: "done-box" }, h("span", { class: "eyebrow", text: "Référence" }), h("p", { class: "done-ref mono", text: S.done.ref })),
      h("ol", { class: "next-steps" },
        h("li", null, h("strong", { text: "Vérification de conformité. " }), "Le Contrôle Interne examine votre dossier, ses pièces et le filtrage réglementaire."),
        h("li", null, h("strong", { text: "Rendez-vous de signature. " }), "Votre chargé de clientèle vous contacte pour fixer un rendez-vous. Apportez les originaux de vos pièces."),
        h("li", null, h("strong", { text: "Activation du compte. " }), "Vous recevez votre avis d’ouverture, vos numéros de compte et le barème signé.")),
      h("details", { class: "dev" }, h("summary", { text: "Données transmises au serveur (aperçu pour l’équipe technique)" }), h("div", { class: "dev-bar" }, copy), pre),
      h("button", { type: "button", class: "btn-ghost", onclick: wipe, text: "Effacer et commencer une nouvelle demande" }));
    renderRail();
  }

  /* ---------- colonne de progression ---------- */
  const PHASES = [
    { label: "Votre projet", desc: "Compte et préférences" }, { label: "Votre profil", desc: "Situation et investissement" },
    { label: "Vos documents", desc: "Les pièces de votre dossier" }, { label: "Vérification", desc: "Tout relire avant de terminer" }
  ];
  const HELP = {
    compte: ["Un compte, votre façon de voir.", "Choisissez la situation qui correspond à votre projet. La suite du parcours s’adapte à votre réponse.", "Le type de compte détermine qui doit être identifié, qui peut agir et quels documents seront nécessaires.", "↗"],
    gestion: ["Vous choisissez votre rôle.", "Gestion libre : vous prenez les décisions. Sous mandat : les gérants interviennent dans un cadre écrit adapté à votre profil.", "Ce choix détermine le questionnaire et les conventions à préparer. Il reste modifiable avant la fin du parcours.", "⇄"],
    preferences: ["Les détails qui font la différence.", "Un choix à la fois pour préciser le fonctionnement de votre compte.", "Ces préférences définissent votre résidence, les pouvoirs éventuels d’un tiers et vos échanges avec EVEREST Finance.", "◇"],
    titulaire: ["Faisons connaissance.", "Renseignez les informations telles qu’elles apparaissent sur vos documents. Les champs facultatifs sont signalés.", "Ces informations permettent de constituer votre dossier de connaissance client et de préparer sa vérification.", "◎"],
    mineur: ["Un projet pour son avenir.", "Le compte est au nom de l’enfant. Son représentant légal intervient dans son intérêt.", "Il faut identifier l’enfant et son représentant, puis préciser l’origine des fonds.", "↗"],
    entite: ["Votre organisation, clairement.", "Gardez à portée de main les documents constitutifs et les informations de votre structure.", "L’identification de l’entité, de ses représentants et de ses bénéficiaires effectifs fait partie de l’examen du dossier.", "▤"],
    finances: ["Le contexte de votre projet.", "Ces réponses portent sur votre situation actuelle et les fonds que vous envisagez d’investir.", "Elles aident à comprendre l’origine des fonds et le fonctionnement attendu du compte.", "≈"],
    profil: ["Il n’y a pas de bonne réponse.", "Votre expérience, votre horizon et votre capacité à supporter une perte comptent davantage qu’un profil que vous souhaiteriez obtenir.", "Ces éléments permettent de préparer un profil d’investissement. Le gérant confirme le résultat ; les placements comportent un risque de perte.", "◷"],
    pieces: ["À chaque document, une option.", "Joignez un fichier ou une photo, ou indiquez que vous apporterez l’original au rendez-vous. Les photos sont optimisées automatiquement.", "Les justificatifs permettent de vérifier les informations déclarées. Ils sont transmis de façon chiffrée et réservés aux équipes habilitées.", "▧"],
    envoi: ["Prenez un dernier instant.", "Ouvrez chaque rubrique pour relire vos réponses. Vous pouvez modifier une information puis revenir directement ici.", "La vérification finale vous permet de corriger le dossier avant de terminer la simulation. Aucune demande réelle ne sera envoyée.", "✓"]
  };
  function enterJourney() { $("#start-screen").hidden = true; $("#workspace").hidden = false; document.body.dataset.view = "journey"; }
  function showWelcome() { $("#workspace").hidden = true; $("#start-screen").hidden = false; document.body.dataset.view = "welcome"; $("#begin-label").textContent = Object.keys(A()).length ? "Reprendre mon dossier" : "Préparer mon dossier"; $("#start-title").focus(); window.scrollTo(0,0); }
  function renderRail() {
    const steps = visibleSteps(), step = currentStep(), cur = S.step;
    const isComplete = s => !!S.done || !!S.finished?.[s.id] && !stepErrors(s).length;
    const completed = steps.filter(isComplete).length;
    const pct = S.done ? 100 : Math.min(99, Math.round(completed / steps.length * 100));
    $("#progress-label").textContent = pct + " %";
    $("#bar").style.width = pct + "%"; $("#bar-m").style.width = pct + "%";
    $("#completion-bar").setAttribute("aria-valuenow", pct);
    $("#mobile-step").textContent = S.done ? (LIVE ? "Demande enregistrée" : "Simulation terminée") : PHASES[step.phase].label + " · " + step.short;
    const nav = $("#phase-nav"); nav.replaceChildren();
    const mobile = $("#mobile-steps"); mobile.replaceChildren();
    PHASES.forEach((phase,n) => {
      const phaseSteps = steps.filter(s => s.phase === n), active = n === step.phase, done = phaseSteps.every(isComplete);
      const firstMissing = phaseSteps.find(s => stepErrors(s).length) || phaseSteps[0];
      const section = h("section", {class:"phase-block" + (active ? " active" : "") + (done ? " complete" : "")});
      put(section, h("button", {type:"button",class:"phase-button","aria-current":active ? "step" : null,disabled:!!S.done,onclick:()=>go(steps.indexOf(firstMissing))}, h("span",{class:"phase-number","aria-hidden":"true",text:done ? "✓" : String(n+1).padStart(2,"0")}),h("span",{class:"phase-label"},h("strong",{text:phase.label}),h("small",{text:phase.desc}))));
      if(active && !S.done) { const list=h("ol",{class:"local-steps",id:"steps"}); phaseSteps.forEach(s=>{
        const valid=isComplete(s);
        put(list,h("li",{class:(s.id===step.id ? "current " : "")+(valid ? "valid" : "")},h("button",{type:"button",onclick:()=>go(steps.indexOf(s)),"aria-current":s.id===step.id?"step":null},h("span",{class:"local-dot","aria-hidden":"true",text:valid?"✓":""}),h("span",{text:s.short}))));
      });put(section,list); }
      nav.append(section);
      phaseSteps.forEach(s=>mobile.append(h("li",null,h("button",{type:"button",disabled:!!S.done,"aria-current":s.id===step.id?"step":null,onclick:()=>{go(steps.indexOf(s));$("#rail").classList.remove("open");$("#rail-toggle").setAttribute("aria-expanded","false");},text:s.short}))));
    });
    const key = Object.keys(HELP).find(k => step.id === k || step.id.startsWith(k+"-"));
    const info=HELP[key] || ["Un dossier qui vous ressemble.","Complétez les informations demandées pour les personnes concernées.","Chaque personne qui détient un compte ou peut agir sur celui-ci doit être identifiée selon son rôle.","◎"];
    $("#context-title").textContent = S.done ? (LIVE ? "Votre demande est enregistrée." : "La simulation est terminée.") : info[0];
    $("#context-copy").textContent = S.done ? (LIVE ? "Vérification d’identité et signature se font en ligne, depuis cette page." : "Aucune demande n’a été transmise. Vous pouvez explorer un nouveau dossier.") : info[1];
    $("#context-why").textContent=info[2]; $("#context-symbol").textContent=info[3];
    $("#context-kicker").textContent=PHASES[step.phase].label;
    const a=A(), rows=$("#project-rows"); rows.replaceChildren();
    const row=(label,value,id)=>{ if(!value)return; put(rows,h("div",{class:"project-row"},h("div",null,h("span",{text:label}),h("strong",{text:value})),h("button",{type:"button",disabled:!!S.done,"aria-label":"Modifier : "+label,onclick:()=>{ if(currentStep().special==="recap")editStep(steps.findIndex(s=>s.id===id));else go(steps.findIndex(s=>s.id===id));},text:"Modifier"}))); };
    const type=stepField("compte","cat").options.find(o=>o.v===a.cat);
    row("Votre compte",type?.l,"compte");row("Votre gestion",a.gestion==="libre"?"Gestion libre":a.gestion==="mandat"?"Sous mandat":null,"gestion");
    row("Votre résidence",({sn:"Sénégal",umoa:"Autre pays de l’UMOA",hors:"Hors UMOA"})[a.residence],"preferences");
    $("#summary-tip").hidden=!!rows.children.length;
    const chips=$("#chips");chips.replaceChildren();
    [type?.l,a.gestion ? (a.gestion==="libre"?"Gestion libre":"Sous mandat") : null].filter(Boolean).forEach(t=>chips.append(h("li",{class:"chip",text:t})));
  }

  /* ---------- inactivité ---------- */
  function armIdle() {
    clearTimeout(idleWarnT); clearTimeout(idleWipeT); clearInterval(countdownT);
    $("#idle").hidden = true;
    idleWarnT = setTimeout(() => {
      const end = Date.now() + (IDLE_WIPE - IDLE_WARN);
      $("#idle").hidden = false;
      const tick = () => { const s = Math.max(0, Math.round((end - Date.now()) / 1000)); $("#idle-t").textContent = `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`; };
      tick(); countdownT = setInterval(tick, 1000);
    }, IDLE_WARN);
    idleWipeT = setTimeout(() => { wipe(); $("#wiped").hidden = false; setTimeout(() => { $("#wiped").hidden = true; }, 10000); }, IDLE_WIPE);
  }
  function wipe() { clearInterval(pollT); SERVER = null; S = blank(); fileStore = {}; $("#wiped").hidden = true; renderStep(); showWelcome(); armIdle(); }

  /* ---------- exemples fictifs ---------- */
  function exPerson(i, extra) {
    const P = [["DIOP", "Awa", "Mme", "1984-03-12"], ["NDIAYE", "Ousmane", "M.", "1979-11-02"], ["FALL", "Mariama", "Mme", "1990-06-25"], ["SECK", "Ibrahima", "M.", "1972-01-30"]][i % 4];
    return Object.assign({
      civilite: P[2], nomNaissance: P[0], nomUsage: "", prenoms: P[1], dateNaissance: P[3], lieuNaissance: "Dakar", nationalite: "Sénégal", nationalite2: "",
      paysResidence: "Sénégal", adresse: "Rue 10, villa 1234", complement: "", quartier: "Sicap Liberté 6", ville: "Dakar", region: "Dakar", regionLibre: "", departement: "Dakar", codePostal: "", bp: "", telephone: "+221 77 000 00 0" + i, courriel: `exemple${i + 1}@exemple.sn`,
      pieceType: "cni", pieceNumero: "1 234 1984 0000" + i, pieceDelivrance: "2021-05-10", pieceExpiration: "2031-05-09", pieceAutorite: "Direction de l’Automatisation des Fichiers",
      situationFamiliale: "marie", optionMariage: "monogamie", regime: "separation", situationPro: "salarie", profession: "Ingénieur", employeur: "Entreprise fictive SA", secteur: "services",
      residenceFiscale: "Sénégal", nif: "", usPerson: "", ppe: "non", ppeFonction: "", ppePays: "", ppePeriode: "", ppeLien: ""
    }, extra || {});
  }
  const lite = p => { ["situationFamiliale", "optionMariage", "regime", "situationPro", "profession", "employeur", "secteur", "residenceFiscale", "nif", "usPerson"].forEach(k => delete p[k]); return p; };
  function loadExample(key) {
    const [cat, gestion] = key.split(":");
    S = blank();
    const a = S.answers;
    Object.assign(a, { cat, gestion, residence: "sn", bourseEnLigne: gestion === "libre" ? "non" : "", mandataire: cat === "societe" || cat === "association" ? "" : "non", canal: "electronique" });
    if (cat === "pp") Object.assign(a, exPerson(0));
    if (cat === "joint") Object.assign(a, { cotitulaires: [exPerson(0), exPerson(1)], fonctionnement: "solidaire", lien: "conjoints", destinataire: "0" });
    if (cat === "mineur") Object.assign(a, { enfant: { civilite: "Mme", nomNaissance: "DIOP", prenoms: "Khadija", dateNaissance: "2015-09-18", lieuNaissance: "Dakar", nationalite: "Sénégal", acteNumero: "2015-DK-004512" },
      representants: [Object.assign(exPerson(0), { qualite: "mere" })], origineMineur: ["parents"], engagementMineur: true });
    if (cat === "societe" || cat === "association") {
      const soc = cat === "societe";
      Object.assign(a, {
        denomination: soc ? "SOCIÉTÉ EXEMPLE SA" : "ASSOCIATION EXEMPLE", sigle: soc ? "SESA" : "AE", forme: soc ? "sa" : "", natureAsso: soc ? "" : "association",
        dateConstitution: "2012-04-02", paysConstitution: "Sénégal", rccm: soc ? "SN DKR 2012 B 00000" : "", recepisse: soc ? "" : "N° 00000 du 2 avril 2012", ninea: "000000000 2A3",
        siegePays: "Sénégal", siege: "Rue de Kaolack, immeuble 12", siegeComplement: "", siegeQuartier: "Point E", siegeVille: "Dakar", siegeRegion: "Dakar", siegeRegionLibre: "", siegeDepartement: "Dakar", siegeCodePostal: "", siegeBp: "", etablissement: "", objet: soc ? "Distribution de matériel agricole" : "Soutien scolaire dans la région de Thiès", secteurPM: soc ? "commerce" : "social", extractif: "non",
        regulee: soc ? "non" : "", regulateur: "", financement: soc ? [] : ["cotisations", "donsNat"], paysFinanceurs: "", paysIntervention: soc ? "" : "Sénégal",
        autorisationPlacement: soc ? "" : "statuts", articleStatuts: soc ? "" : "Article 18",
        interNom: "Mariama FALL", interFonction: soc ? "Directrice financière" : "Trésorière", interCourriel: "finance@exemple.sn", interTel: "+221 33 800 00 00",
        signataires: [Object.assign(lite(exPerson(3)), { role: "legal", fonction: soc ? "Directeur général" : "Président", sourcePouvoirs: "pv", refActe: "PV du conseil du 15 janvier 2025", pouvoirs: ["ordres", "retraits", "signataires"].concat(gestion === "mandat" ? ["mandat"] : []), plafond: "", finValidite: "", modeSignature: "seul", seuilConjoint: "" }),
          Object.assign(lite(exPerson(2)), { role: "habilite", fonction: soc ? "Directrice financière" : "Trésorière", sourcePouvoirs: "delegation", refActe: "Délégation du 1er février 2025", pouvoirs: ["ordres"], plafond: 25000000, finValidite: "2027-12-31", modeSignature: "conjoint", seuilConjoint: 10000000 })],
        engagementRevocation: true, beCas: soc ? "seuil" : "dirigeant",
        beneficiaires: [{ nom: "SECK", prenoms: "Ibrahima", dateNaissance: "1972-01-30", nationalite: "Sénégal", paysResidence: "Sénégal", natureControle: soc ? "capital" : "dirigeant", detentionDirecte: soc ? 60 : "", detentionIndirecte: "", ppe: "non" }],
        cascade: "non"
      });
    }
    Object.assign(a, {
      revenus: "t2", patrimoine: cat === "mineur" ? "" : "p2", originePatrimoine: ["revenus"], montantInitial: 5000000, origineFonds: [cat === "societe" || cat === "association" ? "tresorerie" : "epargne"], origineDetail: "",
      alimentation: ["virement"], teneurOrigine: "", frequence: "mensuelle", objetRelation: ["epargne"], banque: "Banque exemple", rib: "SN0120100101234567890123", ribTitulaire: true,
      qExperience: "2", qConnaissance: "2", qObjectif: "3", qHorizon: "4", preferences: [], exclusionsDetail: ""
    });
    if (gestion === "mandat") Object.assign(a, { qLiquidite: "5", qPart: "4", qPerte: "3", qReaction: "4" });
    S.step = visibleSteps().findIndex(s => s.phase === 1);
    visibleSteps().filter(s=>!stepErrors(s).length).forEach(s=>{ S.finished[s.id] = true; });
    enterJourney();
    renderStep(); armIdle();
    $("#title").focus();
  }

  /* ---------- démarrage ---------- */
  function start(saved) {
    if (saved && saved.S) { S = saved.S; }
    $("#prev").addEventListener("click", () => S.step === 0 ? showWelcome() : go(S.step - 1));
    $("#begin").addEventListener("click", () => { enterJourney(); $("#main").scrollIntoView({block:"start"}); $("#title").focus(); });
    $("#overview").addEventListener("click", showWelcome);
    $("#home-link").addEventListener("click", e => { e.preventDefault(); showWelcome(); });
    $("#start-title").setAttribute("tabindex","-1");
    const help=$("#journey-help"); ["#help-open","#help-side"].forEach(id=>$(id).addEventListener("click",()=>help.showModal()));
    $("#help-close").addEventListener("click",()=>help.close());
    help.addEventListener("click",e=>{if(e.target===help)help.close();});
    $("#review-return").addEventListener("click",()=>go(visibleSteps().findIndex(s=>s.special==="recap")));
    $("#form").addEventListener("submit", e => { e.preventDefault(); next(); });
    if ($("#refs")) $("#refs").addEventListener("change", e => { S.refs = e.target.checked; document.body.classList.toggle("show-refs", S.refs); });
    if ($("#example")) $("#example").addEventListener("change", e => { if (e.target.value) loadExample(e.target.value); e.target.value = ""; });
    $("#idle-keep").addEventListener("click", armIdle);
    $("#rail-toggle").addEventListener("click", () => { const r = $("#rail"); const open = r.classList.toggle("open"); $("#rail-toggle").setAttribute("aria-expanded", open); });
    let deb; ["input", "click", "keydown"].forEach(t => document.addEventListener(t, () => { clearTimeout(deb); deb = setTimeout(armIdle, 250); }, true));
    if ($("#refs")) $("#refs").checked = S.refs; document.body.classList.toggle("show-refs", !!S.refs);
    renderStep(); armIdle();
    history.replaceState({efStep:S.step}, "");
    window.addEventListener("popstate", e => { if (Number.isInteger(e.state?.efStep) && !S.done) { S.step = Math.min(e.state.efStep, visibleSteps().length-1); enterJourney(); renderStep(); $("#title").focus(); } });
  }
  window.claude?.hot?.snapshot?.(() => ({ S: Object.assign({}, S, { files: {} }) }));
  document.addEventListener("DOMContentLoaded", () => window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {}));
  // l’interface de test (dossiers fictifs) n’est exposée qu’en démonstration
  window.EF_ENGINE = CFG.demo || !LIVE ? { COMPUTE, ev, docsNeeded, stepErrors, visibleSteps, loadExample, payload, get state() { return S; } } : {};
})();
