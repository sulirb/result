async function fetchResult() {
  const response = await fetch("http://localhost:2000");
  const data = await response.json();
  return data;
}

async function main() {
  const data = await fetchResult();
  console.log(data);
  const ligue = document.querySelector(".ligue");
  ligue.textContent = data.name;

  const scores = document.querySelector(".scores");
  let currentJournée;

  for (const match of data) {
    console.log(match);
    const score1 = match.score1;
    const score2 = match.score2;

    if (match.round === currentJournée) {
    } else {
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

    const event = new Date(match.date);
    const eventOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const date = document.createElement("p");
    date.textContent = `${event.toLocaleDateString("fr-FR", eventOptions)}`;
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

main();
