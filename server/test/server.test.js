const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const chaiHttp = require('chai-http');

let app = require('../server');

chai.use(chaiHttp);

// Server variable
let requester = null;

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

// Start and keep open the server before each test
beforeEach(() => {
    requester = chai.request(app).keepOpen();
});

// Close the server after each test
afterEach(() => {
    requester.close();
    requester = null;
});

describe("GET for /api/users", () => {
    test('prova', (done) => {
        chai.request(app)
            .get('/api/users')
            .end((err, res) => {
                console.log(res);
                done();
            });
    })

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