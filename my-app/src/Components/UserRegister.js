import { Col, Row, Container, Form, Button, Toast, Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectState from './SelectState.js';
import { useHistory } from 'react-router-dom';

import API from '../API';
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
    const [toastName, setToastName] = useState(false);
    const [toastSurname, setToastSurname] = useState(false);
    const [toastEmail, setToastEmail] = useState(false);
    const [toastAddress, setToastAddress] = useState(false);
    const [toastPassword, setToastPassword] = useState(false);
    const [toastConfPassword, setToastConfPassword] = useState(false);
    const [toastPhone, setToastPhone] = useState(false);
    const [toastCity, setToastCity] = useState(false);
    const [toastZipcode, setToastZipcode] = useState(false);
    const [toastPasswordNotEqual, setToastPasswordNotEqual] = useState(false);

    const [messageErrorRegister, setMessageErrorRegister] = useState('');
    const [registerResponseModal, setRegisterResponseModal] = useState(false);
    const handleRegisterResponseModalShow = () => setRegisterResponseModal(true);
    const handleRegisterResponseModalClose = () => setRegisterResponseModal(false);

    const [showConfirm, setShowConfirm] = useState(false);

    let history = useHistory();

    const handleShowConfirm = () => setShowConfirm(true);  

    const handleCloseConfirm = () => {
        setShowConfirm(false);

        if(!props.loggedIn){
            history.push("/");
        }

        if(props.loggedIn){
            history.push("/clients");
        }
    }

    function validForm(event) {
        event.preventDefault();
        if (!name) {
            setToastName(true)
            return false;
        } else if (!surname) {
            setToastSurname(true)
            return false;
        } else if (!password) {
            setToastPassword(true)
            return false;
        } else if (!confPassword) {
            setToastConfPassword(true)
            return false;
        } else if (!(password === confPassword)) {
            alert("The password is not the same");
        } else if (!(password === confPassword)) {
            setToastPasswordNotEqual(true)
            return false;
        } else if (!email) {
            setToastEmail(true);
            return false;
        } else if (!city) {
            setToastCity(true)
            return false;
        } else if (!zipcode) {
            setToastZipcode(true)
            return false;
        } else {
            sendRegister(event);
            // handleShowConfirm();
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let stateCaps = state.toUpperCase().toString();
        
        try {
            let res = await API.userRegister(name, surname, email, address, phone, city, password, zipcode, stateCaps);
            if (res.ok){
                //props.setLoggedIn(true);
                handleShowConfirm();
            }
            else{
                console.log(res);
                setMessageErrorRegister(res.statusText);
                handleRegisterResponseModalShow();
              
            }
        } catch(err){
            console.log("MY FAULT :", err)
        }
    }

    function RegisterResponseModal(props) {
        return (
                <Modal show={props.registerResponseModal} onHide={props.handleRegisterResponseModalClose} autoFocus={true} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Error Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {props.messageErrorRegister}
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Col style={{ textAlign: 'center'}}>
                        
                        </Col>
                    </Modal.Footer> */}
                </Modal>
            );
    }

    return (
        <Container>
            {toastName && (
                <Toast className="toast-register" onClose={() => setToastName(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Name</Toast.Body>
                </Toast>
            )}

            {toastSurname && (
                <Toast className="toast-register" onClose={() => setToastSurname(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your surname</Toast.Body>
                </Toast>
            )}

            {toastEmail && (
                <Toast className="toast-register" onClose={() => setToastEmail(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Email</Toast.Body>
                </Toast>
            )}

            {toastAddress && (
                <Toast className="toast-register" onClose={() => setToastAddress(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Address</Toast.Body>
                </Toast>
            )}

            {toastCity && (
                <Toast className="toast-register" onClose={() => setToastCity(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your City</Toast.Body>
                </Toast>
            )}

            {toastPhone && (
                <Toast className="toast-register" onClose={() => setToastPhone(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Phone</Toast.Body>
                </Toast>
            )}

            {toastZipcode && (
                <Toast className="toast-register" onClose={() => setToastZipcode(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Zipcode</Toast.Body>
                </Toast>
            )}

            {toastPassword && (
                <Toast className="toast-register" onClose={() => setToastPassword(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your password</Toast.Body>
                </Toast>
            )}

            {toastConfPassword && (
                <Toast className="toast-register" onClose={() => setToastPassword(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Please enter your Password Confirmation</Toast.Body>
                </Toast>
            )}

            {toastPasswordNotEqual && (
                <Toast className="toast-register" onClose={() => setToastPassword(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Remembering</strong>
                    </Toast.Header>
                    <Toast.Body>Your Password is not confirmed properly</Toast.Body>
                </Toast>
            )}

            <Row className="justify-content-center mt-1 mb-1">
                <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize: "22px" }}>
                    Get on board!
                </Row>
                <RegisterResponseModal messageErrorRegister={messageErrorRegister} registerResponseModal={registerResponseModal}  handleRegisterResponseModalClose={handleRegisterResponseModalClose} />
                <Form onSubmit={(e) => validForm(e)} controlId="my-form">
                    <Row className="justify-content-center mt-1 mb-1" style={{ display: "flex", justifyContent: "center", fontSize: "22px" }}>
                        <Col xs={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Name:</Form.Label>
                                <Form.Control type="text" controlId="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="label">Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label className="label">Address:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="state">
                                <Form.Label className="label">Province:</Form.Label>
                                <Form.Control as="select" name="state" defaultValue={''} onChange={(e) => setState(e.target.value)}>
                                    <SelectState></SelectState>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="label">Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="label">Surname:</Form.Label>
                                <Form.Control type="text" controlId="surname" placeholder="Enter Surname" onChange={(e) => setSurname(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label className="label">Phone:</Form.Label>
                                <Form.Control type="number" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label className="label">City:</Form.Label>
                                <Form.Control type="text" placeholder="Enter City" onChange={(e) => setCity(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="zipcode">
                                <Form.Label className="label">Zipcode:</Form.Label>
                                <Form.Control type="number" placeholder="Enter ZipCode" onChange={(e) => setZipcode(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="confPassword">
                                <Form.Label className="label">Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Row className="justify-content-center mt-2 mb-2">
                            <Button
                                variant="secondary"
                                type="submit"
                                onClick={props.handleRegisterResponseModalShow}
                            >
                                Sign Up
                            </Button>

                            <Modal show={showConfirm} onHide={handleCloseConfirm} autoFocus={true} size="sm" centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Welcome! 🎉</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Registration completed</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="warning" onClick={handleCloseConfirm}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>


                        </Row>
                    </Row>
                </Form>
            </Row>
        </Container>
    );

    // TODO: Catch the server response to show a message with the status   
}
export default UserRegister;