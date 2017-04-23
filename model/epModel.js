//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schemas for EasyPost
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// formats information recieved from ep.verifyAddress to be stored in db
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    po = new Schema({
        poNum: String,
        contactAddress: Object,
        itemArray: Array,
        shipmentInfo: Array,
        shipDate: String,
        orderDate: String
    })

module.exports = {
    PO: mongoose.model('PO', po),
}
