import { Row, Col, Container, Button} from 'react-bootstrap';
import { WelcomeFarmer } from "../Images/WelcomeFarmer";
import { useHistory } from 'react-router-dom';
import "./Welcome.css";

function Welcome(props) {
    const history = useHistory();

    function handleLogin() {
        history.push('/login');
    }

    function handleSignup() {
        history.push('/signupClient');
    }

    return (
        <Container className="no-scroll bg-desktop">

            <Row className="mt-2 desktop-margin">
                <Col className="d-none d-lg-block"></Col>
                <Col>
                    <h1 className="text-placement desktop-margin"> Your next </h1>
                    <h1 className="text-placement"> ingredient is </h1>
                    <h1 className="text-placement"> ZeroMiles away </h1>
                </Col>
                <Col className="d-none d-lg-block"></Col>
            </Row>
            <Row>
                <WelcomeFarmer />
            </Row>
            <Row className="mt-3">
                <Col xl={5} xs={2}></Col>
                <Col style={{ textAlign: "center" }} className="d-grid gap-2">
                    <Button style={{ fontSize: "20px" }} variant="secondary" onClick={handleLogin}>Login</Button>
                </Col>
                <Col xl={5} xs={2}></Col>
            </Row>
            <Row className="mt-3">
                <Col xl={5} xs={2}></Col>
                <Col style={{ textAlign: "center" }} className="d-grid gap-2">
                    <Button style={{ fontSize: "20px" }} variant="warning" onClick={handleSignup}>Sign Up</Button>
                </Col>
                <Col xl={5} xs={2}></Col>
            </Row>

        </Container>

    );
}

export default Welcome;