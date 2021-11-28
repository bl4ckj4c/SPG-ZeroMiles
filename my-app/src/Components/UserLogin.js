import { Col, Row, Container, Form, Button, Toast, ToastContainer, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
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

    let history = useHistory();
    function handleSignUp() {
        history.push("/signup")
    }

    return (
        <Container>
            {toastEmail && (
                <ToastContainer position="middle-center">
                    <Toast onClose={() => setToastEmail(false)} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Warning</strong>
                        </Toast.Header>
                        <Toast.Body>Please enter your email</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}

            {toastPassword && (
                <ToastContainer position="middle-center">
                    <Toast onClose={() => setToastPassword(false)} delay={5000} autohide position="middle-center">
                        <Toast.Header>
                            <strong className="me-auto">Warning</strong>
                        </Toast.Header>
                        <Toast.Body>Please enter your password</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}

            <Row className="justify-content-center mt-1 mb-1">
                <Col xs={4}>
                    <Row className="justify-content-center mt-3 mb-4" style={{ display: "flex", justifyContent: "center", fontSize: "22px" }}>
                        <Image id="logo" src="/images/logo.png" />
                    </Row>
                    <Form onSubmit={(e) => validform(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email user</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Row className="mt-5">
                            <Col style={{ textAlign: 'left' }}>
                                <Button variant="secondary" onClick={handleSignUp} >
                                    Signup
                                </Button>
                            </Col>
                            <Col style={{ textAlign: 'right' }}>
                                <Button variant="warning" type="submit" >
                                    Login
                                </Button></Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

// TODO: Catch the server response to show a message with the status   

export default UserLogin;