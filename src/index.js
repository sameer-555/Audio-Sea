require("dotenv").config();
var express = require("express");
const app = express();
const mongoose = require("mongoose");
const trackRoute = require("./routers/TrackRouter");

const uri = `mongodb+srv://admin:${process.env.DBPASS}@cluster0.0wkqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb is connected");
    }
  }
);

//routers
app.use("/tracks", trackRoute.routes);

app.listen(3000, () => console.log("listing on port 3000"));
