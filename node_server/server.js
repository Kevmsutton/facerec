const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("getting root");
});

app.post("/profile", (req, res) => {
  console.log(req.body);
  res.send("success");
});

app.listen(3000);

// req.headers
