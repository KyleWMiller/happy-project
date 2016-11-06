// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


var apiKey   = "SXMggE7i1n5Eq6CAlXQNYw",
    easypost = require('node-easypost')(apiKey),
    db       = require('../model/epModel.js')

module.exports = {
    // verifyAddress sends the sser's input to the EasyPost API and stores that
    //   response in the addresses DB.
    verifyAddress: function(req, res) {

      console.log(req.body)

        console.log('request to verify address recieved')
        // console.log(req.body)
        var address = easypost.Address.create(req.body, function(err, fromAddress) {
            var verifiedAddress = {}
            fromAddress.verify(function(err, response) {
                console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
                if (err) {
                    console.log('Address is invalid.')
                } else if (response.message !== undefined && response.message != null) {
                    console.log('Address is valid but has an issue:', response.message)
                    var verifiedAddress = response.address
                } else {
                    verifiedAddress = response.address
                    console.log(verifiedAddress)
                    // Send the address to the DB for storage
                    var address = new db.Address(verifiedAddress)
                    address.save({verifiedAddress}, function(err,address){
                      if(err) {
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
        }, function(err, response) {
            if (err) {
                console.log(err)
            } else {
                console.log(response)
            }
        })
    },

    //  TODO: Not FKn blow
    createShipment: function(req, res) {

        console.log(req.body)
        easypost.Shipment.create({
            to_address: req.body.toAddress,
            from_address: req.body.fromAddress,
            parcel: req.body.parcel
                // customs_info: customsInfo
        }, function(err, shipment) {
            // buy postage label with one of the rate objects
            console.log(shipment.rates)
            console.log(shipment)
                // shipment.buy({
                //     rate: {}
                // }, function(err, shipment) {
                //     console.log('========================================')
                //     // console.log(err)
                //     console.log(shipment.rates)
                //     console.log('========================================')
                //     console.log(shipment.tracking_code)
                //     console.log(shipment.postage_label.label_url)
                // });
        })
    }
}
