// import express from 'express' // ES2015 modules
const express = require("express");

const server = express();
const port = 5000;

const Hubs = require("./data/hubs-model.js"); // enables us to use the functions made in hubs-model. Similar to services or repos in Java

server.use(express.json()); // <<<< to parse JSON in POST

server.get("/", (req, res) => {
  res.send("Hello world!");
});

// The R in CRUD
server.get("/hubs", (req, res) => {
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The C in CRUD
server.post("/hubs", (req, res) => {
  // axios.post(url, data) < data shows up as req.body
  const hubInfo = req.body;
  console.log(hubInfo);

  Hubs.add(hubInfo)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The D in CRUD
server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params;

  Hubs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Can't find that hub." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// The U in CRUD
server.put("/hubs/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Can't find that hub." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

// install express: npm i express
// add index.js file to the root folder
// to run it: type npm run server
// to test it: go to http://localhost:5000 using a client

// Cannot GET /

// GET is an HTTP method
