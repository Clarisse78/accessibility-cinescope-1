# CinéScope : cours d'accessibilité

## Les 5 constats

1. **Le focus clavier est invisible.** Le CSS fait `outline: none` partout, donc en naviguant avec Tab on ne sait jamais où on est.

2. **On ne peut pas choisir un film au clavier.** La carte est un `<div onClick>` : impossible d'y accéder avec Tab, et le lecteur d'écran ne sait pas que c'est cliquable.

3. **La disponibilité n'est donnée que par une couleur.** Une pastille verte ou rouge, sans texte. Un daltonien ne fait pas la différence et le lecteur d'écran n'annonce rien.

4. **On ne comprend pas le bouton étoile.** Le lecteur d'écran lit « étoile blanche, bouton », sans dire à quoi il sert ni pour quel film. Même visuellement, ce n'est pas clair.

5. **La page n'a pas de structure.** Il n'y a pas de `header`, de `nav` ni de `main`, on passe d'un `h1` à un `h4`, la recherche n'a pas de label, les images n'ont pas d'`alt` et le logo n'est pas cliquable au clavier. En plus, les séances n'indiquent que l'heure, pas le jour.

## 3 corrections marquantes

### 1. Le focus visible

**Avant :** aucun contour au focus, donc la navigation clavier se fait à l'aveugle.

**Après :**
```css
:focus-visible { outline: 3px solid #3b4cca; outline-offset: 3px; }
.topbar :focus-visible { outline-color: white; }
```
Avec `:focus-visible`, le contour n'apparaît qu'au clavier : rien ne change pour la souris. On a aussi ajouté un lien "Aller au contenu", qui n'apparaît que quand il a le focus.

**Impact :** on voit toujours où on se trouve sur la page.

### 2. Les cartes de film

**Avant :**
```tsx
<div className="film-card" onClick={...}>
  <img src={film.poster} />
  <h4>{film.title}</h4>
```

**Après :**
```tsx
<li className="film-card">
  <img src={film.poster} alt="Affiche d’Orbite 9 : une planète bleue entourée d’un anneau orange..." />
  <h2><button type="button" className="film-select" onClick={...}>{film.title}</button></h2>
```
Le titre devient un vrai `<button>` : il est accessible au clavier et annoncé comme bouton. Grâce à un `::after`, sa zone cliquable couvre toute la carte, donc on peut toujours cliquer n'importe où. Les cartes forment maintenant une liste, et les titres suivent l'ordre `h1` "Programme" > `h2` (titre du film). Le `h1` remplace "Films à l'affiche" : il sert de cible au lien "Programme" du menu, et le titre de la page correspond enfin à la navigation. Quand on sélectionne un film, c'est annoncé au lecteur d'écran (`role="status"`).

Chaque affiche a maintenant un `alt` qui la décrit, au lieu du nom de fichier (`aube.svg`) que lisait le lecteur d'écran. On ne les a pas rendues focusables avec Tab : une image n'est pas interactive, et le lecteur d'écran lit déjà l'`alt` quand on parcourt la page avec les flèches.

**Impact :** on peut choisir un film sans souris, ce qui est la fonction principale de la page.

### 3. La disponibilité et les favoris

**Avant :**
```tsx
<div className="availability available" />
<button className="favorite">☆</button>
```

**Après :**
```tsx
<p className="seats seats-available">42 places disponibles</p>

<button type="button" className="favorite" aria-pressed={isFavorite}>
  <span aria-hidden="true">☆</span>
  <span className="visually-hidden">Favori : Orbite 9</span>
  <span className="tooltip" aria-hidden="true">Ajouter aux favoris</span>
</button>
```
La pastille est remplacée par un texte, par exemple "42 places disponibles" ou "Complet", dans une couleur assez contrastée. Le bouton étoile a maintenant un nom et `aria-pressed` indique s'il est activé. On a utilisé ARIA ici parce que le HTML n'a rien pour dire qu'un bouton est "enfoncé". Une infobulle "Ajouter aux favoris" / "Retirer des favoris" apparaît au survol et aussi au focus clavier, ce que l'attribut `title` ne faisait pas.

**Impact :** l'info ne dépend plus de la couleur, et le bouton favori dit à quoi il sert.

## Autres petites corrections

- Le logo « CinéScope » est maintenant un lien vers l'accueil.
- La recherche a un label (masqué visuellement), et le nombre de résultats est annoncé.
- La bordure du champ de recherche est plus contrastée.
- Le lien "Informations" du menu pointait vers `#infos`, qui n'existait pas. Pour un utilisateur clavier ou de lecteur d'écran, activer ce lien ne faisait rien, sans aucun retour. On a ajouté en haut de la page une section "Informations" (`h1 id="infos"`) avec un contenu provisoire "TODO". Le lien mène maintenant quelque part, et son titre permet aussi d'y accéder par la liste des titres du lecteur d'écran.
- Le jour de chaque séance est affiché dans une balise `<time>`. Les dates sont des exemples.
