import { Col, Row, Container, Form, Button, Toast, Modal } from 'react-bootstrap';
import { useState } from 'react';
import SelectState from './SelectState.js';
import { useHistory } from 'react-router-dom';

import API from '../API';
import "./user.css";

function UserRegisterEmployee(props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [company, setCompany] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('ag');
    const [zipcode, setZipcode] = useState('');

    const [toast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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
            history.push("/farmers");
        }
    }

    function validForm(event) {
        event.preventDefault();
        if (!name) {
            setToast(true);
            setToastMessage("Please enter your name")
            return false;
        } else if (!surname) {
            setToast(true);
            setToastMessage("Please enter your surname")
            return false;
        } else if (!password) {
            setToast(true);
            setToastMessage("Please enter a password")
            return false;
        } else if (!confPassword) {
            setToast(true);
            setToastMessage("Please confirm your password")
            return false;
        } else if (password !== confPassword) {
            setToast(true);
            setToastMessage("Your two passwords are different!")
            return false;
        } else if (!email) {
            setToast(true);
            setToastMessage("Please enter your Email")
            return false;        } else if (!email) {
            setToast(true);
            setToastMessage("Please enter your Email")
            return false;
        } else if (!company) {
            setToast(true);
            setToastMessage("Please enter your company name")
            return false;
        } else if (!city) {
            setToast(true);
            setToastMessage("Please enter your City")
            return false;
        } else if (!address) {
            setToast(true);
            setToastMessage("Please enter your Address")
            return false;
        } else if (!zipcode) {
            setToast(true);
            setToastMessage("Please confirm your Zipcode")
            return false;
        } else {
            sendRegister(event);
            // handleShowConfirm();
        }
    }

    async function sendRegister(event) {
        event.preventDefault();
        let stateCaps = state.toUpperCase().toString();
        let farmer = {
            "name": name,
            "surname": surname,
            "email": email,
            "address": address,
            "company": company,
            "phone": phone,
            "city": city,
            "password": password,
            "zipcode": zipcode,
            "stateCaps": stateCaps
        }
        
            let res = await API.farmerRegister(farmer);
            console.log("HERE response",farmer);
            console.log("HERE response",res.json());
            if (res.ok){
                //props.setLoggedIn(true);
                handleShowConfirm();
            }
            else{
                setMessageErrorRegister(res.statusText);
                handleRegisterResponseModalShow();
              
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

    if(props.user.Role!=="Employee")
    return ""
    else
    return (
        <Container>
            {toast && (
                <Toast className="toast-register" onClose={() => setToast(false)} delay={5000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Attention!</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
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
                                <Form.Control type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
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
                            <Form.Group className="mb-3" controlId="company">
                                <Form.Label className="label">Company:</Form.Label>
                                <Form.Control type="text" placeholder="Enter company name" onChange={(e) => setCompany(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label className="label">Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group className="mb-3" controlId="surname">
                                <Form.Label className="label">Surname:</Form.Label>
                                <Form.Control type="text"  placeholder="Enter Surname" onChange={(e) => setSurname(e.target.value)} />
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
export default UserRegisterEmployee;
