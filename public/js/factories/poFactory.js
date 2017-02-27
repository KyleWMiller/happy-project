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

      pof.getOnePO = function(poNum) {
        var updatedpoUrl = `${poUrl}/${poNum}`
        console.log("getting individual po")
        return $http.get(poUrl)
      }
      return pof
    }
}());
