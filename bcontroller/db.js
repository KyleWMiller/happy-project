4 // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
//                    Easy Post                      //
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

var dbq = require('../model/epModel.js')

module.exports = {
    getAdds: function(req, res) {
        console.log('getting Adds')
        dbq.Address.find({},
            function(err, add) {
                if (err) {
                    res.json(err)
                } else {
                    res.json(add)
                }
            })
    }

}
