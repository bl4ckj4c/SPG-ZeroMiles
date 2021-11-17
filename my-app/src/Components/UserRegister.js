import { Col, Row, Container, Form, Button, Toast, Modal } from 'react-bootstrap';
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


    const [showConfirm, setShowConfirm] = useState(false);
    const handleShowConfirm = () => setShowConfirm(true); 
    const handleCloseConfirm = () => {
        setShowConfirm(false);
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
            setToastEmail(true)
            return false;
        } else if (!address) {
            setToastAddress(true)
            return false;
        } else if (!state) {
            alert("Please Enter Your State / Province");
            return false;
        } else if (!city) {
            setToastCity(true)
            return false;
        } else if (!zipcode) {
            setToastZipcode(true)
            return false;
        } else {
            sendRegister(event);
            handleShowConfirm();
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let stateCaps = state.toUpperCase().toString();
        let data = { name, surname, email, address, phone, city, password, zipcode, stateCaps };
        console.log(data)
        Axios.post('/api/register', data)
            .then((response) => {
                console.log(response);
            })
            .catch(error => console.log("Error from server: ", error))
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
                    Sign up a new client
                </Row>
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
                            >
                                Submit
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