# LF Rénovation

Site pour un auto-entrepreneur spécialisé en **rénovation intérieure et extérieure**, composé de deux parties :

- **Site public** (racine du repo) — site vitrine multi-pages classique, thème clair.
- **Espace pro** (`/admin`) — tableau de bord interne (chiffre d'affaires, devis, chantiers), thème sombre violet/rose.

Aucun outil de build n'est nécessaire, c'est du HTML/CSS/JS statique.

## Aperçu local

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Structure

```
index.html              Accueil (site public)
services.html            Liste des services intérieur / extérieur
realisations.html        Galerie de chantiers filtrable
devis.html                Devis rapide (formulaire court)
demande-chantier.html    Demande de chantier détaillée (adresse, budget, photos...)
avis.html                  Avis clients
apropos.html              À propos de l'artisan + zone d'intervention
contact.html               Contact général
mentions-legales.html    Mentions légales (thème public)

admin/index.html          Espace pro : tableau de bord interne

css/public.css            Styles du site public (thème clair)
css/admin.css              Styles de l'espace pro (thème sombre)
js/public.js                Nav, menu déroulant, galerie, formulaires (site public)
js/admin.js                  Navigation interne, graphique, dropdowns (espace pro)
```

## Navigation du site public

Le menu principal (répété sur chaque page) propose : Accueil, Services, Réalisations,
un menu déroulant **Devis** (Devis rapide / Demande de chantier), Avis, À propos, Contact.
Le lien actif est mis en évidence automatiquement selon la page (`js/public.js`).

Un lien discret **« Espace pro »** en pied de page renvoie vers `admin/index.html`.
Attention : il n'y a **aucune authentification réelle** (site 100% statique) — cette
séparation n'est qu'une convention d'URL, pas une protection. Pour une vraie mise en
production avec des données sensibles, il faudrait brancher un back-end avec
authentification.

## Espace pro (`/admin`)

Application interne façon tableau de bord (sidebar, chiffre d'affaires, devis en
cours, chantiers actifs, graphique de suivi). Voir le lien « Voir le site public »
en haut de la sidebar pour revenir sur le site vitrine. Détails de fonctionnement
inchangés par rapport à la version précédente (pages internes pilotées en JS,
`js/admin.js`).

## À personnaliser avant mise en ligne

- **Identité / coordonnées** : téléphone `06 XX XX XX XX`, e-mail `contact@lf-renovation.fr`,
  ville `[Votre ville]` — répétés dans l'en-tête, le pied de page et les formulaires de
  chaque page publique, ainsi que dans `mentions-legales.html`.
- **Avis clients** (`avis.html`, aperçu sur `index.html`) : témoignages d'exemple à remplacer.
- **Réalisations** (`realisations.html`, aperçu sur `index.html`) : vignettes en dégradé de
  couleur en attendant de vraies photos. Remplacez le `style="background:..."` d'une
  `.gallery-thumb` par `background:url('images/mon-chantier.jpg') center/cover;` et déposez
  le fichier dans `images/`.
- **Mentions légales** : SIRET, adresse, assureur décennal et hébergeur à compléter.
- **Espace pro** : chiffre d'affaires, devis, chantiers — données d'exemple dans
  `admin/index.html`, voir aussi `js/admin.js` pour les jeux de données du graphique.

## Formulaires

Trois formulaires (`devis.html`, `demande-chantier.html`, `contact.html`) fonctionnent
uniquement côté client : ils affichent un message de confirmation via
`js/public.js` (attribut `data-success-form`) mais n'envoient rien. Pour recevoir
réellement les demandes, connectez-les à un service comme
[Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com) ou
[Netlify Forms](https://docs.netlify.com/forms/setup/).

## Déploiement

Le site étant 100% statique, il peut être déployé gratuitement sur GitHub Pages,
Netlify, Vercel ou tout hébergeur mutualisé classique. Le dossier `/admin` sera
alors accessible publiquement à `https://votre-domaine/admin/` — pensez à la
remarque sur l'absence d'authentification ci-dessus.
