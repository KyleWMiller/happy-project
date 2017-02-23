(function() {
  'use strict';

  angular.module("historyFactory", [])
    .factory("poFactory", ["$http",poFactory])

    function poFactory($http) {
      var pof = this,
          poUrl = 'api/v1/POs'

      pof.getPOs = function() {
        console.log("getting pos")
        return $http.get(poUrl)
      }
      return pof
    }
}());
