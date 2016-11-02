// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


var apiKey = "SXMggE7i1n5Eq6CAlXQNYw",
    easypost = require('node-easypost')(apiKey)

// Objects needed and models
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// var fromAddress = {
//         name: "Satcom Direct",
//         street1: "1901 Highway A1A",
//         city: "Satellite Beach",
//         state: "FL",
//         zip: "32937",
//         country: "US",
//         phone: "+1-321-777-3000",
//         email: "SDR@satcomdirect.com"
//     },
//     toAddress = {
//         name: "Mr President",
//         street1: "1600 Pennsylvania Ave NW",
//         city: "Washington",
//         state: "DC",
//         zip: "2500",
//         country: "US",
//         phone: "970-964-8364",
//         email: "miller.kwill@gmail.com"
//     },
//     parcel = {
//         height: "15",
//         width: "10",
//         length: "7",
//         weight: "176"
//     }

module.exports = {
    verifyAddress: function (req, res){

      console.log('request to verify address recieved')

        var address = easypost.Address.create(req.body, function(err, fromAddress) {
          var verifiedAddress = {}
          fromAddress.verify(function (err,response){
            console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
            if (err) {
              console.log('Address is invalid.')
            } else if (response.message !== undefined && response.message != null) {
              console.log('Address is valid but has an issue:', response.message)
              var verifiedAddress = response.address
            } else {

              verifiedAddress = response.address
            }
            console.log(verifiedAddress)
          })
        })
    },

    createParcel: function(req,res){
      console.log('request to create parcel recieved')

      easypost.Parcel.create({
         parcel : req.body
        }, function(err,response){
          if(err) {
            console.log(err)
          } else {
            console.log(response)
          }
      })
    },

    createShipment: function (req, res) {

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
