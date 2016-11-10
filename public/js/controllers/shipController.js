(function() {
    'use strict';

    angular.module('shipController', [])
        .controller('shipmentController', [ 'addressController', 'parcelController', shipmentController])

    function shipmentController(addressController, parcelController) {
        var sc = this

        sc.shipment = {
            toAddress: addc.addresses[0].id,
            fromAddress: addc.addresses[1].id,
            parcel: pc.parcels[0].id
        }

    }


}());
