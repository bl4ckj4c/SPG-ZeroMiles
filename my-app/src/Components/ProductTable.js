import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill, TypeH1, Collection, Bag, Cash } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem, Form, Button, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./ProductTable.css";
import API from '../API';

let prodNum = [];

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

    const [selectedUser, setSelectedUser] = useState([]);
    if (prodNum.length <= 0)
        for (let i = 0; i < props.productByFarmer.length; i++) {
            prodNum.push({ "number": 0, "ProductID": props.productByFarmer[i].ProductID, "FarmerID": props.productByFarmer[i].FarmerID, "NameProduct": props.productByFarmer[i].NameProduct })
        }

    //this function updates the number in the array, also allows to display the current number in the counter
    function updateNumber(ProductID, FarmerID, sign) {
        let i = props.productByFarmer.findIndex(p => (p.ProductID === ProductID && p.FarmerID === FarmerID))

        if (i === -1)
            return 0;
        else if ((sign === -1 && prodNum[i].number !== 0) || (sign === +1 && prodNum[i].number < props.productByFarmer[i].Quantity))
            prodNum[i].number += sign;

        return prodNum[i].number;
    }


    async function submitOrder() {


        try {
            let items = prodNum.filter(p => p.number !== 0);
            if (items.length > 0 && selectedUser.length > 0) {
                let object = {
                    "UserID": selectedUser[0].UserID,
                    "items": items
                }

                let res = await API.addOrder(object);
                console.log("order submitted: "+res.msg);
            }
        }
        catch (err) {
         console.log("errore: "+err);
            //   handleError(err);
        }

    }

    console.log("quantirendering!");


    return (
        <>
            <Container >
                <Row className="mt-3 row-style">
                    <Col>
                        <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={1} xl={1} xxl={1}>
                        <Button onClick={submitOrder} variant="secondary">Submit</Button>
                    </Col>
                </Row>
            </Container>

            <Col className="justify-content-center">
                <Table className="d-flex justify-content-center">
                    <tbody id="farmer-table" align="center">
                        {props.farmers.map(f =>
                            <FarmerRow farmer={f} productByFarmer={props.productByFarmer} updateNumber={updateNumber} />
                        )}
                    </tbody>
                </Table>
            </Col>
        </>
    );
};


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
                                    <ProductCard prodottoDelFarmer={pf} updateNumber={props.updateNumber} />
                                </Col>
                            ))}
                        </Row>
                    ))}

                </Container>
            </td>
        </tr>
    </>
    );
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
                    <Col><ProductsCounter Quantity={props.prodottoDelFarmer.Quantity} ProductID={props.prodottoDelFarmer.ProductID} FarmerID={props.prodottoDelFarmer.FarmerID} updateNumber={props.updateNumber} /></Col>
                </Row>
                <Collapse style={{ marginTop: "10px", fontSize: 13 }} in={open}>
                    <div>{props.prodottoDelFarmer.Description}</div>
                </Collapse>
            </Card.Footer>
        </Card>
    );
}


function ProductsCounter(props) {
    const [number, setNumber] = useState(0)

    function updateIndex(sign) {
        let i = props.updateNumber(props.ProductID, props.FarmerID, sign);
        setNumber(i);
    }
    return (
        <ButtonGroup>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled={props.Quantity === 0 ? true : false } variant='warning' onClick={() => updateIndex(-1)}>
                -
            </ToggleButton>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled variant="warning">
                {number}
            </ToggleButton>
            <ToggleButton style={{ maxHeight: "2.2rem", fontSize: 15 }} disabled={props.Quantity === 0 ? true : false } variant="warning" onClick={() => updateIndex(+1)} >
                +
            </ToggleButton>
        </ButtonGroup>
    );
}

export default ProductTable;
