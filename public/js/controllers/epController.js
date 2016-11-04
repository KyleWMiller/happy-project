(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', easypostController)

    easypostController.$inject = ['easypostFactory']

    function easypostController(easypostFactory) {
        var epc = this

        epc.address = {}
        epc.sendAddress = function() {
        epc.resId = {}

            easypostFactory.send(epc.address)
                .then(function(res) {
                    console.log("Successfullly sent address epc")
                    // epc.resId = easypostFactory.resId
                    epc.address = {}
                })
                // console.log(epc.resId)
        }
    }

}());
