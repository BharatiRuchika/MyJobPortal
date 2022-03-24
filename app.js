// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
var logger = require('morgan');
const fs = require("fs");
require('dotenv').config({ path: './config/config.env' })
//  const connectDatabase = require("./config/database");
const Databaseconnect = require("./config/database");
Databaseconnect.connect();
//var indexRouter = require('./routes/index');
// import {indexRouter} from "./routes/index.js"
var usersRouter = require('./routes/users');
// import usersRouter from "./routes/users.js"
var jobsRouter = require('./routes/jobs');
// import jobsRouter from "./routes/jobs.js"
// import uploadRouter from './routes/upload.js';
const cors = require("cors");
const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type Accept');
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cookieParser());

// if (!fs.existsSync("./public")) {
//   fs.mkdirSync("./public");
// }
// if (!fs.existsSync("./public/resume")) {
//   fs.mkdirSync("./public/resume");
// }
// if (!fs.existsSync("./public/profile")) {
//   fs.mkdirSync("./public/profile");
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/api', jobsRouter);

if(process.env.NODE_ENV==="production"){
  app.use(express.static("job-portal-frontend/build"));
  const path = require("path");
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'job-portal-frontend/build'))
})
}
// app.use('/upload',uploadRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const PORT = process.env.PORT||3001;
app.listen(`${PORT}`,()=>console.log(`server started at ${PORT}`
));
module.exports = app;
