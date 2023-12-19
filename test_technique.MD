# Test technique pour le poste de Frontend Creative Developer

## Description

Le but de ce test est d'évaluer les compétences du candidat en tant que Frontend Creative Developer.
Le candidat devra créer une application web permettant de visualiser une animation à partir d'un modèle GLTF,
qui comprendra des animations et la possibilités d'effectuer quelques actions simples avec celle-ci.

## Contraintes techniques

- La stack imposée est la suivante:
  - React-Three-Fiber
  - ThreeJS
  - Vite
- Le candidat devra utiliser le modèle GLTF fournis pour créer l'animation.
- Le candidat est libre de choisir l'implémentation et le design graphique de l'application.
- Le candidat devra initialiser un dépôt GitHub au début du test et y pousser son avancement.

## Tâches à réaliser

- [ ] Créer une application React-Three-Fiber avec Vite et ThreeJS
- [ ] Intégrer l'animation dans le canvas ThreeJS
- [ ] Intégration de la caméra
- [ ] Intégration des lumières
- [ ] Ajouter d'une texture de fond (Choix libre)
- [ ] Ajouts d'outils de contrôles de la caméra avec les options suivantes :
  - [ ] Intensité des lumières
  - [ ] Position lumière X
  - [ ] Position lumière Y
  - [ ] Position lumière Z
  - [ ] Rendu des couleurs (Linear/Reinhard/Cineon/ACESFilmic)
  - [ ] Intensité du rendu
  - [ ] Choix de l'animation du modèle GLTF (Look/Walk/Run/Stop)
  - [ ] Rotation du modèle GLTF sur l'axe Y
- [ ] Intégrer les animations du modèle GLTF et les contrôler avec des boutons suivants : 
  - [ ] Bouton "Haut" - Accèlere l'animation de marche/course
  - [ ] Bouton "Bas" - Ralenti l'animation de marche/course
  - [ ] Bouton "Spacebar" - Arrête l'animation de marche/course
  - [ ] Bouton "Spacebar" (again) - Relance l'animation de marche/course à la vitesse initiale
- [ ] Bonus: Intégration d'un audio (Choix libre)

## Données fournies

- Un modèle GLTF avec des animations

## Critères d'évaluation

- Respect des contraintes techniques et des tâches à réaliser
- Qualité du code (propreté, maintenabilité, performance, etc.)
- Qualité des functions (propreté, maintenabilité, performance, etc.)
- Qualité de l'interface utilisateur (design, ergonomie, accessibilité, etc.)
- Qualité de la documentation (README, commentaires, etc.)
- Qualité de l'expérience utilisateur (fluidité, réactivité, etc.)
- Régularité des commits et leurs messages (clarté, concision, etc.)

## Temps de réalisation

Le temps de réalisation n'est pas fournis volontairement, pour que le candidat estime par lui même le temps
nécessaire à la réalisation du test et fournir un résultat qui lui semble satisfaisant.
