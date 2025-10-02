# Blog Collaboratif - Strapi v5 + Next.js

Ce projet a été réalisé dans le cadre d'une journée d'initiation à l'utilisation d'un CMS headless (Strapi v5) combiné à un framework frontend moderne (Next.js).  
L'objectif est de créer un petit blog collaboratif où les auteurs peuvent publier des articles et les visiteurs peuvent les consulter et laisser des commentaires.

---

## Strapi Back-end

### Modélisation
Deux collections types ont été créés dans Strapi (en plus de **User** présent nativement): **Comment** et **Article**.

Les collections types sont modélisés de la façon suivante :

- **Article**
    - `title` : Text (Short text),  requis
    - `slug` : UID, unique, basé sur `title`, requis
    - `content` : Rich Text, requis
    - `coverImage` : Media (single media)
    - `status` : Enumeration présente nativement dans Strapi
    - `authorName` : Text (Short text),  requis
    - `publishedAt` : DateTime présente nativement sur Strapi
    - `users_permissions_user` : Relation Many-to-One vers `User`
    - `comments` : Relation One-to-Many vers `Comment`

- **Comment**
    - `content` : Text (Long text), requis
    - `authorName` : Text (Short text),  requis
    - `article` : Relation Many-to-One vers `Article`
    - `users_permissions_user` : Relation Many-to-One vers `User`

### Rôles & Permissions
Deux rôles sont nativement présents dans strapi : **Authenticated** (pas de permissions spécifiques enregistrées) et **Public** pour lequel quelques permissions configurées :

    Articles : `find`, `findOne`
    Commentaires : `create`, `find`, `findOne`

Le rôle **Author** a également été créé avec les permissions configurées suivantes : 

    Articles : `create`, `delete`, `update`, `find`, `findOne`
    Commentaires : `create`, `find`, `findOne`

Une policy `is-owner` a été créée pour restreindre l'auteur à pouvoir modifier ou supprimer uniquement ses propres articles. Dans strapi v5, la policy de vérification d'authentification est nativement géré. Une policy `is-authenticated` a été créé quand même pour plus de sécurité. 

---

## Next.JS Front-end

- **Page d’accueil**
  - Affiche tous les articles publiés sous forme de grille.
  - Chaque carte contient :
    - `coverImage` (vignette)
    - `title`
    - `authorName`
    - `publishedAt`
  - Chaque carte renvoie vers la page détail de l’article (`/[slug]`).

- **Page Article**
  - Affiche :
    - `coverImage`
    - `title`
    - `author.name`
    - `publishedAt`
    - `content` (HTML via Rich Text)
  - Liste des commentaires existants.
  - Formulaire de commentaire :
    - Champs : nom + contenu
    - POST vers `/api/comments`

---

## Installation

### Backend (Strapi)
```bash
# Installer les dépendances
cd monblog-strapi
npm install

# Démarrer Strapi en mode développement
npm run develop
``` 

### Frontend (NExt)
```bash
# Installer les dépendances
cd monblog-frontend
npm install

# Démarrer le serveur Next.js en mode développement
npm run develop

