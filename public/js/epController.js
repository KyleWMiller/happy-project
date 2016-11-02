(function() {
  'use strict';
  angular.module('epController', [])
    .controller('easypostController', easypostController)

    easypostController.$inject = ['easypostFactory']

    function easypostController(easypostFactory) {
      var epc = this

      epc.address = {}
      epc.sendAddress = function() {

        epFactory.send(epc.address)
          .then(function(res){
            console.log(res)
            epc.address = {}
            console.log("Successfullly sent address")
          })
      }
    }

}());
