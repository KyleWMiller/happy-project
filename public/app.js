(function() {


angular.module('happyApp', ['epControllers','epFactory'])
  .controller('projectHappyCtl', projectHappyController)



  // console.log(fromAddress, toAddress, parcel)

  function projectHappyController() {
    var phc = this

    phc.fromAddress= {
      company: "Satcom Direct",
      street1: "1050 Satcom Lane",
      city: "Melbourne",
      state: "FL",
      zip: "32940",
      country: "US",
      phone: "+1-321-777-3000",
      email: "SDR@satcomdirect.com"
    }
    phc.toAddress = {
      name: "George Costanza",
      company: "Vandelay Industries",
      street1: "1 E 161st St.",
      city: "Bronx",
      state: "NY",
      zip: "10451",
      country: "US",
      phone: "911-867-5309",
      email: "brazierExpert@seinfeld.com"
    }
    phc.parcel = {
      height: "15",
      width: "10",
      length: "7",
      weight: "176"
    }

  }


}());
