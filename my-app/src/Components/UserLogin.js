import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import Axios from 'axios'

function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function validform(event) {
        if (!email) {
            alert("Please Enter Your Email");
            return false;
        } else if (!password) {
            alert("Please Enter Your Password");
            return false;
        } else {
            sendRegister(event);
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let data = { email, password };
        Axios.post('/api/login', data)
          .then((response) => {
              console.log("From loging:", response);
          })
          .catch(error => console.log("Error from server: ", error))
    }
   
    return (
        <Container>
            <Row className="justify-content-center mt-1 mb-1">
                <Col xs={4}>
                    <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", backgroundColor:"#2c8da9" }}>
                        Login
                    </Row>
                    <Form onSubmit={(e) => validform(e) }>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={ setEmail }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={ setPassword }/>
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

export default UserLogin;