(function() {
    'use strict';

    angular.module('shipFactory', [])
        .factory('shipmentFactory', shipmentFactory)

    function shipmentFactory($http) {
        var shipment = {},
            apiUrl = '/api/v1/shipments'

        shipment.getShipmentRates = function() {
            return $http.get(apiUrl)
        }
        return shipment
        console.log(shipment)
    }

}());
