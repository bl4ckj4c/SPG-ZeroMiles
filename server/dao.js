'use strict';
/* Data Access Object (DAO) module for accessing courses and exams */

const dayjs = require("dayjs");
const {body, validationResult} = require("express-validator");

let numclients = 1;
let nextClientToBeServed = numclients;

// add a new selecttype
/*exports.selectType = (e, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO exam(coursecode, date, score, userid) VALUES(?, DATE(?), ?, ?)';
    db.run(sql, [e.value, 0, e.label, 1], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};*/

exports.listSelection = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT serviceType, date FROM Service';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const types = rows.map((type) => ({serviceType: type.serviceType, date: type.date}));
            resolve(types);
        });
    });
};


// add new client
exports.addClient = (client) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Client(clientId, officeId, serviceId) VALUES(?, ?, ?)';
        db.run(sql, [client.id, 10, client.id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

//TODO BRUNO
//get a ticket number for a new customer
exports.getNewTicket = (serviceType) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO Client(clientId, officeId, serviceId) VALUES(?, ?, ?)';

    numclients++;
    db.run(sql, [numclients, 42, serviceType], (err) => {
      if (err) {
          console.log(err);
          console.log(numclients);
        reject(err);
        return;
      }

      let serviceName;
      switch (parseInt(serviceType,10)) {
          case 1:
              serviceName = "bill";
              break;
          case 2:
              serviceName = "post";
              break;
          case 3:
              serviceName = "box";
              break;
          case 4:
              serviceName = "withdrawal";
              break;
          default:
              serviceName = "generic";
      }
      console.log(serviceName);

      const sql2 = 'INSERT INTO Service(serviceId, serviceType, date, officeId, counterId) VALUES(?, ?, ?, ?, ?)';
      db.run(sql2, [parseInt(serviceType,10), serviceName, dayjs().format("YYYY-MM-DD"), "O1", "counter1"], (err2) => {
          if (err2) {
                console.log(err2);
              reject(err2);
              return;
          }

          const stats = {number: numclients, estimatedWaitingTime: -1};
          resolve(stats);
      });
    });
  });
};

// *********************
// *** MANAGER start ***
// *********************

// Get statistics about all counters per service type
exports.getStatisticsAllCounters = (startDate, endDate, manager) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT counterId, serviceType, COUNT(*) AS numCost\n' +
            '        FROM Service \n' +
            '        WHERE DATE(date) BETWEEN ? AND ?' +
            '            AND officeId IN (SELECT officeId \n' +
            '                             FROM Manager\n' +
            '                             WHERE managerId = ?)' +
            '        GROUP BY counterId, serviceType';
        db.all(sql, [startDate, endDate, 'M1'], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const stats = rows.map((t) => (
                {
                    counterId: t.counterId,
                    serviceType: t.serviceType,
                    customerServed: t.numCost
                }
            ));
            resolve(stats);
        });
    });
};

// Get statistics about all service types
exports.getStatisticsAllServices = (startDate, endDate, manager) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT serviceType, COUNT(*) AS numCost\n' +
            '        FROM Service \n' +
            '        WHERE DATE(date) BETWEEN ? AND ?' +
            '            AND officeId IN (SELECT officeId \n' +
            '                             FROM Manager\n' +
            '                             WHERE managerId = ?)' +
            '        GROUP BY serviceType';
        db.all(sql, [startDate, endDate, 'M1'], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const stats = rows.map((t) => (
                {
                    serviceType: t.serviceType,
                    customerServed: t.numCost
                }
            ));
            resolve(stats);
        });
    });
};

// Get statistics about a specific counter
exports.getStatisticsCounter = (counter, startDate, endDate, manager) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*)\n' +
            '        FROM Service \n' +
            '        WHERE counterId = ? AND DATE(date) BETWEEN ? AND ?' +
            '            AND officeId IN (SELECT officeId \n' +
            '                             FROM Manager\n' +
            '                             WHERE managerId = ?)';
        db.run(sql, [counter, startDate, endDate, 'M1'], function (err, row) {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
};

// Get statistics about a specific service type
exports.getStatisticsServiceType = (serviceType, startDate, endDate, manager) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT COUNT(*)\n' +
            '        FROM Service \n' +
            '        WHERE serviceType = ? AND DATE(date) BETWEEN ? AND ?' +
            '            AND officeId IN (SELECT officeId \n' +
            '                             FROM Manager\n' +
            '                             WHERE managerId = ?)';
        db.run(sql, [serviceType, startDate, endDate, 'M1'], function (err, row) {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
};

// *******************
// *** MANAGER end ***
// *******************

// *********************
// *** OFFICER start ***
// *********************

exports.getNextClient = () => {
    return new Promise((resolve, reject) => {
        if(nextClientToBeServed > numclients)
            resolve(0);
        else
            resolve(nextClientToBeServed++);
    });
};

// *******************
// *** OFFICER end ***
// *******************