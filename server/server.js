'use strict';

const {body, param, validationResult, sanitizeBody, sanitizeParam} = require('express-validator');
const express = require('express');
const morgan = require('morgan'); // logging middleware
const Dao = require('./dao');
const {toJSON} = require("express-session/session/cookie"); // module for accessing the exams in the DB
const dayjs = require("dayjs");
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)


// init express
const app = express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());

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