(function() {
    'use strict';

    angular.module('prodFactory', [])
        .factory('productFactory', productFactory)

    function productFactory() {
        var pf = this

        pf.parcels = [{
            size: "15\"x10\"x7\"",
            number: 0,
            verification: {
              verify:"Verify",
              create:"Create"
            },
            dimentions: {
              height: 15,
              width: 10,
              length: 7
            }
        }, {
            size: "20\"x13\"x14\"",
            number: 0,
            verification: {
              verify:"Verify",
              create:"Create"
            },
            dimentions: {
              height: 20,
              width: 13,
              length: 14
            }
        }]

        pf.products = [{
                item: "SDR",
                item2: "Satcom Direct Router",
                serialNum: "834",
                itemNum: "1233-F-2191-10",
                price: 30350.00,
                remarks: "Satcom Direct part number 1233-F-2191-10 is equivalent to manufacturer's part number TN1021-100",
                description: "Satcom Direct Router",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 1000.00,
                weight: 172
            }, {
                item: "Mounting Plate",
                itemNum: "MT1-SDR-900",
                price: 1350.00,
                description: "Satcom Direct Router Mounting Plate",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 100.00,
                weight: 56
            }, {
                item: "Connector Kit",
                itemNum: "100-1021-01",
                price: 375.00,
                description: "Satcom Direct Router Connector Kit",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 50.00,
                weight: 1
            }, {
                item: "Interface Cable",
                itemNum: "SD-IFRTR-900",
                price: 1500.00,
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
                price: 0,
                remarks: "Satcom Direct Part number 100-1021- 30 is equivalent to Air802 model ANRD82421703-TNC",
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
                price: 0,
                remarks: "Satcom Direct Part number 100-1021- 50 is equivalent to Air802 model ANRD245X05-RTP",
                description: "Air802 WIFI Antenna",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 50.00,
                weight: 0.6
            }

        ]

        return pf
    }
}());
