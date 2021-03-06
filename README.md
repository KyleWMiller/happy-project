------
#Happy Ship - Automated Shipping Solution
------

##Internal Shipping tool for Satcom Direct

Happy Ship was created to automate shipping the processes of generating shipping labels and documentation for purchase orders received by Satcom Direct

###Technology used
---

* MaterializeCSS - Frontend framework
* Angular v1.5.8 - client-side
	* jsPDF v1.3 - JS library for PDF generation
* NodeJS v7.9 - server-side
	* ExpressJS v4.14 - Node Framework 
	* BodyParser v1.15 - 2-way JSON Parser
	* Morgan v1.7 - Logger for server
	* Path v0.12.7 - Allows Node access to Files  
	* Mongoose v1.7 - Custom Schema for DB validation
	* Node-Easypost v2.1 - EasyPost's node API module
* MongoDB v3.4.3 - NoSQL DB stores info in JSON format


###Installation 
---- 
`git clone https://github.com/KyleWMiller/happy-project.git`  

I have included the `node_modules` folder to avoid having install packages separately. 

To run the server a daemon is needed. During development I use [nodemon](https://nodemon.io/), but for production I would recomment using [pm2](http://pm2.keymetrics.io/). Both will work but pm2 has a more production feel and a wider array of config options.

To store files you will need to install an instance of MongoDB [here](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/).
This is a guide for installing it on an Ubuntu 16.04 system. The default port for this db is `27017`. 

###Happy Ship API
---
The file containing the API routes are in the `apiRoutes.js` file. 

#####Easypost Routes
The first step in generating a package label is to create a to and from address. the `/epAddress` route calls the create address function in the node-easypost module and the returned address id is stored for use in the create shipment call.

Next you will need to generate an id for the parcel. `/epParcel` makes the create parcel call to EasyPost and returns the parcel for storage for use in the creatshipment call.

Once the parcel(s) and the address(es) have been created, the `/epShipment` route  adds these ids together as well as optional customs or 3rd party billing info to the object sent to EasyPost. The returned shipment object includes an array of rates. 

The final step in generating a packing label is to use `/epBuy` to purchase the rate. This call uses the shipment id, passed as a URI value, and the rate id. The returned object contains a separate URL link for the shipping label, the internal EasyPost tracking site for that package, and if shipping internationally a commercial invoice.

#####DB Routes
Their are 4 routes for storing, recalling and updating the purchase order database. 

`/dbPO` is for saving new POs 

`/POs` is an unused route (at the moment) that if sent a `GET` request will return the entirety of the PO db

`/PO/:poNum` is used to query a specific PO from the db using the PO# 

`/updatePO` is used to update the details of a PO if any information is changed on the Documents page

#####Making Changes to PO object

If any changes are made to the PO object, the model for storing `/model/epModel.js` will need to be amended otherwise the newly added information will not pass from the client to the server. 

Likewise the model in `/model/dbModel.js` will need to be amended to allow the new information, once stored, to pass back from the server to the client. 

The permitted SchemaTypes are

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* ObjectId
* Array

-----

###Server configuration

`Server.js Line:28` will need to be commented or deleted and `Server.js Line:26` will need to be uncommented in order for the site to have access to the DB.

[Morgan](https://github.com/expressjs/morgan) the request logging middleware module can be configured `Line 37:16` with different predefined formats found on their git hub page. It is currently set to `'dev'`

For version controls and adding a layer of complication to reduce the chance of a CORS attack, on `Line 43:9` I have added `/api/v1/` to all API routes. 

----

###Client Side

The logic for the client side is documented in the comments. 

[jsPDF](http://rawgit.com/MrRio/jsPDF/master/docs/) Documentation for modifying the print CFC and Packing List functions. 


##Thanks!!!

This site brought to you by [Kyle Miller](https://github.com/KyleWMiller).

Questions?   Email: miller.kwill@gmail.com

Enjoy and have a great day!!!


 