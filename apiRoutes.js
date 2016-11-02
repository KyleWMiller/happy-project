var
    apiRouter = require('express').Router(),
    ep = require('./bcontroller/easyPost.js')




// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                 Easy Post routes                  //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


// Create To/From Address
apiRouter.route('/epAddress')
    .post(ep.verifyAddress)

// Create Parcel
apiRouter.route('/epParcel')
    .post(ep.createParcel)

//  Create Shippment
apiRouter.route('/epShipment')
    .post(ep.createShipment)

// Buy Rate
// apiRouter.route('/epBuy')
//     .post(ep.buyShipment)


// Test Server link
// apiRouter.route('/')
//   .get(function(req,res){
//     res.send('hola')
//   })


module.exports = apiRouter
