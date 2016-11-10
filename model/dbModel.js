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
    }),
    parcelRes = new Schema({
        id: String,
        created_at: String,
        length: String,
        width: String,
        height: String,
        weight: String
    })


module.exports = {
    Add = mongoose.model('Adds', addressResId),
    Parcel = mongoose.model('Parcels', parcelRes)
}
