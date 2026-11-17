/* Page de complément de dossier : lien personnel reçu par courriel (#identifiant.jeton), contrôle par date, pièces et réponses.
   Aucune donnée n’est conservée dans le navigateur ; le jeton est retiré de la barre d’adresse dès l’ouverture. */
(function () {
  "use strict";
  const app = document.getElementById("app");
  const [id, jeton] = (location.hash.slice(1) || "").split(".");
  history.replaceState(null, "", location.pathname);
  let session = null, info = null;
  const recues = {};
  const MAX = 5 * 1024 * 1024, CIBLE = 1500 * 1024;

  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const k in attrs || {}) { const v = attrs[k]; if (v == null || v === false) continue; if (k === "text") el.textContent = v; else if (k.startsWith("on")) el.addEventListener(k.slice(2), v); else el.setAttribute(k, v === true ? "" : v); }
    kids.flat().forEach(c => c != null && el.append(c));
    return el;
  }
  async function api(method, path, body) {
    const headers = { authorization: "Bearer " + jeton };
    if (session) headers["x-session"] = session;
    let payload = body;
    if (body && !(body instanceof FormData)) { headers["content-type"] = "application/json"; payload = JSON.stringify(body); }
    let r;
    try { r = await fetch("/api/complement/" + encodeURIComponent(id) + path, { method, headers, body: payload, credentials: "omit", cache: "no-store" }); }
    catch { throw new Error("Connexion impossible. Vérifiez votre accès à Internet puis réessayez."); }
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.erreur || "Une erreur est survenue. Réessayez.");
    return data;
  }
  const dateFr = s => new Date(s).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const erreur = msg => h("p", { class: "erreur", role: "alert", text: msg });

  // photos : redressées, réduites et recompressées avant l’envoi, comme dans le formulaire d’ouverture
  async function optimiser(file) {
    if (file.type === "application/pdf" || /\.pdf$/i.test(file.name)) { if (file.size > MAX) throw new Error("Ce PDF dépasse 5 Mo. Photographiez plutôt le document."); return file; }
    let bmp; try { bmp = await createImageBitmap(file, { imageOrientation: "from-image" }); } catch { throw new Error("Cette image n’a pas pu être lue. Joignez une photo JPEG ou un PDF."); }
    const grand = Math.max(bmp.width, bmp.height); if (grand < 600) throw new Error("Cette image est trop petite pour être lisible.");
    let cote = Math.min(grand, 2400), blob = null;
    for (let t = 0; t < 6; t++) {
      const c = document.createElement("canvas"), k = cote / grand; c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
      const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, c.width, c.height); g.drawImage(bmp, 0, 0, c.width, c.height);
      for (const q of [0.88, 0.8, 0.72, 0.64]) { blob = await new Promise(r => c.toBlob(r, "image/jpeg", q)); if (blob.size <= CIBLE) break; }
      if (blob.size <= CIBLE || cote <= 1000) break; cote = Math.max(1000, Math.round(cote * 0.8));
    }
    if (blob.size > MAX) throw new Error("Même optimisée, cette image dépasse 5 Mo.");
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  }

  function ecranControle() {
    const inp = h("input", { type: "date", id: "date", required: true, autocomplete: "bday" });
    const msg = h("div");
    const go = h("button", { type: "submit", class: "btn", text: "Accéder à ma demande" });
    const form = h("form", { class: "carte", onsubmit: async e => {
      e.preventDefault(); msg.replaceChildren(); go.disabled = true;
      try { session = (await api("POST", "/acces", { date: inp.value })).session; ecranElements(); }
      catch (err) { msg.replaceChildren(erreur(err.message)); go.disabled = false; inp.focus(); }
    } }, h("label", { for: "date", text: info.controle }), h("p", { class: "aide", text: "Pour protéger votre dossier, nous vérifions que c’est bien vous." }), inp, msg, go);
    app.replaceChildren(h("p", { class: "lead", text: `Dossier ${info.reference}. Pour finaliser l’examen de votre demande, transmettez les éléments ci-dessous avant le ${dateFr(info.expire_le)}.` }), form);
    inp.focus();
  }

  function ecranElements() {
    const pieces = info.items.filter(i => i.type === "piece"), questions = info.items.filter(i => i.type === "question");
    const champs = {};
    const blocPiece = it => {
      const st = h("span", { class: "statut", text: recues[it.id] ? "Reçue" : "À joindre" }), msg = h("div");
      const inp = h("input", { type: "file", id: "f-" + it.id, accept: ".pdf,.jpg,.jpeg,.png,.heic,.heif,application/pdf,image/*", class: "fichier" });
      inp.addEventListener("change", async () => {
        const f = inp.files[0]; if (!f) return; msg.replaceChildren(); st.textContent = "Envoi…";
        try {
          const ok = await optimiser(f); const fd = new FormData(); fd.append("fichier", ok, ok.name);
          await api("PUT", "/pieces/" + it.id, fd); recues[it.id] = true; st.textContent = "Reçue"; st.classList.add("ok");
        } catch (err) { st.textContent = "À joindre"; msg.replaceChildren(erreur(err.message)); }
      });
      return h("div", { class: "item" }, h("div", { class: "item-tete" }, h("label", { for: "f-" + it.id, text: it.libelle }), st), it.motif ? h("p", { class: "aide", text: it.motif }) : null, inp, msg);
    };
    const blocQuestion = it => { const t = h("textarea", { id: "q-" + it.id, rows: "4", maxlength: "4000" }); champs[it.id] = t; return h("div", { class: "item" }, h("label", { for: "q-" + it.id, text: it.libelle }), t); };
    const msg = h("div"), go = h("button", { type: "submit", class: "btn", text: "Transmettre mes éléments" });
    const form = h("form", { class: "carte", onsubmit: async e => {
      e.preventDefault(); msg.replaceChildren(); go.disabled = true;
      try { await api("POST", "/reponse", { reponses: Object.fromEntries(Object.entries(champs).map(([k, t]) => [k, t.value])) }); ecranFin(); }
      catch (err) { msg.replaceChildren(erreur(err.message)); go.disabled = false; }
    } },
      pieces.length ? h("h2", { text: "Pièces à joindre" }) : null, pieces.map(blocPiece),
      pieces.length ? h("p", { class: "aide", text: "PDF, photo JPEG, PNG ou HEIC. Les photos sont optimisées automatiquement ; un PDF ne doit pas dépasser 5 Mo." }) : null,
      questions.length ? h("h2", { text: "Informations à préciser" }) : null, questions.map(blocQuestion), msg, go);
    app.replaceChildren(h("p", { class: "lead", text: `Dossier ${info.reference}` }), form);
  }

  function ecranFin() {
    app.replaceChildren(h("div", { class: "carte" }, h("h2", { text: "Merci, vos éléments sont transmis." }),
      h("p", { text: "L’examen de votre dossier reprend. Vous recevrez un courriel de confirmation, puis notre réponse." }), h("p", { class: "aide", text: "Vous pouvez fermer cette page." })));
  }

  (async () => {
    if (!id || !jeton) { app.replaceChildren(erreur("Ce lien est incomplet. Utilisez le bouton du courriel reçu.")); return; }
    try { info = await api("GET", ""); ecranControle(); }
    catch (err) { app.replaceChildren(erreur(err.message), h("p", { class: "aide", text: "Pour toute question, contactez votre chargé de clientèle." })); }
  })();
})();
