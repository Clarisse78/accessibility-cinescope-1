# Here starts the journey with Cinescope

## First install your project
- you can copy the repo locally using `git clone`
- go to the root of the directory and run `npm i`
- run the project with `npm run dev`

## Consignes

Livrables :

Un fichier .md avec 5 constats

Justification de la correction de 3 éléments marquants : impact avant après

Privilégier html natif
Pas de tab index positif
ARIA que si html insuffisant
Conserver l'apparence générale

## Livrables

Logins :

- Marie CAZE
- Thibaut BONEFONT
- Lucile PELOU

Vous pouvez retrouvez les constats bien formattés dans le fichier `livrables.md`. Pour les retours bruts et les corrections, voir ci dessous.

## Elements qu'on remarqués

- Focus partout pour pouvoir faire tab / shift + tab et voir ou on est
- Mettre le nombres de places disponibles + "Places disponibles" à côté de la pastille verte/ rouge et pas juste la pastille
- Les etoiles c'est par clair ce qu'elles font => Remplacer par un bouton ou y a écrit "Réserver"
- On a pas la date des films, juste l'heure
- Avoir des alts sur les images
- On peut pas cliquer sur cinescope
- Il y a "programme" et "informations" mais c'est inutile car il y a une seule page (programme permet d'aller au programme donc pas inutile mais informations sert à rien pour l'instant) => il faut pas l'enlever mais on peut le notifier dans le .md => On peut ajouter un titre programme au dessus des films pour indiquer que ça va la bas (plus intuitif en tout cas)
- Changement du titre de la page : "Cinéscope" au lieu de "Cinéscope - Programmation"

Correction : 
- Garder la même taille quand on recherche une image
- Avoir un bouton "Voir les séances" ou un truc du genre et c'est ça qui ouvre les infos plutôt que tout
- Si y a un bouton sans texte dessus, faut mettre dans l'aria l'information, sinon y a pas besoin

Correction prioritaires :
- Remplacer les élements cliquables par des boutons ou des liens
- Restaurer le focus visible
- Corriger les titres et les régions
- Traiter les images selon leur fonction
- Nommer les boutons constitués d'une îcone
- Exprimer les états autrement que par la couleur