//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schemas for EasyPost
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// formats information recieved from ep.verifyAddress to be stored in db
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    po = new Schema({
        itemArray: Array,
        shipmentsInfo: Array
    })

module.exports = {
    PO: mongoose.model('PO', po),
}
