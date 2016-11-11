// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


var apiKey = "SXMggE7i1n5Eq6CAlXQNYw",
    easypost = require('node-easypost')(apiKey),
    db = require('../model/epModel.js')

module.exports = {
    // verifyAddress sends the sser's input to the EasyPost API and stores that
    //   response in the addresses DB.
    verifyAddress: function(req, res) {
        console.log('request to verify address recieved')
        var address = easypost.Address.create(req.body, function(err, fromAddress) {
            var verifiedAddress = {}
            fromAddress.verify(function(err, response) {
                if (err) {
                } else if (response.message !== undefined && response.message != null) {
                    var verifiedAddress = response.address
                } else {
                    verifiedAddress = response.address
                        // Send the address to the DB for storage
                    var address = new db.Address(verifiedAddress)
                    address.save({
                        verifiedAddress
                    }, function(err, address) {
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
