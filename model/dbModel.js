//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schemas for EasyPost
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// models not in use

// formats the information recieved from db collection
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    po = new Schema({
      poNum: Number,
      shipmentInfo: Array,
      itemArray: Array
    })


module.exports = {
    PO = mongoose.model('POs', po)
}
