var
    apiRouter = require('express').Router(),
    ep = require('./bcontroller/easyPost.js'),
    // Data Base Queries
    dbq = require('./bcontroller/db.js')




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
apiRouter.route('/epBuy')
    .post(ep.buyShipment)

// Retrive address ids
apiRouter.route('/addresses')
    .get(dbq.getAdds)

// Retrive parcel ids
apiRouter.route('/parcels')
  .get(dbq.getParcels)

apiRouter.route('/shipments')
  .get(dbq.getShipmentRates)

module.exports = apiRouter
