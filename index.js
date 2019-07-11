// import express from 'express' // ES2015 modules
const express = require("express");

const server = express();

const db = require("./data/hubs-model.js"); // enables us to use the functions made in hubs-model. Similar to services or repos in Java

server.get("/", (req, res) => {
  res.send("Hello world!");
});

// The R in CRUD
server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

const port = 5000;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));

// install express: npm i express
// add index.js file to the root folder
// to run it: type npm run server
// to test it: go to http://localhost:5000 using a client

// Cannot GET /

// GET is an HTTP method
