import { Col, Row, Container, Form, Button, Toast, ToastContainer, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import API from '../API';


function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messageErrorLogin, setMessageErrorLogin] = useState('');
    const [toastEmail, setToastEmail] = useState(false);
    const [toastPassword, setToastPassword] = useState(false);
    const [toastPasswordAndEmail, setToastPasswordAndEmail ]= useState(false);
    
    const [loginResponseModal, setLoginResponseModal] = useState(false);
    const handleLoginResponseModalShow = () => setLoginResponseModal(true);
    const handleLoginResponseModalClose = () => setLoginResponseModal(false);



    function validform(event) {
       event.preventDefault();
        if (!password && password.length <= 0 && !email && email.length <= 0) {
            setToastPasswordAndEmail(true);
            // return false;
        } else if (!password && password.length <= 0) {
            setToastPassword(true);
            // return false;
        } else if (!email && email.length <= 0) {
            setToastEmail(true);
            // return false;
        } else {
            sendRegister(event);
        }
        // return true;
    }

    async function sendRegister(event) {
        event.preventDefault();
        let res = await API.userLogin(email, password);
        if (res.ok){
            props.setLoggedIn(true);
        }
        else{
            console.log(res);
            setMessageErrorLogin(res.statusText);
            handleLoginResponseModalShow();
          
        }
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

            {toastPasswordAndEmail && (
                <ToastContainer position="middle-center">
                    <Toast onClose={() => setToastPasswordAndEmail(false)} delay={5000} autohide position="middle-center">
                        <Toast.Header>
                            <strong className="me-auto">Warning</strong>
                        </Toast.Header>
                        <Toast.Body>Please enter your email and password</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}

            <Row className="justify-content-center mt-1 mb-1">
                <Col xs={8} lg={4}>
                    <Row className="justify-content-center mt-3 mb-4" style={{ display: "flex", justifyContent: "center", fontSize: "22px" }}>
                        <Image id="logo" src="/images/logo.png" />
                    </Row>
                    <LoginResponseModal messageErrorLogin={messageErrorLogin} loginResponseModal={loginResponseModal}  handleLoginResponseModalClose={handleLoginResponseModalClose} />
                    <Form onSubmit={(e) => validform(e) }>
                        <Form.Group className="mt-8 mb-4" controlId="formBasicEmail">
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
                                <SubmitButton/>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )}


    function LoginResponseModal(props) {
        return (
                <Modal show={props.loginResponseModal} onHide={props.handleLoginResponseModalClose} autoFocus={true} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Error login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {props.messageErrorLogin}
                    </Modal.Body>
                    <Modal.Footer>
                        <Col style={{ textAlign: 'center'}}>
                       
                        </Col>
                    </Modal.Footer>
                </Modal>
            );
    }
    
    function SubmitButton(props) {

        return (
            <Button
            type="submit"
            variant="warning"
            onClick={props.handleLoginResponseModalShow}
            >
                Login
            </Button>
        );
        
    }




// TODO: Catch the server response to show a message with the status   

export default UserLogin;