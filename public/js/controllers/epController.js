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
        epc.parcels = productFactory.parcels
        epc.package = {}
        epc.products = productFactory.products
        epc.item = {}
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
        epc.shipmentItem = {}
        epc.shipmentArr = []


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

        // Adds items to package
        epc.addProduct = function() {
                function Item(product) {
                    console.log("input", product)
                    var holding = {
                        item: product.item,
                        price: product.price,
                        weight: product.weight
                    }
                    epc.prcl.weight = holding.weight
                    console.log(holding)
                    return holding
                }

                var item = new Item(epc.item)
                epc.parcelArray.push(item)
            }
            // Gets parcel response oject w/ id
        epc.sendParcel = function() {
                console.log(epc.prcl)
                easypostFactory.sendParcel(epc.prcl, function(parcel) {
                    epc.parcel = parcel
                    console.log(epc.products)
                    console.log("Parcel")
                    epc.shpmt.parcel = epc.parcel.id
                })
            }
            // Creates shipment with: verified fromAddress, toAess, optional customsInfo (consisting of customItem(s)), and a parcel
        epc.createShipment = function() {
                epc.shpmt.to_address = epc.tAddress

                if (!epc.tAddress.hasOwnProperty() || !epc.parcel.hasOwnProperty()) {
                    var $toastContent = $('<span>You are missing info</span>')
                    Materialize.toast($toastContent, 5000)
                }

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

        epc.stringToObj = function(str) {
          // console.log(str.shift())
          var ns = str.split(",")
          ns.map(function(x){
            console.log(x)
          })
        }
    }

}());
