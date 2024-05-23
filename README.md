# Create Results

## Version 1.0.0

Rajout d'une page "table" qui va calculer automatiquement les résultats et renvoyer un classement.

## Version 1.1.0

Remplacement de la conversion CSV -> JSON pour connecter directement le script à un fichier CSV

## Aperçu

L'application Create Results affiche les résultats de matchs à partir d'un fichier CSV. Cette conversion permet de traiter facilement les données dans un format JSON.

## Installation

- Clonez ce dépôt sur votre machine en local en utilisant la commande suivante sur votre éditeur de texte:
  git clone https://github.com/sulirb/result.git

- Accédez au répertoire du projet :
  cd result

- Installez les dépendances en utilisant npm :
  npm install

- Placez votre fichier CSV contenant les résultats de matchs dans le dossier assets. Il doit suivre une mise en place bien particulière, avec 7 colonnes :
- "round" définissant le numéro de la journée durant laquelle le match se déroule
- "date" définissant la date ou à lieu le match
- "hour" définissant l'heure ou à lieu le match
- "team1" et "team2" dans lesquelles sont placées les équipes participant au match avec "team1" étant l'équipe à domicile et "team2" étant l'équipe à l'exterieur
- "score1" et "score2" qui sont le nombre de buts inscrites respectivement par "team1" et "team2" durant le match

Pour plus de précisions, veuillez vous referrer au fichier "/assets/Ligue_1_23-24.csv" faisant office de template.

- Dans le fichier "/scripts/fetchCSV.js", rajoutez, dans la fonction "fetchResult()" l'adresse du CSV que vous avez placé dans le dossier "assets" et dont vous voulez obtenir les résultats sous forme de page web.

## Utilisation

- Lancez l'application en local sur votre terminal en utilisant la commande suivante :
  npm run dev

- Accédez ensuite à l'URL indiquée.

- Vous devriez maintenant voir les résultats des matchs, ainsi que le classement, affichés sur la page HTML, basés sur le fichier CSV converti.
