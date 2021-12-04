import { useState, useEffect } from 'react';
import { Form, Table, InputGroup, Row, Col, ListGroup, Container, Modal, Button, Card } from 'react-bootstrap';
import { PersonCircle, GeoAltFill, MapFill, WalletFill } from 'react-bootstrap-icons';
import API from '../API';
import "./ClientView.css";

function ClientView(props) {
    const [searchParameter, setSearchParameter] = useState("");
    const [filteredClients, setFilteredClients] = useState([]);

    useEffect(() => {
        if (props.users.length > 0)
            setFilteredClients([...props.users])
    }, [props.users]);

    return (
        <>
            <Container>
                <Row className="mt-3 margin-search-desktop">
                    <UserSearchBar searchParameter={searchParameter} setSearchParameter={setSearchParameter} users={props.users} setFilteredClients={setFilteredClients} />
                </Row>
            </Container>

            <Col>
                <Table className="d-flex justify-content-center">
                    <tbody id="client-table" align="center">
                        {filteredClients.map((c,i) => c.Role === "Client" ? <ClientRow key={i} client={c} triggerUpdate={props.triggerUpdate} /> : <></>)}
                    </tbody>
                </Table>
            </Col>
        </>
    );
}

function ClientRow(props) {

    return (
        <>
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

            <Card.Body className="sfondo-footer" style={{ textAlign: "right" }}> <ButtonBalance client={props.client} triggerUpdate={props.triggerUpdate} /></Card.Body>
        </Card>
        </>
    );
}

function ButtonBalance(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showConfirm, setShowConfirm] = useState(false);
    const handleCloseConfirm = () => handleRefresh();
    const handleShowConfirm = () => setShowConfirm(true);

    const [amount, setAmount] = useState(props.client.Wallet);
    const [difference, setDifference] = useState(0);
    const [operation, setOperation] = useState("Add");

    function HandleOperation(difference)
         {difference < 0 ? setOperation("Subtract") : setOperation("Add")}

    function UpdateNumber(i) {
        if (i === -1 && amount > 0) {
            setAmount(amount - 1);
            setDifference(difference - 1);
        }
        else if (i === +1) {
            setAmount(amount + 1);
            setDifference(difference + 1);
        }
        
          HandleOperation(difference);
        
    }

    function UpdateNumberInput(num){
        let input = parseFloat(num);
        if(isNaN(input) || input < 0 || !num ){
            setAmount(0)
            setDifference(0 - props.client.Wallet);

        }
        else
        {
            setAmount(input)
            setDifference(input - props.client.Wallet);
        }
        HandleOperation(difference);

    }
 

    async function handleUpdate() {
        try {
            let object = {
                "ClientID": props.client.UserID,
                "Wallet": amount
            }
            await API.modifyWallet(object);
            handleClose();
            handleShowConfirm();
        } catch (err) {
            console.log("errore: " + err);
        }
    }

    function handleRefresh() {
        setShowConfirm(false);
        props.triggerUpdate();
    }

    return (
        <>
            <Button variant="outline-dark" size="sm" onClick={handleShow}>Update Balance</Button>

            <Modal show={show} onHide={handleClose} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update balance</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Container>
                        <Row>
                            <Col style={{ textAlign: "right" }} ><Button className="btn-circle" variant="warning" onClick={() => UpdateNumber(-1)}>-</Button></Col>
                            <Col style={{ fontSize: 24, textAlign: "center" }} xs={6}>
                                
                            <InputGroup>
                                <InputGroup.Text>€</InputGroup.Text>
                                <Form.Control value={amount}  onChange={(event) => { UpdateNumberInput(event.target.value)} }   />
                            </InputGroup>

                                
                                
                                
                                € {amount}</Col>
                            <Col style={{ textAlign: "left" }}><Button className="btn-circle" variant="warning" onClick={() => UpdateNumber(+1)}>+</Button></Col>
                        </Row>
                    </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleUpdate}>
                        {operation} €{Math.abs(difference)}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirm} onHide={handleCloseConfirm} size="md" centered >
                <Modal.Header closeButton>
                    <Modal.Title>{props.client.Name}'s wallet updated ✅</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center' }}>Amount added: {difference}€. New wallet balance: {amount}€</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function UserSearchBar(props) {

    function ManageSearch(text) {
        props.setSearchParameter(text);
        props.setFilteredClients(props.users.filter(c => (c.Name + " " + c.Surname).toLowerCase().includes(text.trim().toLowerCase())));
    }

    return (

        <Form onSubmit={(event) => event.preventDefault()}  >
            <Form.Control placeholder="🔍 Search for a customer..." type='text' value={props.searchParameter} onChange={(event) => { ManageSearch(event.target.value) }} />

        </Form>

    );
}

export default ClientView;