//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//
// Schemas for EasyPost
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=//

// formats information recieved from ep.verifyAddress
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    address = new Schema({
        id: String,
        object: String,
        created_at: String,
        updated_at: String,
        name: String,
        company: String,
        street1: String,
        street2: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        phone: String,
        email: String,
        mode: String,
        carrier_facility: String,
        residential: Boolean,
        federal_tax_id: String,
        state_tax_id: String,
        verifications: Object
    }),
    parcel = new Schema({
        id: String,
        created_at: String,
        length: String,
        width: String,
        height: String,
        weight: String
    }),
    shipment = new Schema({
        created_at: String,
        updated_at: String,
        customs_info: Object,
        from_address: Object,
        insurance: Object,
        parcel: Object,
        rates: Array,
        to_address: Object,
        usps_zone: Number,
        return_address: Object,
        buyer_address: Object,
        id: String
    })

module.exports = {
    Address: mongoose.model('Addresses', address),
    Parcel: mongoose.model('Parcels', parcel)
}
