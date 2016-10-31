var
    apiRouter = require('express').Router(),
    ep        = require('./bcontroller/easyPost.js')



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                 Easy Post routes                  //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


// Verity Address
apiRouter.route('/epAddress')
    .post(ep.verifi)

//  Create Shippment
apiRouter.route('/epShipment')
    .post(ep.create)

module.exports = apiRouter
