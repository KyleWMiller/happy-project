(function() {
    'use strict';

    angular.module('addController', [])
        .controller('addressController', addressController)

    addressController.$inject = ['addressFactory']

    function addressController(addressFactory) {
        var addc = this

        addc.addresses = []
        addc.getAdds = function() {

            addressFactory.getAll()
                .then(function(res) {
                    console.log("Successfully got adds")
                    addc.addresses = res.data
                    // console.log(addc.addresses)
                })
        }

    }
}());
