(function() {
  'use strict';

  angular.module('epFactory', [])
    .factory('easypostFactory', easypostFactory)

    easypostFactory.$inject = ['$http']

    function easypostFactory($http) {
      var epf = this

      var address = {},
          addressURL = '/epAddress'

      address.send = function(address) {
        return $http.post(address, addressURL)
      }

      return address
    }


}());
