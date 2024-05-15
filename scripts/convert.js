import csv from "csvtojson";
import fs from "fs";

// Chemin du fichier CSV d'entrée
const csvFilePath = "../assets/ligue-1-22-23.csv";

// Lire le fichier CSV et le convertir en JSON
csv()
  .fromFile(csvFilePath)
  .then((jsonArrayObj) => {
    // Structure JSON à ajouter à chaque ligne
    const dataToAdd = {
      name: "Superliga 2023-2024",
      matches: jsonArrayObj,
    };

    // Si vous voulez écrire le JSON avec la structure ajoutée dans un fichier, vous pouvez le faire comme ceci :
    const jsonFilePath = "../assets/ligue-1-22-23.json";
    fs.writeFileSync(jsonFilePath, JSON.stringify(dataToAdd, null, 2));
    console.log(
      `Le fichier JSON avec la structure ajoutée a été enregistré à ${jsonFilePath}`
    );
  })
  .catch((err) => {
    console.error("Une erreur s'est produite :", err);
  });
