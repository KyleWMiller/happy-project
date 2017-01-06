(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', ['easypostFactory', 'productFactory', easypostController])

    function easypostController(easypostFactory, productFactory) {
        var epc = this
        // ------------------------------------------- //
        // Variables for local app                     //
        // ------------------------------------------- //
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
        epc.box = {}
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
            customs_items: [],
            eel_pfc: "NOEEI 30.37(a)"
        }
        epc.shipmentArray = []
        epc.shipmentItem = {
            package: {},
            itemArray: []
        }

        // -------------------------------------------- //
        // Variables that store responses from EasyPost //
        // -------------------------------------------- //
        epc.fromAddress = {}
        epc.parcel = {}
        epc.shipment = {}
        epc.rate = {}
        epc.label = {}

        // ------------------------------------------- //
        // Application funcitons for creating lable and forms //
        // ------------------------------------------- //

        // Gets from address response object w/ id
        epc.sendFAddress = function() {
            easypostFactory.sendAddress(epc.fAddress, function(address) {
                epc.fromAddress = address
                console.log("From address", epc.fromAddress)
                epc.shpmt.from_address = epc.fromAddress.id
            })
        }

        // ------------------------------------------- //
        // Product
        // ------------------------------------------- //

        // Adds items to package
        epc.addProduct = function() {
            // Seperation step to exit data binding and sort item properties
            function Item(product) {
                var holding = {
                    item: product.item,
                    price: product.price,
                    weight: product.weight,
                    customsInfo: {
                        description: product.description,
                        hs_tarrif_number: product.hs_tarrif_number,
                        origin_country: product.origin_country,
                        quantity: product.quantity,
                        value: product.value,
                        weight: product.weight
                    }
                }
                // Adds properties only if they exist
                if (product.serialNum) {
                    holding.serialNum = product.serialNum
                }
                if (product.mfgNum) {
                    holding.mfgNum = product.mfgNum
                }
                if (product.itemNum) {
                    holding.itemNum = product.itemNum
                }
                if (product.modelNum) {
                    holding.modelNum = product.modelNum
                }
                return holding
            }
            var item = new Item(epc.item)
            epc.shipmentItem.itemArray.push(item)
            epc.customsInfo.customs_items.push(item.customsInfo)
        }

        // Adds box dimentions to shipmentItem
        epc.selectBox = function() {
          epc.shipmentItem.package = epc.box
          $('#box span').attr('id','prePackageInfo')
        }

        // Add package to shipmentArray
        epc.addPackage = function() {
          epc.shipmentArray.push(epc.shipmentItem)
          epc.shipmentItem = {
            package: {},
            itemArray: []
          }
          $('#box span').remove("#prePackageInfo")
        }

        // Removes products/shipments from ng-repeat arrays
        epc.removeItem = function(index) {
            epc.shipmentItem.itemArray.splice(index, 1)
        }
        epc.removePackage = function(index) {
            epc.shipmentArray.slice(index, 1)
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
                var toastContent = $('<span>You are missing info</span>')
                Materialize.toast(toastContent, 5000)
            }

            // omits customs info if the to_address is within the US
            if (epc.shpmt.to_address.country.toLowerCase() === "us" || epc.shpmt.to_address.country.toLowerCase() === "united states") {
                epc.shpmt.customsInfo = null
            } else {
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
