(function() {
    'use strict';

    angular.module("historyFactory", [])
        .factory("poFactory", ["$http", poFactory])

    function poFactory($http) {
        var pof = this,
            posUrl    = 'api/v1/POs',
            poUrl     = 'api/v1/PO',
            updateUrl = 'api/v1/updatePO'

        pof.getPOs = function() {
            return $http.get(posUrl)
        }

        pof.getOnePO = function(poNum) {
            var updatedpoUrl = `${poUrl}/${poNum}`
            return $http.get(updatedpoUrl)
        }

        pof.updatePO = function(po) {
            return $http.put(updateUrl, po)
        }

        return pof
    }
}());
