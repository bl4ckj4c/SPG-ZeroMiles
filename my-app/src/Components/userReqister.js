import { Col, Row, Container } from 'react-bootstrap';
import { useState } from 'react';
import SelectCity from './SelectCity.js';

import Axios from 'axios'
import "./user.css";
// import { Grid } from 'react-bootstrap-icons';

function User(props) {
    const [name, setName] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    function validform(event) {
        var a = document.forms["my-form"]["name"].value;
        var b = document.forms["my-form"]["surname"].value;
        var c = document.forms["my-form"]["email"].value;
        var d = document.forms["my-form"]["address"].value;
        var e = document.forms["my-form"]["city"].value;
        var f = document.forms["my-form"]["password"].value;
        var g = document.forms["my-form"]["confPassword"].value;
        var h = document.forms["my-form"]["zipCode"].value;
        if (a === null || a === "") {
            alert("Please Enter Your Full Name");
            return false;
        } else if (b === null || b === "") {
            alert("Please Enter Your last Name");
            return false;
        } else if (f === null || f === "") {
            alert("Please Enter Your password");
            return false;
        } else if (g === null || g === "") {
            alert("Please Enter Your confirmation password");
            return false;
        } else if ( !(f === g)) {
            alert("The password is not the same");
            return false;
        } else if (c === null || c === "") {
            alert("Please Enter Your Email Address");
            return false;
        } else if (d === null || d === "") {
            alert("Please Enter Your Address");
            return false;
        } else if (e === null || e === "") {
            alert("Please Enter Your permanent city");
            return false;
        } else if (h === null || h === "") {
            alert("Please Enter Your zip code");
            return false;
        } else {
            sendRegister(event);
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let data = { name, lastname, email, address, phone, city, password, zipCode };
        Axios.post('/api/register', data)
          .then((response) => {
              console.log(response);
          })
          .catch(error => console.log("Error from server: ", error))
    }
   
    return (
        <Container>
            <Row className="justify-content-center mt-2 mb-2">
                <Col xs lg="1">
                    <main class="my-form">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-md-10">
                                        <div class="card">
                                            <div class="card-header">Register</div>
                                            <div class="card-body">
                                                <form name="my-form" method="POST">
                                                    <div class="form-group row">
                                                        <label for="full_name" class="col-md-4 col-form-label text-md-right">Name</label>
                                                        <div class="col-md-8">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                id="name"
                                                                name="name"
                                                                placeholder="Put the name"
                                                                required
                                                                value = { name }
                                                                onChange={(e) => setName(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="surname" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                                        <div class="col-md-8">
                                                        <input
                                                            type="text"
                                                                id="surname"
                                                                name="surname"
                                                                class="form-control"
                                                                placeholder="Put the last name"
                                                                required
                                                                value = { lastname }
                                                                onChange={(e) => setlastname(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                                        <div class="col-md-8">                                                    
                                                            <input
                                                            type="text"
                                                            class="form-control"
                                                            name="email"
                                                            id="email"
                                                            placeholder="put the email"
                                                            required
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="password" class="col-md-4 col-form-label text-md-right">password</label>
                                                        <div class="col-md-8">
                                                            <input
                                                            type="password"
                                                            class="form-control"
                                                            name="password"
                                                            id="password"
                                                            placeholder="put the password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="confPassword" class="col-md-4 col-form-label text-md-right">Confirm password</label>
                                                        <div class="col-md-8">
                                                            <input
                                                                type="password"
                                                                class="form-control"
                                                                name="confPassword"
                                                                id="confPassword"
                                                                placeholder="put the password"
                                                                required
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label htmlFor="address" class="col-md-4 col-form-label text-md-right">Address *</label>
                                                        <div class="col-md-8">
                                                            <input
                                                                type="text"
                                                                class="form-control"
                                                                name="address"
                                                                id="address"
                                                                placeholder="put the address"
                                                                required
                                                                onChange={(e) => setAddress(e.target.value)}
                                                            ></input>                                    
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="phone" class="col-md-4 col-form-label text-md-right">Phone Number</label>
                                                        <div class="col-md-8">
                                                            <input
                                                                type="phone"
                                                                id="phone"
                                                                class="form-control"
                                                                placeholder="put the phone"
                                                                required
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="form-group row">
                                                        <label for="ZipCode" class="col-md-4 col-form-label text-md-right">Zip code</label>
                                                        <div class="col-md-8">
                                                            <input
                                                                type="text"
                                                                id="zipCode"
                                                                class="form-control"
                                                                placeholder="put the ZipCode"
                                                                required
                                                                onChange={(e) => setZipCode(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>

                                                    <div class="form-group row">
                                                        <label for="city" class="col-md-4 col-form-label text-md-right">City</label>
                                                        <div class="col-md-8">                                    
                                                            <select 
                                                                type="city"
                                                                id="city"
                                                                class="form-control"
                                                                placeholder="put the city"
                                                                required
                                                                onChange={(e) => setCity(e.target.value)}
                                                                name="city"
                                                            >
                                                                <SelectCity/>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8 offset-md-4">
                                                        <button variant="primary" onClick={(e) => validform(e)} class="btn btn-primary">
                                                        Register
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </Col>
                <Col xs lg="4"></Col>
            </Row>
            <Row className="justify-content-center mt-2 mb-2">
                <Col xs lg="4"></Col>
                <Col xs lg="4"></Col>
            </Row>
        </Container>
    )};

    // TODO: Catch the server response to show a message with the status   

export default User;