const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//port define
const port = process.env.port || 5000;

//  app initailaize
const app = express();

// middleware use
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Root Route
app.get("/", (req, res) => {
  res.json({
    message: "I am Root Route",
  });
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
