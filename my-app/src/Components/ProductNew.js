import API from '../API';
import {useState, useEffect, useCallback} from 'react';
import {Table, Row, Col, Form, ListGroup, Spinner, Card, Modal, Button, Container} from 'react-bootstrap';
import {PersonCircle, GeoAltFill, MapFill, WalletFill} from 'react-bootstrap-icons';
import "./ClientView.css";
import {useDropzone} from 'react-dropzone'

function ProductNew(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(undefined);
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
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    async function submitNewProduct() {

        console.log(image);

        let object = {
            "Name": name,
            "Description": description
        }
        let res = await API.createProduct(object, image);
        console.log(object);
        console.log(res);
    }

    return (
        <>
            {loading ? <> <Row className="justify-content-center mt-5">
                    < Spinner animation="border" size="xl" variant="secondary"/>
                </Row> </> :
                <>
                    <Col className="mt-3">
                        <Table className="d-flex justify-content-center">
                            <tbody id="client-table" align="center">
                            <NewProductBottom client={loggedClient} onShow={() => setModalShowProductNew(true)}/>
                            </tbody>
                        </Table>
                    </Col>

                    <ModalProductNew
                        setName={setName}
                        setDescription={setDescription}
                        setImage={setImage}
                        submitNewProduct={submitNewProduct}
                        show={modalShowProductNew}
                        onHide={() => setModalShowProductNew(false)}/>

                </>
            }
        </>
    );
}

function NewProductBottom(props) {
    return (
        <>
            <Button onClick={props.onShow}>New product</Button>
        </>
    );
}

function ModalProductNew(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    New product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => props.submitNewProduct(e)} controlId="my-form">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="label">Name of new product</Form.Label>
                        <Form.Control type="text" placeholder="Enter name"
                                      onChange={(e) => props.setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="label">Description of the new product</Form.Label>
                        <Form.Control type="text" controlId="description" placeholder="Enter description"
                                      onChange={(e) => props.setDescription(e.target.value)}/>
                    </Form.Group>
                    <Row className='my-3 my-3'>
                        <Previews setImage={props.setImage}/>
                    </Row>
                    <Button onClick={props.submitNewProduct} variant="success">Create</Button>
                    {' '}{' '}
                    <Button variant='danger' onClick={props.onHide}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}


function Previews(props) {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        minFiles: 1,
        maxFiles: 1,
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));

            // Add the first element of the array as the image
            props.setImage(acceptedFiles[0]);
        }
    });

    const thumbs = files.map(file => (
        <Container
            style={{
                display: 'inline-flex',
                width: 300,
                height: 300
            }}
            key={file.name}>
            <Container
                className='justify-content-center'
                style={{
                    display: 'flex',
                    minWidth: 0,
                    overflow: 'hidden'
                }}>
                <img
                    src={file.preview}
                    style={{
                        display: 'block',
                        width: 'auto',
                        height: '100%'
                    }}
                />
            </Container>
        </Container>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <Container>
            <Container
                {...getRootProps({className: 'dropzone'})}
                style={{
                    borderRadius: 7,
                    border: '2px dashed #d0d0d0'
                }}>
                <input {...getInputProps()} />
                {thumbs.length !== 0 ?
                    <Col
                        className='mb-4'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 16
                        }}>
                        {thumbs}
                    </Col>
                    :
                    <></>
                }
                <Row className='justify-content-center m-5'>Drag 'n' drop the image here, or click to select one</Row>
            </Container>
        </Container>
    );
}


export default ProductNew;