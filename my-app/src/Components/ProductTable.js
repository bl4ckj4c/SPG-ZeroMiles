import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill, TypeH1, Collection, Bag, Cash, CartCheckFill, Cart4 } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem, Form, Button, Collapse, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
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

    const [productByFarmerList, setProductByFarmerList] = useState([]);
    const [productByFarmerListUpdated, setProductByFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata
    const [farmerListUpdated, setFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata
    const [farmerList, setFarmerList] = useState([]);
    const [update, setUpdate] = useState(true);
    const triggerUpdate = () => setUpdate(true);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        //prima di chiamare le API avvio l'animazione di caricamento
        if (update === true) {
            setProductByFarmerListUpdated(true);
            setFarmerListUpdated(true);
            setLoading(true);
            API.getProductByFarmer()
                .then(productByFarmer => {
                    setProductByFarmerList(productByFarmer);
                    setProductByFarmerListUpdated(false);
                }).catch(pbf => console.log(pbf));

            API.getFarmer()
                .then(farmer => {
                    setFarmerList(farmer);
                    setFarmerListUpdated(false);
                }).catch(f => console.log(f));


            setUpdate(false);

        }
    }, [update]);

    useEffect(() => {
        if (!farmerListUpdated && !productByFarmerListUpdated)
            setLoading(false);

    }, [farmerListUpdated, productByFarmerListUpdated]);

    if (!loading)
        return <ProductTableWrapped users={props.userList} triggerUpdate={triggerUpdate} productByFarmer={productByFarmerList} farmers={farmerList} isLoggedIn={props.isLoggedIn} user={props.user} />;
    else return "";
}


function ProductTableWrapped(props) {
    console.log("quantirendering?!");

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
                handleCartCheckoutModalClose();
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


                    props.user.Role === "Employee" ? <Row className="mt-3 margine-cerca-desktop">

                        <Col> <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        </Col>
                        <Col xs={3} sm={2} md={2} lg={1} xl={1} xxl={1} style={{textAlign: 'right'}}>
                            <AvailableAmountButton user={props.user} isLoggedIn={props.isLoggedIn} selectedUser={selectedUser} />
                        </Col>
                    </Row>
                        : ""

                    : ""}
                <OrderConfirmedModal user={props.user} isLoggedIn={props.isLoggedIn} selectedUser={selectedUser} prodNum={prodNum} order={insertedOrder} showConfirm={showConfirm} handleCloseConfirm={handleCloseConfirm} />
                <ErrorModal showError={showError} handleCloseError={handleCloseError} />
                <CartCheckoutModal user={props.user} isLoggedIn={props.isLoggedIn} selectedUser={selectedUser} prodNum={prodNum} submitOrder={submitOrder} order={insertedOrder} cartCheckoutModal={cartCheckoutModal} handleCartCheckoutModalClose={handleCartCheckoutModalClose} />

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

            {props.isLoggedIn ? <CartBottomButton isLoggedIn={props.isLoggedIn} user={props.user} selectedUser={selectedUser} handleCartCheckoutModalShow={handleCartCheckoutModalShow} prodNum={prodNum} /> : ""}
        </>
    );
};

function AvailableAmountButton(props) {
    let wallet = GetWallet(props.isLoggedIn, props.user, props.selectedUser);
    if (wallet === false) {
        wallet = "€0.00";
    }
    else
        wallet = "€" + wallet.toFixed(2);

    if (props.isLoggedIn)
        return (
            <Button disabled variant="secondary">{wallet}</Button>
        );
    else
        return ""

}

function GetWallet(isLoggedIn, user, selectedUser) {
    if (isLoggedIn) {
        if (user.Role !== "Employee")
            return user.Wallet
        else
            if (selectedUser.length > 0)
                return selectedUser[0].Wallet
    }

    return false;
}

function CartBottomButton(props) {
    let wallet = GetWallet(props.isLoggedIn, props.user, props.selectedUser);

    let total = 0;
    props.prodNum.forEach(p => p.number > 0 ? total += p.number * p.Price : "")
    if (wallet !== false)
        return (
            <Button variant={total > wallet ? "danger" : "secondary"} className="fixed-button-bottom" onClick={props.handleCartCheckoutModalShow}>
                <Cart4 size={25} />
                <span>&nbsp;</span> €{total.toFixed(2)} </Button>
        );
    else
        return "";
}

function OrderConfirmedModal(props) {
    let tot = 0;
    props.prodNum.map(p => tot += p.number * p.Price);
    let wallet = GetWallet(props.isLoggedIn, props.user, props.selectedUser) - tot;

    return (
        <Modal show={props.showConfirm} onHide={props.handleCloseConfirm} autoFocus={true} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Order submitted! 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>Updated wallet amount: €{wallet}
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
    let wallet = GetWallet(props.isLoggedIn, props.user, props.selectedUser);
    return (
        <Modal show={props.cartCheckoutModal} onHide={props.handleCartCheckoutModalClose} autoFocus={true} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title>Checkout cart 🛒</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.prodNum.map(p => p.number !== 0 ? <ProductList key={"ord" + p.ProductID + p.FarmerID} product={p} /> : "")}
            </Modal.Body>
            <Modal.Footer>
                <Col><Button onClick={props.submitOrder} disabled={(wallet < total || !props.prodNum.some(p => p.number > 0)) ? true : false} variant={wallet < total ? "danger" : "success"}>{wallet < total ? "Insufficient funds" : "Submit Order"}</Button></Col>
                <Col style={{ textAlign: 'right', marginRight: '18px' }}>Total €{total.toFixed(2)}</Col>
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
                                )
                                )
                                }
                                {p.length === 2 ? <> <Col> </Col> </> : ''}
                                {p.length === 1 ? <> <Col> </Col> <Col> </Col> </> : ''}
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

    const [showDesc, setShowDesc] = useState(false);
    const handleCloseDesc = () => setShowDesc(false);
    const handleShowDesc = () => setShowDesc(true);

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
                        onClick={handleShowDesc}>
                        See Description
                    </Button></Col>
                    {props.isLoggedIn ? <Col><ProductsCounter unfilteredProductByFarmer={props.unfilteredProductByFarmer} UpdateNumber={props.UpdateNumber} prodNum={props.prodNum} productByFarmer={props.productByFarmer} prodottoDelFarmer={props.prodottoDelFarmer} Quantity={props.prodottoDelFarmer.Quantity} ProductID={props.prodottoDelFarmer.ProductID} FarmerID={props.prodottoDelFarmer.FarmerID} /></Col> : ""}
                </Row>
                <Modal show={showDesc} onHide={handleCloseDesc} centered size="lg">
                    <DescriptionModal handleCloseDesc={handleCloseDesc} prodotto={props.prodottoDelFarmer} imgProd={newSrc} />
                </Modal>
            </Card.Footer>
        </Card >
    );
}

function DescriptionModal(props) {
    return (<>
        <Modal.Body>
            <Container>
                <Row style={{ textAlign: "center" }}>
                    <h3>{props.prodotto.NameProduct}</h3>
                </Row>
                <Row className="mt-2">
                    <Col style={{ textAlign: "center", display: "block", marginBottom: "auto", marginTop: "auto" }}><Image style={{ maxHeight: "300px", maxWidth: "300px" }} src={props.imgProd} /></Col>
                    <Col>
                        <Row className="justify-content-center desc-mobile-margin">
                            <ListGroup>
                                <ListGroup.Item><p>{props.prodotto.Description}</p></ListGroup.Item>
                            </ListGroup>
                        </Row>
                    </Col>
                </Row>
            </Container>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseDesc}>
                Close
            </Button>
        </Modal.Footer>
    </>
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
