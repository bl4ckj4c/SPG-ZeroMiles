import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col,Form, FloatingLabel, ListGroup, Spinner, Card, Modal, Button, FormGroup } from 'react-bootstrap';
import { PersonCircle, GeoAltFill, MapFill, WalletFill } from 'react-bootstrap-icons';
import "./ClientView.css";

function ProductNew(props) {
   const [name , setName] = useState('');
    const [description, setDescription] = useState('');
    const [loggedClient, setloggedClient] = useState([]);
    const [loggedClientUpdated, setloggedClientUpdated] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalShowProductNew, setModalShowProductNew] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.getClient()
            .then(client => {
                console.log(client);
                setloggedClient(client);
                console.log("ciao" + loggedClient.UserID);

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
                    console.log("ciao" + loggedClient.UserID);
                    setloggedClientUpdated(false);
                    setLoading(false);
                }).catch(c => handleErrors(c));
        }

    }, [loggedClientUpdated]);








    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/ }
        console.log(err);
    }

    async function submitNewProduct() {

        let object = {
            "Name": name,
            "Description": description
        }
        let res = await API.createProduct(object);
        console.log(object);
        console.log(res);
    }

    return (
        <>
            {loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
            </Row > </> :
                <>
                     <Col className="mt-3">
                        <Table className="d-flex justify-content-center">
                            <tbody id="client-table" align="center">
                                <NewProductBottom client={loggedClient} onShow={() => setModalShowProductNew(true)}/>
                            </tbody>
                        </Table>
                    </Col>

                    <ModalProductNew setName={setName} setDescription={setDescription} submitNewProduct={submitNewProduct} show={modalShowProductNew} onHide={() => setModalShowProductNew(false)} />

                </>
            }
        </>
    );
}

function NewProductBottom(props) {
    return (
        <>
                <Button onClick={props.onShow}>new product</Button>
        </>
    );
}

function ModalProductNew(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>

            
                <Modal.Title id="contained-modal-title-vcenter">
                ⚠️New product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={(e) => props.submitNewProduct(e)} controlId="my-form">
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="label">Name of new product:</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name of your product" onChange={(e) => props.setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-12">
                    <Form.Label className="label">Enter the description of product:</Form.Label>
                    <FloatingLabel controlId="floatingTextarea2">
                       {/* <Form.Control
                       as="textarea"
                       placeholder="Leave a comment here"
                       style={{ height: '100px' }}
                       /> */}
                    <Form.Control type="text" as="textarea" style={{ height: '20vh' }} controlid="description" onChange={(e) => props.setDescription(e.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Row className="mb-3">
                  <Button onClick={props.submitNewProduct} variant="success">Save</Button>
                  {/* <Button onClick={props.onHide}>Close</Button> */}
                </Row>
            </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}                  



export default ProductNew;