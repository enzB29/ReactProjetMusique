# Projet Front React - Gestion des Artistes et Evènements

## Description
Ce projet est une application web développée avec **React** et **ViteJs** permettant de gérer et afficher des informations sur des artistes et des évènements. L'application propose quatre pages principales :

1. **Listing des artistes**
2. **Détails d'un artiste**
3. **Listing des évènements**
4. **Détails d'un évènement**

L'application inclut des fonctionnalités de filtrage, de tri et de navigation entre les entités.

---

## Fonctionnalités

### 1. Listing des artistes
- Affiche la liste des artistes.
- Champ de recherche dynamique pour filtrer les artistes par nom (côté client).
- Bouton pour trier la liste des artistes par nom (ordre alphabétique croissant/décroissant).
- Les artistes sont cliquables pour afficher leurs détails.

### 2. Détails d'un artiste
- Affichage des informations d'un artiste (nom, description, image, etc.).
- Liste des évènements auxquels participe l'artiste.
- Les évènements sont cliquables pour afficher leurs détails.

### 3. Listing des évènements
- Affiche la liste des évènements.
- Champ de recherche dynamique pour filtrer les évènements par nom (côté client).
- Bouton pour trier la liste des évènements par nom (ordre alphabétique croissant/décroissant).
- Bouton pour trier la liste des évènements par date (ordre chronologique croissant/décroissant).
- Les évènements sont cliquables pour afficher leurs détails.

### 4. Détails d'un évènement
- Affichage des détails d'un évènement (nom, date, artiste principal, etc.).
- Affichage de la liste des utilisateurs inscrits.
- L'artiste associé est cliquable pour afficher ses détails.

---

## Installation et Lancement

### Prérequis
- Node.js (v16+ recommandé)
- npm 

### Installation
1. Cloner le projet :
   ```sh
   git clone https://github.com/enzB29/ReactProjetMusique
   cd ReactProjetMusique/ProjetMusiqueReact/projet-musique-react
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```


### Lancer le projet

- Exécuter le serveur de l'api correspondante (voir https://github.com/enzB29/ProjetMusique)
- Exécuter le serveur de développement :
  ```sh
  npm run dev
  ```

- L'application sera accessible à l'adresse **http://localhost:5173** (par défaut).
    - Si ce n'est pas le cas ouvrez votre projet symfony (https://github.com/enzB29/ProjetMusique)
        - Allez dans proj -> ProjetMusique -> config -> package puis ouvrez le fichier nelmio_cors.yaml et changez "allow_origin" par le port que vous avez
    

---

## Technologies Utilisées
- **React** (Framework Frontend)
- **ViteJs** (Bundler et serveur de développement)
- **CSS** (Stylisation)
- **Fetch API** (Requêtes vers l'API backend)

---

## Améliorations Futures
- Ajout d'un système d'authentification.
- Amélioration du design avec une librairie UI (Material UI, Chakra UI, etc.).
- Ajout de tests unitaires.
- Pagination pour les listes d'artistes et d'évènements.

---

## Auteurs
- **Corentin DETOURNAY, Enzo BORDET, Virgile MARION**

---

