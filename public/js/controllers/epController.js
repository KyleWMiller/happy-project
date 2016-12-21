(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', ['easypostFactory', 'productFactory', easypostController])

    function easypostController(easypostFactory, productFactory) {
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
        epc.products = productFactory.products
        epc.productHolding = {}
        epc.prcl = productFactory.parcels[0]
        epc.shpmt = {}
        epc.rts = []
        epc.rateId = {}
        epc.customsItem = {}
        epc.customsInfo = {
            customs_certify: true,
            customs_signer: null,
            customs_type: "merchandice",
            non_delivery_option: "return",
            restriction_type: "none",
            customs_items: [epc.customsItem[0]],
            eel_pfc: "NOEEI 30.37(a)"
        }
        epc.item = {}
        epc.parcelArray = []


        // Variables that store responses from EasyPost
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
                function Item(product) {
                    var holding = {
                        item: product.item,
                        quantity: product.quantity,
                        serialNum: product.serialNum,
                        itemNum: product.itemNum,
                        modelNum: product.modelNum,
                        price: product.price
                    }
                    return holding
                }
                var item = new Item(epc.productHolding)
                epc.parcelArray.push(item)
            }
        // Gets parcel response oject w/ id
        epc.sendParcel = function() {
                easypostFactory.sendParcel(epc.prcl, function(parcel) {
                    epc.parcel = parcel
                    console.log(epc.products)
                    console.log("Parcel")
                    console.log(epc.parcel)
                    epc.shpmt.parcel = epc.parcel.id
                })
            }
        // Creates shipment with: verified fromAddress, toAess, optional customsInfo (consisting of customItem(s)), and a parcel
        epc.createShipment = function() {
                epc.shpmt.to_address = epc.tAddress

                // omits customs info if the to_address is within the US
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
            easypostFactory.buyRate(rate, epc.shipment.id, function(label) {
                console.log("label", label)
                epc.label = label

                if (epc.label.forms[0]) {
                    $("#form").add("disabled")
                }
            })
        }
    }

}());
