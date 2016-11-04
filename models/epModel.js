//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schema for Products
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    address = new Schema ({
      id: String,
      company: String,
      street1: String,
      street2: String,
      city: String,
      state: String,
      zip: String,
      country: String,
      phone: String,
      email: String,
      

    })

module.exports = {
  Address: mongoose.model('Adresses', address)
}
