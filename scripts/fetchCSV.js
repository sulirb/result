export async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.text();
  } catch (error) {
    console.error("Erreur lors du chargement du CSV:", error);
    throw error;
  }
}

export function parseCSV(data) {
  const rows = data.split("\n").filter((row) => row.trim().length > 0);
  const headers = rows[0].split(",").map((header) => header.trim());
  return rows
    .slice(1)
    .map((row) => {
      const values = row.split(",");
      if (values.length === headers.length) {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ? values[index].trim() : "";
        });
        return obj;
      }
      return null;
    })
    .filter(Boolean);
}

async function loadCSVList() {
  try {
    const response = await fetch("/assets/csv_files.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    const select = document.getElementById("csvSelect");

    data.files.forEach((file) => {
      const option = document.createElement("option");
      option.value = file;
      option.textContent = file.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Erreur lors du chargement de la liste CSV:", error);
    alert(
      "Impossible de charger la liste des fichiers CSV. Veuillez réessayer plus tard."
    );
  }
}

async function fetchResult(fileName) {
  try {
    const url = `/assets/${fileName}`;
    const league = url
      ? url
          .split(/[/\\]/)
          .pop()
          .replace(/\.[^/.]+$/, "")
          .replace(/_/g, " ")
      : "";
    const csvData = await fetchCSV(url);
    const data = parseCSV(csvData);
    return { league, data };
  } catch (error) {
    console.error("Erreur lors du traitement du fichier CSV:", error);
    throw error;
  }
}

export default { fetchResult, loadCSVList };
