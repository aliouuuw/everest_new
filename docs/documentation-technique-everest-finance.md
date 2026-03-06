# Documentation Technique - Everest Finance SGI
## Plateforme Web & Système de Gestion de Contenu

---

**Destinataires :** Direction Générale & Équipe IT/Sécurité  
**Projet :** Site Web Everest Finance SGI avec CMS  
**Date :** Mars 2026  
**Classification :** Documentation Technique Interne  
**Statut :** Basé sur l'analyse du code actuel

---

## Résumé Exécutif

Ce document présente l'état réel de la plateforme web Everest Finance, basé sur une analyse approfondie du code source. Il s'adresse à la fois à la direction (pour les décisions stratégiques) et aux équipes techniques (pour la sécurité et l'infrastructure).

---

## 1. Architecture Technique Actuelle

### 1.1 Technologies Utilisées (Vérifiées)

| Composant | Technologie | Statut | Notes |
|-----------|-------------|--------|-------|
| **Interface utilisateur** | React 19 + TypeScript | ✅ Actif | Framework moderne |
| **Navigation** | TanStack Router | ✅ Actif | Routage côté client |
| **Design** | Tailwind CSS 4 | ✅ Actif | Système de design personnalisé |
| **Animations** | GSAP + Lenis | ✅ Actif | Effets de défilement fluides |
| **Effets 3D** | Three.js | ✅ Actif | Animations WebGL |
| **Backend** | Convex | ✅ Actif | Base de données serverless |
| **Authentification** | Convex Auth | ✅ Actif | JWT avec système de rôles |
| **Stockage fichiers** | Cloudflare R2 | ⚠️ Partiel | Code existe, routes non câblées |
| **CDN images** | Cloudflare Images | ⚠️ Partiel | Code existe, routes non câblées |
| **Build** | Vite 6 | ✅ Actif | Optimisation de production |
| **Gestionnaire** | Bun | ✅ Actif | Runtime JavaScript rapide |

### 1.2 Schéma d'Architecture Simplifié

```
┌────────────────────────────────────────────────────────────┐
│                    ARCHITECTURE ACTUELLE                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│   Utilisateurs                                             │
│       │                                                    │
│       ▼                                                    │
│   ┌──────────────┐                                         │
│   │   Vercel     │  ← Hébergement du site web             │
│   │  (Frontend)  │     (Interface utilisateur)            │
│   └──────┬───────┘                                         │
│          │                                                 │
│          │ HTTPS                                           │
│          ▼                                                 │
│   ┌──────────────┐                                         │
│   │   Convex     │  ← Backend serverless                  │
│   │  (Backend)   │     • Base de données                  │
│   │              │     • Authentification                 │
│   │              │     • API temps réel                   │
│   └──────┬───────┘                                         │
│          │                                                 │
│          │ ⚠️ CONNEXION CASSÉE                            │
│          ▼                                                 │
│   ┌──────────────┐                                         │
│   │  Cloudflare  │  ← Stockage fichiers (non utilisé)    │
│   │      R2      │     Routes HTTP manquantes             │
│   └──────────────┘                                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 2. Fonctionnalités Implémentées

### 2.1 ✅ Fonctionnalités Opérationnelles

#### Interface Publique
- **Page d'accueil** avec animations WebGL professionnelles
- **Pages institutionnelles** : À propos, Services, FAQ
- **Section Bourse** avec données BRVM
- **Publications** : Affichage des articles et analyses
- **Design responsive** : Optimisé mobile, tablette, desktop

#### Espace Administration
- **Tableau de bord** avec statistiques
- **Gestion des publications** : Création, modification, suppression
- **Éditeur de texte enrichi** (TipTap)
- **Gestion des catégories** : Revues hebdo, mensuelles, analyses
- **Gestion des utilisateurs** avec rôles

#### Sécurité & Authentification
- **Connexion sécurisée** avec JWT
- **4 niveaux de rôles** :
  - **Admin** : Accès complet
  - **Éditeur** : Création et publication de contenu
  - **Visualiseur** : Lecture seule
  - **Client** : Portail client (futur)
- **Protection des routes** : Vérification automatique des permissions
- **Chiffrement** : HTTPS/TLS 1.3 pour toutes les communications

### 2.2 ⚠️ Fonctionnalités Partielles

#### Système de Téléchargement de Fichiers

**Situation actuelle :**
```
Frontend (Interface)          Backend (Serveur)          Cloudflare
     │                              │                         │
     │  Tentative d'upload          │                         │
     ├──────────────────────────────▶│                         │
     │  POST /api/cloudflare/upload │                         │
     │                              │                         │
     │         ⚠️ ERREUR 404        │                         │
     │◀──────────────────────────────┤                         │
     │  Route non enregistrée       │                         │
     │                              │                         │
     
PROBLÈME : Le code backend existe dans convex/api/cloudflare.ts
           mais les routes HTTP ne sont pas enregistrées dans http.ts
```

**Impact :**
- Les utilisateurs ne peuvent pas télécharger d'images
- Les publications ne peuvent pas avoir de médias attachés
- L'interface de gestion des médias est non fonctionnelle

**Solution requise :** 2 jours de développement pour enregistrer les routes HTTP

---

## 3. Base de Données

### 3.1 Structure de la Base de Données

| Table | Statut | Contenu |
|-------|--------|---------|
| **publications** | ✅ Complet | Articles, analyses, revues |
| **media** | ✅ Complet | Métadonnées des fichiers |
| **users** | ✅ Complet | Comptes utilisateurs |
| **categories** | ✅ Complet | Catégories de publications |
| **uploadSessions** | ✅ Complet | Suivi des téléchargements |

### 3.2 Données Stockées

**Publications :**
- Titre, contenu, description
- Catégorie (revues hebdo, mensuelles, analyses)
- Statut (brouillon, publié, archivé)
- Métadonnées SEO
- Liens vers médias

**Utilisateurs :**
- Email, nom, rôle
- Avatar (optionnel)
- Dernière connexion
- Historique d'activité

**Médias :**
- Références Cloudflare (ID, URL)
- Nom de fichier, type, taille
- Métadonnées (alt text, légende)
- Relations avec publications

---

## 4. Sécurité

### 4.1 ✅ Mesures de Sécurité Actives

| Mesure | Statut | Implémentation |
|--------|--------|----------------|
| **HTTPS obligatoire** | ✅ Actif | Vercel/Convex par défaut |
| **Authentification JWT** | ✅ Actif | Tokens sécurisés |
| **Contrôle d'accès par rôle** | ✅ Actif | Vérifié sur chaque opération |
| **Validation des entrées** | ✅ Actif | Schémas de validation |
| **Protection XSS** | ✅ Actif | React échappe automatiquement |
| **En-têtes de sécurité** | ✅ Partiel | Headers HTTP basiques |

### 4.2 ⚠️ Points d'Attention Sécurité

1. **Endpoint de téléchargement manquant**
   - Actuellement, l'absence de route empêche les uploads (ce qui évite temporairement un risque de sécurité)
   - Avant activation : implémenter validation de fichiers, limitation de taille, scan antivirus

2. **Limitation de débit (Rate Limiting)**
   - Pas de limitation actuellement sur les endpoints API
   - Recommandé : 100 requêtes/15 minutes par IP

3. **Rotation des tokens API**
   - Les tokens Cloudflare doivent être renouvelés trimestriellement
   - Politique de rotation à définir

### 4.3 Recommandations Sécurité IT

**Avant activation des uploads :**
- [ ] Ajouter limitation de débit sur `/api/cloudflare/*`
- [ ] Implémenter validation stricte des types de fichiers
- [ ] Configurer scan antivirus (ClamAV ou service cloud)
- [ ] Vérifier les signatures des webhooks Cloudflare
- [ ] Tester la gestion des fichiers malveillants

**Maintenance continue :**
- [ ] Audit de sécurité trimestriel
- [ ] Mise à jour des dépendances (automatisé avec Dependabot)
- [ ] Logs d'accès et monitoring des anomalies
- [ ] Sauvegarde quotidienne de la base de données

---

## 5. Coûts & Infrastructure

### 5.1 Coûts Actuels (Mensuels)

| Service | Coût Actuel | Notes |
|---------|-------------|-------|
| **Vercel** (Hébergement web) | 0-20 € | Plan Hobby suffisant |
| **Convex** (Backend + DB) | 0 € | Dans les limites gratuites |
| **Cloudflare R2** (Stockage) | 0 € | Non utilisé actuellement |
| **Cloudflare Images** (CDN) | 0 € | Non utilisé actuellement |
| **Nom de domaine** | ~12 €/an | À ajouter si nécessaire |
| **TOTAL** | **0-20 €/mois** | Très économique |

### 5.2 Projection de Coûts (Avec Uploads Actifs)

**Scénario : 1000 utilisateurs actifs/mois**

| Service | Coût Projeté | Justification |
|---------|--------------|---------------|
| Vercel | 20 € | Plan Hobby |
| Convex | 0-10 € | Toujours dans free tier |
| Cloudflare R2 | 5-15 € | 10 GB gratuits, puis 0,015 €/GB |
| Cloudflare Images | 0-5 € | 100k transformations gratuites |
| **TOTAL** | **25-50 €/mois** | Scalable et prévisible |

### 5.3 Comparaison : Cloud vs VPS Auto-Hébergé

| Critère | Solution Actuelle (Cloud) | VPS Auto-Hébergé |
|---------|---------------------------|------------------|
| **Coût mensuel** | 0-50 € | 40-80 € (VPS + maintenance) |
| **Maintenance** | Zéro (géré par les fournisseurs) | 10-20h/mois (équipe IT) |
| **Scalabilité** | Automatique | Manuelle (upgrade VPS) |
| **Disponibilité** | 99.9% garanti | Dépend de l'infrastructure |
| **Sécurité** | Gérée par les fournisseurs | Responsabilité interne |
| **Temps de mise en place** | Déjà opérationnel | 4-6 semaines de migration |
| **Complexité technique** | Faible | Élevée |

---

## 6. Migration VPS : Analyse Réaliste

### 6.1 Pourquoi la Migration VPS est Complexe

**Constat technique :**
L'architecture actuelle est **fortement couplée à Convex**, qui n'est pas qu'une simple base de données mais une plateforme backend complète.

**Fonctionnalités Convex utilisées :**
- Base de données temps réel avec souscriptions
- Fonctions serverless (queries, mutations, actions)
- Authentification intégrée
- Actions HTTP pour les webhooks
- Synchronisation automatique frontend-backend

### 6.2 Ce qu'Implique une Migration VPS

**Composants à remplacer :**

| Composant Actuel | Remplacement VPS | Complexité |
|------------------|------------------|------------|
| Convex DB | PostgreSQL + API REST | ⚠️ Élevée |
| Convex Auth | JWT custom ou Passport.js | ⚠️ Élevée |
| Temps réel | WebSockets + Redis | ⚠️ Élevée |
| Fonctions serverless | Express/Fastify API | ⚠️ Élevée |
| Cloudflare R2 | MinIO (S3-compatible) | ⚠️ Moyenne |

**Effort estimé :**
- **Développement :** 4-6 semaines (1 développeur full-time)
- **Tests & QA :** 1-2 semaines
- **Migration des données :** 1 semaine
- **Total :** **6-9 semaines**

**Coût estimé :**
- Développement : 15 000 - 25 000 € (selon tarif développeur)
- Infrastructure VPS : 40-80 €/mois
- Maintenance : 10-20h/mois (équipe IT)

### 6.3 Recommandation Direction

**Pour la direction :**

❌ **Migration VPS non recommandée** dans le contexte actuel :
- Coût de migration (15-25k €) vs économies annuelles (300-600 €)
- ROI négatif sur 3-5 ans
- Augmentation de la charge de maintenance IT
- Risque de régression fonctionnelle

✅ **Recommandation : Rester sur l'architecture cloud actuelle**
- Coûts maîtrisés et prévisibles
- Maintenance zéro
- Scalabilité automatique
- Focus équipe sur les fonctionnalités métier

**Exception :** Migration VPS justifiée uniquement si :
- Exigence réglementaire stricte d'hébergement local
- Volume de données > 100 GB (rare pour un site institutionnel)
- Besoin de contrôle total de l'infrastructure

---

## 7. Plan d'Action Recommandé

### 7.1 Court Terme (1-2 semaines)

**Priorité 1 : Corriger le système de téléchargement**

**Tâches techniques :**
1. Enregistrer les routes HTTP dans `convex/http.ts`
2. Ajouter vérification d'authentification sur upload
3. Configurer les credentials Cloudflare
4. Tester avec fichiers réels
5. Ajouter gestion d'erreurs

**Effort :** 2 jours développeur  
**Coût :** ~1 000 € (développeur externe) ou ressources internes

**Priorité 2 : Sécuriser les uploads**
1. Implémenter limitation de débit
2. Validation stricte des types de fichiers
3. Limites de taille (4 MB images, 16 MB documents)
4. Logs d'activité upload

**Effort :** 1 jour développeur

### 7.2 Moyen Terme (1-3 mois)

**Améliorations fonctionnelles :**
- [ ] Optimisation des images (compression automatique)
- [ ] Galerie de médias améliorée
- [ ] Prévisualisation des documents PDF
- [ ] Statistiques d'utilisation du stockage

**Sécurité & Conformité :**
- [ ] Audit de sécurité externe
- [ ] Documentation RGPD
- [ ] Politique de sauvegarde formalisée
- [ ] Plan de reprise d'activité (PRA)

### 7.3 Long Terme (6-12 mois)

**Évolutions possibles :**
- Portail client avec authentification
- Outils de calcul d'investissement
- Support multilingue (Français/Anglais)
- Application mobile (React Native)
- Intégration API BRVM en temps réel

---

## 8. Spécifications Techniques (Pour l'Équipe IT)

### 8.1 Variables d'Environnement Requises

**Frontend (.env.local) :**
```bash
VITE_CONVEX_URL=https://[votre-instance].convex.cloud
VITE_CONVEX_SITE_URL=https://[votre-instance].convex.site
```

**Backend (Convex Dashboard) :**
```bash
# Cloudflare R2 (Stockage fichiers)
CONVEX_CLOUDFLARE_ACCOUNT_ID=votre-account-id
CONVEX_CLOUDFLARE_R2_ACCESS_KEY_ID=votre-access-key
CONVEX_CLOUDFLARE_R2_SECRET_ACCESS_KEY=votre-secret-key
CONVEX_CLOUDFLARE_R2_BUCKET_NAME=everest-cms

# Cloudflare Images (CDN)
CONVEX_CLOUDFLARE_IMAGES_API_TOKEN=votre-images-token
```

### 8.2 Commandes de Déploiement

```bash
# Installation des dépendances
bun install

# Vérification TypeScript
bun run type-check

# Build de production
bun run build

# Déploiement Convex
bunx convex deploy

# Déploiement Vercel
vercel --prod
```

### 8.3 Monitoring & Logs

**Accès aux logs :**
- **Frontend :** Vercel Dashboard → Logs
- **Backend :** Convex Dashboard → Logs
- **Erreurs :** Console navigateur (F12)

**Métriques à surveiller :**
- Temps de réponse API (< 200ms)
- Taux d'erreur (< 1%)
- Utilisation base de données
- Bande passante Cloudflare

---

## 9. Contacts & Support

### 9.1 Équipe Projet

| Rôle | Contact | Responsabilité |
|------|---------|----------------|
| **Chef de Projet** | [À définir] | Coordination générale |
| **Développeur Lead** | [À définir] | Architecture technique |
| **Administrateur IT** | [À définir] | Infrastructure & sécurité |
| **Responsable Contenu** | [À définir] | Gestion des publications |

### 9.2 Support Technique

**Fournisseurs :**
- **Vercel :** support@vercel.com (Plan Pro requis pour support prioritaire)
- **Convex :** support@convex.dev (Communauté Discord active)
- **Cloudflare :** Support via dashboard (Plan payant requis)

**Documentation :**
- Convex : https://docs.convex.dev
- Vercel : https://vercel.com/docs
- Cloudflare R2 : https://developers.cloudflare.com/r2

---

## 10. Conclusion & Recommandations Finales

### Pour la Direction Générale

**✅ Points positifs :**
- Architecture moderne et scalable
- Coûts très maîtrisés (0-50 €/mois)
- Maintenance minimale requise
- Sécurité de niveau professionnel

**⚠️ Point d'attention :**
- Système d'upload à corriger (2 jours de développement)
- Budget recommandé : 1 000-2 000 € pour finalisation

**💡 Recommandation stratégique :**
- Maintenir l'architecture cloud actuelle
- Investir dans les fonctionnalités métier plutôt que l'infrastructure
- Prévoir audit de sécurité annuel (2 000-5 000 €)

### Pour l'Équipe IT/Sécurité

**Actions immédiates :**
1. Corriger les routes HTTP pour les uploads (Priorité 1)
2. Configurer les credentials Cloudflare
3. Implémenter rate limiting sur les endpoints sensibles
4. Mettre en place monitoring et alertes

**Maintenance continue :**
- Mise à jour des dépendances (automatisé)
- Rotation des tokens API (trimestriel)
- Sauvegardes quotidiennes (automatisé par Convex)
- Audit de sécurité (annuel)

**Formation requise :**
- Formation Convex pour l'équipe dev (1 jour)
- Formation Cloudflare R2 pour l'équipe IT (½ jour)
- Documentation interne à créer

---

## Annexes

### A. Glossaire Technique

| Terme | Définition |
|-------|------------|
| **Convex** | Plateforme backend serverless avec base de données temps réel |
| **JWT** | JSON Web Token - Standard d'authentification sécurisé |
| **R2** | Service de stockage objet S3-compatible de Cloudflare |
| **CDN** | Content Delivery Network - Réseau de distribution de contenu |
| **Serverless** | Architecture sans serveur géré (scaling automatique) |
| **WebGL** | API JavaScript pour rendu 3D dans le navigateur |
| **GSAP** | Bibliothèque d'animation JavaScript professionnelle |

### B. Fichiers Techniques Référencés

- `convex/http.ts` - Configuration des routes HTTP
- `convex/api/cloudflare.ts` - Intégration Cloudflare
- `convex/schema.ts` - Schéma de base de données
- `src/utils/cloudflare.ts` - Utilitaires upload frontend
- `vercel.json` - Configuration déploiement Vercel

### C. Checklist Sécurité

**Avant mise en production des uploads :**
- [ ] Routes HTTP enregistrées et testées
- [ ] Authentification vérifiée sur tous les endpoints
- [ ] Rate limiting configuré (100 req/15min)
- [ ] Validation des types de fichiers (whitelist)
- [ ] Limites de taille appliquées (4MB images, 16MB docs)
- [ ] Scan antivirus configuré (optionnel mais recommandé)
- [ ] Logs d'activité activés
- [ ] Monitoring et alertes configurés
- [ ] Documentation mise à jour
- [ ] Tests de sécurité effectués

---

**Version du document :** 2.0 (Basé sur analyse du code)  
**Date de dernière mise à jour :** Mars 2026  
**Prochaine révision :** Après correction du système d'upload

**Classification :** Usage Interne - Confidentiel  
**Distribution :** Direction Générale, Équipe IT/Sécurité

---

*Ce document a été généré suite à une analyse approfondie du code source et reflète l'état réel de l'application au moment de sa rédaction.*
