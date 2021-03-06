var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var linksRouter = require('./routes/links');

var { MongoMemoryServer } = require('mongodb-memory-server');

async function initDB() {
  const mongod = new MongoMemoryServer();

  const uri = await mongod.getUri();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();

  mongod.getInstanceInfo(); // return Object with instance data
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

initDB();

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`Server started on port ${PORT}. http://localhost:${PORT}`));

app.use('/', indexRouter);
app.use('/links', linksRouter);

module.exports = app;
