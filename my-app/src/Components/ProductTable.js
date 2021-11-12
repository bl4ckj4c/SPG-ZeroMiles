import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill, TypeH1 } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem, Form, Button, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import "./ProductTable.css";

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
    // Here I create an array that contains all the product ids and the number of ordered products. I initialized it to zero.

    const [selectedUser, setSelectedUser] = useState([]);
    if (prodNum.length <= 0)
        for (let i = 0; i < props.productByFarmer.length; i++) {
            prodNum.push({ "number": 0, "ProductID": props.productByFarmer[i].ProductID, "FarmerID": props.productByFarmer[i].FarmerID, "NameProduct" : props.productByFarmer[i].NameProduct })
        }

    //this function updates the number in the array, also allows to display the current number in the counter
    function updateNumber(ProductId, sign) {
        let i = props.productByFarmer.findIndex(p => p.ProductID === ProductId)
        if (i === -1)
            return 0;
        else if ((sign === -1 && prodNum[i].number !== 0) || (sign === +1 && prodNum[i].number < props.productByFarmer[i].Quantity))
            prodNum[i].number += sign;

        return prodNum[i].number;
    }


    function submitOrder() {

        let items = prodNum.filter(p => p.number !== 0);
        if (items.length > 0 && selectedUser.length > 0) {
            let object = {
                "UserID": selectedUser[0].UserID,
                "items": items
            }
            console.log(object);
        }
    }

    return (
        <>
            <Container>
                <Row className="mt-3">
                    <Col>
                        <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                    </Col>
                    <Col>
                        <Button onClick={submitOrder}>Submit</Button>
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
    console.log("quantirendering!");

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
        <Card style={{ width: '21rem' }}>
            <Card.Img variant="top" className="cover" src={newSrc} />
            <Card.Body>
                <Card.Title>{props.prodottoDelFarmer.NameProduct}</Card.Title>
                <Card.Text>
                    <Button variant="light"
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}>
                        See Description
                    </Button>
                    <Collapse style={{marginTop:"10px"}} in={open}>
                        <div>{props.prodottoDelFarmer.Description}</div>
                    </Collapse>
                </Card.Text>
            </Card.Body>
            <ListGroup horizontal className="list-group-flush justify-content-center">
                <ListGroupItem>Available: {props.prodottoDelFarmer.Quantity}</ListGroupItem>
                <ListGroupItem>Unit: {props.prodottoDelFarmer.UnitOfMeasurement}</ListGroupItem>
                <ListGroupItem>Price: {props.prodottoDelFarmer.Price}€</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <ProductsCounter ProductId={props.prodottoDelFarmer.ProductID} updateNumber={props.updateNumber} />
            </Card.Body>
        </Card>
    );
}


function ProductsCounter(props) {
    const [number, setNumber] = useState(0)

    function updateIndex(sign) {
        let i = props.updateNumber(props.ProductId, sign);
        setNumber(i);
        console.log(i);
    }
    return (
        <ButtonGroup>
            <ToggleButton style={{ minWidth: "2.5rem" }} variant='light' onClick={() => updateIndex(-1)}>
                -
            </ToggleButton>
            <ToggleButton style={{ minWidth: "3rem" }} disabled variant="light">
                {number}
            </ToggleButton>
            <ToggleButton style={{ minWidth: "2.5rem" }} variant="light" onClick={() => updateIndex(+1)} >
                +
            </ToggleButton>
        </ButtonGroup>
    );
}

export default ProductTable;
