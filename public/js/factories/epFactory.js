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
          var updatedBuyUrl = `${buyUrl}/${shipmentid}`
          var rate = JSON.stringify({id: rateid})
          console.log(rate)

          return $http.post(updatedBuyUrl, rate)
              .then(function(res) {
                callback(res.data)
              })
        }
        return ef
    }
}());
