async function fetchResult() {
  const response = await fetch("http://localhost:2000");
  const data = await response.json();
  return data;
}

async function main() {
  const data = await fetchResult();

  let teamStats = {};

  // Parcourir chaque match
  for (const match of data) {
    const { team1, team2, score1, score2 } = match;
    const goalsTeam1 = score1 === "" ? 0 : Number(score1); // Convertir en nombre entier
    const goalsTeam2 = score2 === "" ? 0 : Number(score2); // Convertir en nombre entier

    // Initialiser les statistiques de chaque équipe si elles ne sont pas déjà définies
    teamStats[team1] = teamStats[team1] || {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };
    teamStats[team2] = teamStats[team2] || {
      points: 0,
      games: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    };

    const matchPlayed = score1 !== "" && score2 !== "";
    // Mettre à jour les statistiques des équipes à domicile
    teamStats[team1].goalsFor += goalsTeam1;
    teamStats[team1].goalsAgainst += goalsTeam2;
    if (matchPlayed) {
      teamStats[team1].games += 1;
    }
    if (goalsTeam1 > goalsTeam2) {
      teamStats[team1].points += 3; // Équipe 1 remporte le match
      teamStats[team1].wins += 1;
    } else if (goalsTeam1 === goalsTeam2 && matchPlayed) {
      teamStats[team1].points += 1; // Match nul
      teamStats[team1].draws += 1;
    } else if (goalsTeam2 > goalsTeam1) {
      teamStats[team1].losses += 1;
    }

    /**/ // Mettre à jour les statistiques des équipes à l'exterieur
    teamStats[team2].goalsFor += goalsTeam2;
    teamStats[team2].goalsAgainst += goalsTeam1;
    if (matchPlayed) {
      teamStats[team2].games += 1;
    }
    if (goalsTeam2 > goalsTeam1) {
      teamStats[team2].points += 3; // Équipe 2 remporte le match
      teamStats[team2].wins += 1;
    } else if (goalsTeam1 === goalsTeam2 && matchPlayed) {
      teamStats[team2].points += 1; // Match nul
      teamStats[team2].draws += 1;
    } else if (goalsTeam1 > goalsTeam2) {
      teamStats[team2].losses += 1;
    } /**/
  }

  // Trier les équipes en fonction du nombre de points, puis du différentiel de buts
  const sortedTeams = Object.keys(teamStats).sort((teamA, teamB) => {
    if (teamStats[teamA].points !== teamStats[teamB].points) {
      return teamStats[teamB].points - teamStats[teamA].points; // Trier par points décroissants
    } else {
      return (
        teamStats[teamB].goalsFor -
        teamStats[teamB].goalsAgainst -
        (teamStats[teamA].goalsFor - teamStats[teamA].goalsAgainst)
      ); // Trier par différence de buts décroissante
    }
  });

  const table = document.querySelector(".table");

  const tbl = document.createElement("table");

  const tblBody = document.createElement("tbody");
  const headerRow = tblBody.insertRow();
  const properties = ["P", "Club", "Pts", "J", "V", "N", "D", "Bp", "Bc", "D"];
  properties.forEach((property) => {
    const headerCell = document.createElement("th"); // Créer une cellule d'en-tête
    headerCell.textContent = property;
    headerRow.appendChild(headerCell); // Ajouter la cellule d'en-tête à la ligne d'en-tête
  });

  sortedTeams.forEach((team, index) => {
    const ranking = document.createElement("td");
    ranking.textContent = `${index + 1}`;
    const club = document.createElement("td");
    club.textContent = `${team}`;
    const points = document.createElement("td");
    points.textContent = `${teamStats[team].points}`;
    const games = document.createElement("td");
    games.textContent = `${teamStats[team].games}`;
    const wins = document.createElement("td");
    wins.textContent = `${teamStats[team].wins}`;
    const draws = document.createElement("td");
    draws.textContent = `${teamStats[team].draws}`;
    const losses = document.createElement("td");
    losses.textContent = `${teamStats[team].losses}`;
    const goalsFor = document.createElement("td");
    goalsFor.textContent = `${teamStats[team].goalsFor}`;
    const goalsAgainst = document.createElement("td");
    goalsAgainst.textContent = `${teamStats[team].goalsAgainst}`;
    const goalAverage = document.createElement("td");
    goalAverage.textContent = `${
      teamStats[team].goalsFor - teamStats[team].goalsAgainst
    }`;

    const row = document.createElement("tr");
    tblBody.appendChild(row);
    row.appendChild(ranking);
    row.appendChild(club);
    row.appendChild(points);
    row.appendChild(games);
    row.appendChild(wins);
    row.appendChild(draws);
    row.appendChild(losses);
    row.appendChild(goalsFor);
    row.appendChild(goalsAgainst);
    row.appendChild(goalAverage);
  });

  tbl.appendChild(tblBody);
  table.appendChild(tbl);
}

main();
