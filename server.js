//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// 		Server
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// Dependencies
var express	 = require("express"),
    app		 = express(),
    // express.js makes writing middleware for node.js servers easier //
    bodyParser	 = require('body-parser'),
    // body-parser parces incoming request bodies in biddleware before your handlers, available under the req.body property //
    logger	 = require('morgan'),
    // morgan logs the requests that are made to your server and gives color coded status //
    cors	 = require('cors'),
    // cors allows for cross origin recourse sharing (CORS)
    path	 = require('path'),
    // path allows provides utilities for working with local file and directory paths
    port	 = process.env.PORT || 3000
    //apiRoutes	 = require('./api_routes.js'),
    // DB
    //mongoose	 = require('mongoose'),
    //databaseURL= "mongodb://"n


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
//app.use('/api/vi', apiRoutes)
app.use(express.static(path.join(__dirname, './public')))
// http://localhost:3000/api/vi/'./public/*'
app.listen(port, function() {
	console.log("Server running on port: " + port)
})
