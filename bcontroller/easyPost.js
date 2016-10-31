// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //


var easypost = require('node-easypost')(apiKey),
    apiKey = "SXMggE7i1n5Eq6CAlXQNYw"

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
//         name: "Kyle Miller",
//         street1: "165 Maplewood N",
//         city: "Kyle",
//         state: "TX",
//         zip: "78640",
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

//TO DO: Troubleshoot `fromAddress.verify : "Not a Function"`
module.exports = {
    verifi: function (request, response){
      console.log('request to verify address recieved')
      // console.log(request.body)
      console.log(request.body.fromAddress)
      var fromAddress = request.body.fromAddress
      easypost.Address.create(fromAddress, function(err, fromAddress) {
        console.log(fromAddress, "=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
        fromAddress.verify(function(err, response) {
        if (err) {
          console.log('Address is invalid.')
        } else if (response.message !== undefined && response.message != null) {
          console.log('Address is valid but has an issue:', response.message)
          var verifiedAddress = response.address
        } else {
          var verifiedAddress = response
        }
          console.log(verifiedAddress)

      })
    })
  },

    create: function (req, res) {
      easypost.Shipment.create({
          to_address: toAddress,
          from_address: fromAddress,
          parcel: parcel
              // customs_info: customsInfo
      }, function(err, shipment) {
          // buy postage label with one of the rate objects
          shipment.buy({
              rate: shipment.lowestRate(['USPS', 'ups']),
              insurance: 100.00
          }, function(err, shipment) {
              console.log(shipment.tracking_code);
              console.log(shipment.postage_label.label_url);
          });
      })
    }
  }
