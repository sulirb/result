async function fetchCSV(url) {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}
function parseCSV(data) {
  const rows = data.split("\n").filter((row) => row.trim().length > 0); // Ignore les lignes vides
  const headers = rows[0].split(",").map((header) => header.trim());
  const result = rows
    .slice(1)
    .map((row) => {
      const values = row.split(",");
      if (values.length === headers.length) {
        // Vérifie si le nombre de valeurs correspond au nombre de colonnes
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ? values[index].trim() : "";
        });
        return obj;
      }
    })
    .filter((obj) => obj); // Filtre les objets indéfinis
  return result;
}

async function fetchResult() {
  const url = "/assets/Superliga_24-25.csv"; // Remplacer par l'URL de votre fichier CSV
  const league = url
    .split(/[/\\]/)
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ");
  const csvData = await fetchCSV(url);
  const data = parseCSV(csvData);
  return { league, data };
}

export default fetchResult;
