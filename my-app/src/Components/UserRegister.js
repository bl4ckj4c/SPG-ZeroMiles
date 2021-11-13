import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import SelectCity from './SelectCity.js';

import Axios from 'axios'
import "./user.css";

function UserRegister(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');

    function validform(event) {
        if (!name) {
            alert("Please Enter Your Full Name");
            return false;
        } else if (!surname) {
            alert("Please Enter Your last Name");
            return false;
        } else if (!password) {
            alert("Please Enter Your password");
            return false;
        } else if (!confPassword) {
            alert("Please Enter Your confirmation password");
            return false;
        } else if ( !(password === confPassword)) {
            alert("The password is not the same");
            return false;
        } else if (!email) {
            alert("Please Enter Your Email Address");
            return false;
        } else if (!address) {
            alert("Please Enter Your Address");
            return false;
        } else if (!city) {
            alert("Please Enter Your permanent city");
            return false;
        } else if (!zipcode) {
            alert("Please Enter Your zip code");
            return false;
        } else {
            sendRegister(event);
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let data = { name, surname, email, address, phone, city, password, zipcode };
        Axios.post('/api/register', data)
          .then((response) => {
              console.log(response);
          })
          .catch(error => console.log("Error from server: ", error))
    }
   
    return (
        <Container>
            <Row className="justify-content-center mt-1 mb-1">
                <Col xs={4}>
                    <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize:"22px"}}>
                        Sign Up
                    </Row>
                    <Form onSubmit={(e) => validform(e) } id="my-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text"  id="name" placeholder="Enter Name" onChange={ setName }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control type="text" id="surname" placeholder="Enter Surname" onChange={ setSurname }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" onChange={ setEmail }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="address">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={ setAddress }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="city">
                            <Form.Label>City:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={ setAddress }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="phone">
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control type="number" placeholder="Enter Phone" onChange={ setPhone }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="zipcode">
                            <Form.Label>Zipcode:</Form.Label>
                            <Form.Control type="number" placeholder="Enter ZipCode" onChange={ setZipcode }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={ setPassword }/>
                        </Form.Group>
                        <Form.Group className="mb-3" id="confPassword">
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={ setConfPassword }/>
                        </Form.Group>
                        <Row className="justify-content-center mt-3 mb-3">
                            <Button 
                                variant="secondary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
        // <Container>
        //     <Row className="justify-content-center mt-2 mb-2">
        //         <Col xs lg="1">
        //             <main class="my-form">
        //                 <div class="container">
        //                     <div class="row justify-content-center">
        //                         <div class="col-md-10">
        //                                 <div class="card">
        //                                     <div class="card-header">New Client</div>
        //                                     <div class="card-body">
        //                                         <form name="my-form" method="POST">
        //                                             <div class="form-group row">
        //                                                 <label for="password" class="col-md-4 col-form-label text-md-right">password</label>
        //                                                 <div class="col-md-8">
        //                                                     <input
        //                                                     type="password"
        //                                                     class="form-control"
        //                                                     name="password"
        //                                                     id="password"
        //                                                     placeholder="put the password"
        //                                                     onChange={(e) => setPassword(e.target.value)}
        //                                                     required
        //                                                     ></input>
        //                                                 </div>
        //                                             </div>
        //                                             <div class="form-group row">
        //                                                 <label for="confPassword" class="col-md-4 col-form-label text-md-right">Confirm password</label>
        //                                                 <div class="col-md-8">
        //                                                     <input
        //                                                         type="password"
        //                                                         class="form-control"
        //                                                         name="confPassword"
        //                                                         id="confPassword"
        //                                                         placeholder="put the password"
        //                                                         required
        //                                                     ></input>
        //                                                 </div>
        //                                             </div>
        //                                             <div class="form-group row">
        //                                                 <label htmlFor="address" class="col-md-4 col-form-label text-md-right">Address</label>
        //                                                 <div class="col-md-8">
        //                                                     <input
        //                                                         type="text"
        //                                                         class="form-control"
        //                                                         name="address"
        //                                                         id="address"
        //                                                         placeholder="put the address"
        //                                                         required
        //                                                         onChange={(e) => setAddress(e.target.value)}
        //                                                     ></input>                                    
        //                                                 </div>
        //                                             </div>
        //                                             <div class="form-group row">
        //                                                 <label for="phone" class="col-md-4 col-form-label text-md-right">Phone Number</label>
        //                                                 <div class="col-md-8">
        //                                                     <input
        //                                                         type="phone"
        //                                                         id="phone"
        //                                                         class="form-control"
        //                                                         placeholder="put the phone"
        //                                                         required
        //                                                         onChange={(e) => setPhone(e.target.value)}
        //                                                     ></input>
        //                                                 </div>
        //                                             </div>
                                                    
        //                                             <div class="form-group row">
        //                                                 <label for="ZipCode" class="col-md-4 col-form-label text-md-right">Zip code</label>
        //                                                 <div class="col-md-8">
        //                                                     <input
        //                                                         type="text"
        //                                                         id="zipCode"
        //                                                         class="form-control"
        //                                                         placeholder="put the ZipCode"
        //                                                         required
        //                                                         onChange={(e) => setZipcode(e.target.value)}
        //                                                     ></input>
        //                                                 </div>
        //                                             </div>

        //                                             <div class="form-group row">
        //                                                 <label for="city" class="col-md-4 col-form-label text-md-right">City</label>
        //                                                 <div class="col-md-8">                                    
        //                                                     <select 
        //                                                         type="city"
        //                                                         id="city"
        //                                                         class="form-control"
        //                                                         placeholder="put the city"
        //                                                         required
        //                                                         onChange={(e) => setCity(e.target.value)}
        //                                                         name="city"
        //                                                     >
        //                                                         <SelectCity/>
        //                                                     </select>
        //                                                 </div>
        //                                             </div>
        //                                             <div class="col-md-8 offset-md-4 mt-3">
        //                                                 <button variant="primary" onClick={(e) => validform(e)} class="btn btn-primary">
        //                                                 Sign Up
        //                                                 </button>
        //                                             </div>
        //                                         </form>
        //                                     </div>
        //                                 </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </main>
        //         </Col>
        //         <Col xs lg="4"></Col>
        //     </Row>
        //     <Row className="justify-content-center mt-2 mb-2">
        //         <Col xs lg="4"></Col>
        //         <Col xs lg="4"></Col>
        //     </Row>
        // </Container>
    )};

    // TODO: Catch the server response to show a message with the status   

export default UserRegister;