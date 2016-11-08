(function() {
    'use strict';

    angular.module('addFactory', [])
        .factory('addressFactory', addressFactory)

    addressFactory.$inject = ['$http']

    function addressFactory($http) {
        var addressId = {},
            apiUrl = '/api/v1/addresses'

        addressId.addressList = function() {
            // console.log('getting Adds')
            // console.log('add list')
            return $http.get(apiUrl)
        }
        return addressId
    }
}());
