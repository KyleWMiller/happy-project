// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
  // currently not en use use for template for future db calls

var dbq = require('../model/epModel.js')

module.exports = {
    getPOs: (req, res) => {
        console.log('getting POs')
        dbq.PO.find({}, (err, pos) => {
              if (err) {
                  res.status(400).json(err)
              } else {
                  res.status(200).json(pos)
              }
          })
    },
    getOnePO: (req, res) => {
      console.log("getting PO")
      let poNum = req.params.poNum
      dbq.PO.find({"poNum": poNum}, (err, po) => {
            if (err) {
              res.status(400).json(err)
            } else {
              res.status(200).json(po)
            }
      })
    },
    updatePO: (req, res) => {
      console.log(`update po ${req.body.poNum}`)
      let poNum = req.body.poNum
      dbq.PO.update({"poNum": poNum}, req.body, (err,po) => {
        if(err) {
          res.status(400).json(err)
        } else {
          res.status(200)
          console.log(`updated po ${req.body.poNum}`)
        }
      })
    }

}
