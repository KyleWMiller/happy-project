(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', ['easypostFactory', 'productFactory', '$state', easypostController])

    function easypostController(easypostFactory, productFactory, $state) {
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
            country: "USA",
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
        epc.thirdParty = {}
        epc.shipmentArray = []
        epc.shipmentItem = {
            package: {},
            itemArray: [],
            parcel: null
        }
        epc.firstTime = true
        epc.po = {
            poNum: "8375309",
            contactAddress: epc.tAddress,
            shipmentInfo: [],
            itemArray: []
        }

        // -------------------------------------------- //
        // Variables that store responses from EasyPost //
        // -------------------------------------------- //
        epc.fromAddress = {}
        epc.parcel = []
        epc.shipment = {}
        epc.rate = {}
        epc.labels = []

        // ------------------------------------------- //
        //            HappyShip Methods                //
        // ------------------------------------------- //

        // ========================================================================== //
        // Gets from address response object w/ id
        epc.sendFAddress = function() {
            easypostFactory.sendAddress(epc.fAddress, function(address) {
                epc.fromAddress = address
                epc.shpmt.from_address = epc.fromAddress.id
            })
        }
        // ========================================================================== //
        // Adds box dimentions to shipmentItem
        epc.selectBox = function() {
            if (!epc.box.hasOwnProperty('size')) {
                var toastContent = $('<span>Please select a "Box Size"</span>')
                Materialize.toast(toastContent, 2000)

            } else {
                var box = angular.copy(epc.box)
                epc.shipmentItem.package = box
                $('#b span').attr('id', 'prePackageInfob')
            }
        }

        // ========================================================================== //
        // Item() is used to parse product info
        // Seperation step to exit data binding and sort item properties
        epc.Item = function(product) {
            var holding = {
                item: product.item,
                price: product.price,
                weight: product.weight,
                quantity: product.quantity,
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
            if (product.remarks) {
                holding.remarks = product.remarks
            }
            return holding
        }
        // ========================================================================== //
        // Adds items to package
        epc.addProduct = function() {
            if (!epc.item.hasOwnProperty('item')) {
                var toastContent = $('<span>Please select a "Product"</span>')
                Materialize.toast(toastContent, 2000)
            } else {
                var item = new epc.Item(epc.item)
                epc.shipmentItem.itemArray.push(item)
                epc.customsInfo.customs_items.push(item.customsInfo)
            }
        }
        // ========================================================================== //
        // Add package to shipmentArray
        epc.addPackage = function(shipment) {
            function Weight() {
                var weight = 0
                shipment.itemArray.map(function(w) {
                    weight += w.weight
                })
                return weight
            }
            var ozs = Weight()
            shipment.package.dimentions.weight = ozs
            ozs = 0
            shipment.firstTime = true
            var item = angular.copy(shipment)
            epc.shipmentArray.push(item)

            for (var i = 0; i < epc.shipmentArray.length; i++) {
                epc.shipmentArray[i].package.number = i + 1
            }

            // stages items in po.itemArray
            epc.shipmentItem.itemArray.map(function(x) {
                epc.po.itemArray.push(x)
            })
            epc.shipmentItem = {
                package: {},
                itemArray: []
            }
            $('#b span').removeAttr('id')
        }
        // ========================================================================== //
        // Creates premade shipments for quick creation
        epc.premadeBox1 = function() {
          epc.shipmentItem.package = epc.parcels[0]
          $('#b span').attr('id', 'prePackageInfob')
          // Adds SDR
          var item = new epc.Item(epc.products[0])
          epc.shipmentItem.itemArray.push(item)
          epc.customsInfo.customs_items.push(item.customsInfo)
          // Adds Connector Kit
          var item2 = new epc.Item(epc.products[2])
          epc.shipmentItem.itemArray.push(item2)
          epc.customsInfo.customs_items.push(item2.customsInfo)
          // Adds Interface Cable
          var item3 = new epc.Item(epc.products[3])
          epc.shipmentItem.itemArray.push(item3)
          epc.customsInfo.customs_items.push(item3.customsInfo)
        }
        epc.premadeBox2 = function() {
          epc.shipmentItem.package = epc.parcels[1]
          $('#b span').attr('id', 'prePackageInfob')
          // Adds Mounting Plate
          var item1 = new epc.Item(epc.products[1])
          epc.shipmentItem.itemArray.push(item1)
          epc.customsInfo.customs_items.push(item1.customsInfo)
          // Adds 3G Antenna
          var item4 = new epc.Item(epc.products[4])
          epc.shipmentItem.itemArray.push(item4)
          epc.customsInfo.customs_items.push(item4.customsInfo)
          // Adds WIFI Antenna
          var item5 = new epc.Item(epc.products[5])
          epc.shipmentItem.itemArray.push(item5)
          epc.customsInfo.customs_items.push(item5.customsInfo)
        }
        // ========================================================================== //
        // Removes box/products/shipments from respective arrays
        epc.removeBox = function() {
            epc.shipmentItem.package = {}
            $('#prePackageInfob').removeAttr('id')

        }
        // ========================================================================== //
        epc.removeItem = function(index) {
            epc.shipmentItem.itemArray.splice(index, 1)
        }
        // ========================================================================== //
        epc.removePackage = function(index, items) {
            // removes package items from po obj
            for (var i = items.length - 1; i >= 0; i--) {
                epc.po.itemArray.map(function(x) {
                    if (x.item === items[i].item) {
                        epc.po.itemArray.splice(epc.po.itemArray.indexOf(x), 1)
                    }
                })
            }
            // removes package from shipment array
            epc.shipmentArray.splice(index, 1)
            for (var i = 0; i < epc.shipmentArray.length; i++) {
                epc.shipmentArray[i].package.number = i + 1
            }

        }
        // ========================================================================== //
        // Gets parcel response oject w/ id
        epc.sendParcel = function(shipment) {
            epc.prcl = shipment.package.dimentions
            // Gets parcel response oject w/ id
            easypostFactory.sendParcel(epc.prcl, function(parcel) {
                shipment.parcel = parcel
                shipment.package.verification.verify = "Verified"
            })
        }
        // ========================================================================== //
        // Creates shipment with: verified fromAddress, toAdress, optional customsInfo (consisting of customItem(s)), and a parcel
        epc.createShipment = function(shipment, index) {
            if(shipment.firstTime === true) {
              epc.shpmt.to_address = epc.tAddress

              if(shipment.parcel === null) {
                var toastContent = $('<span>Please verify package first</span>')
                Materialize.toast(toastContent, 2500)
              } else {
                epc.shpmt.parcel = shipment.parcel.id
                // Error handeling for To Address
                if (!epc.tAddress.hasOwnProperty('country')) {
                  var toastContent = $('<span>Please provide a "To Address"</span>')
                  Materialize.toast(toastContent, 2500)
                }

                // Error handeling for Customs Signer
                if (epc.shpmt.to_address.country.toLowerCase() !== "usa" && epc.customsInfo.customs_signer === null) {
                  var toastContent = $('<span>Please provide a "Customs Signer"</span>')
                  Materialize.toast(toastContent, 2500)
                } else {
                  // omits customs info if the to_address is within the US
                  if (epc.shpmt.to_address.country.toLowerCase() === "usa") {
                    epc.shpmt.customsInfo = null
                  } else {
                    // Adds items custom info to the customs object
                    function FillCustomItems(productArray) {
                      var holdingArray = []
                      productArray.map(function(item) {
                        holdingArray.push(item.customsInfo)
                      })
                      return holdingArray
                    }
                    var mounties = new FillCustomItems(shipment.itemArray)
                    epc.customsInfo.customs_items = mounties
                    epc.shpmt.customsInfo = epc.customsInfo
                  }
                  // Add Third Party carrier accounts
                  if (epc.thirdParty.carrier) {
                    if (!epc.thirdParty.bill_third_party_account || !epc.thirdParty.bill_third_party_country || !epc.thirdParty.bill_third_party_postal_code) {
                      var toastContent = $('<span>Please complete 3rd party billing info</span>')
                      Materialize.toast(toastContent, 2500)
                    }
                    epc.shpmt.options = epc.thirdParty
                  } else {
                    console.log(epc.shpmt)
                    easypostFactory.sendShipment(epc.shpmt, function(shipment) {
                      epc.shipment = shipment
                      if (epc.shipment.rates.length > 0) {
                        epc.shipment.rates.map(function(x) {
                          x.purchased = "Purchase"
                        })
                        epc.rts.push(epc.shipment.rates)
                      }
                    })
                    shipment.package.verification.create = "Created"
                    shipment.firstTime = false
                  }
                }
              }
            }
        }
        // ========================================================================== //
        // Purchases specific rate using shipment id and returns lable
        epc.purchase = function(rateID, shipmentID, rate) {
          easypostFactory.buyRate(rateID, shipmentID, function(label) {
                epc.labels.push(label)
                var poLable = {
                    buyerAddress: label.buyer_address,
                    created_at: label.created_at,
                    customs_info: label.customs_info,
                    fees: label.fees,
                    forms: label.forms,
                    id: label.id,
                    options: label.options,
                    parcel: label.parcel,
                    postage_label: label.postage_label,
                    selected_rate: label.selected_rate,
                    tracker: label.tracker,
                    tracking_code: label.tracking_code
                }
                epc.po.shipmentInfo.push(poLable)
            })
            rate.purchased = 'Purchased'
        }
        // ========================================================================== //
        epc.formatService = function(carrier, service) {
            switch (carrier) {
                case "USPS":
                    var holding = service.split(/(?=[A-Z])/).join(" ")
                    return holding
                    break
                case "FedEx":
                    function capFirstChar(string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    }
                    var holding = service.toLowerCase()
                        .split('_')
                        .map(function(x) {
                            return capFirstChar(x)
                        })
                        .join(" ")
                    return holding
                    break
            }
        }
        // ========================================================================== //
        epc.savePO = function() {
            if (epc.labels.length === epc.rts.length) {
                easypostFactory.storePO(epc.po)
                $state.go('DocumentsPage', {
                    poNum: epc.po.poNum
                })
            } else {
                var toastContent = $('<span>Please purchase rates for all packages</span>')
                Materialize.toast(toastContent, 2500)
            }
        }
    }

}());
