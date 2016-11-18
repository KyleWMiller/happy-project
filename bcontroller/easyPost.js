// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


let apiKey = "SXMggE7i1n5Eq6CAlXQNYw",
    easypost = require('node-easypost')(apiKey),
    db = require('../model/epModel.js')

module.exports = {
    // verifyAddress sends the user's input to the EasyPost API and stores that
    //   response in the addresses DB.
    verifyAddress: (req, res) => {
        const address = req.body

        epResourceCreate('Address', address)
        .then(addressVerify)
        .then(addressVerifyResponse => {
          if(!response.message) {
            return Promise.reject('address verification failed')
          }
          return Promise.fulfill(response.address)
        })
        .then(respond)
        .catch(respondError)
    },
    // createParcel returns the parcel id for Shipment
    createParcel: (req, res) => {
        const parcel = req.body

        epResourceCreate('Parcel', parcel)
        .then(respond)
        .catch(respondError)
    },

    createShipment: (req, res) => {
        const shipmentDetails = {
            to_address: {id: req.body.to_address},
            from_address: {id: req.body.from_address},
            parcel: {id: req.body.parcel},
            customs_info: req.body.customsInfo
        }

        epResourceCreate('Shipment', shipmentDetails)
        .then(respond)
        .catch(respondError)
    },

    buyShipment: (req, res) => {
      const rate       = req.body.rate
      const shipmentId = req.params.id

      epShipmentRetrieve(shipmentId)
      .then(epBuy.bind(null, rate))
      .then(respond)
      .catch(respondError)
    }
}

const epAddressVerify = address => {
  return new Promise((fulfill, reject) => {
    address.verify((err, verifiedAddress) => {
      if(err) {
        reject(err)
      }
      fulfill(verifiedAddress)
    })
  })
}

const epShipmentRetrieve = (shipmentId) => {
  return new Promise((fulfill, reject) => {
    easypost.Shipment.retrieve(req.params.id, (err, shipment) => {
      if(err) {
        reject(err)
      }
      fulfill(shipment)
    })
  })
}

const epBuy = (rate, shipment) => {
  return new Promise((fulfill, reject) => {
    shipment.buy(rate, (err, purchase) => {
      if(err) {
        reject(err)
      }
      fulfill(purchase)
    })
  })
}

const epResourceCreate = (resourceType, details) => {
  return new Promise((fulfill, reject) => {
    easypost[resourceType].create(details, (err, createdResource) => {
        if(err) {
          reject(err)
        }
        fulfill(createdResource)
    })
  })
}

const respond = successObject => {
  console.log(successObject)
  res.status(201).json(successObject)
}

const respondError = err => {
  res.json(err)
}
