(function() {
    'use strict';

    angular.module('prodFactory', [])
        .factory('productFactory', productFactory)

    function productFactory() {
        var pf = this

        pf.parcels = [{
            size: "15x10x7",
            dimentions: {
              height: 15,
              width: 10,
              length: 7
            }
        }, {
            size: "20x13x14",
            dimentions: {
              height: 20,
              width: 13,
              length: 14
            }
        }]

        pf.products = [{
                item: "SDR",
                serialNum: null,
                mfgNum: "TN1021-100",
                itemNum: "1233-F-2191-10",
                price: null,
                description: "Satcom Direct Router",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 1000.00,
                weight: 172
            }, {
                item: "Mounting Plate",
                itemNum: "MT1-SDR-900",
                price: null,
                description: "Satcom Direct Router Mounting Plate",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 100.00,
                weight: 56
            }, {
                item: "Connector Kit",
                itemNum: "100-1021-01",
                price: null,
                description: "Satcom Direct Router Connector Kit",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 50.00,
                weight: 1
            }, {
                item: "Interface Cable",
                itemNum: "SD-IFRTR-900",
                price: null,
                description: "Satcom Direct Router Interface Cable",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 75.00,
                weight: 3
            }, {
                item: "3G Antenna",
                itemNum: "100-1021-30",
                modelNum: "ANRD82421703-TNC",
                price: null,
                description: "Air802 3G Antenna",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 50.00,
                weight: 0.6
            }, {
                item: "WIFI Antenna",
                itemNum: "100-1021-50",
                modelNum: "ANRD245X05-RTP",
                price: null,
                description: "Satcom Direct Router Mounting Plate",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: null,
                value: 50.00,
                weight: 176
            }

        ]

        return pf
    }
}());
