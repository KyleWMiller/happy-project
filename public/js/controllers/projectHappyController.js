(function() {
  'use strict';

    angular.module('projectHappyCtrl',[])
      .controller('projectHappyController', projectHappyController)

      function projectHappyController(addressFactory, parcelFactory) {
        var phc = this

        phc.shipment = {}

        // Gets addresses from db for storage in shipment
        phc.addresses = []
        phc.getAdds = function() {

          addressFactory.addressList()
            .then(function(res) {
              phc.addresses = res.data
              phc.shipment.toAddress = phc.addresses[0].id
              phc.shipment.fromAddress = phc.addresses[1].id
            })
        }

        // gets parcels from db for storage in shipment
        phc.parcels = []
        phc.getParcels = function() {

          parcelFactory.parcelList()
            .then(function(res) {
              phc.parcels = res.data
              phc.shipment.parcel = phc.parcels[0].id
            })
        }

      }

}());
