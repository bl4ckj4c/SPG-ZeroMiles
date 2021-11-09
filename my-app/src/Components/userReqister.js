import { Col, Row, Container } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectCity from './SelectCity.js';

import Axios from 'axios'
import "./user.css";

function User(props) {
    const [name, setname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');

    function validform(e) {
        var a = document.forms["my-form"]["name"].value;
        var b = document.forms["my-form"]["lastName"].value;
        var c = document.forms["my-form"]["email"].value;
        var d = document.forms["my-form"]["address"].value;
        var e = document.forms["my-form"]["city"].value;
        var f = document.forms["my-form"]["password"].value;
        var g = document.forms["my-form"]["confPassword"].value;
        if (a==null || a=="") {
            alert("Please Enter Your Full Name");
            return false;
        } else if (b==null || b=="") {
            alert("Please Enter Your last Name");
            return false;
        } else if (f==null || f=="") {
            alert("Please Enter Your password");
            return false;
        } else if (g==null || g=="") {
            alert("Please Enter Your confirmation password");
            return false;
        } else if ( !(f == g)) {
            alert("The password is not the same");
            return false;
        } else if (c==null || c=="") {
            alert("Please Enter Your Email Address");
            return false;
        } else if (d==null || d=="") {
            alert("Please Enter Your Address");
            return false;
        } else if (e==null || e=="") {
            alert("Please Enter Your permanent city");
            return false;
        } else {
            sendRegister();
        }
    }

    async function sendRegister() {
        let data = {name, lastName, email, address, phone, city, password };
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
                                                <form name="my-form">
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
                                                                onChange={(e) => setname(e.target.value)}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="last_name" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                                        <div class="col-md-8">
                                                        <input
                                                            type="text"
                                                                id="lastName"
                                                                name="username"
                                                                class="form-control"
                                                                placeholder="Put the last name"
                                                                required
                                                                value = { lastName }
                                                                onChange={(e) => setLastname(e.target.value)}
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
                                                            id="passsword"
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
                                                        <button variant="primary" onClick={(e) => validform("control 1")} class="btn btn-primary">
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
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
                </Col>
                <Col xs lg="4"></Col>
            </Row>
            <Row className="justify-content-center mt-2 mb-2">
                <Col xs lg="4"></Col>
                <Col xs lg="4"></Col>
            </Row>
        </Container>
    )};

function ShowTicketModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="text-center font-weight-bold" closeButton onClick={props.handleClose}>Dear customer, here's your ticket number: </Modal.Header>
            <Modal.Body className="display-1 text-center font-weight-bold">{props.message.number}</Modal.Body>
        </Modal>
    );
}

export default User;