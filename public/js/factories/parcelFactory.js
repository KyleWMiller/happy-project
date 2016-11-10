(function() {
  'use strict';

    angular.module('parcelFactory', [])
      .factory('parcelFactory', parcelFactory)

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
