const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
dotenv.config();


const goalsRouter = require("./goals/goals.router");


app.use("/goals", goalsRouter);



module.exports = app;
