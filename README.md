#  Spoilflix  
  
**Spoilflix** est un projet front-end réalisé dans le cadre du module *Intégration Web*.    
L’objectif est de créer un site multi-page responsive présentant une grille de médias (films, séries, jeux vidéo, etc.), avec des pages de détail accessibles et un code SCSS structuré.  
  
---  
  
## Objectifs pédagogiques  
  
- Produire des pages **HTML sémantiques**, **accessibles** et **responsives**.    
- Organiser le **CSS avec Sass** (architecture claire et performante).    
- Maîtriser la **cascade, la performance et les conventions BEM**.    
- Utiliser **Vite** comme serveur de développement.    
- Réaliser une **fiche détaillée** par élément sans utiliser de JavaScript.  
  
---  
  
##  Stack technique  
  
- **HTML5**    
- **SCSS (Sass)** compilé avec **Vite**    
- **Aucun JavaScript** (CSS-only interactivity)  
  
---  
  
##  Structure du projet  
  
project/  
├─ pages_detail_films/  
│ └─ Batman.html  
│ └─ ET.html  
│ └─FightClub.html  
│ └─Interstellar.html  
│ └─JurrasicPark.html  
│ └─LeSeigneurDesAnneaux.html  
│ └─PirateDesCaraibes.html  
│ └─StarWars.html  
├─ pages_detail_series/  
│└─Arcane.html  
│└─BreakingBad.html  
│└─Chernobyl.html  
│└─Interstellar.html  
│└─GameOfThrones.html  
│└─HousOfCards.html  
│└─SquidGame.html  
│└─StrangerThings.html  
├─ public/  
│ └─Images  
│ └─ └─Affiches Films  
│ └─ └─ └─arcane.jpeg  
│ └─ └─ └─batman.jpeg  
│ └─ └─ └─breakingbaf.jpeg  
│ └─ └─ └─chernobyl.jpeg  
│ └─ └─ └─ET.jpeg  
│ └─ └─ └─fightclub.jpeg  
│ └─ └─ └─gameofthrones.jpeg  
│ └─ └─ └─houseofcards.jpeg  
│ └─ └─ └─interstellar.jpeg  
│ └─ └─ └─jurrasicpark.jpeg  
│ └─ └─ └─piratedescaraibes.jpeg  
│ └─ └─ └─prisonbreak.jpeg  
│ └─ └─ └─seigneurdesanneaux.jpeg  
│ └─ └─ └─squidgame.jpeg  
│ └─ └─ └─starwars.jpeg  
│ └─ └─ └─strangerthings.jpeg  
│ └─ └─Logos  
│ └─ └─ └─logo.png  
│ └─ └─ └─logo.svg  
│ └─ └─ └─logo@2x.png  
│ └─ └─ └─logo_nom.png  
│ └─vite.svg  
├─ src/  
│ └─ scss/  
│ └─└─ components/  
│ └─ └─ └─_components.scss  
│ └─ └─ └─buttons.scss  
│ └─ └─ └─card.scss  
│ └─ └─ └─fil-ariane.scss  
│ └─ └─ └─navbar.scss  
│ └─└─pages/  
│ └─ └─ └─_pages.scss  
│ └─ └─ └─detail.scss  
│ └─ └─ └─home.scss  
│ └─└─variables/  
│ └─ └─ └─_variables.scss  
│ └─ └─ └─colors.scss  
│ └─ └─ └─font-styles.scss  
│ └─ └─ └─spacin.scss  
│ └─ main.scss  
├─.gitignore  
├─index.html  
├─ package.json  
├─ppm-lock.yaml  
└─ vite.config.js  
  
  
---  
  
##  Installation & lancement  
  
1. **Installer les dépendances**  
  
   pnpm install  
  
 2. **Lancer le serveur de développement**  
  
	pnpm run dev  
  
---  
  
##	Fonctionnalités principales  
  
* Grille de 8 cartes média minimum (image, titre, métadonnées).  
  
* Pages de détails pour chaque élément (Option A, multi-page).  
  
* Navigation accessible (header, lien "Aller au contenu", fil d’Ariane).  
  
* Focus visible et respect des bonnes pratiques d’accessibilité.  
  
* Responsive design (mobile-first).  
  
* Convention BEM pour le nommage des classes SCSS.  
  
---  
  
##	Design & options  
  
Carte blanche sur le thème visuel.  
  
Respect des contrastes et du focus visible.  
  
Optionnel :  
  
Thème clair/sombre (variables CSS).  
  
Filtres CSS-only (checkbox hack).  
  
Composants supplémentaires (badges, tags, alertes, skeletons décoratifs).  
  
---  
  
##	Checklist de validation  
  
 Aucune erreur console  
  
 Grille responsive (≥ 8 cartes)  
  
 Page(s) de détail fonctionnelles  
  
 Accessibilité basique (titres, alt, focus, skip link)  
  
 SCSS structuré et lisible  
  
 Convention BEM respectée  
  
 README documenté  
  
 2 captures d’écran (mobile + desktop)  
  
---  
  
##	Auteurs  
  
Yannis Savary / Clément Meuret  
Projet réalisé dans le cadre du module Intégration Web – MyDigitalSchool Lille (2025).  
