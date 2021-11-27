import { Navbar, Nav, Button, Image, Container, Offcanvas, NavDropdown, Col, Row } from 'react-bootstrap';
import "./Navbar.css";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { useLocation, useHistory } from 'react-router-dom';
import { House, DoorOpen } from 'react-bootstrap-icons';
import {WelcomeFarmerSidebar} from "../Images/WelcomeFarmer.js";

function ZeroNavbar(props) {
    const location = useLocation();
    const history = useHistory();

    function handleLogout() {
        props.logout();
        history.push('/login');
    }

    function handleHome() {
        history.push('/products');
    }

    return (
        location.pathname === "/" ? <></> :
            <Navbar bg="warning" expand={false}>
                <Container>

                    <Navbar.Brand className="logo" href="/products">
                        <Image id="logo" src="/images/logo.png" />
                    </Navbar.Brand>

                    {!props.isLoggedIn ? <></> : <>

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
                                <Row>
                                    <Col>
                                        <Button className="logout-button" variant="outline-dark" size="sm" onClick={handleHome}><House style={{marginTop: '-4px', marginRight: '4px'}}/>Home</Button>
                                    </Col>
                                    <Col>
                                        <Button className="logout-button" variant="outline-dark" size="sm" onClick={handleLogout}><DoorOpen style={{marginTop: '-4px', marginRight: '4px'}}/>Logout</Button>
                                    </Col>
                                </Row>


                                {props.user.Role === "Employee" ? <EmployeeSidebar /> : <></>}

                                {props.user.Role === "Client" ? <ClientSidebar /> : <></>}

                            </Offcanvas.Body>

                            <WelcomeFarmerSidebar className="side-farmer"/>

                        </Navbar.Offcanvas>
                    </>}

                </Container >
            </Navbar >

    );
};


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
                <Nav.Link className="sidebar-text" href="/clients" >All</Nav.Link>
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

