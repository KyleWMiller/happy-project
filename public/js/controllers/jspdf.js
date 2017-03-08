(function() {
  'use strict';

  angular.module('jsPDF', [])
    .controller('pdfController', ['poFactory', 'pdfFactory', '$http', '$stateParams', pdfController])


  function pdfController(poFactory, pdfFactory, $http, $stateParams) {
    var pdf = this

    pdf.pos = []
    pdf.po = {}
    pdf.sdImg = pdfFactory.sdLogoImg
    pdf.poNum = $stateParams.poNum

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
          })
    }
    // ========================================================================== //
    pdf.formateDate = function(date) {
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear()

      return months[monthIndex] + " " + day + " " + year

    }
    // ========================================================================== //
    pdf.certificate = function(item) {

      var imgData = pdf.sdImg,
        consignee = {
          name: "Spirit Aeronautics",
          street: "4808 E. Fifth Ave",
          area: "Columbus, OH 43219",
          country: "United States"
        },
        po = 23180,
        itemNum = item.itemNum,
        qty = "1",
        description = item.item,
        serial = "",
        remarks = "",
        qar = "Ryan Lightsey"
        if(item.serialNum) {
          serial = item.serialNum
        } else {
          serial = "N/A"
        }
        if(item.remarks) {
          remarks = item.remarks
        }


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
      cfc.text(15, 115, "Order Date  : " + pdf.formateDate(new Date()))
      cfc.text(15, 120, "Ship Date    : " + pdf.formateDate(new Date()))

      cfc.setFontType('bold')
      cfc.text(15, 130, "Remarks")

      cfc.setFontType('normal')
      cfc.text(25, 137, "Item")
      cfc.text(57, 137, "Qty")
      cfc.text(75, 137, "Description")
      cfc.text(150, 137, "Serial Number")
      cfc.line(23, 139, 180, 139)
      cfc.text(25, 145, itemNum)
      cfc.text(59, 145, qty)
      cfc.text(77, 145, description)
      cfc.text(152, 145, serial)

      cfc.text(15, 155, "Concession")
      cfc.line(15, 156, 37, 156)
      if (remarks) {
        cfc.text(17, 162, "Remarks:")
        cfc.text(17, 167, remarks)
      }

      cfc.text(15, 175, "Manufactured Products")
      cfc.line(15, 176, 59, 176)
      cfc.text(17, 182, "Satcom Direct certifies that all articles, in the quantity as called for on the above purchase")
      cfc.text(17, 187, "order, comply with the requirements, specifications and drawings listed on that order. Products")
      cfc.text(17, 192, "delivered are fabricated from materials that comply with Satcom Direct standards and with")
      cfc.text(17, 197, "workmanship that meets or exceeds Satcom Direct practices and procedures.")

      cfc.text(15, 215, "Quality Assurance Representative")
      cfc.text(145, 215, "Date")
      cfc.setFontSize(14)
      cfc.text(16, 225, qar)
      cfc.line(15, 227, 78, 227)
      cfc.text(146, 225, pdf.formateDate(new Date()))
      cfc.line(145, 227, 180, 227)

      // cfc.autoPrint()
      cfc.save(po + description + '.pdf')

    }
    // ========================================================================== //
    pdf.packList = function(itemArray) {
      var imgData = pdf.sdImg,
        packingNum = "CI\#00787",
        po = 23180,
        customer = "Spirit Aeronautics",
        contact = "Recieving Department",
        phone = "614.237.4271",
        add1 = "4808 E. Fifth Ave",
        add2 = "Columbus, OH 43219",
        country = "USA",
        item = "100-1021-30",
        qty = 1,
        description = "SDR",
        serial = 834,
        remarks = "Satcom Direct Part number 100-1021- 30 is equivalent to Air802 model ANRD82421703-TNC",
        qar = "Ryan Lightsey"


        pdf.printItems = function(itemArray) {
          var pi = this

          pi.startY = 140
          pi.endY = 0

          pi.itemSelect = function(item, yStart, endY) {
            switch (item.item) {
              case "SDR":
              var y = yStart,
              qty = 1,
              price = 28875.00,
              total = price * qty,
              pn = "12233-F-2191-10",
              mpn = "TN-1021-100",
              sn = 834,
              line1 = pl.text(17, y, "Satcom Direct Router"),
              line2 = pl.text(111, y, qty + ""),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total),
              line5 = pl.text(17, y + 5, "P/N: " + pn),
              line6 = pl.text(17, y + 10, "MPN: " + mpn),
              line7 = pl.text(17, y + 15, "S/N: " + sn),
              line8 = pl.text(17, y + 20, "SIM/Configuration module pre-installed")

              pi.endY = 20

              return line1 && line2 && line3 && line4 && line5 && line6 && line7 && line8 && pi.endY
              break
              case "Mounting Plate":
              var y = yStart,
              qty = 1,
              price = 1350.00,
              total = price * qty,
              itemNum = "MT1-SDR-900",
              line1 = pl.text(17, y, "CNX to SDR Mounting Plate"),
              line2 = pl.text(111, y, qty + ""),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total),
              line5 = pl.text(17, y + 5, itemNum)

              pi.endY = 5

              return line1 && line2 && line3 && line4 && line5
              break
              case "Connector Kit":
              var y = yStart,
              itemNum = "100-1021-01",
              qty = 1,
              price = 375.00,
              total = price * qty,
              line1 = pl.text(17, y, "SDR Connector Kit " + itemNum),
              line2 = pl.text(111, y, qty + ""),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total)

              return line1 && line2 && line3 && line4
              break
              case "Interface Cable":
              var y = yStart,
              itemNum = "SD-IFRTF-900",
              qty = 2,
              price = 1500.00,
              total = price * qty,
              line1 = pl.text(17, y, "Interface Cable " + itemNum),
              line2 = pl.text(111, y, qty + ""),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total)

              return line1 && line2 && line3 && line4
              break
              case "3G Antenna":
              var y = yStart,
              itemNum = "100-1021-30",
              qty = 1,
              price = 0,
              total = price * qty,
              line1 = pl.text(17, y, "3G Antenna " + itemNum),
              line2 = pl.text(111, y, qty + ""),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total)

              return line1 && line2 && line3 && line4
              break
              case "WIFI Antenna":
              var y = yStart,
              itemNum = "100-10210-01",
              qty = 1,
              price = 0,
              total = price * qty,
              line1 = pl.text(17, y, "WIFI Antenna " + itemNum),
              line2 = pl.text(111, y, "" + qty),
              line3 = pl.text(131, y, "$" + price),
              line4 = pl.text(161, y, "$" + total)

              return line1 && line2 && line3 && line4
              break
            }
          }
          itemArray.forEach(function(x) {
            pdf.itemSelect(x, pi.startY, pi.endY)
            // console.log(pi.endY)
            pi.startY = pi.startY + pi.endY + 10
            pi.endY = 0
          })
        }

      var pl = new jsPDF();
      pl.addImage(imgData, 'JPEG', 15, 15, 60, 30)

      pl.setFontSize(12)
      pl.text(190, 23, "Satcom Direct", null, null, 'right')
      pl.text(190, 30, "1050 Satcom Lane", null, null, 'right')
      pl.text(190, 35, "Melbourne, FL", null, null, 'right')
      pl.text(190, 40, "32940-7010", null, null, 'right')
      pl.text(190, 45, "+1-321-777-3000", null, null, 'right')
      pl.text(190, 50, "www.satcomdirect.com", null, null, 'right')

      pl.setFontType("bold")
      pl.text(15, 60, "Ship Date:  " + pdf.formateDate(new Date()))
      pl.text(80, 60, "Packing List")
      pl.line(107, 61, 140, 61)
      pl.text(110, 60, packingNum)

      pl.text(15, 85, "Reference PO # " + po)
      pl.setFontType("normal")
      pl.text(15, 92, "Customer: " + customer)
      pl.line(15, 93, 34, 93)
      pl.text(15, 98, "Contact: " + contact)
      pl.line(15, 99, 30, 99)
      pl.text(15, 103, "Phone: " + phone)
      pl.text(15, 108, add1)
      pl.text(15, 113, add2)
      pl.text(15, 118, country)

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
      pdf.printItems(itemArray)

      pl.setFontSize(11)
      pl.setFontType("bold")
      pl.text(15, 230, qar)
      pl.text(15, 234, "Satcom Direct Inc.")
      pl.text(15, 238, "321-777-3000")
      pl.text(15, 242, "SDR@satcomdirect.com")


      // pl.autoPrint()
      pl.save('PL' + po + '.pdf')


    }
  }

}());
