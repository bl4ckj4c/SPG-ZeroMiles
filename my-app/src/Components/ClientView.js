import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Container, Modal, Button, Image, InputGroup, FormControl, Card } from 'react-bootstrap';
import { PersonCircle, GeoAltFill, MapFill, WalletFill } from 'react-bootstrap-icons';
import "./ClientView.css";

function ClientView(props) {
    const [clientsList, setClientsList] = useState([]);
    const [clientsListUpdated, setClientsListUpdated] = useState(true);

    return (
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="client-table" align="center">
                    {props.users.map(c => c.Role === "Client" ? <ClientRow client={c} /> : '')}
                </tbody>
            </Table>
        </Col>
    );
}

function ClientRow(props) {
    return (
        <Card className="client-card mt-3">

            <Card.Body>
                <Row>
                    <Col md={4}>
                        <PersonCircle size={60} style={{ marginBottom: '6px', marginRight: '5px' }} />
                    </Col>
                    <Col md={8}>
                        <Card.Title style={{ fontSize: 28 }}> {props.client.Name} {props.client.Surname} </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.client.Email}</Card.Subtitle>
                    </Col>
                </Row>
            </Card.Body>


            <Card.Body>
                <ListGroup style={{ textAlign: "left" }}>
                    <ListGroup.Item><GeoAltFill /> Address: {props.client.Address}</ListGroup.Item>
                    <ListGroup.Item><MapFill /> City: {props.client.City}, {props.client.State}</ListGroup.Item>
                    <ListGroup.Item><WalletFill /> Wallet balance: €{props.client.Wallet}</ListGroup.Item>
                </ListGroup>
            </Card.Body>

            <Card.Body className="sfondo-footer" style={{ textAlign: "right" }}> <ButtonBalance client={props.client} /></Card.Body>
        </Card>
    );
}

function ButtonBalance(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [amount, setAmount] = useState(props.client.Wallet);
    const [difference, setDifference] = useState(0);
    const [operation, setOperation] = useState ("Add");

    function UpdateNumber(i) {
        if (i === -1 && amount > 0) {
            setAmount(amount - 1);
            setDifference(difference - 1);
            }
        else if (i === +1) {
            setAmount(amount + 1);
            setDifference(difference + 1);
        }

        if(difference < 0){
            setOperation("Subtract");
        } else {
            setOperation("Add");
        }
    }

    return (
        <>
            <Button variant="outline-dark" size="sm" onClick={handleShow}>Update Balance</Button>

            <Modal show={show} onHide={handleClose} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update balance</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <Row>
                            <Col style={{ textAlign: "right" }} ><Button className="btn-circle" variant="warning" onClick={() => UpdateNumber(-1)}>-</Button></Col>
                            <Col style={{ fontSize: 25, textAlign: "center" }} xs={4}>€ {amount}</Col>
                            <Col style={{ textAlign: "left" }}><Button className="btn-circle" variant="warning" onClick={() => UpdateNumber(+1)}>+</Button></Col>
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleClose}>
                        {operation} €{Math.abs(difference)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ClientView;