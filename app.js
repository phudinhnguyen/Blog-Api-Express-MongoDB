// Import
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');
require('dotenv').config();
var cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Your secret key" }));
// Use Router

const article = require("./Router/Article");
const userRouter = require("./Router/User");

app.use("/article", article);
app.use("/user", userRouter);

app.listen(3000);