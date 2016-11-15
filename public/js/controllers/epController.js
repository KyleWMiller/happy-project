(function() {
    'use strict';

    angular.module('epControllers', [])
        .controller('easypostController', ['easypostFactory', easypostController])

    function easypostController(easypostFactory) {
        var epc = this

        // Variables for Ids
        epc.tAddress = {}
        epc.fAddress = {
          company: "Satcom Direct",
          street1: "1050 Satcom Lane",
          city: "Melbourne",
          state: "FL",
          zip: 32940,
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


        // Variables that store responses from EasyPost
        epc.toAddress = {}
        epc.fromAddress ={}
        epc.parcel = {}
        epc.shipment = {}


        // Gets to address response object w/ id
        epc.sendTAddress = function() {
            easypostFactory.sendAddress(epc.tAddress, function(address){
              epc.toAddress = address
              console.log("To address")
              console.log(epc.toAddress)
              epc.shpmt.toAddress = epc.toAddress.id

            })
        }
        // Gets from address response object w/ id
        epc.sendFAddress = function() {
            easypostFactory.sendAddress(epc.fAddress, function(address){
              epc.fromAddress = address
              console.log("From address")
              console.log(epc.fromAddress)
              epc.shpmt.fromAddress = epc.fromAddress.id
            })
        }
        // Gets parcel response oject w/ id
        epc.sendParcel = function() {
          easypostFactory.sendParcel(epc.prcl, function(parcel){
            epc.parcel = parcel
            console.log("Parcel")
            console.log(epc.parcel)
            epc.shpmt.parcel = epc.parcel.id
          })
        }
        // Gets shipment response object w/ id + rates array
        epc.sendShipment = function() {
          easypostFactory.sendShipment(epc.shpmt, function(shipment){
            epc.shipment = shipment
            console.log("Shipment")
            console.log(epc.shipment)
          })
        }
    }

}());
