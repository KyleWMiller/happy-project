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
        console.log('request to verify address recieved')
        let add = req.body
        let address = easypost.Address.create(add, (err, fromAddress) => {
            let verifiedAddress = {}
            fromAddress.verify((err, response) => {
                if (err) {
                } else if (response.message !== undefined && response.message !== null) {
                    let verifiedAddress = response.address
                } else {
                    verifiedAddress = response.address
                    res.status(201).json(verifiedAddress)
                }
            })
        })
    },
    // createParcel returns the parcel id for Shipment
    createParcel: (req, res) => {
        console.log('request to create parcel recieved')
        let prcl = req.body
        easypost.Parcel.create(prcl, (err, res) => {
            if (err) {
                console.log(err)
            } else {
              console.log("res",res)
              let verifiedParcel = res
              // console.log(verifiedParcel)
              // res.status(201)
            }
        })
    },


    createShipment: (req, res) => {

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

        easypost.Shipment.create(shipmentDetails, (err, shipment) => {
            // buy postage label with one of the rate objects
            // console.log(shipment.rates)
            console.log(shipment)
            const shpmnt = new db.Shipment(shipment)
            shpmnt.save({
              shipment
            }, (err, shipment) => {
              if(err) {
                res.json(err)
              } else {
                res.status(201).json(shipment)

              }
            })
        })
    },

    buyShipment: (req, res) => {

      // let shipment = req.body.shipment
      let rate     = req.body.rate,
          shipment = req.body.shipment,
          hunterShip = easypost.Shipment.retrieve(req.params.id, (err, shipment) => {
            if(err) {
              res.json(err)
            }

            shipment.buy(rate, (err, purchase) => {
              if(err){
                res.json(err)
              } else {
                console.log(purchase)
                res.json(purchase)
              }
            })
          })
    }
}
