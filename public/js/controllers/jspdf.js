(function() {
    'use strict';

    angular.module('jsPDF', [])
        .controller('pdfController', pdfController)


    function pdfController() {
      var pdf = this

      pdf.sdImg = require('sdDataUrl.txt')
      pdf.certificate = function () {

        var imgData = pdf.sdImg,
            consignee = {
                name: "Spirit Aeronautics",
                street: "4808 E. Fifth Ave",
                area: "Columbus, OH 43219",
                country: "United States"
            },
            po = 23180,
            item = "100-1021-30",
            qty = 1,
            description = "SDR",
            serial = 834,
            remarks = "Satcom Direct Part number 100-1021- 30 is equivalent to Air802 model ANRD82421703-TNC"


        var cfc = new jsPDF();
        cfc.addImage(imgData, 'JPEG', 15, 15, 60, 30)

        cfc.setFontSize(12)
        cfc.text(190, 23, "Satcom Direct", null, null, 'right')
        cfc.text(190, 30, "1050 Satcom Lane", null, null, 'right')
        cfc.text(190, 35, "Melbourne, FL", null, null, 'right')
        cfc.text(190, 40, "32940-7010", null, null, 'right')
        cfc.text(190, 45, "+1-321-777-3000", null, null, 'right')
        cfc.text(190, 50, "www.satcomdirect.com", null, null, 'right')


        cfc.setFontType('bold')
        cfc.setFontSize(14)
        cfc.text(15, 70, "CERTIFICATE OF CONFORMANCE")

        cfc.setFontType('normal')
        cfc.setFontSize(12)
        cfc.text(15, 80, "Consignee:")
        cfc.setFontType('bold')
        cfc.text(15, 85, consignee.name)
        cfc.setFontType('normal')
        cfc.text(15, 90, consignee.street)
        cfc.text(15, 95, consignee.area)
        cfc.text(15, 100, consignee.country)

        cfc.setFontType('bold')
        cfc.setFontSize(14)
        cfc.text(15, 110, "Reference PO #" + po)
        cfc.setFontType('normal')
        cfc.setFontSize(12)
        cfc.text(15, 115, "Order Date  : " + Date())
        cfc.text(15, 120, "Ship Date    : " + Date())

        cfc.setFontType('bold')
        cfc.text(15, 130, "Remarks")

        cfc.setFontType('normal')
        cfc.text(25, 137, "Item")
        cfc.text(50, 137, "Qty")
        cfc.text(75, 137, "Description")
        cfc.text(150, 137, "Item")
        cfc.line(23, 139, 180, 139)
        cfc.text(25, 145, item)
        cfc.text(57, 145, qty)
        cfc.text(77, 145, description)
        cfc.text(152, 145, serial)

        cfc.text(15, 155, "Concession")
        cfc.line(15, 156, 36, 156)
        cfc.text(17, 162, "Remarks:")
        cfc.text(17, 167, remarks)

        cfc.text(15, 175, "Manufactured Products")
        cfc.line(15, 176, 35, 176)
        cfc.text(17, 182, "Satcom Direct certifies that all articles, in the quantity as called for on the above purchase order, comply with the requirements, specifications and drawings listed on that order. Products delivered are fabricated from materials that comply with Satcom Direct standards and with workmanship that meets or exceeds Satcom Direct practices and procedures.")
        // cfc.autoPrint()
        cfc.save('autoprint.pdf')

      }

      pdf.packList = function() {
        var imgData = pdf.sdImg,
            po = 23180,
            item = "100-1021-30",
            qty = 1,
            description = "SDR",
            serial = 834,
            remarks = "Satcom Direct Part number 100-1021- 30 is equivalent to Air802 model ANRD82421703-TNC"


        var pl = new jsPDF();
        pl.addImage(imgData, 'JPEG', 15, 15, 60, 30)

        pl.setFontSize(12)
        pl.text(190, 23, "Satcom Direct", null, null, 'right')
        pl.text(190, 30, "1050 Satcom Lane", null, null, 'right')
        pl.text(190, 35, "Melbourne, FL", null, null, 'right')
        pl.text(190, 40, "32940-7010", null, null, 'right')
        pl.text(190, 45, "+1-321-777-3000", null, null, 'right')
        pl.text(190, 50, "www.satcomdirect.com", null, null, 'right')



        // pl.autoPrint()
        pl.save('autoprint.pdf')
      }
    }

}());
