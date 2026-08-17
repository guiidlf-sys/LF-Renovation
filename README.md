# LF Rénovation

Site vitrine statique pour un auto-entrepreneur spécialisé en **rénovation intérieure et extérieure** (peinture, sols, salle de bain/cuisine, façade, terrasse, toiture, clôtures...).

Site en une page (one-page) : Accueil, Services, Réalisations, À propos, Avis, Zone d'intervention, Contact, plus une page **Mentions légales**.

## Aperçu local

Aucun outil de build n'est nécessaire, c'est du HTML/CSS/JS statique. Pour le tester en local :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

Ou ouvrez simplement `index.html` directement dans votre navigateur.

## Structure

```
index.html            Page principale (one-page)
mentions-legales.html Page des mentions légales
css/style.css         Toute la feuille de style
js/main.js            Menu mobile, animations, filtre galerie, formulaire
images/                Dossier prévu pour vos futures photos de chantiers
```

## À personnaliser avant mise en ligne

Le contenu utilise des informations d'exemple à remplacer :

- **Coordonnées** : téléphone (`06 XX XX XX XX`), e-mail (`contact@lf-renovation.fr`), présentes dans `index.html` (en-tête, section Contact, pied de page) et `mentions-legales.html`.
- **Nom / identité** : logo texte « LF », nom affiché « LF Rénovation » — à adapter à votre nom ou raison sociale.
- **Zone d'intervention** : ville et villes environnantes dans la section « Zone d'intervention ».
- **Chiffres clés** : années d'expérience, nombre de chantiers, etc. (barre de statistiques sous le hero).
- **Avis clients** : les 3 témoignages sont des exemples, à remplacer par de vrais avis.
- **Réalisations** : les vignettes de la galerie sont des dégradés de couleur en attendant vos vraies photos. Pour ajouter une photo, dans `index.html` remplacez sur la `.gallery-thumb` concernée :
  ```html
  <div class="gallery-thumb" style="background:url('images/mon-chantier.jpg') center/cover;">
  ```
  et déposez le fichier correspondant dans `images/`.
- **Mentions légales** : SIRET, adresse, assureur décennal et hébergeur à compléter dans `mentions-legales.html`.
- **Réseaux sociaux** : liens `#` dans la section Contact à remplacer par vos vrais profils.

## Formulaire de contact

Le formulaire (`#contact-form` dans `index.html`) fonctionne uniquement côté client pour l'instant : il affiche un message de confirmation mais n'envoie pas réellement les données, car il n'y a pas de back-end. Pour recevoir les demandes par e-mail, connectez-le à un service comme [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com) ou [Netlify Forms](https://docs.netlify.com/forms/setup/) en modifiant l'attribut `action` du `<form>` et la logique dans `js/main.js`.

## Déploiement

Le site étant 100% statique, il peut être déployé gratuitement sur GitHub Pages, Netlify, Vercel ou tout hébergeur mutualisé classique.
