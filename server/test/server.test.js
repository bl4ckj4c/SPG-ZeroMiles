const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');

let app = require('../server');

const firebaseTest = require('firebase-admin');
var db = firebaseTest.firestore(app.firebase);

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
const wrongPasswordClient = {
    username: 'testname.testsurname3@polito.it',
    password: 'wrongPassword'
}
const manager = {
    username: 'michele.manager@zeromiles.it',
    password: 'supersecret4'
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

//3 GET all Farmers
describe("GET for /api/farmers", () => {
    test('Get all farmers', (done) => {
        chai.request(app)
            .get('/api/farmers')
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
                    .get('/api/orders/08-01-2022 14:14:00')
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

//6 GET products of the authenticated farmer by date
describe("GET for /api/productsByFarmer/:date", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/productsByFarmer/2021-12-08%11:11')
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
                    .get('/api/productsByFarmer/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 401
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
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/productsByFarmer/2021-12-16%11:11')
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
    test('Get all products', (done) => {
        chai.request(app)
            .get('/api/products')
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

//9 GET all orders of the authenticated user
describe("GET for /api/clientorders/spg_date1", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/clientorders/08-01-2022 14:14:00')
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
                    .get('/api/clientorders/19-12-2021 22:43:22')
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
describe("GET for /api/orders/08-01-2022 14:14:00", () => {
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
                    .get('/api/orders/08-01-2022 14:14:00')
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
                    .get('/api/orders/08-01-2022 14:14:00')
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

// GET not retired orders
describe("GET for /api/notRetiredOrder", () => {

    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/notRetiredOrder')
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
                    .get('/api/notRetiredOrder')
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

// GET not retired orders (previous week)
describe("GET for /api/weeklyNotRetiredOrders/:date", () => {

    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/weeklyNotRetiredOrders/2021-12-22 11:11')
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

    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/weeklyNotRetiredOrders/2021-12-08%11:11')
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
                    .get('/api/weeklyNotRetiredOrders/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
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


// GET not retired orders (same month)
describe("GET for /api/monthlyNotRetiredOrders/:date", () => {

    test('Authorized request', (done) => {
        //const requester = chai.request(app).keepOpen();
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/monthlyNotRetiredOrders/2021-12-08 11:11')
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

    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/monthlyNotRetiredOrders/2021-12-08%11:11')
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
                    .get('/api/monthlyNotRetiredOrders/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
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


// GET all products by farmers by date
describe("GET for /api/allProductsByFarmers/:date", () => {
    test('Get all products by farmers by date', (done) => {
        chai.request(app)
            .get('/api/allProductsByFarmers/2021-12-08 11:11')
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


// GET cancelledorders by date
describe("GET for /api/cancelledorders/:date", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/cancelledorders/2021-12-08%11:11')
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
                    .get('/api/cancelledorders/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 401
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
                    .get('/api/cancelledorders/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 500
                        expect(res.status).to.be.equal(500);
                        done();
                    });
            });
    });
});

/**/
// GET confirmationProduct by date
describe("GET for /api/confirmationProduct/:date", () => {
    test('Unauthorized request', (done) => {
        chai.request(app)
            .get('/api/confirmationProduct/2021-12-08%11:11')
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
                    .get('/api/confirmationProduct/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 401
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
                    .get('/api/confirmationProduct/2021-12-08%11:11')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 500
                        expect(res.status).to.be.equal(200);
                        done();
                    });
            });
    });
});
/**/


// POST for login
describe("POST for /api/login", () => {
    test('User not found', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(fakeClient))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 404
                expect(res.status).to.be.equal(404);
                done();
            });
    });

    test('Login with a fake user', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(wrongPasswordClient))
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
                email: 'abcdefg.polito@polito.it',
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
                const users = await db.collection("User").where("Email", "==", 'abcdefg.polito@polito.it').get();
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

    test('Create a new user with one wrong field', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: '123',
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
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    test('Create a new user with wrong name', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: '123',
                surname: 'correctSurname',
                email: 'correctEmail@test.com',
                address: 'Via test 40',
                phone: '3215558774',
                city: 'Test',
                password: 'test',
                zipcode: '10136',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });

    test('Create a new user with wrong email', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'correctName',
                surname: 'correctSurname',
                email: 'incorrectEmail',
                address: 'Via test 40',
                phone: '3215558774',
                city: 'Test',
                password: 'test',
                zipcode: '10136',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });
    test('Create a new user with wrong adress', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'correctName',
                surname: 'correctSurname',
                email: 'test@tes.com',
                address: '123',
                phone: '3215558774',
                city: 'Test',
                password: 'test',
                zipcode: '10136',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });
    test('Create a new user with wrong phone', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'correctName',
                surname: 'correctSurname',
                email: 'test@tes.com',
                address: 'Via test 40',
                phone: 'phonenumber',
                city: 'Test',
                password: 'test',
                zipcode: '10136',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });
    test('Create a new user with wrong city', (done) => {
        chai.request(app)
            .post('/api/register')
            .type('application/json')
            .send(JSON.stringify({
                name: 'correctName',
                surname: 'correctSurname',
                email: 'test@tes.com',
                address: 'Via test 40',
                phone: '3215558774',
                city: '4',
                password: 'test',
                zipcode: '10136',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
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
                email: 'abcdefarmer.polito@polito.it',
                address: 'Via Test 42',
                company: 'Company Test',
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
                    console.log(user)
                    db.collection('User').doc('' + user.id).delete();
                });

                // Remove the new farmer from firebase
                const farmers = await db.collection("Farmer").where("Email", "==", 'abcdef.polito@polito.it').get();
                farmers.forEach(farmer => {
                    db.collection('Farmer').doc('' + farmer.id).delete();
                });
                done();
            });
    });
});

    test('Create a new farmer with an email already used', (done) => {
        chai.request(app)
            .post('/api/farmerRegister')
            .type('application/json')
            .send(JSON.stringify({
                name: 'testName',
                surname: 'testSurname',
                email: 'mara.maionchi@hotmail.com',
                address: 'Via Test 42',
                company: 'Company Test',
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

    test('Create a new farmer with one wrong field', (done) => {
        chai.request(app)
            .post('/api/farmerRegister')
            .type('application/json')
            .send(JSON.stringify({
                name: '123',
                surname: 'testSurname',
                email: 'abcdef.polito@polito.it',
                address: 'Via Test 42',
                company: 'Company Test',
                phone: '0123456789',
                city: 'Torino',
                password: 'test',
                zipcode: '11223',
                stateCaps: 'TO'
            }))
            .end(async (err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 400
                expect(res.status).to.be.equal(400);
                done();
            });
    });




// POST set Time Machine
describe("POST for /api/timeMachine", () => {
    test('Set the time machine on Monday', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/timeMachine')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        newdate: '12-20-2021 09:00'
                    }))
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

/*// POST place an order in the database
describe("POST for /api/order", () => {
    test('Create an order', (done) => {
        chai.request(app)
            .post('/api/order')
            .type('application/json')
            .send(JSON.stringify({
                "UserID": 'WhHsq8VYFB2Uoyc1sSst',
                "items": [],
                "timestamp": '08-12-2021 14:30'
            }))
            .end((err, res) => {
                // We should not have error
                expect(err).to.be.null;
                // Check that the response status is 201
                expect(res.status).to.be.equal(201);
                done();
            });
    });
});*/

/*// POST modify an order in the database
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
});*/

// POST modify wallet of a user
describe("POST for /api/modifywallet", () => {
    test('Modify a wallet', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/modifywallet')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        ClientID: '2d0c057a-6e0d-4e85-a5ea-a58cb2b54216',
                        Wallet: 10
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

/*// POST check a user
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
});*/

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
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        date: "2021-12-18 11:11",
                        productByFarmerID: false,
                        FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
                        ProductID: "Mqn50IEZa0jIngRbT5E",
                        Price: 5.5,
                        Quantity: 1,
                        UnitOfMeasurement: "bag"
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);

                        // Remove the new product by farmer from firebase
                        console.log(res.body.productByFarmerID);
                        const productsByFarmers = await db.collection("Product by Farmers").doc(res.body.productByFarmerID).delete();
                        done();
                    });
            });
    });

    test('Modify old product', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/addProduct')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        date: "18-12-2021 11:11",
                        productByFarmerID: "OGwux1b1SShh4iBeN59f",
                        FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
                        ProductID: "Mqn5HZlthFUAqri5HDT",
                        Price: 5.5,
                        Quantity: 1,
                        UnitOfMeasurement: "bag"
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

// POST delete a product
describe("POST for /api/deleteProduct", () => {
    test('Delete a product product', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                const cookie = res.header['set-cookie'][0];
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/addProduct')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        date: "2021-12-18 11:11",
                        productByFarmerID: false,
                        FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
                        ProductID: "Mqn50IEZa0jIngRbT5E",
                        Price: 5.5,
                        Quantity: 1,
                        UnitOfMeasurement: "bag"
                    }))
                    .end(async (err, res) => {
                        chai.request(app)
                            .post('/api/deleteProduct')
                            .set('Cookie', cookie)
                            .type('application/json')
                            .send(JSON.stringify({
                                productByFarmerID: res.body.productByFarmerID
                            }))
                            .end(async (err, res) => {
                                // We should not have error
                                expect(err).to.be.null;
                                // Check that the response status is 201
                                expect(res.status).to.be.equal(201);
                                done();
                            });
                    });
            });
    });
});




// POST place an order in the database
describe("POST for /api/order", () => {
    test('Add new order', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {

                // Now that we are authenticated we send the actual
                chai.request(app)
                    .post('/api/order')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        "UserID": '2d0c057a-6e0d-4e85-a5ea-a58cb2b54216',
                        "items": [],
                        "timestamp": '12-25-2021 09:00'
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(201);

                        // Remove the new product by farmer from firebase
                        console.log(res.body.productByFarmerID);

                        done();
                    });
            });
    });

});

// POST checkClient
describe("POST for /api/checkClient", () => {
    test('check client', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual
                chai.request(app)
                    .post('/api/checkClient')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        "ClientID": '2d0c057a-6e0d-4e85-a5ea-a58cb2b54216'
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);
                        done();
                    });
            });
    });
});




// POST modify order
describe("POST for /api/modifyorder", () => {
    test('modify order status', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual
                chai.request(app)
                    .post('/api/modifyorder')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        "id": "mouPNoMx2OOvkR10c8Jp",
                        "Status": "closed"
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);
                        done();
                    });
            });
    });
});




// POST modify Delivery
describe("POST for /api/modifyDelivery", () => {
    test('Modify delivery', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual
                chai.request(app)
                    .post('/api/modifyDelivery')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        "OrderID": "mouPNoMx2OOvkR10c8Jp",
                        "DeliveryPlace": "Via Test",
                        "DeliveryDate": "31-12-2021"
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);
                        done();
                    });
            });
    });
});
/*// POST for store a new product with related image into the server
describe("POST for /api/newproduct", () => {

    test('Authorized request', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(farmer))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .post('/api/newproduct')
                    .field({
                        productJson: JSON.stringify({
                            Name: 'testProduct',
                            Description: 'testDescription'
                        }),
                        newproductimage: ''

                    })
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 201
                        expect(res.status).to.be.equal(201);

                        // Remove the new product from firebase
                        let imageId = JSON.parse(res.body).split('-> ')[1];


                        done();
                    });
            });
    });

    test('restricted page accroding to role', (done) => {
        //const requester = chai.request(app).keepOpen();

        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .get('/api/newproduct')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 401
                        expect(res.status).to.be.equal(404);
                        done();
                    });
            });

    });
});*/
// POST confirmation
describe("POST for /api/confirmation", () => {
    test('Wrong role request', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(client))
            .end((err, res) => {
                // Now that we are authenticated we send the actual GET
                chai.request(app)
                    .post('/api/confirmation')
                    .set('Cookie', res.header['set-cookie'][0])
                    .end((err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 401
                        expect(res.status).to.be.equal(401);
                        done();
                    });
            });
    });
    test('confirmation authorized req', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/confirmation')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        ProductID: 'Mqn5MQEBi5XO7pG0AzZ',
                        OrderID: 'FBexCZqkcVSTLr324gcl',
                        number: '3',
                        Confirmed: true
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 200
                        expect(res.status).to.be.equal(200);

                       done();
                    });
            });
    });
    test(' server cannot process the request ', (done) => {
        chai.request(app)
            .post('/api/login')
            .type('application/json')
            .send(JSON.stringify(employee))
            .end((err, res) => {
                // Now that we are authenticated we send the actual POST
                chai.request(app)
                    .post('/api/confirmation')
                    .set('Cookie', res.header['set-cookie'][0])
                    .type('application/json')
                    .send(JSON.stringify({
                        ProductID: 'Mqn5MQEB44i5XO7pG0AzZ',
                        OrderID: 'FBexCZqkcV44STLr324gcl',
                        number: '3',
                        Confirmed: true
                    }))
                    .end(async (err, res) => {
                        // We should not have error
                        expect(err).to.be.null;
                        // Check that the response status is 500
                        expect(res.status).to.be.equal(500);

                        done();
                    });
            });
    });

});
