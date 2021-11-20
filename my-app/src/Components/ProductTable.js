import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill, TypeH1, Collection, Bag, Cash, CartCheckFill } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem, Form, Button, Collapse, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./ProductTable.css";
import API from '../API';


function UserDropdown(props) {
    const filterByFields = ['Name', 'Surname'];
    return (
        <>
            <Form.Group>
                <Typeahead
                    filterBy={filterByFields}
                    id="basic-typeahead-single"
                    labelKey={(option) => `${option.Name} ${option.Surname}`}
                    onChange={props.setSelectedUser}
                    options={props.users}
                    placeholder="Choose a customer..."
                    selected={props.selectedUser}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.Name + " " + option.Surname}
                            <div>
                                <small>{option.Address + " - " + option.City + ", " + option.State + " " + option.Zipcode} </small>
                            </div>
                        </div>
                    )}
                />
            </Form.Group>
        </>
    );
};


function ProductTableWrapper(props) {
  

}

function ProductTable(props) {


  const [prodNum, setProdNum] = useState(() => prodNumInit())
  const [searchParameter, setSearchParameter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([...props.productByFarmer]);

    function prodNumInit() {
        let tmp = []
        props.productByFarmer.forEach(p => tmp.push({ "number": 0, "ProductID": p.ProductID, "FarmerID": p.FarmerID, "NameProduct": p.NameProduct, "ImageID": p.ImageID, "Price": p.Price}))
        return tmp;

    }


    const [showConfirm, setShowConfirm] = useState(false);

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        props.triggerUpdate();
        setProdNum(() => prodNumInit());
    }

    const handleShowConfirm = () => setShowConfirm(true);

    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const [selectedUser, setSelectedUser] = useState([]);

    //this function updates the number in the array, also allows to display the current number in the counter
    function UpdateNumber(i, sign) {
        // let i = props.productByFarmer.findIndex(p => (p.ProductID === ProductID && p.FarmerID === FarmerID))
        let prodNumCopy = [...prodNum];
        if (i === -1)
            return;
        else if ((sign === -1 && prodNumCopy[i].number !== 0) || (sign === +1 && prodNumCopy[i].number < props.productByFarmer[i].Quantity))
            prodNumCopy[i].number += sign;

        setProdNum(prodNumCopy);
    }


    async function submitOrder() {

        try {
            let items = prodNum.filter(p => p.number !== 0);
            if (items.length > 0 && selectedUser.length > 0) {
                handleShowConfirm(); //show the modal
                let object = {
                    "UserID": selectedUser[0].UserID,
                    "items": items
                }

                let res = await API.addOrder(object);
            }

            if (items.length <= 0 || selectedUser.length <= 0) {
                handleShowError(); //Se non ho selezionato alcun prodotto o cliente
            }
        }
        catch (err) {
            console.log("errore: " + err);
            //   handleError(err);
        }
    }

    console.log("quantirendering!");


    return (
        <>
        <SearchBar setFilteredProducts={setFilteredProducts} productByFarmer={props.productByFarmer} setSearchParameter={setSearchParameter}/>
            <Container >
                <Row className="mt-3 row-style">
                    <Col>
                        <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>
                        <Button onClick={submitOrder} variant="secondary">Submit</Button>
                        <OrderConfirmedModal showConfirm={showConfirm} handleCloseConfirm={handleCloseConfirm} />
                        <ErrorModal showError={showError} handleCloseError={handleCloseError}  />
                    </Col>
                </Row>
            </Container>

            <Col className="justify-content-center">
                <Table className="d-flex justify-content-center">
                    <tbody id="farmer-table" align="center">
                        {props.farmers.map(f =>
                            <FarmerRow UpdateNumber={UpdateNumber} prodNum={prodNum} farmer={f} productByFarmer={filteredProducts} UpdateNumber={UpdateNumber} />
                        )}
                    </tbody>
                </Table>
            </Col>
        </>
    );
};

function OrderConfirmedModal(props) {
    return (
        <Modal show={props.showConfirm} onHide={props.handleCloseConfirm} autoFocus={true} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Thank you! 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body> Order completed</Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.handleCloseConfirm}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>);
}

function ErrorModal(props) {
    return (
        <Modal show={props.showError} onHide={props.handleCloseError} autoFocus={true} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Warning! ⚠️</Modal.Title>
            </Modal.Header>
            <Modal.Body>Select at least a product or a customer.</Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.handleCloseError}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function FarmerRow(props) {
    let product = [];

    const splitEvery = (array, length) =>
        array.reduce(
            (result, item, index) => {
                if (index % length === 0) result.push([])
                result[Math.floor(index / length)].push(item)
                return result
            },
            []
        );

    props.productByFarmer.map(p => p.FarmerID === props.farmer.FarmerID ? product.push(p) : '')
        
    if(product.length > 0)
    return (<>
        <tr>
            <td className="producttable-col">

                <Container>

                    <Row className="mt-2">
                        <h1 style={{ fontSize: 28 }} align={"left"}>{props.farmer.Company}</h1>
                    </Row>

                    <Row className="mb-3">
                        <section className="d-flex justify-content-between">
                            <div> <PersonFill /><span>&nbsp;</span>
                                {props.farmer.Name}<span>&nbsp;</span>{props.farmer.Surname}
                            </div>
                            <div>
                                <GeoAltFill className="ml-3" /><span>&nbsp;</span>
                                {props.farmer.Address}<span>,&nbsp;</span>{props.farmer.State}
                            </div>
                        </section>
                    </Row>

                    {splitEvery(product, 3).map(p => (
                        <Row className="mb-xl-4">
                            {p.map(pf => (
                                <Col xl className="column-margin">
                                    <ProductCard UpdateNumber={props.UpdateNumber} prodNum={props.prodNum} productByFarmer={props.productByFarmer} prodottoDelFarmer={pf} UpdateNumber={props.UpdateNumber} />
                                </Col>
                            ))}
                        </Row>
                    ))}

                </Container>
            </td>
        </tr>
    </>
    );
    else
    return "";

};

function ProductCard(props) {

    const [open, setOpen] = useState(false);

    let newSrc = "https://filer.cdn-thefoodassembly.com/photo/" + props.prodottoDelFarmer.ImageID + "/view/large"

    return (
        <Card style={{ width: '21rem' }} >
            <Card.Img variant="top" className="cover" src={newSrc} />
            <Card.Body>
                <Card.Title>{props.prodottoDelFarmer.NameProduct}</Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            <Container>
                <Row>
                    <Col><Collection /></Col>
                    <Col><Bag /></Col>
                    <Col><Cash /></Col>
                </Row>
                <Row className="mb-4">
                    <Col>Available {props.prodottoDelFarmer.Quantity}</Col>
                    <Col>Unit: {props.prodottoDelFarmer.UnitOfMeasurement}</Col>
                    <Col>€{props.prodottoDelFarmer.Price}</Col>
                </Row>
            </Container>
            <Card.Footer>
                <Row>
                    <Col> <Button variant="outline-warning"
                        onClick={() => setOpen(!open)}
                        style={{ fontSize: 14, color: "black" }}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        See Description
                    </Button></Col>
                    <Col><ProductsCounter UpdateNumber={props.UpdateNumber} prodNum={props.prodNum} productByFarmer={props.productByFarmer} prodottoDelFarmer={props.prodottoDelFarmer} Quantity={props.prodottoDelFarmer.Quantity} ProductID={props.prodottoDelFarmer.ProductID} FarmerID={props.prodottoDelFarmer.FarmerID} UpdateNumber={props.UpdateNumber} /></Col>
                </Row>
                <Collapse style={{ marginTop: "10px", fontSize: 13 }} in={open}>
                    <div>{props.prodottoDelFarmer.Description}</div>
                </Collapse>
            </Card.Footer>
        </Card>
    );
}


function ProductsCounter(props) {
    let i = props.productByFarmer.findIndex(p => (p.ProductID === props.prodottoDelFarmer.ProductID && p.FarmerID === props.prodottoDelFarmer.FarmerID))
    console.log(i + props.prodNum[i].number);
    return (
        <ButtonGroup>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled={props.prodottoDelFarmer.Quantity === 0 ? true : false} variant='warning' onClick={() => props.UpdateNumber(i, -1)}>
                -
            </ToggleButton>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled variant="warning">
                {props.prodNum[i].number}
            </ToggleButton>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled={props.prodottoDelFarmer.Quantity === 0 ? true : false} variant="warning" onClick={() => props.UpdateNumber(i, +1)} >
                +
            </ToggleButton>
        </ButtonGroup>
    );
}


function SearchBar(props){


    function ManageSearch(text){
        props.setSearchParameter(text);
        props.setFilteredProducts(props.productByFarmer.filter( p=> p.NameProduct.toLowerCase().includes(text.toLowerCase())));        
    }

    return(

        <Form onSubmit={(event) => event.preventDefault()}  >
        search: <Form.Control type='text' value={props.username} onChange={(event) => { ManageSearch(event.target.value) }} />

      </Form>

    );
}

export default ProductTable;
