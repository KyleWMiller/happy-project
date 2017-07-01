//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// 		Server
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// Dependencies
var express = require("express"),
  // express.js makes writing middleware for node.js servers easier //
  app = express(),
  // body-parser parces incoming request bodies in middleware before your handlers, available under the req.body property //
  bodyParser = require('body-parser'),
  // morgan logs the requests that are made to your server and gives color coded status //
  logger = require('morgan'),
  // cors allows for cross origin recourse sharing (CORS)
  cors = require('cors'),
  corsOptions = {
    origin: '',
    optionsSuccessStatus: 200,
  },
  
  // path allows/provides utilities for working with local file and directory paths
  path = require('path'),
  apiRoutes = require('./apiRoutes.js'),
  port = process.env.PORT || 3000,

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
  // 		DataBase
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
  mongoose = require('mongoose'),
  // Mongoose is used for backend validation of information going to MongoDB
  // Local DB link
  // databaseURL = "mongodb://localhost:27017/hsdb,"
  // Mlab DB link
  databaseURL = "mongodb://Michael:ispeakgerman@ds139470.mlab.com:39470/heroku_fqsdtdjx"
mongoose.Promise = global.Promise
mongoose.connect(databaseURL, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log('connected to db')
  }
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
// add corsOptions object once this project has a more permanent home
app.use(cors()) //TODO make cors availible only to angular frontend
app.use('/api/v1', apiRoutes)
app.use(express.static(path.join(__dirname, './public')))
// http://localhost:3000/api/v1/'./public/*'
app.listen(port, function() {
  console.log("Server running on port: " + port)
})
