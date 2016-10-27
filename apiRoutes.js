var
    apiRouter = require('express').Router(),
    pctrl     = require('./bcontroller/product_route_controller.js'),
    ep        = require('easyPostRoutes.js')

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// route to create user //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

apiRouter.route('/epAddress')
  .post(validate )



module.exports = apiRouter
