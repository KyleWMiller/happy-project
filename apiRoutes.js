macvar
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
apiRouter.route('/epBuy/:id')
    .post(ep.buyShipment)

// Store PO
apiRouter.route('/dbPO')
    .post(ep.storePO)

// Retrieve POs
apiRouter.route('/POs')
    .get(dbq.getPOs)

// Return Individual PO
apiRouter.route('/PO/:poNum')
    .get(dbq.getOnePO)

// Update PO
apiRouter.route('/updatePO')
    .put(dbq.updatePO)

module.exports = apiRouter
