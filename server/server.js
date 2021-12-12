'use strict';

const firebasefunctions = require('firebase-functions');
const firebase = require('firebase-admin');
const firebaseBackup = require('firebase-admin');
const firebaseBackup2 = require('firebase-admin');
const firebaseBackup3 = require('firebase-admin');
const {firebaseconf} = require('./firebase-server/config.js');
const {firebaseconf_backup} = require('./firebase-server/config.js');
const {firebaseconf_backup_2} = require('./firebase-server/config.js');
const {firebaseconf_backup_3} = require('./firebase-server/config.js');
const userDao = require('./userDAO');
const {body, param, validationResult, sanitizeBody, sanitizeParam} = require('express-validator');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // logging middleware
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {toJSON} = require("express-session/session/cookie"); // module for accessing the exams in the DB
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
//const { convertMultiFactorInfoToServerFormat } = require('firebase-admin/lib/auth/user-import-builder');

// Upload new image handler
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
const upload = multer({storage: storage});

//jwt parameters
const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 1200; //seconds

// init express
const app = express();
const port = 3001;
//app.use(cors({origin: true}));

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());


/*const formData = require('express-form-data');
app.use(formData.parse());*/


// Set-up middleware for managing the images
app.use('/images', express.static('images'));

// *********************
// ***** FIREBASE  *****
// *********************


/* init firebase app */

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


/* get reference a reference to the firestore database */
//var db = firebase.firestore();
//var db_backup = firebaseBackup.firestore(firebaseappBackup);
//var db_backup_2 = firebaseBackup2.firestore(firebaseappBackup2);
//var db_backup_3 = firebaseBackup3.firestore(firebaseappBackup3);
var db = firebaseBackup.firestore(firebaseappBackup);

//use this code to clone db_backup into db_backup_2 and db_backup_3. ATTENTION: it works per-table
//BE CAREFUL: DON'T UNCOMMENT THIS CODE IF YOU DON'T KNOW WHAT TO DO
/*
(async()=>{
    let entries = await db.collection("User").get()
    if(!entries.empty){
        entries.forEach(entry => {
            db_backup_3.collection("User").doc(entry.id).create(entry.data());
        })
    }
})()
*/

/*
const bucket = firebase.storage().bucket();

//scarica dallo storage di firebase un file. ".file(<firebase_storage_path>)" localizza il file e ".download(<options_json>)" lo scarica
bucket.file('395100.png').download({
    destination: "./newfile.png"  //supporta path relativi; SPECIFICARE IL NOME DEL FILE SCARICATO COME ULTIMA STRINGA DEL PATH
},function(err){
    console.log(err);
})


//carica sullo storage di firebase un file. Prende come parametro il path del file locale e un json di opzioni, tra cui la destinazione
bucket.upload('./newfile.png',{
    destination: "bar.png"  //destinazione nello storage di firebase; si possono specificare anche delle directory (es. foo/store/bar.png) che, se non esistenti, verranno create
}).then(()=>{
    console.log("file uploaded successfully");
}).catch(err => {
    console.error("ERROR: ", err);
})

//ritorna un JSON con tutti i file presenti nello storage di firebase -> ne stampo i nomi
bucket.getFiles(function(err,files){
    if(!err){
        files.forEach(file =>{
            console.log(file.name)
        })
    }
})
*/

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

    try {
        const user = await db.collection("User").where("Email", "==", username).get();

        if (user.empty) {
            res.status(404).json({info: "Authentication error", error: "User not found (Table: User)"});
        } else {
            user.forEach(user => {  //because user is a query snapshot
                if (!userDao.checkPassword(user.data(), password)) {
                    res.status(401).json({info: "Authentication error", error: "wrong password"});
                } else {
                    //AUTHENTICATION SUCCESS
                    console.log("Authentication succeeded!" + user.id);
                    const token = jsonwebtoken.sign({user: {userID: user.id, ...user.data()}}, jwtSecret); //for expiration time, add {expiresIn: expireTime} to jwt sign operation
                    res.cookie('token', token, {httpOnly: true, sameSite: true});  //for expiration time: add parameter 'maxAge: 1000 * expireTime' to the JSON
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


/* POST user registration (add user to database) */
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
    body('surname')
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
            let regex = new RegExp(/^[a-zA-Z\']+$/);
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
            let regex = new RegExp(/^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/);
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
            newUser.Name = req.body.name;
            newUser.Surname = req.body.surname;
            newUser.Email = req.body.email;
            newUser.Address = req.body.address;
            newUser.Phoneno = req.body.phone;
            newUser.City = req.body.city;
            newUser.Password = req.body.password;  //userDao.hashOfPassword(req.body.password)
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
    body('surname')
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
            let regex = new RegExp(/^[a-zA-Z\']+$/);
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
            let regex = new RegExp(/^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/);
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
        body('company')
        // Check if the city parameter is not null
        .exists({checkNull: true})
        .bail()
        // Check if the city parameter is not empty
        .notEmpty()
        .bail()
        // Check if the city parameter is a string
        .isString(),
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
            newUser.Name = req.body.name;
            newUser.Surname = req.body.surname;
            newUser.Email = req.body.email;
            newUser.Address = req.body.address;
            newUser.Company = req.body.company;
            newUser.Phoneno = req.body.phone;
            newUser.City = req.body.city;
            newUser.Password = req.body.password;  //userDao.hashOfPassword(req.body.password)
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

/* GET all products */
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
                .then(r => res.json(r))
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

/* GET all products by farmers */
  app.get('/api/allProductsByFarmers/:date', async (req, res) => {
    let weekOfYear=0;

    let day2 = dayjs(req.params.date);
    if(dayjs(day2).day()==0 && dayjs(day2).hour() !=23){
        weekOfYear= dayjs(day2).week() -1;
    }else{
   
     weekOfYear= dayjs(day2).week();}
    console.log(weekOfYear);


    

    try {
        const productbyfarmer = await db.collection('Product by Farmers').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: product by farmers)"});
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
                    }
                    if (prodfarm.data().Week != weekOfYear){
                        console.log("No Settimana");
                        resolve({
                    });

                    
                        
                 }else {
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
                .then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                res.json(a)})
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

/* GET all farmers */
app.get('/api/farmers', async (req, res) => {
    try {
        const farmers = await db.collection('Farmer').orderBy("Distance").get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (farmers.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Farmer)"});
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

/*
 * ********************************************
 * ******** AUTHENTICATED APIs: ***************
 * ********************************************
 * 
 * ALL APIs AFTER app.use(jwt(...)) WILL GIVE 
 * BACK 401 (UnauthorizedError: No authorization 
 * token was found) IF THE REQUEST DOES NOT 
 * TRANSPORT ANY TOKEN
 * 
 * 
 */

app.use(jwt({
        algorithms: ['HS256'],  //prevents downgrade attacks -> HS256 used for the session
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

/* GET products by the authenticated farmer (one farmer) */
app.get('/api/productsByFarmer/:date', async (req, res) => {
    const user = req.user && req.user.user;
    let day2 = dayjs(req.params.date);
    let weekOfYear=0;

    if(dayjs(day2).day()==6 && dayjs(day2).hour() >8){
    weekOfYear= dayjs(day2).week() +1;
    }else{
        weekOfYear= dayjs(day2).week();
    }
    weekOfYear= dayjs(day2).week();
    console.log(weekOfYear);
    
    if(user.Role != "Farmer"){
        console.log("GET productsByFarmer - 401 Unauthorized (Maybe you are not a farmer)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    try {
        const productbyfarmer = await db.collection('Product by Farmers').where("FarmerID", "==", "" + user.userID).get();  //.where("FarmerID","==","JJeuoVa8fpl4wHGLK8FO")
        if (productbyfarmer.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: product by farmers)"});
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
                    }
                    
                    if (prodfarm.data().Week != weekOfYear){
                        console.log("No Settimana");
                        resolve({});

                    
                 } else {
                        //do something, e.g. create a JSON like productbyfarmer but with "Product" and "Farmer" entries instead of "ProductID" and "FarmerID"
                        resolve({
                            // Farmer
                        /*  FarmerID: prodfarm.data().FarmerID,

                             
                            Name: farmer.data().Name,
                            Surname: farmer.data().Surname,
                            Company: farmer.data().Company,
                            Email: farmer.data().Email,
                            Phoneno: farmer.data().Phoneno,
                            Address: farmer.data().Address,
                            State: farmer.data().State,
                            Zipcode: farmer.data().Zipcode,
 */                            //Distance: farmer.data().Distance
                            // Product
                            ProdByFarmerID: prodfarm.id,
                            ProductID: prodfarm.data().ProductID,
                            NameProduct: product.data().Name,
/*                             Description: product.data().Description,
                          */  
                            // Product by farmer
                            Quantity: prodfarm.data().Quantity,
                            UnitOfMeasurement: prodfarm.data().Unitofmeasurement,
                            Price: prodfarm.data().Price,
                            ImageID: product.data().ImageID
                        });

                        //  console.log(farmer.data().Name + " offers " +
                        //             prodfarm.data().Quantity + " " + prodfarm.data().Unitofmeasurement + " of " +
                        //           product.data().Name);
                    }
                }));
            });
            const response = Promise.all(result)
                .then(r => {let a = r.filter(value => JSON.stringify(value) !== '{}')
                            res.json(a)})
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

/* GET all users */
app.get('/api/users', async (req, res) => {
    const user = req.user && req.user.user;
    if(user.Role == "Client"){
        console.log("GET all users - 401 Unauthorized (Maybe you are a Client)")
        res.status(401).json({error: "401 Unauthorized"})
        return;
    }

    try {
        const users = await db.collection('User').get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Users)"});
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

/* GET informations about the authenticated user*/
app.get('/api/userinfo', async (req, res) => {
    const user = req.user && req.user.user;
    try {
        const users = await db.collection('User').where("Email", "==", "" + user.Email).get();  //products is a query snapshot (= container that can be empty (no matching document) or full with some kind of data (not a JSON))
        if (users.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Users)"});
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

/* GET all orders of the authenticated user*/
app.get('/api/clientorders', async (req, res) => {
    const user = req.user && req.user.user;
    
    
    
    try {
        const orders = await db.collection('Order').where("ClientID", "==", "" + user.userID).orderBy("Timestamp").get();
        if (orders.empty) {
            console.log("No matching documents.");
            res.status(200).json([]);
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
                    info: "Promises error (get all client orders)",
                    error: error
                }));
            //console.log(orders);
            //orders.forEach(order => {console.log(order.data())})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            info: "The server cannot process the request",
            error: error
        });
    }
})

/* GET all orders of all users */
app.get('/api/orders', async (req, res) => {
    const user = req.user && req.user.user;
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

/* GET all cancelled orders of this week of all users */
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
                let parsedorderdate = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss')  //parse order format from dd:mm:yyyy to mm:dd:yyyy
                
                if(parsedorderdate.week() == date.week() && 
                    parsedorderdate.day() >= 1 && 
                    parsedorderdate.day() <= date.day() &&
                    parsedorderdate.format("HH:mm") >= "9:00" &&
                    parsedorderdate.format("HH:mm") <= date.format("HH:mm")){
                        
                        result.push(new Promise(async (resolve, reject) => {
                            const client = await db.collection('User').doc("" + order.data().ClientID).get();
                            if (!client.exists) {  //for queries check query.empty, for documents (like this case, in which you are sure that at most 1 document is returned) check document.exists
                                console.log("No matching users for " + order.data().ClientID);
                            }
                            resolve({
                                OrderID: order.id,
                                Status: order.data().Status,
                                ClientID: client.id,
                                Client: client.data(),
                                Timestamp: order.data().Timestamp,
                                ListOfProducts: order.data().Products
                            });
                        }));
                   }
                    
                })
            }
            const response = Promise.all(result)
                .then(r => res.json(r))
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

/* POST place an order in the database */
app.post('/api/order', async (req, res) => {
     let reqday = dayjs(req.body.timestamp);
     let reqweekOfYear=dayjs(req.body.timestamp).week();
     if(dayjs(reqday).day()==0 && dayjs(reqday).hour() <23){
        reqweekOfYear= reqweekOfYear - 1;
     }
   
   
    try {
        let sameweekorder = 0;
        let result = [];
        let productByFarmer = await db.collection('Product by Farmers').get()
        //where("ProductID", "==", ""+req.body.ProductID).where("FarmerID", "=", ""+req.body.FarmerID).get();
        if (productByFarmer.empty) {
            console.log("No entries (Table: product by farmers)");
            res.status(404).json({error: "No entries (Table: product by farmers)"});
        }

        //for each product in the order
        let quantity = 0;
        req.body.items.forEach(product => {
            quantity = quantity + product.number * product.Price;
            productByFarmer.forEach(prodfarm => {
                if (product.ProductID == prodfarm.data().ProductID && product.number > prodfarm.data().Quantity) { //check if there are enough unities for the product requested
                    console.log("Not enough products (" + product.NameProduct + ")");
                    res.status(404).json({error: "Not enough products (" + product.NameProduct + ")"});
                }
            })
        })

        const orders = await db.collection("Order").where("ClientID","==",""+req.body.UserID).get()  //get all order by that client
        if(!orders.empty){  //if the client has an open order, add products to that order
            orders.forEach(order => {
                let orderday = dayjs(order.data().Timestamp,'DD-MM-YYYY HH:mm:ss');
                let orderweekOfYear = dayjs(orderday).week();
                if(dayjs(orderday).day()==0 && dayjs(orderday).hour() <23){
                    orderweekOfYear= orderweekOfYear - 1;
                }
                if(orderweekOfYear == reqweekOfYear){ //if it's the order of current week, update it
                    sameweekorder = 1;
                    let newlist = [
                        ...order.data().Products,
                        ...req.body.items
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
            (async () => {
                try {
                    //console.log(newOrder);
                    await db.collection("Order").add(newOrder);
                } catch (error) {
                    console.log(error);
                    res.json(error);
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
})


app.post('/api/modifyDelivery', async (req, res) => {

    try {
        const order = await db.collection('Order').get();
        if (order.empty) {
            console.log("No matching documents.");
            res.status(404).json({error: "No entries (Table: Order)"});
        } else {

            
                let day = dayjs( req.body.DeliveryDate).format("DD-MM-YYYY HH-MM-SS");
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



/* POST set Time machine */
app.post('/api/timeMachine',async(req,res)=>{
    let newdate = req.body.newdate ? req.body.newdate : "";
    let purchaseTriggerDOW = "1";   
    let purchaseTriggerHour = "9:00";
    //If it's clientOrdersDeadline, i have to fullfill the order by all clients
    //Logic: i process orders ordered by timestamp, for each client -> i start fullfill orders until the wallet is insufficient
    //this means that it's sufficient to get all orders ordered by timestamp and process them one after the other in a sinchronous way
    if(dayjs(newdate).day()==purchaseTriggerDOW &&  
       dayjs(newdate).week() == dayjs().week() && 
       dayjs(newdate).format("HH:mm") >= purchaseTriggerHour){  //if the new date is after Monday 9:00 am (of that week) 
        
        try {
            const orders = await db.collection('Order').orderBy('Timestamp').get();
            if (orders.empty) {
                console.log("No matching documents.");
                res.status(404).json({error: "No entries (Table: Order)"});
            } else {
                let result = [];
                orders.forEach(order => {
    
                    result.push(new Promise(async (resolve, reject) => {
                        /*const client = await db.collection('User').doc("" + order.data().ClientID).get();
                        if (!client.exists) {  //for queries check query.empty, for documents (like this case, in which you are sure that at most 1 document is returned) check document.exists
                            console.log("No matching users for " + order.data().ClientID);
                        }*/
                        resolve({
                            OrderID: order.id,
                            ...order.data()
                        });
                    }));
                })
                Promise.all(result).then(result => {
                    let responseresult = [];
                    for(const entry of result){
                        responseresult.push(
                            new Promise(async (resolve, reject) => {
                                let client = await db.collection('User').doc("" + entry.ClientID).get();
                                if (!client.exists) {
                                    console.log("No matching users for " + entry.data().ClientID);
                                }
                                else{
                                    if(entry.Wallet > entry.Price){
                                        let newwallet = entry.Wallet - entry.Price;
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
                                            status: "cancelled"
                                        })
                                    }
                                }
                            })
                        )
                        /*
                        let client = await db.collection('User').doc("" + entry.ClientID).get();
                        if (!client.exists) {  
                            console.log("No matching users for " + order.data().ClientID);
                        }
                        else{
                             if(entry.Wallet){
                                await db.collection('Order').doc(entry.OrderID).update({Status: "pending"});
                                await db.collection('User').doc(entry.ClientID).update({Wallet: 0});
                            }
                            else{
                                await db.collection('Order').doc(entry.OrderID).update({Status: "cancelled"});
                                //* warning in response: order cancelled due to insufficient wallet balance 
                            }
                        }
                        */
                    }
                    Promise.all(responseresult).then(responseresult => res.json(responseresult))
                    .catch(r => res.status(500).json({
                        info: "Promises error (process orders)",
                        error: error
                    }))
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
    }
    res.status(200).end();
})
//MODIFY ORDER
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

        client = await db.collection('User').doc(req.body.ClientID).get();

        if (client.empty) {
            console.log("No entries (Table: users)");
            res.status(404).json({error: "No entries (Table: users)"});
        }

        let order = await db.collection('Order').get()
        //where("ProductID", "==", ""+req.body.ProductID).where("FarmerID", "=", ""+req.body.FarmerID).get();

        if (order.empty) {
            console.log("No entries (Table: order)");
            res.status(404).json({error: "No entries (Table: order)"});
        }

        //for each product in the orde
        order.forEach(order => {
            if (order.data().ClientID == req.body.ClientID && order.data().Status == "open") { //check if there are enough unities for the product requested
                soldi_spesi = soldi_spesi + order.data().Price
            }
        })

        console.log(client);
        ritorno.Wallet = client.data().Wallet;
        ritorno.Money = soldi_spesi;
        res.status(201).json(ritorno);


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
        console.log(returned);

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








app.get('/api/sessions/current', (req, res) => {
    const user = req.user && req.user.user;
    console.log(req.user.user.Email);
    if (user) {
        res.status(200).json(req.user);
    } else res.status(401).json({error: 'User non authenticated'});
});

// POST for store a new product with related image into the server

app.post('/api/newproduct',
    upload.single('newproductimage'),
    async (req, res) => {

        console.log(req)
        //console.log(req.body.newProduct)


        const newProduct = JSON.parse(req.body.productJson);
        const newImage = req.file;

        // Generate a new random id for the new image
        let guid = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        //const newRandomId = guid();

        let whileExit = false;
        let newRandomId;
        do {
            newRandomId = guid();
            // Check if the imageId is not already present in the server
            try {
                const fileStat = fs.lstatSync('images/' + newRandomId + '.png');
            } catch (error) {
                // If there is an error, it means that the file is not present in the server
                whileExit = true;
                // Otherwise the file already exists, so a new random id is generated
            }
        } while (!whileExit);


        //Insert the new product into Firebase
        const data = {
            Name: newProduct.Name,
            Description: newProduct.Description,
            ImageID: newRandomId
        }
        await db.collection('Product').doc().create(data);

        // Store the new image into the server
        const renameResult = fs.renameSync('images/tmp/' + newImage.originalname, 'images/' + newRandomId + '.png');

        res.status(201).json('Product inserted with ImageID -> ' + newRandomId);
    });


// Activate the server
let server = app.listen(port, () => {
    console.log(`react-score-server listening at http://localhost:${port}`);
});

function stop() {
    server.close();
}

//module.exports = app;
module.exports = server;
module.exports.stop = stop;
module.exports.firebase = firebaseappBackup;



