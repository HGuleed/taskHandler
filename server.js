const { request } = require("express");
const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const PORT = 3001;
const app = express();

//Middleware
app.use(express.json());
app.use(express.static("public"));

//Routes for HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Routes for API endpoints
app.get("api/notes", (req, res) => {
  fs.readFile(db, "utf-8", (err, jsonString) => {
    if (err) {
      throw err;
    } else {
      console.log(jsonString);
    }
  });
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
