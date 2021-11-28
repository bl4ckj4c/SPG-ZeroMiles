const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');

let app = require('../server');

chai.use(chaiHttp);

// User for the authentication
const user = {
    username: 'testname.testsurname@polito.it',
    password: 'test'
}

const userKeys = [
    'Name',
    'Surname',
    'UserID',
    'Email',
    'Phoneno',
    'Address',
    'City',
    'State',
    'Zipcode',
    'Role',
    'Wallet'
];

const userKeysRegexp = [
    /^[a-zA-Z]+$/,
    /^[a-zA-Z\']+$/,
    /^.+$/,
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    /^(\+(\([0-9]{1,2}\))?)?[0-9]+$/,
    /^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$/,
    /^[a-zA-Z]+$/,
    /^[a-zA-Z]+$/,
    /^[0-9]{5}$/,
    /^[Client|Employee]$/
];
// const productByFarmer_Keys = [
//     'Price',
//     'ProductID',
//     'Quantity',
//     'Unitofmeasurement'
// ];
// const productByFarmer_KeysRegexp = [
//
//     /^[0-9]$/,
//     /^.+$/,
//     /^[0-9]$/,
//     /^[kg|bag]$/
//
// ];
//

describe("GET for /api/users", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 401
                expect(res.status).to.be.equal(401);
                done();
            });
    });

    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/users')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);

                        done();

                        //requester.close();
                    });
            });
    });

    test("It should receive all users from the server", (done) => {
        chai
            .request(app)
            .get('/api/users')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);
                // The body received should be an array
                expect(res.body).to.be.an("array");

                // Check the the number of users in Firebase
                expect(res.body).to.have.lengthOf(13);

                // Check that each element returned is well-formed
                res.body.forEach((item, indexItem) => {
                    console.log(item);
                    // Check if the current item is an object
                    expect(item).to.be.an("object");
                    // Check that the current elements has all fields expected
                    expect(item).to.have.all.keys(userKeys[indexItem]);

                    // Check that each field is correct
                    item.forEach((field, indexField) => {
                        expect(field).to.match(userKeysRegexp[indexField])
                    })
                })
                // Test passed
                done();
            });
    });
});

//2 GET productByFarmer

describe("GET for /api/productByFarmer", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/productByFarmer')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 401
                expect(res.status).to.be.equal(401);
                done();
            });
    });
    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/productByFarmer')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        // Check the the number of users in Firebase
                        expect(res.body).to.have.lengthOf(20);

                        res.body.forEach((item, indexItem) => {
                            // Check if the current item is an object
                            expect(item).to.be.an("object");
                        });
                        done();
                    });
            });
    });
});

//3 GET all Farmers

describe("GET for /api/farmers", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/farmers')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 401
                expect(res.status).to.be.equal(401);
                done();
            });
    });
    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/farmers')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        // Check the the number of users in Firebase
                        expect(res.body).to.have.lengthOf(6);

                        res.body.forEach((item, indexItem) => {


                            // Check if the current item is an object
                            expect(item).to.be.an("object");


                        });
                        done();

                    });
            });

    });
});

//4 GET all Order

describe("GET for /api/orders", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/orders')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 401
                expect(res.status).to.be.equal(401);
                done();
            });
    });
    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(user))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/orders')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        // Check the the number of users in Firebase
                        expect(res.body).to.have.lengthOf(20);

                        res.body.forEach((item, indexItem) => {


                            // Check if the current item is an object
                            expect(item).to.be.an("object");


                        });
                        done();

                    });
            });

    });

//5 GET all Product In Order

    describe("GET for /api/productinorder", () => {
        test('Unauthorized request', (done) => {
            chai.request(app)
                .get('/api/productinorder')
                .end((err, res) => {
                    // We should not have error
                    expect(err).to.be.null;
                    // Check that the response status is 401
                    expect(res.status).to.be.equal(401);
                    done();
                });
        });
    });


});
