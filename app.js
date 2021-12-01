const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

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

//Poll create Route
app.get("/create", pollController.pollGetController);

//Poll post Route
app.post("/create", pollController.pollPostController);


//Root Route
app.get("/", (req, res) => {
  res.render('create');
});

// database conncet and server listen
mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    app.listen(port, () => {
      console.log("Application is ready to serve on port", port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
