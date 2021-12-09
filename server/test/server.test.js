const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');

let app = require('../server');

const firebaseBackup = require('firebase-admin');
var db = firebaseBackup.firestore(app.firebase);

chai.use(chaiHttp);

afterEach(() => {
    app.stop();
});

// Users for the authentication
const user = {
    username: 'testname.testsurname@polito.it',
    password: 'test'
}
const employee = {
    username: 'testname.testsurname@polito.it',
    password: 'test'
}
const farmer = {
    username: 'mara.maionchi@hotmail.com',
    password: 'test'
}
const client = {
    username: 'testname.testsurname3@polito.it',
    password: 'test'
}
const fakeClient = {
    username: 'abc.def@polito.it',
    password: 'test'
}

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

    test('Wrong role request', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/users')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(401);
                        done();
                    });
            });
    });

    test('Authorized request', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
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
                    });
            });
    });

    test("It should receive all users from the server", (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai
                    .request(app)
                    .get('/api/users')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        // Test passed
                        done();
                    });
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
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/allProductsByFarmers/12-08-2021%10:32:29')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
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
            .send(JSON.stringify(employee))
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
            .send(JSON.stringify(employee))
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
                        done();
                    });
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

//6 GET products of the authenticated farmer
describe("GET for /api/productsByFarmer", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/productsByFarmer')
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 401
                expect(res.status).to.be.equal(401);
                done();
            });
    });

    test('Wrong role request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/productsByFarmer')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(401);
                        done();
                    });
            });
    });

    /*test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/productsByFarmer')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        done();
                    });
            });
    });*/
});

//7 GET information about the authenticated user
describe("GET for /api/userinfo", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/userinfo')
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
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/userinfo')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        done();
                    });
            });
    });
});

//8 GET all products
describe("GET for /api/products", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/products')
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
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/products')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        done();
                    });
            });
    });
});

//9 GET all orders of the authenticated user
describe("GET for /api/clientorders", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/clientorders')
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
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/clientorders')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        // The body received should be an array
                        expect(res.body).to.be.an("array");
                        done();
                    });
            });
    });
});

//10 GET all orders of all users
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

    test('Wrong role request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/orders')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(401);
                        done();
                    });
            });
    });

    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
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
                        done();
                    });
            });
    });
});

//11 GET the current session
describe("GET for /api/sessions/current", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/sessions/current')
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
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/sessions/current')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        done();
                    });
            });
    });
});

// POST for login
describe("POST for /api/login", () => {
    test('Login with a fake user', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(fakeClient))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(401);
                done();
            });
    });

    test('Login with a real user', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);
                done();
            });
    });
});

// POST for logout
describe("POST for /api/logout", () => {
    test('Successful logout', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .post('/api/logout')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);
                        done();
                    });
            });
    });
});

// POST user registration (add user to database)
describe("POST for /api/register", () => {
    test('Create a new user', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'testName',
                surname: 'testSurname',
                email: 'abcdef.polito@polito.it',
                address: 'Via Test 42',
                phone: '0123456789',
                city: 'Torino',
                password: 'test',
                zipcode: '11223',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 201
                expect(res.status).to.be.equal(201);

                // Remove the new user from firebase
                const users = await db.collection("User").where("Email", "==", 'abcdef.polito@polito.it').get();
                users.forEach(user => {
                    db.collection('User').doc('' + user.id).delete();
                });
                done();
            });
    });

    test('Create a new user with an email already used', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'testName',
                surname: 'testSurname',
                email: 'mara.maionchi@hotmail.com',
                address: 'Via Test 42',
                phone: '0123456789',
                city: 'Torino',
                password: 'test',
                zipcode: '11223',
                stateCaps: 'TO'
            }))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 409
                expect(res.status).to.be.equal(409);
                done();
            });
    });
});

// POST farmer registration (add user to database)
describe("POST for /api/farmerRegister", () => {
    test('Create a new farmer', (done) => {
        chai.request(app)
            .post('/api/farmerRegister')
            .type('application/json')
            .send(JSON.stringify({
                name: 'testName',
                surname: 'testSurname',
                email: 'abcdef.polito@polito.it',
                address: 'Via Test 42',
                phone: '0123456789',
                city: 'Torino',
                company: 'Company Test',
                password: 'test'
            }))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});

// POST place an order in the database
describe("POST for /api/order", () => {
    test('Create a new order', (done) => {
        chai.request(app)
            .post('/api/order')
            .type('application/json')
            .send(JSON.stringify({}))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});

// POST modify an order in the database
describe("POST for /api/modifyorder", () => {
    test('Modify an order', (done) => {
        chai.request(app)
            .post('/api/modifyorder')
            .type('application/json')
            .send(JSON.stringify({}))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});

// POST modify wallet of a user
describe("POST for /api/modifywallet", () => {
    test('Modify a wallet', (done) => {
        chai.request(app)
            .post('/api/modifywallet')
            .type('application/json')
            .send(JSON.stringify({}))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});

// POST check a user
describe("POST for /api/checkClient", () => {
    test('Check a user', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/checkClient')
                    .set('Cookie', res.header['set-cookie'][0])
                    .send(JSON.stringify({
                        ClientID: 'WhHsq8VYFB2Uoyc1sSst'
                    }))
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);
                        done();
                    });
            });
    });
});

// POST add a product
describe("POST for /api/addProduct", () => {
    test('Add new product', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/addProduct')
                    .type('application/json')
                    .send(JSON.stringify({
                        FarmerID: '9RSQKtDkcfB949GDA3SX',
                        ProductID: 'kkSdM82lggnu24e7d24w',
                        Price: 5.5,
                        Quantity: 1,
                        Unitofmeasurement: 'bag'
                    }))
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);

                        // Remove the new product by farmer from firebase
                        chai.request(app)
                            .post('/api/deleteProduct')
                            .type('application/json')
                            .send(JSON.stringify({
                                productByFarmerID: ''
                            }))
                            .end((err, res) => {
                                // We should not have error
                                expect(err).to.be.null;
                                // Check that the response status is 200
                                expect(res.status).to.be.equal(200);
                                done();
                            });
                        done();
                    });
            });
    });

    test('Add old product', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/addProduct')
                    .type('application/json')
                    .send(JSON.stringify({
                        productByFarmerID: 'Mca7G4FzXqxVSOmmKcVU',
                        FarmerID: '9RSQKtDkcfB949GDA3SX',
                        ProductID: 'kkSdM82lggnu24e7d24w',
                        Price: 5.5,
                        Quantity: 1,
                        Unitofmeasurement: 'bag'
                    }))
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);

                        // Remove the new product by farmer from firebase
                        chai.request(app)
                            .post('/api/deleteProduct')
                            .type('application/json')
                            .send(JSON.stringify({
                                productByFarmerID: 'Mca7G4FzXqxVSOmmKcVU'
                            }))
                            .end((err, res) => {
                                // We should not have error
                                expect(err).to.be.null;
                                // Check that the response status is 200
                                expect(res.status).to.be.equal(200);
                                done();
                            });
                        done();
                    });
            });
    });
});

// POST delete a product
describe("POST for /api/deleteProduct", () => {
    test('Delete a product', (done) => {
        chai.request(app)
            .post('/api/deleteProduct')
            .type('application/json')
            .send(JSON.stringify({}))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});

// // POST for store a new product with related image into the server
describe("POST for /api/newproduct", () => {
    test('Create new product', (done) => {
        chai.request(app)
            .post('/api/newproduct')
            .type('application/json')
            .send(JSON.stringify({}))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 200
                expect(res.status).to.be.equal(200);

                // Remove the new farmer from firebase


                done();
            });
    });
});