import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill, TypeH1, Collection, Bag, Cash, CartCheckFill } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem, Form, Button, Collapse, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./ProductTable.css";
import API from '../API';
import { ProductList } from './EmployeeView'


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



function ProductTable(props) {

    const [prodNum, setProdNum] = useState(() => prodNumInit())
    const [searchParameter, setSearchParameter] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([...props.productByFarmer]);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleShowConfirm = () => setShowConfirm(true);
    const [showError, setShowError] = useState(false);
    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);
    const [selectedUser, setSelectedUser] = useState([]);
    const [insertedOrder, setInsertedOrder] = useState();
    const [cartCheckoutModal, setCartCheckoutModal] = useState(false);
    const handleCartCheckoutModalShow = () => setCartCheckoutModal(true);
    const handleCartCheckoutModalClose = () => setCartCheckoutModal(false);

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        props.triggerUpdate();
        setProdNum(() => prodNumInit());
    }

    function prodNumInit() {
        let tmp = []
        props.productByFarmer.forEach(p => tmp.push({ "number": 0, "ProductID": p.ProductID, "FarmerID": p.FarmerID, "NameProduct": p.NameProduct, "ImageID": p.ImageID, "Price": p.Price }))
        return tmp;

    }

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
            let customerID;
            if (props.isLoggedIn)
                if (props.user.Role === "Employee")
                    customerID = selectedUser[0].UserID;
                else
                    customerID = props.user.userID


            let items = prodNum.filter(p => p.number !== 0);
            if (items.length > 0 && (selectedUser.length > 0 || props.user.Role !== "Employee")) {
                let object = {
                    "UserID": customerID,
                    "items": items
                }
                setInsertedOrder(object);
                let res = await API.addOrder(object);
                handleShowConfirm(); //show the modal

            }
            else {
                handleShowError(); //Se non ho selezionato alcun prodotto o cliente
            }
        }
        catch (err) {
            console.log("errore: " + err);
            //   handleError(err);
        }
    }

    return (
        <>
            <Container >

                <Row className="mt-3 margine-cerca-desktop">
                    <SearchBar setFilteredProducts={setFilteredProducts} productByFarmer={props.productByFarmer} searchParameter={searchParameter} setSearchParameter={setSearchParameter} />
                </Row>

                {props.isLoggedIn ?
                    <Row className="mt-3 row-style">

                        <Col>
                            {props.user.Role === "Employee" ? <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                                : ""}
                        </Col>
                        <Col xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>
                            <OrderConfirmedModal Wallet={props.user.Wallet} prodNum={prodNum} handleCartCheckoutModalClose={handleCartCheckoutModalClose} order={insertedOrder} showConfirm={showConfirm} handleCloseConfirm={handleCloseConfirm} />
                            <ErrorModal showError={showError} handleCloseError={handleCloseError} />
                            <CartCheckoutModal Wallet={props.user.Wallet} prodNum={prodNum} submitOrder={submitOrder} order={insertedOrder} cartCheckoutModal={cartCheckoutModal} handleCartCheckoutModalClose={handleCartCheckoutModalClose} />
                        </Col>
                    </Row>
                    : ""}

            </Container>

            <Col className="justify-content-center">
                <Table className="d-flex justify-content-center">
                    <tbody id="farmer-table" align="center">
                        {props.farmers.map(f =>
                            <FarmerRow isLoggedIn={props.isLoggedIn} key={f.FarmerID} UpdateNumber={UpdateNumber} unfilteredProductByFarmer={props.productByFarmer} prodNum={prodNum} farmer={f} productByFarmer={filteredProducts} />
                        )}
                    </tbody>
                </Table>
            </Col>

            {props.isLoggedIn ? <CartBottomButton Wallet={props.user.Wallet} handleCartCheckoutModalShow={handleCartCheckoutModalShow} prodNum={prodNum} /> : ""}
        </>
    );
};

function CartBottomButton(props) {
    let total = 0;
    props.prodNum.forEach(p => p.number > 0 ? total += p.number * p.Price : "")
    return (
        <Button variant={total > props.Wallet ? "danger" : "secondary"} className="fixed-right-bottom" onClick={props.handleCartCheckoutModalShow}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
            €{total.toFixed(2)} </Button>
    );
}

function OrderConfirmedModal(props) {
    let tot = 0;
    props.prodNum.map(p => tot += p.number * p.Price);
    return (
        <Modal show={props.showConfirm} onHide={props.handleCloseConfirm} autoFocus={true} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Order submitted! 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>Updated wallet amount: €{props.Wallet - tot}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.handleCloseConfirm}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>);
}



function CartCheckoutModal(props) {
    let total = 0;
    props.prodNum.forEach(p => total += p.Price * p.number);


    return (
        <Modal show={props.cartCheckoutModal} onHide={props.handleCartCheckoutModalClose} autoFocus={true} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Checkout cart 🛒</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.prodNum.map(p => p.number !== 0 ? <ProductList key={"ord" + p.ProductID + p.FarmerID} product={p} /> : "")}
                Total = €{total.toFixed(2)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.submitOrder} disabled={(props.Wallet < total || !props.prodNum.some(p => p.number > 0)) ? true : false} variant={props.Wallet < total ? "danger" : "success"}>{props.Wallet < total ? "The wallet amount is insufficent" : "Submit Order"}</Button>

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

    if (product.length > 0)
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

                        {splitEvery(product, 3).map((p, index) => (
                            <Row key={index + "_" + props.farmer.FarmerID} className="mb-xl-4">
                                {p.map(pf => (
                                    <Col key={pf.ProductID + "_" + pf.FarmerID} xl className="column-margin">
                                        <ProductCard isLoggedIn={props.isLoggedIn} unfilteredProductByFarmer={props.unfilteredProductByFarmer} prodNum={props.prodNum} productByFarmer={props.productByFarmer} prodottoDelFarmer={pf} UpdateNumber={props.UpdateNumber} />
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
                    <Col>€{props.prodottoDelFarmer.Price.toFixed(2)}</Col>
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
                    {props.isLoggedIn ? <Col><ProductsCounter unfilteredProductByFarmer={props.unfilteredProductByFarmer} UpdateNumber={props.UpdateNumber} prodNum={props.prodNum} productByFarmer={props.productByFarmer} prodottoDelFarmer={props.prodottoDelFarmer} Quantity={props.prodottoDelFarmer.Quantity} ProductID={props.prodottoDelFarmer.ProductID} FarmerID={props.prodottoDelFarmer.FarmerID} /></Col> : ""}
                </Row>
                <Collapse style={{ marginTop: "10px", fontSize: 13 }} in={open}>
                    <div>{props.prodottoDelFarmer.Description}</div>
                </Collapse>
            </Card.Footer>
        </Card>
    );
}


function ProductsCounter(props) {
    let i = props.unfilteredProductByFarmer.findIndex(p => (p.ProductID === props.prodottoDelFarmer.ProductID && p.FarmerID === props.prodottoDelFarmer.FarmerID))
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


function SearchBar(props) {


    function ManageSearch(text) {
        props.setSearchParameter(text);
        props.setFilteredProducts(props.productByFarmer.filter(p => p.NameProduct.toLowerCase().includes(text.trim().toLowerCase())));
    }

    return (

        <Form onSubmit={(event) => event.preventDefault()}  >
            <Form.Control placeholder="🔍 Search for a product..." type='text' value={props.searchParameter} onChange={(event) => { ManageSearch(event.target.value) }} />

        </Form>

    );
}



export default ProductTable;
