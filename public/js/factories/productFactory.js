(function() {
  'use strict';

  angular.module('prodFactory', [])
    .factory('productFactory', productFactory)

    function productFactory() {
      var pf = this

      pf.products = {
        sdr:{
          details: {
            item:"SDR",
            serialNum:null,
            mfgNum:"TN1021-100",
            itemNum:"1233-F- 2191-10",
            price:null
          }
          customs: {
            description: "Satcom Direct Router",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: 1,
            value: 1000.00,
            weight: 172
          }
        },
        mountingPlate:{
          details: {
            item:"Mounting Plate",
            itemNum:"MT1-SDR-900",
            price:null
          }
          customs: {
            description: "Satcom Direct Router Mounting Plate",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: 1,
            value: 100.00,
            weight: 56
          }
        },
        connectorKit:{
          details: {
            item:"Connector Kit",
            itemNum:"100-1021-01",
            price:null
          }
          customs: {
            description: "Satcom Direct Router Connector Kit",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: 1,
            value: 50.00,
            weight: 1
          }
        },
        interfaceCable:{
          details: {
            item:"Interface Cable",
            itemNum:"SD-IFRTR- 900",
            price:null
          }
          customs: {
            description: "Satcom Direct Router Interface Cable",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: 1,
            value: 75.00,
            weight: 3 //todo
          }
        },
        air3G:{
          details: {
            item:"3G Antenna",
            itemNum:"100-1021-30",
            modelNum:"ANRD82421703-TNC",
            price:null
          }
          customs: {
            description: "Air802 3G Antenna",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: 1,
            value: 50.00,
            weight: 0.6
          }
        },
        airWIFI:{
          details: {
            item:"WIFI Antenna",
            itemNum:"100-1021-50",
            modelNum:"ANRD245X05-RTP",
            price:null
          }
          customs: {
            description: "Satcom Direct Router Mounting Plate",
            hs_tarrif_number: "851762",
            origin_country: "US",
            quantity: null,
            value: 50.00,
            weight: 176
          }
        }
      }
    }
}());
