const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mysql = require("mysql2");
require("express-async-errors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

const connection = mysql.createConnection({
  host: "***",
  user: "***",
  password: "***",
  database: "***",
});

// Connecter la base de données
connection.connect((err) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion à la base de données :",
      err.message
    );
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.get("/", (req, res) => {
  let allgames = `SELECT * FROM foot.ligue1_2324 ORDER BY round ASC, date ASC, hour ASC`;

  connection.query(allgames, [true], (error, results, fields) => {
    if (error) {
      console.error(
        "Erreur lors de la requête à la base de données :",
        error.message
      );
      return res.status(500).send("Erreur lors de la récupération des données");
    }
    res.send(results);
  });
});

module.exports = app;
