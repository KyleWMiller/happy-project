(function() {
  'use strict';

  angular.module("historyFactory", [])
    .factory("poFactory", ["$http",poFactory])

    function poFactory($http) {
      var pof = this,
          posUrl = 'api/v1/POs',
          poUrl = 'api/v1/PO'

      pof.getPOs = function() {
        console.log("getting pos")
        return $http.get(posUrl)
      }

      pof.getOnePO = function(poNum) {
        var updatedpoUrl = `${poUrl}/${poNum}`
        console.log("getting individual po")
        return $http.get(updatedpoUrl)
      }
      return pof
    }
}());
