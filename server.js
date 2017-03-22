//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// 		Server
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// Dependencies
var express = require("express"),
    app = express(),
    // express.js makes writing middleware for node.js servers easier //
    bodyParser = require('body-parser'),
    // body-parser parces incoming request bodies in middleware before your handlers, available under the req.body property //
    logger = require('morgan'),
    // morgan logs the requests that are made to your server and gives color coded status //
    cors = require('cors'),
    // cors allows for cross origin recourse sharing (CORS)
    path = require('path'),
    // path allows provides utilities for working with local file and directory paths
    port = process.env.PORT || 3000
apiRoutes = require('./apiRoutes.js'),
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
    // 		DataBase
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

    mongoose = require('mongoose'),
    // Mongoose is used for backend validation of information going to MongoDB
    // Local DB link
    // databaseURL = "mongodb://localhost:27017/hsdb,"
    // Mlab DB link
    databaseURL = "mongodb://Jerry:comedianporche@ds139470.mlab.com:39470/heroku_fqsdtdjx"
    mongoose.Promise = global.Promise
    mongoose.connect(databaseURL, function(err) {
      if (err) {
        console.log(err)
      }
      console.log('connected to db')
    })

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use('/api/v1', apiRoutes)
app.use(express.static(path.join(__dirname, './public')))
    // http://localhost:3000/api/vi/'./public/*'
app.listen(port, function() {
    console.log("Server running on port: " + port)
})
