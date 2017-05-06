(function() {
    'use strict';

    angular.module('jsPDF', [])
        .controller('pdfController', ['poFactory', 'pdfFactory', '$http', '$stateParams', '$filter', '$state', pdfController])


    function pdfController(poFactory, pdfFactory, $http, $stateParams, $filter, $state) {
        var pdf = this

        // ------------------------------------------- //
        // Variables for local app                     //
        // ------------------------------------------- //
        pdf.pos = []
        pdf.po = {}
        pdf.sdImg = pdfFactory.sdLogoImg
        pdf.footer = pdfFactory.plFooter
        pdf.poNum = $stateParams.poNum
        pdf.qar = "Ryan Lightsey"
        pdf.packingNum = "CI\#00787"
        pdf.orderDate = null
        pdf.shipDate = null

        // ------------------------------------------- //
        //            HappyShip Methods                //
        // ------------------------------------------- //

        // ========================================================================== //
        pdf.getPOs = function() {
            poFactory.getPOs()
                .then(function(response) {
                    pdf.pos = response.data
                })
        }
        // ========================================================================== //
        pdf.getOnePO = function() {
            poFactory.getOnePO(pdf.poNum)
                .then(function(response) {
                    pdf.po = response.data[0]
                    console.log(pdf.po)
                    pdf.po.contactAddress.attn = "Receiving Department"
                    pdf.po.orderDate = pdf.po.orderDate || pdf.formateDate(new Date())
                    pdf.po.shipDate = pdf.po.shipDate || pdf.formateDate(new Date())

                })
        }
        // ========================================================================== //
        // Used to load a new PO if entered in PO input box
        pdf.changePOs = function() {
          $state.go('DocumentsPage', {poNum:pdf.po.poNum})
        }
        // ========================================================================== //
        pdf.formateDate = function(date) {
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
                day = date.getDate(),
                monthIndex = date.getMonth(),
                year = date.getFullYear()

            return day + " " + months[monthIndex] + ", " + year
        }
        // Sets today as default date
        // pdf.today = function() {
        //   console.log(pdf.po)
        // }
        // ========================================================================== //
        pdf.certificate = function(item) {
          var cert = this
          // ------------------------------------------- //
          // Variables for coc                           //
          // ------------------------------------------- //

            var imgData = pdf.sdImg,
                consignee = {
                    name: pdf.po.contactAddress.company,
                    contact: pdf.po.contactAddress.attn,
                    street: pdf.po.contactAddress.street1,
                    street2: pdf.po.contactAddress.street2,
                    area: pdf.po.contactAddress.city + ", " + pdf.po.contactAddress.state + " " + pdf.po.contactAddress.zip,
                    country: pdf.po.contactAddress.country
                },
                po = pdf.po.poNum,
                itemNum = item.itemNum,
                qty = "1",
                description = item.item,
                serial = "",
                remarks = "",
                qar = pdf.qar
            if(item.serialNum) {
                serial = item.serialNum
            } else {
                serial = "N/A"
            }
            if(item.remarks) {
                remarks = item.remarks
            }
            cert.sdCheck = function(item) {
              if(item === "SDR") {
                coc.text(163, 197, "Tests reports")
                coc.text(17, 202, "and/or inspection records pertaining to this Certificate of Compliance are on file and available")
                coc.text(17, 207, "on request.")
              }
            }


            var coc = new jsPDF();
            coc.addImage(imgData, 'JPEG', 15, 15, 30, 30)

            coc.setFontSize(12)
            coc.text(190, 23, "Satcom Direct", null, null, 'right')
            coc.text(190, 30, "1050 Satcom Lane", null, null, 'right')
            coc.text(190, 35, "Melbourne, FL", null, null, 'right')
            coc.text(190, 40, "32940-7010", null, null, 'right')
            coc.text(190, 45, "+1-321-777-3000", null, null, 'right')
            coc.text(190, 50, "www.satcomdirect.com", null, null, 'right')


            coc.setFontType('bold')
            coc.setFontSize(14)
            coc.text(15, 70, "CERTIFICATE OF CONFORMANCE")

            coc.setFontType('normal')
            coc.setFontSize(12)
            coc.text(15, 80, "Consignee:")
            coc.setFontType('bold')
            coc.text(15, 85, consignee.name)
            coc.setFontType('normal')
            coc.text(15, 90, consignee.street)
            coc.text(15, 95, consignee.area)
            coc.text(15, 100, consignee.country)

            coc.setFontType('bold')
            coc.setFontSize(14)
            coc.text(15, 110, "Reference PO #" + po)
            coc.setFontType('normal')
            coc.setFontSize(12)
            coc.text(15, 115, "Order Date  : " + pdf.po.orderDate)
            coc.text(15, 120, "Ship Date    : " + pdf.po.shipDate)

            coc.setFontType('bold')
            coc.text(15, 130, "Remarks")

            coc.setFontType('normal')
            coc.text(25, 137, "Item")
            coc.text(57, 137, "Qty")
            coc.text(75, 137, "Description")
            coc.text(150, 137, "Serial Number")
            coc.line(23, 139, 180, 139)
            coc.text(25, 145, itemNum)
            coc.text(59, 145, qty)
            coc.text(77, 145, description)
            coc.text(152, 145, serial)

            coc.text(15, 155, "Concession")
            coc.line(15, 156, 37, 156)
            if (remarks) {
                coc.text(17, 162, "Remarks:")
                coc.setFontSize(11)
                coc.text(17, 167, remarks)
            }

            coc.setFontSize(12)
            coc.text(15, 175, "Manufactured Products")
            coc.line(15, 176, 59, 176)
            coc.text(17, 182, "Satcom Direct certifies that all articles, in the quantity as called for on the above purchase")
            coc.text(17, 187, "order, comply with the requirements, specifications and drawings listed on that order. Products")
            coc.text(17, 192, "delivered are fabricated from materials that comply with Satcom Direct standards and with")
            coc.text(17, 197, "workmanship that meets or exceeds Satcom Direct practices and procedures.")

            cert.sdCheck(description)

            coc.text(15, 220, "Quality Assurance Representative")
            coc.text(145, 220, "Date")
            coc.setFontSize(14)
            coc.text(16, 230, qar)
            coc.line(15, 232, 78, 232)
            coc.text(146, 230, pdf.po.shipDate)
            coc.line(145, 232, 180, 232)

            // coc.autoPrint()
            coc.save(po + description + '.pdf')

        }
        // ========================================================================== //
        pdf.packList = function() {

          // ------------------------------------------- //
          // Variables for Packing List                  //
          // ------------------------------------------- //

            var imgData = pdf.sdImg,
                footer = pdf.footer,
                packingNum = pdf.packingNum,
                po = pdf.po.poNum,
                consignee = {
                    name: pdf.po.contactAddress.company,
                    contact: pdf.po.contactAddress.attn,
                    street: pdf.po.contactAddress.street1,
                    street2: pdf.po.contactAddress.street2,
                    area: pdf.po.contactAddress.city + ", " + pdf.po.contactAddress.state + " " + pdf.po.contactAddress.zip,
                    phone: pdf.po.contactAddress.phone,
                    country: pdf.po.contactAddress.country
                },
                qar = pdf.qar

            // Update PO info in DB
            poFactory.updatePO(pdf.po)

            // ========================================================================== //
            // ------------------------------------------- //
            // Logic for adding items dynamically          //
            // ------------------------------------------- //
            pdf.printItems = function(itemArray) {
                var pi = this

                pi.startY = 140
                pi.endY = 0

                // Programatically adds the items to packList
                // uses a start/end variable to space then next item according to the previous item
                pi.itemSelect = function(item, yStart, endY) {
                    // console.log(item)
                    switch (item.item) {
                        case "SDR":
                            var y = yStart,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                pn = item.itemNum,
                                mpn = "TN-1021-100",
                                sn = item.serialNum,
                                line1 = pl.text(17, y, "Satcom Direct Router"),
                                line2 = pl.text(111, y, qty + ""),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price)),
                                line5 = pl.text(17, y + 5, "P/N: " + pn),
                                line6 = pl.text(17, y + 10, "MPN: " + mpn),
                                line7 = pl.text(17, y + 15, "S/N: " + sn),
                                line8 = pl.text(17, y + 20, "SIM/Configuration module pre-installed")

                            pi.endY = 20

                            return line1 && line2 && line3 && line4 && line5 && line6 && line7 && line8 && pi.endY
                            break
                        case "Mounting Plate":
                            var y = yStart,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                itemNum = item.itemNum,
                                line1 = pl.text(17, y, "CNX to SDR Mounting Plate"),
                                line2 = pl.text(111, y, qty + ""),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price)),
                                line5 = pl.text(17, y + 5, "Item#: " + itemNum)

                            pi.endY = 5

                            return line1 && line2 && line3 && line4 && line5
                            break
                        case "Connector Kit":
                            var y = yStart,
                                itemNum = item.itemNum,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                line1 = pl.text(17, y, "SDR Connector Kit Item#: " + itemNum),
                                line2 = pl.text(111, y, qty + ""),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price))

                            return line1 && line2 && line3 && line4
                            break
                        case "Interface Cable":
                            var y = yStart,
                                itemNum = item.itemNum,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                line1 = pl.text(17, y, "Interface Cable Item#: " + itemNum),
                                line2 = pl.text(111, y, qty + ""),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price))

                            return line1 && line2 && line3 && line4
                            break
                        case "3G Antenna":
                            var y = yStart,
                                itemNum = item.itemNum,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                line1 = pl.text(17, y, "3G Antenna Item#: " + itemNum),
                                line2 = pl.text(111, y, qty + ""),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price))

                            return line1 && line2 && line3 && line4
                            break
                        case "WIFI Antenna":
                            var y = yStart,
                                itemNum = item.itemNum,
                                qty = item.quantity,
                                price = item.price,
                                total = price * qty,
                                line1 = pl.text(17, y, "WIFI Antenna Item#: " + itemNum),
                                line2 = pl.text(111, y, "" + qty),
                                line3 = pl.text(131, y, $filter('currency')(price)),
                                line4 = pl.text(161, y, $filter('currency')(price))

                            return line1 && line2 && line3 && line4
                            break
                    }
                }
                itemArray.forEach(function(x) {
                    pdf.itemSelect(x, pi.startY, pi.endY)
                    pi.startY = pi.startY + pi.endY + 10
                    pi.endY = 0
                })
            }
            // ========================================================================== //
            //  Packing list
            var pl = new jsPDF();
            pl.addImage(imgData, 'JPEG', 15, 15, 30, 30)

            pl.setFontSize(12)
            pl.text(190, 23, "Satcom Direct", null, null, 'right')
            pl.text(190, 30, "1050 Satcom Lane", null, null, 'right')
            pl.text(190, 35, "Melbourne, FL", null, null, 'right')
            pl.text(190, 40, "32940-7010", null, null, 'right')
            pl.text(190, 45, "+1-321-777-3000", null, null, 'right')
            pl.text(190, 50, "www.satcomdirect.com", null, null, 'right')

            pl.setFontType("bold")
            pl.text(15, 60, "Ship Date:  " + pdf.po.shipDate)
            pl.text(80, 60, "Packing List")
            pl.line(107, 61, 140, 61)
            pl.text(110, 60, packingNum)

            pl.text(15, 85, "Reference PO # " + po)
            pl.setFontType("normal")
            pl.text(15, 92, "Customer: " + consignee.name)
            pl.line(15, 93, 34, 93)
            pl.text(15, 98, "Contact: " + consignee.contact)
            pl.line(15, 99, 30, 99)
            pl.text(15, 103, "Phone: " + consignee.phone)
            pl.text(15, 108, consignee.street)
            pl.text(15, 113, consignee.area)
            pl.text(15, 118, consignee.country)

            pl.setFontType("bold")
            pl.text(15, 130, "Description")
            pl.line(15, 131, 40, 131)
            pl.text(110, 130, "Qty")
            pl.line(110, 131, 117, 131)
            pl.text(130, 130, "Price")
            pl.line(130, 131, 150, 131)
            pl.text(160, 130, "Subtotal")
            pl.line(160, 131, 178, 131)
            pl.setFontType("normal")

            // Itterate over items to add to Packing list
            pdf.printItems(pdf.po.itemArray)

            pl.setFontSize(11)
            pl.setFontType("bold")
            pl.text(15, 251, "Shipped By:")
            pl.setFontType("normal")
            pl.text(15, 255, qar)
            pl.text(15, 259, "Satcom Direct Inc.")
            pl.text(15, 263, "321-777-3000")
            pl.text(15, 267, "SDR@satcomdirect.com")

            pl.line(16, 270, 179, 270)
            pl.line(98, 270, 98, 283)
            pl.setFontSize(7)
            pl.setFont("Lucida Console", "Monaco", "monospace")
            pl.text(93, 278, "1050 Satcom Lane | Melbourne, FL 32940 USA", null, null, 'right')
            pl.text(93, 281, "phone: 321.777.3000 | toll-free: 888.449.9003 | fax: 321.777.3702", null, null, 'right')
            pl.text(102, 278, "201 N. Union Street, Suite 370 | Alexandria, VA 22314 USA")
            pl.text(102, 281, "phone: 703.549.3009 | toll-free: 866.549.3009 | fax: 703.549.3008")
            pl.setTextColor('#00AEEF')
            pl.text(93, 275, "Satcom Direct Headquarters", null, null, 'right')
            pl.text(102, 275, "Satcom Direct Communications, Inc.")


            // pl.autoPrint()
            pl.save('PL' + po + '.pdf')

        }
    }

}());
