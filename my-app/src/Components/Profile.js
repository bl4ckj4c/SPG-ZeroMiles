import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Spinner, Card } from 'react-bootstrap';
import { PersonCircle, GeoAltFill, MapFill, WalletFill } from 'react-bootstrap-icons';
import "./ClientView.css";

function Profile(props) {
    const [loggedClient, setloggedClient] = useState([]);
    const [loggedClientUpdated, setloggedClientUpdated] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.getClient()
            .then(client => {
                console.log(client);
                setloggedClient(client);
                setloggedClientUpdated(false);
                setLoading(false);
            }).catch(c => handleErrors(c));
    }, []);

    useEffect(() => {
        if (loggedClientUpdated === true) {
            setLoading(true);
            API.getClient()
                .then(client => {
                    setloggedClient(client);
                    setloggedClientUpdated(false);
                    setLoading(false);
                }).catch(c => handleErrors(c));
        }
    }, [loggedClientUpdated]);

    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/ }
        console.log(err);
    }

    console.log(loggedClient);

    return (
        <>
            {loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
                    </Row > </> :
                <>
                    <Col>
                        <Table className="d-flex justify-content-center">
                            <tbody id="client-table" align="center">
                                <ClientRow client={loggedClient} />
                            </tbody>
                        </Table>
                    </Col>
                </>
            }
        </>
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
                </ListGroup>
            </Card.Body>

            <Card.Body className="sfondo-footer" style={{ textAlign: "right" }}> <WalletFill /> Wallet balance: €{props.client.Wallet}</Card.Body>
        </Card>
    );
}

export default Profile;