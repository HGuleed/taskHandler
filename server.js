const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const { status } = require("express/lib/response");
const { stringify } = require("querystring");
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

// Routes for API endpoints
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(data);
      res.status(200).json(JSON.parse(data));
    }
  });
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    const parsedData = JSON.parse(data);
    // console.log(JSON.parse(data));
    // console.log(typeof parsedData);
    parsedData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json(parsedData);
    });
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
// app.post
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
