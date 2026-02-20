#  Rick & Morty Wiki

Application web interactive pour explorer l'univers de Rick & Morty, développée en TypeScript vanilla avec Vite.

![Rick & Morty](https://via.placeholder.com/800x400?text=Rick+%26+Morty+Wiki)

---

##  Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [API utilisée](#api-utilisée)
- [Utilisation](#utilisation)
- [Captures d'écran](#captures-décran)
- [Auteur](#auteur)

---

##  Aperçu

Rick & Morty Wiki est une application web permettant de parcourir et découvrir tous les personnages de la série animée Rick & Morty. L'application offre une interface moderne avec recherche en temps réel, filtres, tri, favoris persistants, et un mode sombre/clair.

**Lien de démonstration** : [À ajouter si déployé]

---

##  Fonctionnalités

### Fonctionnalités principales

-  **Grille de personnages** : Affichage en grille responsive avec image, nom, statut et espèce
-  **Recherche en temps réel** : Barre de recherche pour filtrer les personnages par nom
-  **Pagination** : Bouton "Voir plus" pour charger progressivement les 826 personnages
-  **Tri dynamique** : 5 critères de tri (A→Z, Z→A, plus/moins d'épisodes, par défaut)
-  **Système de favoris** : Ajout/retrait de favoris avec persistance localStorage
-  **Filtres** : Vue "Tous" / "Favoris uniquement"
-  **Fiche détaillée** : Modale avec informations complètes du personnage
-  **Statistiques** : Bandeau avec total affiché, favoris, moyenne d'épisodes, vivants/morts
-  **Thème clair/sombre** : Toggle avec sauvegarde des préférences

### États d'UI

-  Skeletons de chargement pendant les requêtes API
-  Message d'erreur avec bouton "Réessayer"
-  Message si aucun favori
-  Message si aucun résultat de recherche

### Accessibilité

-  Navigation au clavier (Enter, Échap)
-  Attributs ARIA (role, aria-label, aria-hidden)
-  Design responsive (mobile, tablette, desktop)

---

## ️ Technologies utilisées

### Core

- **TypeScript** (strict mode) : Typage statique pour éviter les erreurs
- **Vite** : Build tool et dev server ultra-rapide
- **SCSS** : Préprocesseur CSS avec variables et nesting

### API

- **Rick & Morty API** : API RESTful gratuite sans authentification
   - URL : `https://rickandmortyapi.com/api`
   - 826 personnages sur 42 pages

### Outils

- **pnpm** : Gestionnaire de paquets rapide et efficace
- **ESLint** : Linter pour la qualité du code
- **Prettier** : Formateur de code

---

##  Installation

### Prérequis

- Node.js ≥ 18
- pnpm ≥ 8

### Étapes
```bash
