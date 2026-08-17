# LF Rénovation — Espace Pro

Site pour un auto-entrepreneur spécialisé en **rénovation intérieure et extérieure**, présenté sous la forme d'une application de type tableau de bord (sidebar fixe, cartes, graphique de suivi) plutôt qu'un site vitrine classique.

Thème sombre, dégradés violet/rose, typographie Space Grotesk + Inter.

## Aperçu local

Aucun outil de build n'est nécessaire, c'est du HTML/CSS/JS statique.

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Structure

```
index.html            Application (sidebar + pages internes en JS)
mentions-legales.html Page des mentions légales (thème assorti)
css/style.css         Toute la feuille de style (thème sombre dashboard)
js/main.js            Navigation, dropdowns, graphique SVG, formulaire, filtres
```

## Navigation de l'application

Tout se passe sur `index.html` : les sections ne sont pas des ancres mais des « pages »
affichées/masquées en JavaScript (`.page[data-page]`), pilotées à la fois par :

- la **sidebar** (Dashboard, Services, Réalisations, Devis, Avis clients) ;
- les **pastilles d'onglets** en haut (Aperçu / Devis / Chantiers), raccourcis vers les mêmes pages.

Pages disponibles :
- **Dashboard** — chiffre d'affaires, devis en cours, chantiers actifs, graphique de suivi.
- **Services** — liste complète des prestations intérieur/extérieur.
- **Réalisations** — galerie de chantiers filtrable (Tous / Intérieur / Extérieur).
- **Devis** — formulaire de demande de devis + liste des devis + coordonnées.
- **Avis clients** — témoignages.

« Paramètres » (bas de sidebar) ouvre `mentions-legales.html`. « Support » renvoie vers la page Devis.

## À personnaliser avant mise en ligne

- **Identité / coordonnées** : nom affiché « Ludovic » (`index.html`, en-tête), téléphone `06 XX XX XX XX`, e-mail `contact@lf-renovation.fr` — présents dans l'en-tête, la sidebar, la page Devis et `mentions-legales.html`.
- **Chiffres** : chiffre d'affaires (`#revenue-value` + menu déroulant de périodes), devis en cours, chantiers actifs — toutes des données d'exemple codées dans `index.html`, à remplacer par vos vraies données (ou à brancher sur un back-end si besoin).
- **Graphique** : les jeux de données du graphique « Suivi du chiffre d'affaires » (1S/1M/6M/1A) sont définis dans `js/main.js`, objet `datasets`.
- **Avis clients** : témoignages d'exemple dans la page Avis, à remplacer par de vrais avis.
- **Réalisations** : vignettes en dégradé de couleur en attendant de vraies photos. Remplacez le `style="background:..."` d'une `.gallery-thumb` par `background:url('images/mon-chantier.jpg') center/cover;` et déposez le fichier dans `images/`.
- **Mentions légales** : SIRET, adresse, assureur décennal et hébergeur à compléter dans `mentions-legales.html`.

## Assistant / formulaire

- La barre « Demandez quelque chose à l'assistant LF Rénovation » fait une recherche par mot-clé simple (voir `faq` dans `js/main.js`) et redirige vers la page pertinente. Aucune IA réelle n'est branchée.
- Le formulaire de devis (`#devis-form`) fonctionne uniquement côté client : il affiche un message de confirmation mais n'envoie rien. Pour recevoir réellement les demandes, connectez-le à [Formspree](https://formspree.io), [EmailJS](https://www.emailjs.com) ou [Netlify Forms](https://docs.netlify.com/forms/setup/).

## Déploiement

Le site étant 100% statique, il peut être déployé gratuitement sur GitHub Pages, Netlify, Vercel ou tout hébergeur mutualisé classique.
