'use strict';

const firebasefunctions = require('firebase-functions');
const firebase = require('firebase-admin');
const {firebaseconf} = require('./firebase-server/config.js');

const {body, param, validationResult, sanitizeBody, sanitizeParam} = require('express-validator');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // logging middleware
const Dao = require('./dao');
const {toJSON} = require("express-session/session/cookie"); // module for accessing the exams in the DB
const dayjs = require("dayjs");
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
const {v4: uuidv4} = require('uuid');

// init express
const app = express();
const port = 3001;
//app.use(cors({origin: true}));

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());


// *********************
// ***** FIREBASE  *****
// *********************


/* init firebase app */

const firebaseapp = firebase.initializeApp({
    credential: firebase.credential.cert(firebaseconf),
    databaseURL: "https://polito-se2-21-01-spg.europe-west1.firebasedatabase.app"
});

/* create a document in an existing collection */
var db = firebase.firestore();
// (async()=>{
//     try{
//         await db.collection('Food').doc("/23/").create({item: "Onion"});
//         console.log("done.");
//     }catch(error){
//         console.log(error);
//     }
// })();


/* firebase debug */

// const firebaseApp = firebase.apps[0];
// console.log(JSON.stringify(firebaseApp.options, null, 2));


// *********************
// ***** API *****
// *********************

app.post('/api/register',
    body('name')
        // Check if the name parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the name parameter is not empty
        .notEmpty()
        .bail()
        // Check if the name parameter is a string
        .isString()
        // Check if the name parameter contains only letters
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('lastName')
        // Check if the lastName parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the lastName parameter is not empty
        .notEmpty()
        .bail()
        // Check if the lastName parameter is a string
        .isString()
        // Check if the lastName parameter contains only letters
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('email')
        // Check if the email parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the email parameter is not empty
        .notEmpty()
        .bail()
        // Check if the email parameter is a string
        .isString()
        // Check if the email parameter is a valid email
        .custom((value, req) => {
            let regex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
            return regex.test(value);
        }),
    body('address')
        // Check if the address parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the address parameter is not empty
        .notEmpty()
        .bail()
        // Check if the address parameter is a string
        .isString()
        // Check if the address parameter is a valid address
        .custom((value, req) => {
            let regex = new RegExp(/^a-zA-Z\,\.0-9\t\n\r\f\v\s]+$/);
            return regex.test(value);
        }),
    body('phone')
        // Check if the phone parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the phone parameter is not empty
        .notEmpty()
        .bail()
        // Check if the phone parameter is a string
        .isString()
        // Check if the phone parameter is a valid phone number
        .custom((value, req) => {
            let regex = new RegExp(/^(\+(\([0-9]{1,2}\))?)?[0-9]+$/);
            return regex.test(value);
        }),
    body('city')
        // Check if the city parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the city parameter is not empty
        .notEmpty()
        .bail()
        // Check if the city parameter is a string
        .isString()
        // Check if the city parameter is a valid city
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('password')
        // Check if the password parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the password parameter is not empty
        .notEmpty()
        .bail()
        // Check if the password parameter is a string
        .isString(),
    (req, res) => {
        const result = validationResult(req);

        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {
            const newUUid = uuidv4()
            let newUser = {}
            newUser.name = req.body.name;
            newUser.surname = req.body.lastName;
            newUser.email = req.body.email;
            newUser.address = req.body.address;
            newUser.phone = req.body.phone;
            newUser.city = req.body.city;
            newUser.password = req.body.password;

            (async () => {
                try {
                    await db.collection('User').doc(newUUid).create(newUser);
                    console.log("Done.");
                    res.status(201).end();
                } catch (error) {
                    console.log("ERROR: ", error);
                    res.status(500).json({
                        info: "The server cannot process the request",
                        error: error
                    });
                }
            })()
        }
    });


/* GET all products */

(async () => {
    try {
        const products = await db.collection('Product').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (products.empty) {
            console.log("No matching documents.");
        } else {
            products.forEach(prod => {
                //do something, e.g. accumulate them into a single JSON to be given back to the frontend
                console.log(prod.data());  //prod.data() returns a Json -> fields can be accessed with "." (e.g. prod.data().Name returns the 'Name' field in Firebase)
            })
        }
    } catch (error) {
        console.log(error);
    }
})();

/* GET all farmers */
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await db.collection('Farmer').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (farmers.empty) {
            console.log("No matching documents.");
        } else {
            let result = [];
            farmers.forEach(farmer => {
                //do something, e.g. accumulate them into a single JSON to be given back to the frontend
                //console.log(farmer.data());
                result.push(new Promise(async (resolve, reject) => {
                    resolve({
                        Name: farmer.data().Name,
                        Surname: farmer.data().Surname,
                        FarmerID: farmer.id,
                        Email: farmer.data().Email,
                        Phoneno: farmer.data().Phoneno,
                        Address: farmer.data().Address,
                        State: farmer.data().State,
                        Zipcode: farmer.data().Zipcode
                    });
                }));
            })
            const response = Promise.all(result)
                .then(r => res.json(r))
                .catch(r => res.status(500));
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

/* GET all products by farmers */
app.get('/api/productByFarmer', async (req, res) => {
    try {
        const productbyfarmer = await db.collection('Product by Farmers').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No matching documents."});
        } else {
            let result = [];
            productbyfarmer.forEach((prodfarm) => {
                //for each product by farmer, i need to retrieve complete informations about the product (from ProductID) and the farmer (from FarmerID)
                const productid = prodfarm.data().ProductID;  //since prodfarm.dat() is a JSON, i can access its fields with "."
                const farmerid = prodfarm.data().FarmerID;
                console.log("Querying for " + productid + " and " + farmerid);

                result.push(new Promise(async (resolve, reject) => {
                    const product = await db.collection('Product').doc("" + productid).get();
                    const farmer = await db.collection('Farmer').doc("" + farmerid).get();
                    if (!product.exists) {  //for queries check query.empty, for documents (like this case, in which you are sure that at most 1 document is returned) check document.exists
                        console.log("No matching products for " + productid);
                    }
                    if (!farmer.exists) {
                        console.log("No matching farmers for" + farmerid);
                    } else {
                        //do something, e.g. create a JSON like productbyfarmer but with "Product" and "Farmer" entries instead of "ProductID" and "FarmerID"
                        resolve({
                            // Farmer
                            FarmerID: prodfarm.data().FarmerID,
                            Name: farmer.data().Name,
                            Surname: farmer.data().Surname,
                            Company: farmer.data().Company,
                            Email: farmer.data().Email,
                            Phoneno: farmer.data().Phoneno,
                            Address: farmer.data().Address,
                            State: farmer.data().State,
                            Zipcode: farmer.data().Zipcode,
                            // Product
                            ProductID: prodfarm.data().ProductID,
                            NameProduct: product.data().Name,
                            Description: product.data().Description,
                            ImageID: product.data().ImageID,
                            // Product by farmer
                            Quantity: prodfarm.data().Quantity,
                            UnitOfMeasurement: prodfarm.data().Unitofmeasurement,
                            Price: prodfarm.data().Price
                        });

                        //  console.log(farmer.data().Name + " offers " +
                        //             prodfarm.data().Quantity + " " + prodfarm.data().Unitofmeasurement + " of " +
                        //           product.data().Name);
                    }
                }));
            });
            const response = Promise.all(result)
                .then(r => res.json(r))
                .catch(r => res.status(500));
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});


app.get('/api/client', (req, res) => {
    Dao.listSelection()
        .then(type => res.json(type))
        .catch(() => res.status(500).end());
});

// *********************
// *** MANAGER start ***
// *********************

// Get statistics about all counters
app.post('/api/manager/counters',
    body('typeOfRequest')
        // Check if the typeOfRequest parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the typeOfRequest parameter is not empty
        .notEmpty()
        .bail()
        // Check if the typeOfRequest parameter is a string
        .isString()
        // Check if the typeOfRequest parameter is equal to "manager"
        .custom((value, req) => {
            return value === "manager";
        }),
    body('startDate')
        // Check if the startDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the startDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the startDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    body('endDate')
        // Check if the endDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the endDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the endDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    async (req, res) => {

        const result = validationResult(req);
        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {

            let jsonData = req.body;

            if (dayjs(jsonData.endDate).isSameOrAfter(dayjs(jsonData.startDate), 'day'))
                Dao.getStatisticsAllCounters(jsonData.startDate, jsonData.endDate, "M1")
                    .then(r => res.status(200).json(r))
                    .catch(() => res.status(500).end());
            else
                res.status(400).json({
                    info: "The server cannot process the request",
                    errors: "The end date is before the start date"
                });
        }
    }
);

// Get statistics about one counter
app.post('/api/manager/counter',
    body('typeOfRequest')
        // Check if the typeOfRequest parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the typeOfRequest parameter is not empty
        .notEmpty()
        .bail()
        // Check if the typeOfRequest parameter is a string
        .isString()
        // Check if the typeOfRequest parameter is equal to "manager"
        .custom((value, req) => {
            return value === "manager";
        }),
    body('ID')
        // Check if the ID parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the ID parameter is a string
        .isString(),
    body('startDate')
        // Check if the startDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the startDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the startDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    body('endDate')
        // Check if the endDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the endDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the endDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    async (req, res) => {

        const result = validationResult(req);
        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {
            let jsonData = req.body;

            if (dayjs(jsonData.endDate).isSameOrAfter(dayjs(jsonData.startDate), 'day'))
                Dao.getStatisticsCounter(jsonData.ID, jsonData.startDate, jsonData.endDate, "M1")
                    .then(r => res.status(200).json(r))
                    .catch(() => res.status(500).end());
            else
                res.status(400).json({
                    info: "The server cannot process the request",
                    errors: "The end date is before the start date"
                });
        }
    }
);

// Get statistics about all service types
app.post('/api/manager/servicetypes',
    body('typeOfRequest')
        // Check if the typeOfRequest parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the typeOfRequest parameter is not empty
        .notEmpty()
        .bail()
        // Check if the typeOfRequest parameter is a string
        .isString()
        // Check if the typeOfRequest parameter is equal to "manager"
        .custom((value, req) => {
            return value === "manager";
        }),
    body('startDate')
        // Check if the startDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the startDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the startDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    body('endDate')
        // Check if the endDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the endDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the endDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    async (req, res) => {

        const result = validationResult(req);
        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {
            let jsonData = req.body;

            if (dayjs(jsonData.endDate).isSameOrAfter(dayjs(jsonData.startDate), 'day'))
                Dao.getStatisticsAllServices(jsonData.startDate, jsonData.endDate, "M1")
                    .then(r => res.status(200).json(r))
                    .catch(() => res.status(500).end());
            else
                res.status(400).json({
                    info: "The server cannot process the request",
                    errors: "The end date is before the start date"
                });
        }
    }
);

// Get statistics about one service type
app.post('/api/manager/servicetype',
    body('typeOfRequest')
        // Check if the typeOfRequest parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the typeOfRequest parameter is not empty
        .notEmpty()
        .bail()
        // Check if the typeOfRequest parameter is a string
        .isString()
        // Check if the typeOfRequest parameter is equal to "manager"
        .custom((value, req) => {
            return value === "manager";
        }),
    body('serviceType')
        // Check if the serviceType parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the serviceType parameter is a string
        .isString(),
    body('startDate')
        // Check if the startDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the startDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the startDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    body('endDate')
        // Check if the endDate parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the endDate parameter is not empty
        .notEmpty()
        .bail()
        // Check if the endDate is in the right format
        .custom((value, req) => {
            // Date format: "2021-10-06"
            let regex = new RegExp(/^[1-2][0-9]{3}-(((0[13578]|1[02])-([0-2][0-9]|3[0-1]))|(02-([0-2][0-9]))|((0[469]|11)-([0-2][0-9]|30)))$/);
            return regex.test(value);
        }),
    async (req, res) => {

        const result = validationResult(req);
        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {
            let jsonData = req.body;

            if (dayjs(jsonData.endDate).isSameOrAfter(dayjs(jsonData.startDate), 'day'))
                Dao.getStatisticsServiceType(jsonData.serviceType, jsonData.startDate, jsonData.endDate, "M1")
                    .then(r => res.status(200).json(r))
                    .catch(() => res.status(500).end());
            else
                res.status(400).json({
                    info: "The server cannot process the request",
                    errors: "The end date is before the start date"
                });
        }
    }
);

// *******************
// *** MANAGER end ***
// *******************


// **********************
// *** CUSTOMER start ***
// **********************

app.post('/api/customer/newticket',
    body('typeOfRequest')
        // Check if the typeOfRequest parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the typeOfRequest parameter is not empty
        .notEmpty()
        .bail()
        // Check if the typeOfRequest parameter is a string
        .isString()
        // Check if the typeOfRequest parameter is equal to "customer"
        .custom((value, req) => {
            return value === "customer";
        }),
    body('serviceType')
        // Check if the serviceType parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the serviceType parameter is a string
        .isString(),
    async (req, res) => {

        const result = validationResult(req);
        // Validation error
        if (!result.isEmpty()) {
            let jsonArray = [];
            for (let item of result.array())
                jsonArray.push({
                    param: item.param,
                    error: item.msg,
                    valueReceived: item.value
                })
            res.status(400).json({
                info: "The server cannot process the request",
                errors: jsonArray
            });
        }
        // No error in validation
        else {
            let jsonData = req.body;

            await Dao.getNewTicket(jsonData.serviceType)
                .then(r => res.status(200).json(r))
                .catch(() => res.status(500).end());
        }
    }
);

// ********************
// *** CUSTOMER end ***
// ********************

// *********************
// *** OFFICER start ***
// *********************

app.get('/api/officer/nextclient', async (req, res) => {

    await Dao.getNextClient()
        .then(r => res.status(200).json(r))
        .catch(() => res.status(500).end());
});

// *******************
// *** OFFICER end ***
// *******************


// Activate the server
app.listen(port, () => {
    console.log(`react-score-server listening at http://localhost:${port}`);
});