async function fetchResult() {
  const response = await fetch("/assets/superliga2324.json");
  const data = await response.json();
  return data;
}

async function main() {
  const data = await fetchResult();
  const ligue = document.querySelector(".ligue");
  ligue.textContent = data.name;
  const anchorHTML = `<a href="table.html"> (classement)</a>`;
  ligue.insertAdjacentHTML("beforeend", anchorHTML);

  const scores = document.querySelector(".scores");
  let currentRound;

  for (const match of data.matches) {
    const score1 = match.score.ft[0];
    const score2 = match.score.ft[1];

    if (match.round === currentRound) {
    } else {
      currentRound = match.round;
      const heading = document.createElement("h2");
      heading.textContent = currentRound;
      scores.appendChild(heading);
    }

    const worksElmt = scores.appendChild(document.createElement("div"));
    worksElmt.classList.add("score");

    const date = document.createElement("p");
    date.textContent = `${match.date}`;
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
      team1.style.fontWeight = "700";
    } else if (score2 > score1) {
      team2.style.fontWeight = "700";
    }

    if (score1 === null || score2 === null) {
      score.textContent = ` - `;
    }

    score.classList.add("finalScore");
  }
}

main();
