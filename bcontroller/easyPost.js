// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


var apiKey = "SXMggE7i1n5Eq6CAlXQNYw",
    easypost = require('node-easypost')(apiKey),
    db = require('../model/epModel.js')

module.exports = {
    // verifyAddress sends the user's input to the EasyPost API and stores that
    //   response in the addresses DB.
    verifyAddress: (req, res) => {
        console.log('request to verify address recieved')
        var address = easypost.Address.create(req.body, (err, fromAddress) => {
            var verifiedAddress = {}
            fromAddress.verify((err, response) => {
                if (err) {
                } else if (response.message !== undefined && response.message != null) {
                    var verifiedAddress = response.address
                } else {
                    verifiedAddress = response.address
                        // Send the address to the DB for storage
                    var address = new db.Address(verifiedAddress)
                    address.save({
                        verifiedAddress
                    }, (err, address) => {
                        if (err) {
                            res.json(err)
                        } else {
                            res.json(address)
                        }
                    })
                }
            })
        })
    },
    // createParcel returns the parcel id for Shipment
    createParcel: (req, res) => {
        console.log('request to create parcel recieved')

        easypost.Parcel.create({
            parcel: req.body
        }, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(res)
                var parcel = new db.Parcel(res)
                parcel.save({
                  res
                }, (err, parcel) => {
                  if(err) {
                    res.json(err)
                  }
                })
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
            const parcel = new db.Shipment(shipment)
            parcel.save({
              shipment
            }, function(err, shipment){
              if(err) {
                res.json(err)
              }
            })
        })
    },

    buyShipment: (req, res) => {
      // var shipment = req.body.shipment
      let rate = {
        rate: req.body
      }

      easypost.Shipment.buy(rate , (err, shipment) => {
        console.log(shipment)
        // console.log(shipment.rates)
        // console.log(shipment.tracking_code)
        // console.log(shipment.postage_lable.lable_url)
      })
    }
}
