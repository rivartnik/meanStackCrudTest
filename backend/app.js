const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const bucketRoutes=require("./routes/bucket")
dataBaseConfig = require('./database/db');

mongoose.connect(dataBaseConfig.db).then(() => {
  console.log("Connected to db")
}).catch(() => {
  console.log("Connection to mongodb failed")
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//nastavimo headerje
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/bucket",bucketRoutes)

module.exports = app;
