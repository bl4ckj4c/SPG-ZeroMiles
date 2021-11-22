'use strict';

const firebasefunctions = require('firebase-functions');
const firebase = require('firebase-admin');
const { firebaseconf } = require('./firebase-server/config.js');
const userDao = require('./userDAO');
const { body, param, validationResult, sanitizeBody, sanitizeParam } = require('express-validator');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { toJSON } = require("express-session/session/cookie"); // module for accessing the exams in the DB
const dayjs = require("dayjs");
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
const { v4: uuidv4 } = require('uuid');
//const { convertMultiFactorInfoToServerFormat } = require('firebase-admin/lib/auth/user-import-builder');

//jwt parameters
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 300; //seconds

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


/* firebase debug */

// const firebaseApp = firebase.apps[0];
// console.log(JSON.stringify(firebaseApp.options, null, 2));


// *********************
// ***** API *****
// *********************

/* Authentication endpoint */

app.post('/api/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);
    console.log(username + " " + password);

    try{
        const user = await db.collection("User").where("Email","==",username).get();

        if(user.empty) {
            res.status(404).json({ info: "Authentication error", error: "User not found (Table: User)" });
        } else {
            user.forEach(user =>{  //because user is a query snapshot
                if(!userDao.checkPassword(user.data(), password)){
                    res.status(401).json({ info: "Authentication error", error: "wrong password" });
                } else {
                    //AUTHENTICATION SUCCESS
                    console.log("Authentication succeeded!"+user.id);
                    const token = jsonwebtoken.sign({ user: user.id }, jwtSecret, {expiresIn: expireTime});
                    res.cookie('token', token, { httpOnly: true, sameSite: true, maxAge: 1000*expireTime });
                    res.status(200).json(user.data());
                }
            })
        } 
    } catch(error){
        new Promise((resolve) => {setTimeout(resolve, 1000)}).then(() => res.status(500).json({
            info: "Authentication error",
            error: error
        }))
    }
});

app.use(cookieParser());

app.post('api/logout', (req,res) => {
    res.clearCookie('token').end();
});

/* POST user registration (add user to database) */

app.post('/api/register',
    body('name')
        // Check if the name parameter is not null
        .exists({ checkNull: true })
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
    body('surname')
        // Check if the lastName parameter is not null
        .exists({ checkNull: true })
        .bail()
        // Check if the lastName parameter is not empty
        .notEmpty()
        .bail()
        // Check if the lastName parameter is a string
        .isString()
        // Check if the lastName parameter contains only letters
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z\']+$/);
            return regex.test(value);
        }),
    body('email')
        // Check if the email parameter is not null
        .exists({ checkNull: true })
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
        .exists({ checkNull: true })
        .bail()
        // Check if the address parameter is not empty
        .notEmpty()
        .bail()
        // Check if the address parameter is a string
        .isString()
        // Check if the address parameter is a valid address
        .custom((value, req) => {
            let regex = new RegExp(/^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/);
            return regex.test(value);
        }),
    body('phone')
        // Check if the phone parameter is not null
        .exists({ checkNull: true })
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
        .exists({ checkNull: true })
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
        .exists({ checkNull: true })
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
            newUser.Name = req.body.name;
            newUser.Surname = req.body.surname;
            newUser.Email = req.body.email;
            newUser.Address = req.body.address;
            newUser.Phoneno = req.body.phone;
            newUser.City = req.body.city;
            newUser.Password = userDao.hashOfPassword(req.body.password);
            newUser.Zipcode = req.body.zipcode;
            newUser.State = req.body.stateCaps;
            newUser.Role = "Client";
            newUser.Wallet = 0;

            (async () => {
                try {
                    const user = await db.collection("User").where("Email","==",req.body.email).get();
                    if(user.empty){
                        await db.collection('User').doc(newUUid).create(newUser);
                        console.log("Done.");
                        res.status(201).end();
                    }
                    else res.status(409).json({
                        info: "New user registration",
                        error: "Email already used"
                    });
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


    
/* GET all users */

app.get('/api/users', async (req, res) => {
    try {
        const users = await db.collection('User').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({ error: "No entries (Table: Users)" });
        } else {
            let result = [];
            users.forEach(user => {
                //do something, e.g. accumulate them into a single JSON to be given back to the frontend
                //console.log(users.data());
                result.push(new Promise(async (resolve, reject) => {
                    resolve({
                        Name: user.data().Name,
                        Surname: user.data().Surname,
                        UserID: user.id,
                        Email: user.data().Email,
                        Phoneno: user.data().Phoneno,
                        Address: user.data().Address,
                        City: user.data().City,
                        State: user.data().State,
                        Zipcode: user.data().Zipcode,
                        Role: user.data().Role,
                        Wallet: user.data().Wallet,
                    });
                }));
            })
            const response = Promise.all(result)
                .then(r => res.json(r))
                .catch(r => res.status(500).end());
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});


/* GET all products */

// (async () => {
//     try {
//         const products = await db.collection('Product').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
//         if (products.empty) {
//             console.log("No matching documents.");
//         } else {
//             products.forEach(prod => {
//                 //do something, e.g. accumulate them into a single JSON to be given back to the frontend
//                 console.log(prod.data());  //prod.data() returns a Json -> fields can be accessed with "." (e.g. prod.data().Name returns the 'Name' field in Firebase)
//             })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })();



/* GET all farmers */
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await db.collection('Farmer').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (farmers.empty) {
            console.log("No matching documents.");
            res.status(404).json({ error: "No entries (Table: Farmer)" });
        } else {
            let result = [];
            farmers.forEach(farmer => {
                //do something, e.g. accumulate them into a single JSON to be given back to the frontend
                //console.log(farmer.data());
                result.push(new Promise(async (resolve, reject) => {
                    resolve({
                        Name: farmer.data().Name,
                        Surname: farmer.data().Surname,
                        Company: farmer.data().Company,
                        FarmerID: farmer.id,
                        Email: farmer.data().Email,
                        Phoneno: farmer.data().Phoneno,
                        Address: farmer.data().Address,
                        State: farmer.data().State,
                        Zipcode: farmer.data().Zipcode,
                        Distance: farmer.data().Distance,
                    });
                }));
            })
            const response = Promise.all(result)
                .then(r => res.json(r))
                .catch(r => res.status(500).json({
                    info: "Promises error (get all farmers)",
                    error: error
                }));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});



/* GET all products by farmers */
app.get('/api/productByFarmer', async (req, res) => {
    try {
        const productbyfarmer = await db.collection('Product by Farmers').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({ error: "No entries (Table: product by farmers)" });
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
                            //Distance: farmer.data().Distance
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
                .catch(r => res.status(500).json({
                    info: "Promises error (get productbyfarmer)",
                    error: error
                }));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});


/* GET all Order */

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await db.collection('Order').orderBy('Timestamp').get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({ error: "No entries (Table: Order)" });
        } else {
            
            let result = [];
            orders.forEach(order => {
                //do something, e.g. accumulate them into a single JSON to be given back to the frontend
                //console.log(farmer.data());
               
                result.push(new Promise(async (resolve, reject) => {
                    const client = await db.collection('User').doc("" + order.data().ClientID).get();
                        if (!client.exists) {  //for queries check query.empty, for documents (like this case, in which you are sure that at most 1 document is returned) check document.exists
                        console.log("No matching users for " + order.data().ClientID);
                    }
                    
                    resolve({
                        OrderID: order.id,  //maybe it's "order.id"
                        Status: order.data().Status,
                        ClientID: client.id,
                        Client: client.data(),
                        Timestamp: order.data().Timestamp,
                        ListOfProducts: order.data().Products
                    });
                }));
            })
            const response = Promise.all(result)
                .then(r => res.json(r))
                .catch(r => res.status(500).json({
                    info: "Promises error (get all orders)",
                    error: error
                }));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});





/* POST place an order in the database */

app.post('/api/order', async (req, res) => {
    try {
        let result = [];
        let productByFarmer = await db.collection('Product by Farmers').get()
        //where("ProductID", "==", ""+req.body.ProductID).where("FarmerID", "=", ""+req.body.FarmerID).get();

        if (productByFarmer.empty) {
            console.log("No entries (Table: product by farmers)");
            res.status(404).json({ error: "No entries (Table: product by farmers)" });
        }

        //for each product in the order
        req.body.items.forEach(product => {

            productByFarmer.forEach(prodfarm => {
                if (product.ProductID == prodfarm.data().ProductID && product.number > prodfarm.data().Quantity) { //check if there are enough unities for the product requested
                    console.log("Not enough products (" + product.NameProduct + ")");
                    res.status(404).json({ error: "Not enough products (" + product.NameProduct + ")" });
                }
            })
        })
       
        console.log("creating new order");
        let newOrder = {}
        newOrder.Timestamp = dayjs().format("DD-MM-YYYY hh:mm:ss", );
        newOrder.Status = "open";
        newOrder.ClientID = req.body.UserID;
        newOrder.Products = req.body.items;
    
        (async () => {
            try {
                console.log(newOrder);
                await db.collection("Order").add(newOrder);
            } catch (error) {
                console.log(error);
                res.json(error);
            }
        })()

        req.body.items.forEach(product => {
            productByFarmer.forEach(prodfarm => {
                if (product.ProductID == prodfarm.data().ProductID) {
                    let newQuantity = prodfarm.data().Quantity - product.number;
                   result.push( new Promise( async(resolve, reject) => {
                        
                        await db.collection('Product by Farmers').doc(prodfarm.id).update({Quantity: newQuantity});
                        resolve("QUANTITYUPDATE");
                }))
                }
            })
        })
  
        Promise.all(result);
        res.status(201).end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
})


//MODIFY ORDER
app.post('/api/modifyorder', async (req, res) => {
    try {
        await db.collection('Order').doc(req.body.id).update({Status: req.body.Status});
    }  catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});

app.post('/api/modifyclient', async (req, res) => {
    
   
     await db.collection('Orders').doc(req.body.id).update({Wallet: req.body.Wallet});
              
                 

});

app.use(
    jwt({
        algorithms: ['HS256'],  //prevents downgrade attacks -> HS256 used for the session
        secret: jwtSecret,
        getToken: req => req.cookies.token
    })
);


// Activate the server
app.listen(port, () => {
    console.log(`react-score-server listening at http://localhost:${port}`);
});
