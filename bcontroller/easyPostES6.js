module.exports = {
  verifyAddress: (req, res) => {
    console.log('request to verify address recieved')
    const address = easypost.Address.create(req.body, (err, fromAddress) => {
      let verifiedAddress = {}

      const fromAddressVerify = (fromAddress) => {
        return new Promise((fulfill, reject) => {
          fromAddress.verify((err, response) => {
            if(err!=null){
              reject(err)
            }
            fulfill(response)
          })
        })
      }
      fromAddressVerify(fromAddress)
      .then()
      .catch(err => {console.log(err)})
}
