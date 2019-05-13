const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "Kev",
    password: "",
    database: "facerec"
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "john",
      email: "john@gmail.com",
      password: "cookies",
      entries: "0",
      joined: new Date()
    },
    {
      id: "124",
      name: "sally",
      email: "sally@gmail.com",
      password: "bans",
      entries: "0",
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
  ) {
    res.json(database.users[1]);
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  db("users")
    .returning("*")
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(user => {
      res.json(user[0]);
    })
    .catch(err => res.status(400).json("unable to register"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found");
      }
    })
    .catch(err => res.status(400).json("user not found"));
});

app.put("/image/", (req, res) => {
  const { id } = req.body;
  // prettier-ignore
  db("users")
      .where('id', '=', id)
      .increment("entries", 1)
      .returning("entries")
      .then(entries => {
        res.json(entries[0])
      })
      .catch(err => res.status(400).json("unable to get entries"))
});

// db.select("*")
// .from("users")
// .where({ id })
// .then(user => {
//   res.json(++user[0].entries);
// })
// .catch(err => res.status(400).json("user not found"));

app.listen(3000, () => {
  console.log("running on port 3000");
});

// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user object
// /profile/:userId --> GET = user
// /image --> PUT = user count++
