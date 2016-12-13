(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', ['easypostFactory', easypostController])

    function easypostController(easypostFactory) {
        var epc = this

        // Variables for local app
        epc.tAddress = {}
        epc.fAddress = {
            company: "Satcom Direct",
            street1: "1050 Satcom Lane",
            city: "Melbourne",
            state: "FL",
            zip: "32940-7010",
            country: "US",
            phone: "+1(321) 777-3000",
            email: "SDR@satcomdirect.com"
        }
        epc.prcl = {
            height: 15,
            width: 10,
            length: 7,
            weight: 176
        }
        epc.shpmt = {}
        epc.rts = []
        epc.rateId = {}
        epc.customsItem = [{
                description: "Satcom Direct Router",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 500.00,
                weight: 176
            }, {
                description: "Satcom Direct Router Mounting Plate",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 500.00,
                weight: 176
            }, {
                description: "Satcom Direct Router Interface Cable",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 500.00,
                weight: 176
            }, {
                description: "Satcom Direct Router Connector Kit",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 375.00,
                weight: 176
            }, {
                description: "Air802 3G Antenna",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 0.00,
                weight: 176
            }, {
                description: "Satcom Direct Router",
                hs_tarrif_number: "851762",
                origin_country: "US",
                quantity: 1,
                value: 500.00,
                weight: 176
            }

        ]
        epc.customsInfo = {
            customs_certify: true,
            customs_signer: "Ryan Lightsey",
            customs_type: "merchandice",
            non_delivery_option: "return",
            restriction_type: "none",
            customs_items: [epc.customsItem[0]],
            eel_pfc: "NOEEI 30.37(a)"
        }
        epc.products = [
          {name:"SDR"},
          {name:"SDR Mounting Plate"},
          {name:"SDR Connector Kit"},
          {name:"Interface Cable"},
          {name:"Air802 3G Antenna"},
          {name:"Air802 WIFI Antenna"}
        ]
        epc.item ={}
        epc.parcelArray = []


        // Variables that store responses from EasyPost
        epc.toAddress = {}
        epc.fromAddress = {}
        epc.parcel = {}
        epc.shipment = {}
        epc.rate = {}
        epc.label = {}

            // Gets from address response object w/ id
        epc.sendFAddress = function() {
                easypostFactory.sendAddress(epc.fAddress, function(address) {
                    epc.fromAddress = address
                    console.log("From address")
                    console.log(epc.fromAddress)
                    epc.shpmt.from_address = epc.fromAddress.id
                })
            }
            // Moves products to an array for shipments with multiple items
        epc.addProduct = function() {
                epc.parcelArray.push(epc.item)
            }
            // Gets parcel response oject w/ id
        epc.sendParcel = function() {
                easypostFactory.sendParcel(epc.prcl, function(parcel) {
                    epc.parcel = parcel
                    console.log("Parcel")
                    console.log(epc.parcel)
                    epc.shpmt.parcel = epc.parcel.id
                })
            }

            // Creates shipment with: verified fromAddress, toAess, optional customsInfo (consisting of customItem(s)), and a parcel
        epc.createShipment = function() {
                epc.shpmt.to_address = epc.tAddress

                // omits customs info is the to_address is within the US
                if (epc.shpmt.to_address.country.toLowerCase() === "us" || epc.shpmt.to_address.country.toLowerCase() === "united states") {
                    epc.shpmt.customsInfo = null
                } else if (epc.shpmt.to_address.country.toLowerCase() !== "us" || epc.shpmt.to_address.country.toLowerCase() !== "united states") {
                    epc.shpmt.customsInfo = epc.customsInfo
                }

                easypostFactory.sendShipment(epc.shpmt, function(shipment) {
                    epc.shipment = shipment
                    console.log('created shipement')
                    console.log(epc.shipment)
                    epc.rts = epc.shipment.rates
                })
            }
            // Purchases specific rate using shipment id and returns lable
        epc.purchase = function(rate) {
          console.log(rate)
            easypostFactory.buyRate(rate, epc.shipment.id, function(label) {
                epc.label = label
            })
        }
        epc.log = function(x) {
          console.log(x)
        }
    }

}());
