import { Col, Row, Container, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useState } from 'react';
import API from '../API';


function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastEmail, setToastEmail] = useState(false);
    const [toastPassword, setToastPassword] = useState(false);

    function validform(event) {
        event.preventDefault();
        if (!email) {
            setToastEmail(true)
            return false;
        } else if (!password) {
            setToastPassword(true)
            return false;
        } else {
            sendRegister(event);
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        props.login(email, password);
        //let data = { email, password };
        //Axios.post('/api/login', data)
        //  .then((response) => {
        //      console.log("From loging:", response);
        //  })
        //  .catch(error => console.log("Error from server: ", error))
    }
   
    return (
        <Container>
            { toastEmail && (
                <Toast onClose={() => setToastEmail(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your email</Toast.Body>
                </Toast>
            )}

            { toastPassword && (
                <Toast onClose={() => setToastPassword(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your password</Toast.Body>
                </Toast>
            )}

            <Row className="justify-content-center mt-1 mb-1">
                <Col xs={4}>
                <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize: "22px" }}>
                    Sign in
                </Row>
                    <Form onSubmit={(e) => validform(e) }>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email user</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={ (e) => setEmail(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={ (e) => setPassword(e.target.value) }/>
                        </Form.Group>
                        <Row className="justify-content-center m-5">
                            <Button 
                                variant="secondary"
                                type="submit"
                            >
                            Login
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )};

    // TODO: Catch the server response to show a message with the status   

export default UserLogin;