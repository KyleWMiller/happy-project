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
        epc.verify = "Verify"

        // -------------------------------------------- //
        // Variables that store responses from EasyPost //
        // -------------------------------------------- //
        epc.fromAddress = {}
        epc.parcel = {}
        epc.shipment = {}
        epc.rate = {}
        epc.label = {}

        // ------------------------------------------- //
        //            HappyShip Methods                //
        // ------------------------------------------- //

        // Gets from address response object w/ id
        epc.sendFAddress = function() {
            easypostFactory.sendAddress(epc.fAddress, function(address) {
                epc.fromAddress = address
                console.log("From address", epc.fromAddress)
                epc.shpmt.from_address = epc.fromAddress.id
            })
        }

        // Adds box dimentions to shipmentItem
        epc.selectBox = function() {
            if (!epc.box.hasOwnProperty('size')) {
              var toastContent = $('<span>Please select a "Box Size"</span>')
              Materialize.toast(toastContent, 2000)

            } else {
              function Box(box) {
                var holding = {
                  size: box.size,
                  dimentions: box.dimentions
                }
                return holding
              }

              var box = new Box(epc.box)
              epc.shipmentItem.package = box
              $('#b span').attr('id', 'prePackageInfob')
            }
        }

        // Adds items to package
        epc.addProduct = function() {
          console.log(epc.item)
            if (!epc.item.hasOwnProperty('item')) {
              var toastContent = $('<span>Please select a "Product"</span>')
              Materialize.toast(toastContent, 2000)
            } else {
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
        }

        // Add package to shipmentArray
        epc.addPackage = function(shipment) {
            var temp = {
              weight: 0
            }
            function Weight() {
              shipment.itemArray.map(function(w) {
                temp.weight += w.weight
              })
              return temp
            }
            var ozs = new Weight()
            epc.shipmentItem.package.dimentions.weight = ozs.weight
            epc.shipmentArray.push(epc.shipmentItem)
            epc.shipmentItem = {
                package: {},
                itemArray: []
            }
            epc.ozs = {}
            $('#b span').removeAttr('id')
        }

        // Removes box/products/shipments from respective arrays
        epc.removeBox = function() {
            epc.shipmentItem.package = {}
            $('#prePackageInfob').removeAttr('id')

        }
        epc.removeItem = function(index) {
            epc.shipmentItem.itemArray.splice(index, 1)
        }
        epc.removePackage = function(index) {
            epc.shipmentArray.splice(index, 1)
        }


        // Gets parcel response oject w/ id
        epc.sendParcel = function(shipment) {
            epc.prcl = shipment.package.dimentions
            console.log(epc.prcl)
            // Gets parcel response oject w/ id
            easypostFactory.sendParcel(epc.prcl, function(parcel) {
                epc.parcel = parcel
                console.log("Parcel",parcel)
                epc.shpmt.parcel = epc.parcel.id
                epc.verify = "Verified"
                $('#verify a').attr('id', 'verified')
            })
        }


        // Creates shipment with: verified fromAddress, toAdress, optional customsInfo (consisting of customItem(s)), and a parcel
        epc.createShipment = function(shipment) {
            epc.shpmt.to_address = epc.tAddress

            if (!epc.tAddress.hasOwnProperty('country')) {
                var toastContent = $('<span>Please provide a "To Address"</span>')
                Materialize.toast(toastContent, 2500)
            }
            if ( !epc.shpmt.to_address.country.toLowerCase() === "us" || !epc.shpmt.to_address.country.toLowerCase() === "united states" && epc.customsInfo.customs_signer === null) {
              var toastContent = $('<span>Please provide a "Customs Signer"</span>')
              Materialize.toast(toastContent, 2500)

            } else {
              console.log(epc.shpmt.to_address.country.toLowerCase())
              console.log((!epc.shpmt.to_address.country.toLowerCase() === "us" || !epc.shpmt.to_address.country.toLowerCase() === "united states") && epc.customsInfo.customs_signer === null)
              console.log((epc.shpmt.to_address.country.toLowerCase() === "us" || epc.shpmt.to_address.country.toLowerCase() === "united states") && epc.customsInfo.customs_signer === null)
              console.log(epc.shpmt.to_address.country.toLowerCase() === "us" || epc.shpmt.to_address.country.toLowerCase() === "united states")
              console.log(!epc.shpmt.to_address.country.toLowerCase() === "us" || !epc.shpmt.to_address.country.toLowerCase() === "united states")

              // omits customs info if the to_address is within the US
              if (epc.shpmt.to_address.country.toLowerCase() === "us" || epc.shpmt.to_address.country.toLowerCase() === "united states") {
                epc.shpmt.customsInfo = null
              } else {
                function FillCustomItems(productArray) {
                  var holdingArray = []
                  productArray.map(function(item) {
                    holdingArray.push(item.customsInfo)
                    console.log(holdingArray)
                  })
                  return holdingArray
                }
                var mounties = new FillCustomItems(shipment.itemArray)
                epc.customsInfo.customs_items = mounties
                epc.shpmt.customsInfo = epc.customsInfo
              }



              easypostFactory.sendShipment(epc.shpmt, function(shipment) {
                epc.shipment = shipment
                console.log('created shipement',epc.shipment)
                epc.rts = epc.shipment.rates
              })

            }
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
