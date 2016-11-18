(function() {
    'use strict';

    angular.module('epFactory', [])
        .factory('easypostFactory', ['$http',easypostFactory])

    easypostFactory.$inject = ['$http']

    function easypostFactory($http) {
        var ef = {},
            addressUrl = 'api/v1/epAddress',
            parcelUrl = 'api/v1/epParcel',
            shipmentUrl = 'api/v1/epShipment',
            buyUrl = 'api/v1/epBuy'


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

        ef.buyRate = function(rateid, shipmentid, callback) {
          // ES6 - String Literals
          const buyUrl = `${buyUrl}$id=${shipmentId}`
          const composedRateId = JSON.stringify({id: rateid})
          // Simple variable names on multi-argument function calls
          return $http.post(buyUrl, composedRateId)
              .then(function(res) {
                callback(res.data)
              })
        }
        return ef
    }
}());
