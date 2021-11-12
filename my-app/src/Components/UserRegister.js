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
                    <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", backgroundColor:"#2c8da9" }}>
                        Register
                    </Row>
                    <Form onSubmit={(e) => validform(e) } id="my-form">
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text"  id="name" placeholder="Enter Name" onChange={ setName }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Surname::</Form.Label>
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
                            <Form.Control type="text" placeholder="Enter City" onChange={ setCity }/>
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
                        <Row className="justify-content-center mt-1 mb-1">
                            <Button 
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )};

    // TODO: Catch the server response to show a message with the status   

export default UserRegister;