import {Navbar, Nav, Button, Image, Container} from 'react-bootstrap';

function ZeroNavbar() {
    return (
        <Navbar bg="warning">
            <Container>
                <Navbar.Brand href="/">
                    <Image id="logo" src="/images/logo.png" />
                </Navbar.Brand>
                <Nav>
                    {<Nav.Link className="posizionamento" href="/login">Login</Nav.Link>}
                    <Nav.Link className="posizionamentoPulsante" href="/user">
                        <Button variant="secondary" size="sm">Sign Up</Button>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    );
};

export default ZeroNavbar;

