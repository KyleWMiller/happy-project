// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

// Helper functions - primarily Promise wrappers for natively async functions

// this function's construction assumes that toAddress has a similar .verify() method
// and has been generified accordingly
const addressCreate = (req) => {
  return new Promise((fulfill, reject) => {
    easypost.Address.create(req.body, (err, address) => {
      if(err) {
        reject(err)
      }
      fulfill(address)
    })
  })
}

const addressVerify = (address) => {
    return new Promise((fulfill, reject) => {
          address.verify((err, response) => {
              if(err) {
                  reject(err)
              } else if (!response.address) {
                  reject(`address.verify() returned without address: ${response}`)
              }
              fulfill(response)
          })
      })
}

const addressPersist = (db, address) => {
  return new Promise((fulfill, reject) => {
    const addressToPersist = new db.Address(address)
    addressToPersist.save((err, savedAddress) => {
      if(err) {
        reject(err)
      }
      fulfill(savedAddress)
    })
  })
}
// /helpers

const easypost = require('node-easypost')(apiKey),
        apiKey = "SXMggE7i1n5Eq6CAlXQNYw",
            db = require('../model/epModel.js')

module.exports = {
    // verifyAddress sends the user's input to the EasyPost API and stores that
    //   response in the addresses DB.
    verifyAddress: (req, res) => {
      addressCreate(req)
        .then(addressVerify)
        .then(addressPersist.bind(null, db))
        .then((savedAddress) => {
          res.json(savedAddress)
        })
        .catch((err) => {console.log(`Error while verifying and saving an address: ${err}`)})
    },
    // createParcel returns the parcel id for Shipment
    createParcel: function(req, res) {
        console.log('request to create parcel recieved')

        easypost.Parcel.create({
            parcel: req.body
        }, function(err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
                var parcel = new db.Parcel(res)
                parcel.save({
                  res
                }, function(err, parcel) {
                  if(err) {
                    res.json(err)
                  }
                })
            }
        })
    },


    createShipment: function(req, res) {

        // console.log(req.body.to_address)
        // console.log(req.body.from_address)
        // console.log(req.body.parcel)

        const shipmentDetails = {
            to_address: {id: req.body.to_address},
            from_address: {id: req.body.from_address},
            parcel: {id: req.body.parcel},
            customs_info: null
                // customs_info: customsInfo
        }
        // console.log(shipmentDetails)

        easypost.Shipment.create(shipmentDetails, function(err, shipment) {
            // buy postage label with one of the rate objects
            // console.log(shipment.rates)
            console.log(shipment)
        })
    }

    // buyShipment: (req, res) => {
    //   // var shipment = req.body.shipment
    //
    //   easypost[req.body.shipment]buy({
    //     rate = {id: req.body.rate}
    //   } (err, shipment) => {
    //     console.log(shipment)
    //     // console.log(shipment.rates)
    //     // console.log(shipment.tracking_code)
    //     // console.log(shipment.postage_lable.lable_url)
    //   })
    // }
}
