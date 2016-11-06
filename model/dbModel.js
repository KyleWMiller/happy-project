//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schemas for EasyPost
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// formats the information recieved from db collection
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    addressResId = new Schema({
        id: String,
        name: String,
        company: String
    })

module.exports = {
    Add = mongoose.model('Adds', addressResId)
}
