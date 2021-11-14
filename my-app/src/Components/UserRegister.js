import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import SelectState from './SelectState.js';

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
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    function validForm(event) {
        event.preventDefault();
        if (!name) {
            alert("Please Enter Your name");
            return false;
        } else if (!surname) {
            alert("Please Enter Your surname");
            return false;
        } else if (!password) {
            alert("Please Enter Your password");
            return false;
        } else if (!confPassword) {
            alert("Please Enter Your confirmation password");
            return false;
        } else if ( !( password === confPassword )) {
            alert("The password is not the same");
            return false;
        } else if (!email) {
            alert("Please Enter Your Email Address");
            return false;
        } else if (!address) {
            alert("Please Enter Your Address");
            return false;
        } else if (!state) {
            alert("Please Enter Your State / Province");
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
        console.log(data)
        Axios.post('/api/register', data)
          .then((response) => {
              console.log(response);
          })
          .catch(error => console.log("Error from server: ", error))
    }
   
    return (
        <Container>
            <Row className="justify-content-center mt-1 mb-1">
                <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize:"22px" }}>
                    Sign up a new client
                </Row>
                <Form onSubmit={(e) => validForm(e) } controlId="my-form">
                    <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize:"22px" }}>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Name:</Form.Label>
                            <Form.Control type="text"  controlId="name" placeholder="Enter Name" onChange={ (e) => setName(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className="label">Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" onChange={ (e) => setEmail(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label className="label">Address:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" onChange={ (e) => setAddress(e.target.value) }/>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="state">
                            <Form.Label className="label">State:</Form.Label>
                            <Form.Control as="select" name="state" defaultValue={''} onChange={ (e) => setState(e.target.value) }>
                                <SelectState></SelectState>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="label">Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" onChange={ (e) => setPassword(e.target.value) }/>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3">
                            <Form.Label className="label">Surname:</Form.Label>
                            <Form.Control type="text" controlId="surname" placeholder="Enter Surname" onChange={ (e) => setSurname(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label className="label">Phone:</Form.Label>
                            <Form.Control type="number" placeholder="Enter Phone" onChange={ (e) => setPhone(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label className="label">City:</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" onChange={ (e) => setCity(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="zipcode">
                            <Form.Label className="label">Zipcode:</Form.Label>
                            <Form.Control type="number" placeholder="Enter ZipCode" onChange={ (e) => setZipcode(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confPassword">
                            <Form.Label className="label">Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" onChange={ (e) => setConfPassword(e.target.value) }/>
                        </Form.Group>
                        </Col>
                        <Row className="justify-content-center mt-2 mb-2">
                            <Button 
                                variant="secondary"
                                type="submit"
                                >
                                Submit
                            </Button>
                        </Row>
                    </Row>
                </Form>
            </Row>
        </Container>
    )};

    // TODO: Catch the server response to show a message with the status   

export default UserRegister;