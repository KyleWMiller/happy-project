//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Server side controller to create api routes for products
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

var easypost = require('node-easypost')(apiKey),
    apiKey   = "SXMggE7i1n5Eq6CAlXQNYw"

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
//                      Easy Post                        //
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

    // Verify Address
easypost.Address.create(fromAddress, function(err, fromAddress){
  fromAddress.verify(function(err, response){
    if (err){
      console.log('Address is invalid.')
    } else if (response.message !== undefined && response.message != null){
      console.log('Address is valid but has an issue:', response.message)
      var verifiedAddress = response.address
    } else {
      var verifiedAddress = response

    }
  })
})

    // Create Shippment
easypost.Shipment.create({
  to_address: toAddress,
  from_address: fromAddress,
  parcel: parcel,
})
