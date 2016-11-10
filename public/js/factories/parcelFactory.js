(function() {
  'use strict';

    angular.module('parcelFactory', [])
      .factory('parcelFactory', parcelFactory)

      parcelFactory.$inject = ['$http']
      function parcelFactory($http) {
          var parcelId = {},
              apiUrl = '/api/v1/parcels'

              parcelId.parcelList = function() {
                // console.log('Getting parcel ids')
                return $http.get(apiUrl)
              }

              return parcelId
      }

}());
