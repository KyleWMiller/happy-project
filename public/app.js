(function() {


    angular.module('happyApp', ['epControllers', 'epFactory', 'addController', 'addFactory'])
        .controller('projectHappyCtl', projectHappyController)



    // console.log(fromAddress, toAddress, parcel)

    function projectHappyController() {
        var phc = this
        phc.shippment = {}











        phc.add = function(id) {
          
        }


        phc.parcel = {
            height: "15",
            width: "10",
            length: "7",
            weight: "176"
        }

    }


}());
