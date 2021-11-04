/**
 * All the API calls
 */
import dayjs from 'dayjs';

const a = dayjs();

var numclients = 15;

const BASEURL = '/api';

async function getSelectedType() {
    const url = '/api/client';
    const response = await fetch(url);
    const responseBody = await response.json();
    if (response.ok) {
        return responseBody;
    } else {
        throw responseBody;
    }
}

let i = 0

async function getTicket(serviceType) {

    //JSON sent to backend
    console.log(JSON.stringify({
        typeOfRequest: "customer",
        ID: "",
        serviceType: serviceType,
        startDate: "",
        endDate: ""
    }));

    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/customer/newticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeOfRequest: "customer",
                id: serviceType,
                serviceType: serviceType.toString(),
                startDate: a
            }),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json());//console.log(response.json()); //response: JSON with ticket number
            } else {
                // analyze the cause of error
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch(() => {
            reject({error: "Cannot communicate with the server."})
        }); // connection errors
    });

    //JSON format expected
    /*

    const ticketNumber =
    {
      number: numclients,
      serviceType: "service3",
      estimatedWaitingTime: -1
    }

    numclients++;

    return ticketNumber;

    */

}

async function getNextCustomer(counterID) {

    const response = await fetch(BASEURL + '/officer/nextclient');
    const responseBody = await response.json();
    if (response.ok) {
        console.log({
            ticketNumber: responseBody,
            serviceType: ""
        });

        return ({
            ticketNumber: responseBody,
            serviceType: ""
        });
    } else {
        throw responseBody;
    }
}

async function getStatisticsForCounter(startDate, endDate, counterID) { //counterID can be null if manager asks for all counters
                                                                        //JSON sent to backend
    /*   console.log(JSON.stringify({typeOfRequest: "manager", ID: counterID, serviceType: "", startDate: startDate, endDate: endDate}));
      return new Promise((resolve, reject) => {
        fetch(BASEURL , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({typeOfRequest: "manager", ID: counterID, serviceType: "", startDate: startDate, endDate: endDate}),
          }).then((response) => {
            if (response.ok) {
              console.log(response.json()); //response: JSON with query results
            } else {
              // analyze the cause of error
              response.json()
                .then((message) => { reject(message); }) // error message in the response body
                .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
      });
     */

    //JSON format expexted
    const numServ = [
        {
            counterId: "counter1",
            serviceType: "s1",
            customerServed: 18
        },
        {
            counterId: "counter8",
            serviceType: "s1",
            customerServed: 13
        },
        {
            counterId: "counter2",
            serviceType: "s1",
            customerServed: 58
        }

    ]

    return numServ;
}

//TODO ANDREA
async function getStatisticsForAllCounter(startDate, endDate) {
    //JSON sent to backend
    console.log(JSON.stringify({
        typeOfRequest: "manager",
        ID: "",
        serviceType: "",
        startDate: startDate,
        endDate: endDate
    }));
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/manager/counters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeOfRequest: "manager",
                ID: "",
                serviceType: "",
                startDate: startDate,
                endDate: endDate
            }),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json())
            } else {
                // analyze the cause of error
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch(() => {
            reject({error: "Cannot communicate with the server."})
        }); // connection errors
    });

}


//TODO ANDREA
async function getStatisticsForServiceTypeNEW(startDate, endDate) {
    //JSON sent to backend
    console.log(JSON.stringify({
        typeOfRequest: "manager",
        ID: "",
        serviceType: "",
        startDate: startDate,
        endDate: endDate
    }));
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/manager/servicetypes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeOfRequest: "manager",
                ID: "",
                serviceType: "",
                startDate: startDate,
                endDate: endDate
            }),
        }).then((response) => {
            if (response.ok) {
                resolve(response.json())
            } else {
                // analyze the cause of error
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch(() => {
            reject({error: "Cannot communicate with the server."})
        }); // connection errors
    });

}


async function getStatisticsForServicetype(startDate, endDate, serviceType) { //counterID can be null if manager asks for all services
                                                                              //JSON sent to backend
    console.log(JSON.stringify({
        typeOfRequest: "manager",
        ID: "",
        serviceType: serviceType,
        startDate: startDate,
        endDate: endDate
    }));
    return new Promise((resolve, reject) => {
        fetch(BASEURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeOfRequest: "manager",
                ID: "",
                serviceType: serviceType,
                startDate: startDate,
                endDate: endDate
            }),
        }).then((response) => {
            if (response.ok) {
                console.log(response.json()); //response: JSON with query results
            } else {
                // analyze the cause of error
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch(() => {
            reject({error: "Cannot communicate with the server."})
        }); // connection errors
    });

    //JSON format expexted
    /*

    const numServ = [
      {
        counterId: "service1",
        customerServed : 18
      },
      {
        counterId: "service2",
        customerServed : 20
      },
      {
        counterId: "service3",
        customerServed : 13
      },
      {
        counterId: "service4",
        customerServed : 58
      }

    ]

    return numServ;

    */
}

/*  return new Promise((resolve, reject) => {
    fetch(BASEURL , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code: e.value, score: e.label, date: 0}),
      }).then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response.json()
            .then((message) => { reject(message); }) // error message in the response body
            .catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
        }
    }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
  });
}*/


const API = {
    getSelectedType,
    getTicket,
    getStatisticsForCounter,
    getStatisticsForServicetype,
    getStatisticsForServiceTypeNEW,
    getNextCustomer,
    getStatisticsForAllCounter
};
export default API;