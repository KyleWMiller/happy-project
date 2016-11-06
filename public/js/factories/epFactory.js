(function() {
    'use strict';

    angular.module('epFactory', [])
        .factory('easypostFactory', easypostFactory)

    easypostFactory.$inject = ['$http']

    function easypostFactory($http) {
        var address = {},
            addressUrl = 'api/v1/epAddress'

        address.send = function(address) {
            return $http.post(addressUrl, address)
                // epf.resId = address
            console.log(address, "=====")
        }
        return address
    }


}());
