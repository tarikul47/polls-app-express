const express = require("express");
const { MongoClient } = require("mongodb");
const morgan = require("morgan");
const mongoose = require("mongoose");

// for env file support
require("dotenv").config();


//  app initailaize
const app = express();

//port define
const port = process.env.port || 5000;

//  view engine set with ejs
app.set('view engine','ejs');

// PollController require 
const pollController = require('./PollController');

// middleware use
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Poll root Route
app.get("/", pollController.pollGetController);

//Poll post Route
app.post("/create", pollController.pollPostController);

//Single poll Route
app.get("/poll/:id", pollController.viewPollSingleController);


//Single poll vote Route
app.post("/poll/:id", pollController.viewPollPostController);


//Root Route
app.get("/", (req, res) => {
  res.render('create');
});

// database conncet and server listen
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dyvua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(port, () => {
      console.log("Application is ready to serve on port", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
