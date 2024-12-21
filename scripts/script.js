import fetchCSV from "./fetchCSV";

const { fetchResult, loadCSVList } = fetchCSV;

document.addEventListener("DOMContentLoaded", async () => {
  const championship = localStorage.getItem("selectedChampionship");

  if (championship) {
    try {
      // Charger et afficher le classement du championnat
      await main(championship);
    } catch (error) {
      console.error("Erreur lors du chargement du classement :", error);
      alert("Impossible de charger le classement. Veuillez réessayer.");
    }
  } else {
    alert(
      "Aucun championnat sélectionné. Veuillez choisir un championnat sur la page principale."
    );
  }

  // Charger la liste des fichiers CSV
  loadCSVList();

  // Gestion du formulaire
  const form = document.getElementById("csvForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const select = document.getElementById("csvSelect");
    const selectedFile = select.value;

    if (selectedFile) {
      try {
        // Sauvegarde du championnat sélectionné dans le LocalStorage
        localStorage.setItem("selectedChampionship", selectedFile);

        // Effacer les résultats précédents avant d'afficher les nouveaux
        clearResults();

        // Charger les données du fichier sélectionné
        await main(selectedFile);

        console.log("Fichier CSV chargé avec succès !");
      } catch (error) {
        console.error("Erreur lors du chargement du fichier CSV :", error);
        alert("Erreur lors du chargement du fichier CSV. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez sélectionner un fichier CSV.");
    }
  });
});

// Fonction pour effacer les résultats précédents
function clearResults() {
  const ligue = document.querySelector(".ligue");
  const scores = document.querySelector(".scores");

  // Effacer le texte de la ligue
  ligue.textContent = "";

  // Effacer les scores précédents
  scores.innerHTML = "";
}

// Fonction principale
async function main(fileName) {
  const { league, data } = await fetchResult(fileName);

  const ligue = document.querySelector(".ligue");
  ligue.textContent = league;

  const scores = document.querySelector(".scores");
  let currentJournée;

  for (const match of data) {
    const score1 = match.score1;
    const score2 = match.score2;

    if (match.round === currentJournée) {
      // Reste dans la même journée
    } else {
      // Nouvelle journée
      currentJournée = match.round;
      const heading = document.createElement("h2");
      heading.textContent = "Journée " + currentJournée;
      scores.appendChild(heading);
      if (heading.innerHTML === "Journée 1") {
        heading.classList.add("no-border");
      }
    }

    const worksElmt = scores.appendChild(document.createElement("div"));
    worksElmt.classList.add("score");

    const eventDate = new Date(match.date);
    const eventDateOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const date = document.createElement("p");
    date.textContent = `${eventDate.toLocaleDateString(
      "fr-FR",
      eventDateOptions
    )}`;
    const hour = document.createElement("p");
    hour.textContent = `${match.hour}`;
    const team1 = document.createElement("p");
    team1.textContent = `${match.team1}`;
    const score = document.createElement("p");
    score.textContent = `${score1} - ${score2}`;
    const team2 = document.createElement("p");
    team2.textContent = `${match.team2}`;
    worksElmt.appendChild(date);
    worksElmt.appendChild(hour);
    worksElmt.appendChild(team1);
    worksElmt.appendChild(score);
    worksElmt.appendChild(team2);

    if (score1 > score2) {
      team1.style.fontWeight = "900";
    } else if (score2 > score1) {
      team2.style.fontWeight = "900";
    }

    if (score1 === null || score2 === null) {
      score.textContent = ` - `;
    }

    date.classList.add("date");
    hour.classList.add("hour");
    score.classList.add("finalScore");
    team1.classList.add("team1");
    team2.classList.add("team2");
  }
}
