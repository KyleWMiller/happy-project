(function() {
    'use strict';

    angular.module('epFactory', [])
        .factory('easypostFactory', ['$http',easypostFactory])

    easypostFactory.$inject = ['$http']

    function easypostFactory($http) {
        var ef = {},
            addressUrl = 'api/v1/epAddress'


        ef.sendAddress = function(address, callback) {
            return $http.post(addressUrl, address)
                .then(function(res) {
                    callback(res.data)
                })
        }

        ef.sendParcel = function(parcel, callback) {
            return $http.post(parcelUrl, parcel)
                .then(function(res) {
                  callback(res.data)
                })
        }

        ef.sendShipment = function(shipment,callback) {
            return $http.post(shipmentUrl, shipment)
                .then(function(res) {
                  callback(res.data)
                })
        }
        return ef
    }
}());
