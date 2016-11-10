(function() {
  'use strict';

    angular.module('parcelController',[])
      .controller('parcelController', parcelController)

      function parcelController(parcelFactory) {
        var pc = this

        pc.parcels = []

        pc.getParcelIds = function() {
          parcelFactory.parcelList()
            .then(function(res){
              // console.log("getting parcels")
              pc.parcels = res.data
            })
        }

      }
}());
