import { Navbar, Nav, Button, Image, Container, Offcanvas, NavDropdown, Col, Row, Modal, Form } from 'react-bootstrap';
import "./Navbar.css";
import { useEffect, useState } from 'react';
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { useLocation, useHistory } from 'react-router-dom';
import { House, DoorOpen, Stopwatch } from 'react-bootstrap-icons';
import { WelcomeFarmerSidebar } from "../Images/WelcomeFarmer.js";
import DeLorean from "../Images/DeLorean.js";
import API from '../API';

function ZeroNavbar(props) {
    const location = useLocation();
    const history = useHistory();

    const [modalShow, setModalShow] = useState(false);

    function handleLogout() {
        props.logout();
        history.push('/login');
    }

    function handleHome() {
        history.push('/products');
    }

    function handleTime() {
        setModalShow(true);
    }

    function handleLogin() {
        history.push('/login');
    }

    function handleSignup() {
        history.push('/signupClient');
    }

    function handleClose(newdate) {
        setModalShow(false);
        props.setTimeMachine(newdate);
    }

    return (
        location.pathname === "/" ? <></> :
            <Navbar bg="warning" expand={false}>
                <Container>

                    <Navbar.Brand className="logo" onClick={handleHome}>
                        <Image id="logo" src="/images/logo.png" />
                    </Navbar.Brand>

                    {!props.isLoggedIn ? <>
                        <div style={{ marginTop: '0.9rem' }}>
                            <Button style={{ marginRight: '0.5rem', fontSize: "14px" }} variant="outline-secondary" onClick={handleSignup}>Signup</Button>
                            <Button style={{ fontSize: "14px" }} variant="secondary" onClick={handleLogin}>Login</Button>
                        </div>
                    </> : <>

                        <Navbar.Toggle aria-controls="offcanvasNavbar" className="posizionamento-pulsante" />
                        <Navbar.Offcanvas
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="end"
                            className="bg-sidebar"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id="offcanvasNavbarLabel" style={{ fontSize: 25, color: "black" }}>Welcome back, {props.user.Name}!</Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                                <Row style={{ textAlign: 'center' }}>
                                    <Col>
                                        <Button className="logout-button" variant="outline-dark" size="sm" onClick={handleHome}><House style={{ marginTop: '-4px', marginRight: '4px' }} />Home</Button>
                                    </Col>

                                    {!props.timedev ? <></> : <>
                                        <Col>
                                            <Button className="logout-button" variant="outline-dark" size="sm" onClick={handleTime}><Stopwatch style={{ marginTop: '-4px', marginRight: '4px' }} />DeLorean</Button>
                                            <TimeMachine show={modalShow} onHide={(newdate) => handleClose(newdate)} />
                                        </Col>
                                    </>}

                                    <Col>
                                        <Button className="logout-button" variant="outline-dark" size="sm" onClick={handleLogout}><DoorOpen style={{ marginTop: '-4px', marginRight: '4px' }} />Logout</Button>
                                    </Col>
                                </Row>


                                {props.user.Role === "Employee" ? <EmployeeSidebar /> : <></>}

                                {props.user.Role === "Client" ? <ClientSidebar /> : <></>}

                                {props.user.Role === "Farmer" ? <FarmerSidebar /> : <></>}

                            </Offcanvas.Body>

                            {props.user.Role === "Client" ? <WelcomeFarmerSidebar className="side-farmer" /> : <></>}
                            {props.user.Role === "Farmer" ? <WelcomeFarmerSidebar className="side-farmer" /> : <></>}

                        </Navbar.Offcanvas>
                    </>}

                </Container >
            </Navbar >

    );
};

function TimeMachine(props) {
    var dayjs = require('dayjs');

    const now_time = new Object();
    const now_date = new Object();
    now_time.value = dayjs().format('HH:mm');
    now_date.value = dayjs().format('YYYY-MM-DD');
    var newdate = "";

    const [time, setTime] = useState(now_time);
    const [date, setDate] = useState(now_date);


    function onSubmit() {
        newdate = (dayjs(date.value).format('MM-DD-YYYY') + " " + time.value + ":00").toString();
        API.setTimeMachine(newdate);
        props.onHide(newdate);
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    "Wait a minute, Doc."
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 style={{ textAlign: 'center' }}>
                    “Are you telling me you built a time machine...out of a DeLorean?”
                </h6>
                <Form>
                    <Row className="mt-3">
                        <DeLorean />
                    </Row>
                    <Row className="justify-content-center">
                        <Col lg={3} xl={3} md={3} sm={6} xs={6}>
                            <Form.Group className="mt-2" controlId="chosendate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" defaultValue={date.value.toString()} onChange={e => setDate({ value: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col lg={3} xl={3} md={3} sm={6} xs={6}>
                            <Form.Group className="mt-2" controlId="chosentime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" defaultValue={time.value.toString()} onChange={e => setTime({ value: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={onSubmit}>Gigawatts!?</Button>
            </Modal.Footer>
        </Modal>
    );
}


function EmployeeSidebar(props) {
    return (
        <>
            <Offcanvas.Title className="mt-3 nav-subtitle">ORDERS</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/orders/all" >All</Nav.Link>
                <Nav.Link className="sidebar-text" href="/orders/open">Open</Nav.Link>
                <Nav.Link className="sidebar-text" href="/orders/pending">Pending</Nav.Link>
                <Nav.Link className="sidebar-text" href="/orders/closed">Closed</Nav.Link>
            </Nav>

            <Offcanvas.Title className="mt-3 nav-subtitle">CLIENTS</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/clients" >All clients</Nav.Link>
                <Nav.Link className="sidebar-text" href="/signup">New client</Nav.Link>
            </Nav>
            <Offcanvas.Title className="mt-3 nav-subtitle">FARMER</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/clients" >All farmers</Nav.Link>
                <Nav.Link className="sidebar-text" role="Farmer" onClick href="/signupEmployee">
                    New farmer
                </Nav.Link>
            </Nav>

            <WelcomeFarmerSidebar className="side-farmer" />

        </>
    );
}
function FarmerSidebar(props) {
    return (
        <>
            <Offcanvas.Title className="mt-3 nav-subtitle">PRODUCTS</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/productNew">My products</Nav.Link>
            </Nav>

            <Offcanvas.Title className="mt-3 nav-subtitle">PROFILE</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/profile">My profile</Nav.Link>
            </Nav>

        </>
    );
}



function ClientSidebar(props) {

    return (
        <>
            <Offcanvas.Title className="mt-3 nav-subtitle">ORDERS</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/myorders">My orders</Nav.Link>
            </Nav>

            <Offcanvas.Title className="mt-3 nav-subtitle">PROFILE</Offcanvas.Title>
            <NavDropdown.Divider />

            <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link className="sidebar-text" href="/profile">My profile</Nav.Link>
            </Nav>

        </>
    );
}

export default ZeroNavbar;

