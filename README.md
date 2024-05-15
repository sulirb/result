# Create Results

## Version 1.0.0

Rajout d'une page "table" qui va calculer automatiquement les résultats et renvoyer un classement.

## Aperçu

L'application Create Results affiche les résultats de matchs à partir d'un fichier JSON, qui a été initialement créé à partir d'un fichier CSV contenant les données des matchs. Cette conversion permet de traiter facilement les données dans un format JSON.

## Installation

- Clonez ce dépôt sur votre machine en local en utilisant la commande suivante sur votre éditeur de texte:
  git clone https://github.com/sulirb/result.git

- Accédez au répertoire du projet :
  cd result

- Installez les dépendances en utilisant npm :
  npm install

- Placez votre fichier CSV contenant les résultats de matchs dans le dossier assets.

- Dans le fichier .scripts/convert.js, rajoutez l'adresse du CSV que vous voulez convertir dans la variable csvFilePath, faites de même pour l'adresse du JSON qui sera généré dans la variable jsonFilePath, vous pouvez optionnellement changer le nom de la Ligue dans la case "name" de la variable dataToAdd

- Convertissez le fichier CSV en JSON en utilisant les commandes suivantes dans votre terminal:
  cd scripts
  node convert.js
  cd ..

- Dans le fichier ./scripts/script.js n'oubliez pas de rajouter le nom du fichier JSON nouvellement crée pour votre fichier afin que le script puisse être fonctionnel

## Utilisation

- Lancez l'application en local sur votre terminal en utilisant la commande suivante :
  npm run dev

- Accédez ensuite à l'URL indiquée.

- Vous devriez maintenant voir les résultats des matchs, ainsi que le classement, affichés sur la page HTML, basés sur le fichier JSON converti.
