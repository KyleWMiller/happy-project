// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

var dbq = require('../model/epModel.js')

module.exports = {
    getAdds: (req, res) => {
        console.log('getting Adds')
        dbq.Address.find({},
            (err, add) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(add)
                }
            })
    },
    getParcels: (req, res) => {
        console.log('getting Parcels')
        dbq.Parcel.find({}, (err, parcels) => {
            if (err) {
                res.json(err)
            } else {
                res.json(parcels)
            }
        })
    },
    getShipmentRates: (req, res) => {
      console.log('getting shipment')
      dbq.Shipment.find({}, (err, shipment) => {
        if(err) {
          res.json(err)
        } else {
          res.json(shipment)
        }
      })
    }

}
