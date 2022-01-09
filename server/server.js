'use strict';

const firebasefunctions = require('firebase-functions');
const firebase = require('firebase-admin');
const firebaseBackup = require('firebase-admin');
const firebaseBackup2 = require('firebase-admin');
const firebaseBackup3 = require('firebase-admin');
const firebaseTest = require('firebase-admin');
const {firebaseconf} = require('./firebase-server/config.js');
const {firebaseconf_backup} = require('./firebase-server/config.js');
const {firebaseconf_backup_2} = require('./firebase-server/config.js');
const {firebaseconf_backup_3} = require('./firebase-server/config.js');
const {firebaseconf_test} = require('./firebase-server/config.js');

const fetch = require("node-fetch");
const TelegramBot = require('node-telegram-bot-api');
const {telegramToken, chatID} = require("./telegram/config.js");

const userDao = require('./userDAO');
const {body, param, validationResult, sanitizeBody, sanitizeParam} = require('express-validator');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); 
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {toJSON} = require("express-session/session/cookie"); 
const dayjs = require("dayjs");
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const customparseformat = require('dayjs/plugin/customParseFormat')
var timezone = require('dayjs/plugin/timezone');
const weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(isSameOrAfter)
dayjs.extend(timezone)
dayjs.extend(weekOfYear)
dayjs.extend(customparseformat)

const {v4: uuidv4} = require('uuid');

const fs = require("fs");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/tmp/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage,
    limits: {
        fileSize: 8000000 
     }
});


const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 1200; 


const app = express();
const port = 3001;


app.use(morgan('dev'));
app.use(express.json());


app.use('/images', express.static('images'));

const firebaseapp = firebase.initializeApp({
    credential: firebase.credential.cert(firebaseconf),
    databaseURL: "https://polito-se2-21-01-spg.europe-west1.firebasedatabase.app",
    storageBucket: "gs://polito-se2-21-01-spg.appspot.com"
});

const firebaseappBackup = firebaseBackup.initializeApp({
    credential: firebaseBackup.credential.cert(firebaseconf_backup),
    databaseURL: "https://polito-se2-21-01-spg-backup.europe-west1.firebasedatabase.app",
    storageBucket: "gs://polito-se2-21-01-spg-backup.appspot.com"
}, "firebase_backup");


const firebaseappBackup2 = firebaseBackup2.initializeApp({
    credential: firebaseBackup2.credential.cert(firebaseconf_backup_2),
    databaseURL: "https://polito-se2-21-01-spg-backup-2.europe-west1.firebasedatabase.app",
    storageBucket: "gs://polito-se2-21-01-spg-backup-2.appspot.com"
}, "firebase_backup_2");

const firebaseappBackup3 = firebaseBackup3.initializeApp({
    credential: firebaseBackup3.credential.cert(firebaseconf_backup_3),
    databaseURL: "https://polito-se2-21-01-spg-backup-3.europe-west1.firebasedatabase.app",
    storageBucket: "gs://polito-se2-21-01-spg-backup-3.appspot.com"
}, "firebase_backup_3");

const firebaseappTest = firebaseTest.initializeApp({
    credential: firebaseTest.credential.cert(firebaseconf_test),
    databaseURL: "https://polito-se2-21-01-spg-test.europe-west1.firebasedatabase.app",
    storageBucket: "gs://polito-se2-21-01-spg-test.appspot.com"
}, "firebase_test");


var db = firebaseBackup3.firestore(firebaseappBackup3);


app.post('/api/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(req.body);
    console.log(username + " " + password);

    try {
        const user = await db.collection("User").where("Email", "==", username).get();

        if (user.empty) {
            res.status(404).json({info: "Authentication error", error: "User not found (Table: User)"});
        } else {
            user.forEach(user => { 
                if (!userDao.checkPassword(user.data(), password)) {
                    res.status(401).json({info: "Authentication error", error: "wrong password"});
                } else {
                    console.log("Authentication succeeded!" + user.id);
                    const token = jsonwebtoken.sign({user: {userID: user.id, ...user.data()}}, jwtSecret); 
                    res.cookie('token', token, {httpOnly: true, sameSite: true});  
                    res.status(200).end();
                }
            })
        }
    } catch (error) {
        new Promise((resolve) => {
            setTimeout(resolve, 1000)
        }).then(() => res.status(500).json({
            info: "Authentication error",
            error: error
        }))
    }
});

app.use(cookieParser());


app.post('/api/logout', (req, res) => {
    res.clearCookie('token', {httpOnly: true, sameSite: true});
    res.redirect(200, "/");
});



app.post('/api/register',
    body('name')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('surname')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z\']+$/);
            return regex.test(value);
        }),
    body('email')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
            return regex.test(value);
        }),
    body('address')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/);
            return regex.test(value);
        }),
    body('phone')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^(\+(\([0-9]{1,2}\))?)?[0-9]+$/);
            return regex.test(value);
        }),
    body('city')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('password')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString(),
    (req, res) => {
        const result = validationResult(req);

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
        else {
            const newUUid = uuidv4()
            let newUser = {}
            newUser.Name = req.body.name;
            newUser.Surname = req.body.surname;
            newUser.Email = req.body.email;
            newUser.Address = req.body.address;
            newUser.Phoneno = req.body.phone;
            newUser.City = req.body.city;
            newUser.Password = req.body.password;  
            newUser.Zipcode = req.body.zipcode;
            newUser.State = req.body.stateCaps;
            newUser.Role = "Client";
            newUser.Wallet = 0;

            (async () => {
                try {
                    const user = await db.collection("User").where("Email", "==", req.body.email).get();
                    if (user.empty) {
                        await db.collection('User').doc(newUUid).create(newUser);
                        console.log("Done.");
                        res.status(201).end();
                    } else res.status(409).json({
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

app.post('/api/farmerRegister',
    body('name')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
    body('surname')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z\']+$/);
            return regex.test(value);
        }),
    body('email')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/);
            return regex.test(value);
        }),
    body('address')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/);
            return regex.test(value);
        }),
    body('phone')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^(\+(\([0-9]{1,2}\))?)?[0-9]+$/);
            return regex.test(value);
        }),
    body('city')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString()
        .custom((value, req) => {
            let regex = new RegExp(/^[a-zA-Z]+$/);
            return regex.test(value);
        }),
        body('company')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString(),
    body('password')
        .exists({checkNull: true})
        .bail()
        .notEmpty()
        .bail()
        .isString(),
    (req, res) => {
        const result = validationResult(req);

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
        else {
            const newUUid = uuidv4()
            let newUser = {}
            newUser.Name = req.body.name;
            newUser.Surname = req.body.surname;
            newUser.Email = req.body.email;
            newUser.Address = req.body.address;
            newUser.Company = req.body.company;
            newUser.Phoneno = req.body.phone;
            newUser.City = req.body.city;
            newUser.Password = req.body.password; 
            newUser.Zipcode = req.body.zipcode;
            newUser.State = req.body.stateCaps;
            newUser.Role = "Farmer";
            newUser.Wallet = 0;

            let newFarmer = {}
            newFarmer.Name = req.body.name;
            newFarmer.Distance = 1;
            newFarmer.Surname = req.body.surname;
            newFarmer.Email = req.body.email;
            newFarmer.Address = req.body.address;
            newFarmer.Company = req.body.company;
            newFarmer.Phoneno = req.body.phone;
            newFarmer.Zipcode = req.body.zipcode;
            newFarmer.State = req.body.stateCaps;

            (async () => {
                try {
                    const user = await db.collection("User").where("Email", "==", req.body.email).get();
                    if (user.empty) {
                        await db.collection('User').doc(newUUid).create(newUser);
                        await db.collection('Farmer').doc(newUUid).create(newFarmer);
                        
                        console.log("Done.");
                        res.status(201).end();
                    } else res.status(409).json({
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


app.get('/api/products', async (req, res) => {
    try {
        const products = await db.collection('Product').get();
        if (products.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Product)"});
        } else {
            let result = [];
            products.forEach(product => {
                result.push(new Promise(async (resolve, reject) => {
                    resolve({
                        Name: product.data().Name,
                        Description: product.data().Description,
                        ImageID: product.data().ImageID,
                        ProductID: product.id
                    });
                }));
            })
            const response = Promise.all(result)
                .then(r => res.status(200).json(r))
                .catch(r => res.status(500).json({
                    info: "Promises error (get all products)",
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


  app.get('/api/allProductsByFarmers/:date', async (req, res) => {
    let weekOfYear=0;

    let day2 = dayjs(req.params.date);
    if(dayjs(day2).day()==0 && dayjs(day2).hour() !=23){
        weekOfYear= dayjs(day2).week() -1;
    }else{
   
     weekOfYear= dayjs(day2).week();}
    console.log(weekOfYear);


    

    try {
        const productbyfarmer = await db.collection('Product by Farmers').get();  
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: product by farmers)"});
        } else {
            let result = [];
            productbyfarmer.forEach((prodfarm) => {
                const productid = prodfarm.data().ProductID;  
                const farmerid = prodfarm.data().FarmerID;

                result.push(new Promise(async (resolve, reject) => {
                    const product = await db.collection('Product').doc("" + productid).get();
                    const farmer = await db.collection('Farmer').doc("" + farmerid).get();
                    if (!product.exists) {  
                        console.log("No matching products for " + productid);
                    }
                    if (!farmer.exists) {
                        console.log("No matching farmers for" + farmerid);
                    }
                    if (prodfarm.data().Week != weekOfYear){
                        resolve({
                    });

                    
                        
                 }else {
                        resolve({
                            FarmerID: prodfarm.data().FarmerID,
                            Name: farmer.data().Name,
                            Surname: farmer.data().Surname,
                            Company: farmer.data().Company,
                            Email: farmer.data().Email,
                            Phoneno: farmer.data().Phoneno,
                            Address: farmer.data().Address,
                            State: farmer.data().State,
                            Zipcode: farmer.data().Zipcode,
                            ProductID: prodfarm.data().ProductID,
                            NameProduct: product.data().Name,
                            Description: product.data().Description,
                            ImageID: product.data().ImageID,
                            Quantity: prodfarm.data().Quantity,
                            UnitOfMeasurement: prodfarm.data().Unitofmeasurement,
                            Price: prodfarm.data().Price
                        });

                    }
                }));
            });
            const response = Promise.all(result)
                .then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                res.status(200).json(a)})
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


app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await db.collection('Farmer').orderBy("Distance").get();  
        if (farmers.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Farmer)"});
        } else {
            let result = [];
            farmers.forEach(farmer => {
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
                .then(r => res.status(200).json(r))
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


app.use(jwt({
        algorithms: ['HS256'], 
        secret: jwtSecret,
        getToken: req => req.cookies.token
    })
);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        console.log("Invalid token");
        res.redirect(401, "/api/login");
    }
});


app.get('/api/productsByFarmer/:date', async (req, res) => {
    const user = req.user && req.user.user;
    let day2 = dayjs(req.params.date);
    let weekOfYear=0;

    if(dayjs(day2).day()==6 && dayjs(day2).hour() >8){
        console.log(day2.toString())
    weekOfYear= dayjs(day2).week() +1;
    }else{
        weekOfYear= dayjs(day2).week();
    }
    console.log(weekOfYear);
    
    if(user.Role != "Farmer"){
        console.log("GET productsByFarmer - 401 Unauthorized (Maybe you are not a farmer)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    try {
        const productbyfarmer = await db.collection('Product by Farmers').where("FarmerID", "==", "" + user.userID).get();  
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: product by farmers)"});
        } else {
            let result = [];
            productbyfarmer.forEach((prodfarm) => {
                const productid = prodfarm.data().ProductID;  
                const farmerid = prodfarm.data().FarmerID;

                result.push(new Promise(async (resolve, reject) => {
                    const product = await db.collection('Product').doc("" + productid).get();
                    const farmer = await db.collection('Farmer').doc("" + farmerid).get();
                    if (!product.exists) {  
                        console.log("No matching products for " + productid);
                    }
                    if (!farmer.exists) {
                        console.log("No matching farmers for" + farmerid);
                    }
                    
                    if (prodfarm.data().Week != weekOfYear){
                        resolve({});

                    
                 } else {
                        resolve({
                            ProdByFarmerID: prodfarm.id,
                            ProductID: prodfarm.data().ProductID,
                            NameProduct: product.data().Name,
                            Quantity: prodfarm.data().Quantity,
                            UnitOfMeasurement: prodfarm.data().Unitofmeasurement,
                            Price: prodfarm.data().Price,
                            ImageID: product.data().ImageID
                        });
                    }
                }));
            });
            const response = Promise.all(result)
                .then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                            res.status(200).json(a)})
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


app.get('/api/users', async (req, res) => {
    const user = req.user && req.user.user;
    if(user.Role == "Client"){
        console.log("GET all users - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    try {
        const users = await db.collection('User').get(); 
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Users)"});
        } else {
            let result = [];
            users.forEach(user => {
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
                .then(r => res.status(200).json(r))
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


app.get('/api/userinfo', async (req, res) => {
    const user = req.user && req.user.user;
    try {
        const users = await db.collection('User').where("Email", "==", "" + user.Email).get();  
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Users)"});
        } else {
            let result = [];
            users.forEach(user => {
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
                .then(r => res.status(200).json(r))
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


app.get('/api/clientorders/:date', async (req, res) => {
    const user = req.user && req.user.user;
    let day2 = dayjs(req.params.date);
    
    
    try {
        const orders = await db.collection('Order').where("ClientID", "==", "" + user.userID).orderBy("Timestamp").get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(200).json([]);
        } else {
            let result = [];
            orders.forEach(order => {

                result.push(new Promise(async (resolve, reject) => {
                    const client = await db.collection('User').doc("" + order.data().ClientID).get();
                    if (!client.exists) {  
                        console.log("No matching users for " + order.data().ClientID);
                    }
                    if (day2.isSameOrAfter(dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss'))){

                    resolve({
                        OrderID: order.id,  
                        Status: order.data().Status,
                        ClientID: client.id,
                        Client: client.data(),
                        Timestamp: order.data().Timestamp,
                        ListOfProducts: order.data().Products,
                        DeliveryDate: order.data().DeliveryDate,
                        DeliveryPlace: order.data().DeliveryPlace,
                        pickupTimestamp: order.data().pickupTimestamp,
                        notRetired: order.data().notRetired

                    })}else{resolve({})};
                }));
            })
            const response = Promise.all(result)
                .then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                res.status(200).json(a)})
                .catch(r => res.status(500).json({
                    info: "Promises error (get all client orders)",
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
})


app.get('/api/orders/:date', async (req, res) => {
    const user = req.user && req.user.user;
    let day2 = dayjs(req.params.date);
    if(user.Role == "Client"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    try {
        const orders = await db.collection('Order').orderBy('Timestamp').get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

            let result = [];
            orders.forEach(order => {

                result.push(new Promise(async (resolve, reject) => {
                    const client = await db.collection('User').doc("" + order.data().ClientID).get();
                    if (!client.exists) { 
                        console.log("No matching users for " + order.data().ClientID);
                    }

                    if (day2.isSameOrAfter(dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss'))){
                        resolve({
                        OrderID: order.id,  
                        Status: order.data().Status,
                        ClientID: client.id,
                        Client: client.data(),
                        Timestamp: order.data().Timestamp,
                        ListOfProducts: order.data().Products,
                        DeliveryDate: order.data().DeliveryDate,
                        DeliveryPlace: order.data().DeliveryPlace,
                        pickupTimestamp: order.data().pickupTimestamp,
                        notRetired: order.data().notRetired,
                      
                      })}else{
                          resolve({})};
                }));
            })
            const response = Promise.all(result).then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                res.status(200).json(a)})
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


app.get('/api/cancelledorders/:date', async (req, res) => {
    const user = req.user && req.user.user;
    if(user.Role == "Client"){
        console.log("GET all cancelled orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    let date = dayjs(req.params.date);
    try {
        const orders = await db.collection('Order').where("Status","==","open").orderBy('Timestamp').get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {
            let result = [];
            orders.forEach(order => {
                let parsedorderdate = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss')  
                
                if(parsedorderdate.week() == date.week() && 
                    parsedorderdate.day() >= 1 && 
                    parsedorderdate.day() <= date.day() &&
                    parsedorderdate.format("HH:mm") >= "9:00" &&
                    parsedorderdate.format("HH:mm") <= date.format("HH:mm")){
                        
                        result.push(new Promise(async (resolve, reject) => {
                            const client = await db.collection('User').doc("" + order.data().ClientID).get();
                            if (!client.exists) {  
                                console.log("No matching users for " + order.data().ClientID);
                            }
                            resolve({
                                OrderID: order.id,
                                Status: order.data().Status,
                                ClientID: client.id,
                                Client: client.data(),
                                Timestamp: order.data().Timestamp,
                                ListOfProducts: order.data().Products,
                                pickupTimestamp: order.data().pickupTimestamp,
                                notRetired: order.data().notRetired
                            });
                        }));
                   }
                    
                })
            }
            const response = Promise.all(result)
                .then(r => res.status(200).json(r))
                .catch(r => res.status(500).json({
                    info: "Promises error (get all cancelled orders of that week)",
                    error: error
                }));
        }
     catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});


app.get('/api/monthlyNotRetiredOrders/:date', async (req, res) => {
    const user = req.user && req.user.user;
    if(user.Role == "Client"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    let reqday = dayjs(req.params.date);

    try {
        const orders = await db.collection('Order').where("notRetired","==","true").get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

            let result = [];
            orders.forEach(order => {
                let orderdate = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss');
                
                if(orderdate.month() == reqday.month()){
                    result.push(new Promise(async (resolve, reject) => {
                        const client = await db.collection('User').doc("" + order.data().ClientID).get();
                        if (!client.exists) {  
                            console.log("No matching users for " + order.data().ClientID);
                        }

                        resolve({
                            OrderID: order.id,  
                            Status: order.data().Status,
                            ClientID: client.id,
                            Client: client.data(),
                            Timestamp: order.data().Timestamp,
                            ListOfProducts: order.data().Products,
                            DeliveryDate: order.data().DeliveryDate,
                            DeliveryPlace: order.data().DeliveryPlace,
                            pickupTimestamp: order.data().pickupTimestamp,
                            notRetired: order.data().notRetired
                        });
                    }));
                }
            })
            const response = Promise.all(result)
                .then(r => {
                    if(r.length==0)
                        res.status(404).json({error: "No entries (Table: Order)"});
                    else res.status(200).json(r)
                })
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


app.get('/api/weeklyNotRetiredOrders/:date', async (req, res) => {
    const user = req.user && req.user.user;
    if(user.Role == "Client"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    let reqday = dayjs(req.params.date);
    let reqweekOfYear = reqday.day()==0 ? reqday.week()-1 : reqday.week();
    console.log("reqweek: " + reqweekOfYear)

    try {
        const orders = await db.collection('Order').where("notRetired","==","true").get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

            let result = [];
            orders.forEach(order => {
                let orderdate = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss');
                let orderweekOfYear = dayjs(orderdate).week();
                if(dayjs(orderdate).day()==0 && dayjs(orderdate).hour() <23){
                    orderweekOfYear= orderweekOfYear - 1;
                }
                console.log("order :" + orderdate + " " + orderweekOfYear)
                if(reqweekOfYear == orderweekOfYear+1){
                    result.push(new Promise(async (resolve, reject) => {
                        const client = await db.collection('User').doc("" + order.data().ClientID).get();
                        if (!client.exists) {  
                            console.log("No matching users for " + order.data().ClientID);
                        }

                        resolve({
                            OrderID: order.id,  
                            Status: order.data().Status,
                            ClientID: client.id,
                            Client: client.data(),
                            Timestamp: order.data().Timestamp,
                            ListOfProducts: order.data().Products,
                            DeliveryDate: order.data().DeliveryDate,
                            DeliveryPlace: order.data().DeliveryPlace,
                            pickupTimestamp: order.data().pickupTimestamp,
                            notRetired: order.data().notRetired
                        });
                    }));
                }
            })
            const response = Promise.all(result)
            .then(r => {
                if(r.length==0)
                    res.status(404).json({error: "No entries (Table: Order)"});
                else res.status(200).json(r)
            })
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



app.post('/api/order', async (req, res) => {

    let reqday = dayjs(req.body.timestamp);
    let reqweekOfYear=dayjs(req.body.timestamp).week();
    if(dayjs(reqday).day()==0 && dayjs(reqday).hour() <23){
        reqweekOfYear= reqweekOfYear - 1;
    }
    console.log(dayjs(reqday).day())
    console.log(dayjs(reqday).hour())
   
    if( (dayjs(reqday).day()==0 && dayjs(reqday).hour()<="23") || (dayjs(reqday).day()==6 && dayjs(reqday).hour()>="9") ){  
        
        try {
            let sameweekorder = 0;
            let result = [];
            let productByFarmer = await db.collection('Product by Farmers').get()
            if (productByFarmer.empty) {
                console.log("No entries (Table: product by farmers)");
                res.status(404).json({error: "No entries (Table: product by farmers)"});
            }

            
            let quantity = 0;
            for (const product of req.body.items){
                quantity = quantity + product.number * product.Price;
                console.log(productByFarmer);
                    for (let prodfarm of productByFarmer.docs){
                    if (product.ProductID == prodfarm.data().ProductID && product.number > prodfarm.data().Quantity && prodfarm.data().Week == reqweekOfYear) {
                        console.log("Not enough products (" + product.NameProduct + ")");
                        res.status(404).json({error: "Not enough products (" + product.NameProduct + ")"});
                        return;
                    }
                }
            }
            const orders = await db.collection("Order").where("ClientID","==",""+req.body.UserID).where("Status","==","open").get()  
            if(!orders.empty){  
                orders.forEach(order => {
                    let orderday = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss');
                    let orderweekOfYear = dayjs(orderday).week();
                    if(dayjs(orderday).day()==0 && dayjs(orderday).hour() <23){
                        orderweekOfYear= orderweekOfYear - 1;
                    }
                    if(orderweekOfYear == reqweekOfYear){ 
                        sameweekorder = 1;
                        let newproducts = req.body.items
                        newproducts.forEach(newproduct => {
                            newproduct.Confirmed = ""
                        })
                        let newlist = [
                            ...order.data().Products,
                            ...newproducts
                        ]
                        let newprice = order.data().Price + quantity
                        
                        db.collection("Order").doc(order.id).update({Products: newlist});
                        db.collection("Order").doc(order.id).update({Price: newprice});
                        res.status(200).end()
                        return
                    }
                })
            }
                
            if(orders.empty || !sameweekorder){
                console.log("creating new order");
                console.log(quantity);
                let newOrder = {}
                newOrder.Price = quantity;
                newOrder.Timestamp = dayjs(req.body.timestamp).format('DD-MM-YYYY HH:mm:ss');
                newOrder.Status = "open";
                newOrder.ClientID = req.body.UserID;
                newOrder.Products = req.body.items;
                newOrder.DeliveryDate = req.body.DeliveryDate ? req.body.DeliveryDate : "";
                newOrder.DeliveryPlace = req.body.DeliveryPlace ? req.body.DeliveryPlace : "";
                newOrder.pickupTimestamp = "";
                newOrder.notRetired = "false";


                for(let entry of newOrder.Products){
                    console.log(entry)
                    entry.Confirmed = ""
                }

                (async () => {
                    try {
                        await db.collection("Order").add(newOrder);
                    } catch (error) {
                        console.log(error);
                        res.status(500).json(error);
                    }
                })()
            }
            
            req.body.items.forEach(product => {
                productByFarmer.forEach(prodfarm => {
                    if (product.ProductID == prodfarm.data().ProductID) {
                        let newQuantity = prodfarm.data().Quantity - product.number;
                        result.push(new Promise(async (resolve, reject) => {
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
    }
    else{
        res.status(403).json({
            info: "It's not yet time to place an order. Orders can be places only from Saturday 09:00 to Sunday 23:00"
        })
    }

})


app.post('/api/modifyDelivery', async (req, res) => {

    try {
        const order = await db.collection('Order').get();
        if (order.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

                console.log(req.body.DeliveryDate);
                let day = dayjs(req.body.DeliveryDate).format("DD-MM-YYYY HH:mm");
                console.log(day);
                await db.collection('Order').doc(req.body.OrderID).update({DeliveryDate: day, DeliveryPlace: req.body.DeliveryPlace });
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
    res.status(201).end();

});


app.post('/api/setPickUpTime', async (req, res) => {

    try {
        const order = await db.collection('Order').get();
        if (order.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

                console.log(req.body.pickupTimestamp);
                let day = dayjs(req.body.pickupTimestamp).format("DD-MM-YYYY HH:mm");
                console.log(day);
                await db.collection('Order').doc(req.body.OrderID).update({pickupTimestamp: day});
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
    res.status(201).end();

});





app.post('/api/timeMachine',async(req,res)=>{
    let newdate = req.body.newdate ? req.body.newdate : "";
    let purchaseTriggerDOW = "1";   
    let purchaseTriggerHour = "09:00";

    let newProductsTriggerDOW = "6";
    let newProductsTriggerHour = "09:00";

    let pickUpProductsTriggerDOW = "5";
    let pickUpProductsTriggerHour = "19:00";


   
    
    if(dayjs(newdate).day()==purchaseTriggerDOW &&   
       dayjs(newdate).format("HH:mm") == purchaseTriggerHour){  

        console.log("******TRIGGER - Orders processing*****");

        try {
            const orders = await db.collection('Order').where("Status","==","open").get(); 
            if (orders.empty) {
                console.log("No matching documents.");
                res.status(404).json({error: "No entries (Table: Order)"});
            } else {
                let result = [];
                orders.forEach(order => {
                    let orderdate = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss');
                    let orderweekOfYear = dayjs(orderdate).week();
                    if(dayjs(orderdate).day()==0 && dayjs(orderdate).hour() <23){
                        orderweekOfYear= orderweekOfYear - 1;
                    }

                    if(order.data().Products.length > 0){  
                        if(orderweekOfYear == dayjs(newdate).week()-1){  
                            result.push(new Promise(async (resolve, reject) => {
                                resolve({
                                    OrderID: order.id,
                                    ...order.data()
                                });
                            }));
                        }
                    }
                    else{  
                        try {
                            console.log("Deleting from database order " + order.id + " due to empty list of products of the order.")
                            db.collection('Order').doc("" + order.id).delete();
                        } catch (error) {
                            console.log(error);
                            res.status(500).json({
                                info: "The server cannot process the request",
                                error: error
                           });
                        }
                    }
                        
                })

                Promise.all(result).then(result => {
                    console.log(result)
                    let responseresult = [];
                    for(const entry of result){
                        responseresult.push(
                            new Promise(async (resolve, reject) => {
                                let client = await db.collection('User').doc("" + entry.ClientID).get();
                                if (!client.exists) {
                                    console.log("No matching users for " + entry.data().ClientID);
                                }
                                else{  
                                    let newprice=0;
                                    for(let productentry of entry.Products){
                                        if(productentry.Confirmed=="true"){
                                            newprice += productentry.number * productentry.Price
                                        }
                                    }
                                    
                                    await db.collection('Order').doc(entry.OrderID).update({Price: newprice});
                                    
                                    if(newprice == 0){ 
                                        await db.collection('Order').doc(entry.OrderID).update({Status: "cancelled"});
                                        resolve({
                                            orderID: entry.OrderID,
                                            status: "cancelled (no products confirmed)"
                                        })
                                    }
                                    else if(client.data().Wallet >= newprice){ 
                                        let newwallet = client.data().Wallet - newprice;
                                        await db.collection('Order').doc(entry.OrderID).update({Status: "pending"});
                                        await db.collection('User').doc(entry.ClientID).update({Wallet: newwallet});
                                        resolve({
                                            orderID: entry.OrderID,
                                            status: "fullfilled"
                                        })
                                    }
                                    else{
                                        await db.collection('Order').doc(entry.OrderID).update({Status: "cancelled"});
                                        resolve({
                                            orderID: entry.OrderID,
                                            status: "cancelled (not enough money in the wallet)"
                                        })
                                    }
                                }
                            })
                        )
                    }
                    Promise.all(responseresult).then(responseresult => {
                        console.log(responseresult);
                        res.status(200).json(responseresult);
                    })
                    .catch(error => res.status(500).json({
                        info: "Promises error (get responseresult after order processing)",
                        error: error
                    }))
                })
                .catch(error => res.status(500).json({
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
    }

    

    if(dayjs(newdate).day() == newProductsTriggerDOW &&
    dayjs(newdate).format("HH:mm") == newProductsTriggerHour){
        
        console.log("******TRIGGER - New products available*****");

        const response = await fetch("https://api.telegram.org/bot"+telegramToken+"/sendMessage?text=New%20Products%20are%20online!%20Come%20and%20have%20a%20look.&chat_id="+chatID, 
            { method: 'GET' }
        );  

        if(response.ok){
            console.log("Message sent on the telegram channel!");
            res.status(200).end();
        }
        else {
            console.log("Error in sending the message on the telegram channel");
            res.status(502).json({error: "Cannot sent the message on the telegram channel"});
        }


    }

    if(dayjs(newdate).day()== pickUpProductsTriggerDOW &&   
       dayjs(newdate).format("HH:mm") == pickUpProductsTriggerHour){

        try {
            let orders = await db.collection('Order').where("Status","==","pending").get();

            console.log(orders);
            let risultato = [];

                orders.forEach(order => {
                    {
                        db.collection('Order').doc(order.id).update({Status: "cancelled", notRetired: "true"});
                        risultato.push(new Promise(async (resolve, reject) => {
                        let client= await db.collection('User').doc(order.data().ClientID).get();
                        console.log(client.data());
                        let newNotRetired= client.data().NotRetired + 1;
                        console.log(newNotRetired);
                        db.collection('User').doc(order.data().ClientID).update({NotRetired : newNotRetired});
                    resolve("QUANTITYUPDATE");

                
                }))
            }})
            Promise.all(risultato);
        }catch (error) {
            console.log(error);
            res.status(500).json({
                info: "The server cannot process the request",
                error: error
            });
        }
    }
            
})



app.post('/api/modifyorder', async (req, res) => {
    let result = [];
    let risultato = [];
    let order;
    let user;
    let new_Quantity = 0;
    let id;

    try {
        if (req.body.Status == "pending") {
            order = await db.collection('Order').doc(req.body.id).get();

            console.log(order);

            risultato.push(new Promise(async (resolve, reject) => {
                id = order.data().ClientID;
                console.log(id);
                user = await db.collection('User').doc(id).get();
                console.log(user);
                new_Quantity = user.data().Wallet - order.data().Price;
                console.log(new_Quantity);
                if (new_Quantity < 0) {
                    res.status(500).json({

                        error: "The client haven't enough money"
                    });
                } else {

                    db.collection('Order').doc(req.body.id).update({Status: req.body.Status});
                    db.collection('User').doc("" + order.data().ClientID).update({Wallet: new_Quantity});
                    resolve("QUANTITYUPDATE");

                    res.status(201).end();
                }
            }))
            Promise.all(risultato);


        } else {
            (async () => {
                await db.collection('Order').doc(req.body.id).update({Status: req.body.Status});
                res.status(201).end();
            })()

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }

});

app.post('/api/modifywallet', async (req, res) => {

    try {
        const users = await db.collection('User').get();
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Users)"});
        } else {

            (async () => {
                await db.collection('User').doc(req.body.ClientID).update({Wallet: req.body.Wallet});
            })()
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
    res.status(201).end();

});

app.post('/api/checkClient', async (req, res) => {

    let soldi_spesi = 0;
    let ritorno = {};
    console.log(req.body.ClientID);
    let client;

    try {
        if(req.body.ClientID){

            let client = await db.collection('User').doc(req.body.ClientID).get();

            if (client.empty) {
                console.log("No entries (Table: users)");
                res.status(404).json({error: "No entries (Table: users)"});
            }

            let order = await db.collection('Order').get()

            if (order.empty) {
                console.log("No entries (Table: order)");
                res.status(404).json({error: "No entries (Table: order)"});
            }

           
            order.forEach(order => {
                if (order.data().ClientID == req.body.ClientID && order.data().Status == "open") { 
                    soldi_spesi = soldi_spesi + order.data().Price
                }
            })

            ritorno.Wallet = client.data().Wallet;
            ritorno.Money = soldi_spesi;
            res.status(201).json(ritorno);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});


app.post('/api/addProduct', async (req, res) => {
    const user = req.user && req.user.user;
    console.log(user);
    if(user.Role != "Farmer"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are not a Farmer)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    
    let day2 = dayjs(req.body.date);
    let weekOfYear=0;
    let returned;
    let PrdId;

    if(dayjs(day2).day()==6 && dayjs(day2).hour() >8){
        weekOfYear= dayjs(day2).week() +1;
    }else{
        weekOfYear= dayjs(day2).week();
    }
    console.log(weekOfYear);
    
    try {
        if (req.body.productByFarmerID ==false){
        let newprodFarmer = {}
        newprodFarmer.FarmerID = user.userID;
        newprodFarmer.ProductID = req.body.ProductID;
        newprodFarmer.Price = parseFloat(req.body.Price);
        newprodFarmer.Quantity = parseInt(req.body.Quantity);
        newprodFarmer.Unitofmeasurement = req.body.UnitOfMeasurement;
        newprodFarmer.Week= weekOfYear;

        
        returned = await db.collection('Product by Farmers').add(newprodFarmer);
        PrdId = returned.id
        }else{
            
            
            await db.collection('Product by Farmers').doc(req.body.productByFarmerID).update({Price: req.body.Price, Quantity: req.body.Quantity, Unitofmeasurement: req.body.UnitOfMeasurement});
            PrdId = req.body.productByFarmerID;

        }
        res.status(201).json({ productByFarmerID : PrdId }).end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }

});


app.post('/api/deleteProduct', async (req, res) => {
    
    const user = req.user && req.user.user;
    console.log(user);
    if(user.Role != "Farmer"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are not a Farmer)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    
    try {

        
    await db.collection('Product by Farmers').doc("" + req.body.productByFarmerID).delete();
   
          
        res.status(201).end();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }

});

app.get('/api/notRetiredOrder', async (req, res) => {
    const user = req.user && req.user.user;
    let nonRitiri={};
    try {
        const client = await db.collection('User').doc(user.userID).get();  
        nonRitiri.NotRetired = client.data().NotRetired;
        
        res.status(200).json(nonRitiri);
        }
    catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});






app.get('/api/sessions/current', (req, res) => {
    const user = req.user && req.user.user;
    console.log(req.user.user.Email);
    if (user) {
        res.status(200).json(req.user);
    } else res.status(401).json({error: 'User non authenticated'});
});







app.get('/api/confirmationProduct/:date', async (req, res) => {
    const user = req.user && req.user.user;
    let day2 = dayjs(req.params.date);
    if(user.Role == "Client"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    try {
        const orders = await db.collection('Order').orderBy('Timestamp').get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {
            let productsByOneFarmer=[];
            let result = [];
            orders.forEach(order => {

                result.push(new Promise(async (resolve, reject) => {
                    const client = await db.collection('User').doc("" + order.data().ClientID).get();
                    if (!client.exists) {  
                        console.log("No matching users for " + order.data().ClientID);
                    }

                    if (day2.week() === dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss').week() ){
                        order.data().Products.forEach(prodotto =>{
                        if(prodotto.FarmerID ==user.userID ){
                            productsByOneFarmer.push(prodotto);
                        }

                        })
                        if(productsByOneFarmer.length==0){
                            resolve({})
                        }
                        
                        
                        resolve({
                        OrderID: order.id, 
                        Status: order.data().Status,
                        ClientID: client.id,
                        Client: client.data(),
                        Timestamp: order.data().Timestamp,
                        ListOfProducts:productsByOneFarmer,
                        DeliveryDate: order.data().DeliveryDate,
                        DeliveryPlace: order.data().DeliveryPlace,
                        pickupTimestamp: order.data().pickupTimestamp,
                        notRetired: order.data().notRetired
                      })
                      productsByOneFarmer=[]
                    
                    }else{
                          resolve({})};
                }));
            })
            const response = Promise.all(result).then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                res.status(200).json(a)})
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










app.post('/api/confirmation', async (req, res) => {
    const user = req.user && req.user.user;
    
   
    console.log( req.body);
    if(user.Role == "Client"){
        console.log("GET all orders - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }
    try {
        const orders = await db.collection('Order').doc("" + req.body.OrderID).get();
        let entrato=0;
        let updateProduct=[];
        let nuovoProdotto = {};
        let PrezzoDaTogliere=0;
        let nuovoPrezzo=0;
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {
            
            orders.data().Products.forEach(prodotto =>{
                console.log(prodotto);
                console.log(entrato);
                if(prodotto.FarmerID ==user.userID && prodotto.ProductID == req.body.ProductID && prodotto.number == req.body.number && prodotto.Confirmed =="" && entrato==0 ){
                    nuovoProdotto.FarmerID=prodotto.FarmerID;
                    nuovoProdotto.ProductID=prodotto.ProductID;
                    nuovoProdotto.ImageID=prodotto.ImageID;
                    nuovoProdotto.NameProduct=prodotto.NameProduct;
                    nuovoProdotto.Price=prodotto.Price;
                    nuovoProdotto.number=prodotto.number;
                    if(req.body.Confirmed==true){
                    nuovoProdotto.Confirmed= "true";}
                    else {
                        nuovoProdotto.Confirmed= "false";
                        PrezzoDaTogliere=prodotto.Price* prodotto.number;


                    }
                    updateProduct.push(nuovoProdotto);
                    console.log(nuovoProdotto);
                    entrato ++;
                }else{
                    updateProduct.push(prodotto);

                }
            })
            if(req.body.Confirmed==true){
            db.collection("Order").doc("" + req.body.OrderID).update({Products: updateProduct});}
            else{
                nuovoPrezzo=orders.data().Price - PrezzoDaTogliere;
                db.collection("Order").doc("" + req.body.OrderID).update({Products: updateProduct , Price: nuovoPrezzo});
            }
            res.status(200).end();
        
        }

 } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
});


app.post('/api/newproduct',
    upload.single('newproductimage'),
    async (req, res) => {

        const newProduct = JSON.parse(req.body.productJson);
        const newImage = req.file;

        let guid = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


        let whileExit = false;
        let newRandomId;
        do {
            newRandomId = guid();
            try {
                const fileStat = fs.lstatSync('images/' + newRandomId + '.png');
            } catch (error) {
                whileExit = true;
            }
        } while (!whileExit);


        const data = {
            Name: newProduct.Name,
            Description: newProduct.Description,
            ImageID: newRandomId
        }
        await db.collection('Product').doc().create(data);

        const renameResult = fs.renameSync('images/tmp/' + newImage.originalname, 'images/' + newRandomId + '.png');

        res.status(201).json('Product inserted with ImageID -> ' + newRandomId);
    });


let server = app.listen(port, () => {
    console.log(`react-score-server listening at http://localhost:${port}`);
});

function stop() {
    server.close();
}

module.exports = server;
module.exports.stop = stop;
module.exports.firebase = firebaseappBackup;



