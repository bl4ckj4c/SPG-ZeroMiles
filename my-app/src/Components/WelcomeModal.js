import { Row, Col, Container, Modal, Button} from 'react-bootstrap';
import { WelcomeFarmerModal } from "../Images/WelcomeFarmer";
import { useHistory } from 'react-router-dom';
import "./WelcomeModal.css";

function WelcomeModal(props) {
    const history = useHistory();

    function handleLogin() {
        history.push('/login');
    }

    function handleSignup() {
        history.push('/signupClient');
    }

    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-placement-modal"> Your next </h1>
                            <h1 className="text-placement-modal"> ingredient is </h1>
                            <h1 className="text-placement-modal"> ZeroMiles away </h1>
                        </Col>
                    </Row>
                    <Row>
                        <WelcomeFarmerModal />
                    </Row>
                    <Row className="mt-3">
                        <Col xl={3} xs={2}></Col>
                        <Col style={{ textAlign: "center" }} className="d-grid gap-2">
                            <Button style={{ fontSize: "18px" }} variant="secondary" onClick={handleLogin}>Login</Button>
                        </Col>
                        <Col xl={3} xs={2}></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xl={3} xs={2}></Col>
                        <Col style={{ textAlign: "center" }} className="d-grid gap-2">
                            <Button style={{ fontSize: "18px" }} variant="warning" onClick={handleSignup}>Sign Up</Button>
                        </Col>
                        <Col xl={3} xs={2}></Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{fontSize:"14px"}} variant="outline-secondary" onClick={props.onHide}>or take a quick look</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default WelcomeModal;
