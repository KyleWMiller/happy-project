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
                  res.json(err)
              } else {
                  res.json(pos)
              }
          })
    }

}
