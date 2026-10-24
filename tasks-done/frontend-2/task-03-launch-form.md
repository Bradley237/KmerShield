# FE2-03: Formulaire de Lancement d'Analyse & Consentement

- **Contributor / Agent:** Front-end 2 (Antigravity Agent)
- **Date Completed:** 2026-10-24
- **Branch / Module:** `frontend2` / `frontend (Formulaire de Lancement)`

---

### 1. Overview (What was done)

Mise en place complète du formulaire interactif de lancement d'analyse (`/dashboard/analyses/nouveau`) pour KmerShield conformément au livrable FE2-03 :
- **Architecture multi-onglets :** Prise en charge des 3 canaux définis dans le concept initial :
  1. **Lien suspect (URL - F01) :** Champ d'URL avec vérification de protocole (http/https) et sélection de la plateforme de provenance.
  2. **Message / SMS / WhatsApp (F02) :** Zone de texte enrichie pour SMS frauduleux, identifiant expéditeur facultatif (ex. 670..., MTN-MOMO).
  3. **Questionnaire de transaction (F03) :** Formulaire structuré reprenant les 6 questions d'évaluation comportementale neutres et pondérées du cahier des charges.
- **Règles de sécurité et avertissements contextuels :**
  - Rappel que KmerShield n'exécute jamais d'URL arbitraire sur ses serveurs.
  - Consigne stricte de ne jamais coller de mot de passe, de code PIN ou de secret bancaire.
- **Consentement obligatoire (Guard) :** Case à cocher obligatoire certifiant l'absence de données bancaires secrètes et l'autorisation d'analyser la ressource. Le bouton d'envoi reste désactivé tant que le consentement n'est pas fourni.
- **Restitution immédiate du résultat :** Transition fluide après analyse vers une carte de verdict avec badge de risque sémantique (`RiskBadge`), liste des signaux détectés, recommandations pratiques et lien vers le rapport complet.
- **Tests automatisés :** Suite de tests unitaires et d'interaction dans `src/tests/components/NewAnalysis.test.tsx`.

---

### 2. Motivation & Objective (Why it was done)

Le formulaire de lancement constitue le point d'entrée opérationnel de l'utilisateur pour se protéger contre les escroqueries récurrentes au Cameroun. Il garantit une sécurité stricte des données de l'utilisateur (pas de codes secrets transmis, consentement vérifié) tout en fournissant une réponse instantanée et compréhensible.

---

### 3. Implementation Details (How it was done)

1. **Validation & Retours d'erreurs :**
   Contrôle de conformité de l'URL et longueur minimale du message (au moins 10 caractères) avec affichage d'erreur en `--feedback-error`.
2. **Moteur heuristique dans le Mock Adapter :**
   Détection des structures classiques d'escroqueries camerounaises : faux reçus SMS Mobile Money (reçu, FCFA, Ref), loteries frauduleuses avec frais de déblocage, urgence artificielle et calcul pondéré du questionnaire de transaction.
3. **Bilinguisme intégral :**
   Tous les libellés, questions et infobulles sont localisés sous `dashboard.newAnalysis.*` dans `fr.json` et `en.json`.

---

### 4. Critical Factors & Keys (Important for Team Members)

- **Consentement :** Le champ booléen `consent` est transmis dans le payload `CreateAnalysisPayload`.
- **Navigation :** Une fois le rapport consulté, l'analyse créée est automatiquement mémorisée et apparaît immédiatement sur la vue d'ensemble et dans l'historique.

---

### 5. Problems Encountered & How They Were Solved

- Aucun blocage technique. Typage et styles entièrement alignés sur les composants atomiques et tokens du projet.

---

### 6. Verification & Testing

- `npm run typecheck` : 0 erreur TypeScript.
- `npm run lint` : 0 avertissement, 0 erreur Oxlint.
- `npm run test` : Tests unitaires simulant le changement d'onglets, la validation du consentement et la soumission d'une analyse.
