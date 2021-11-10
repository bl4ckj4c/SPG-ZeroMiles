import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { PersonFill, GeoAltFill } from 'react-bootstrap-icons';
import { Image, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useState } from 'react';
import "./ProductTable.css";

function ProductTable(props) {
    // Here I create an array that contains all the product ids and the number of ordered products. I initialized it to zero.
    let prodNum = [];
    for (let i = 0; i < props.productByFarmer.length; i++) {
        prodNum.push({ "number": 0, "pID": props.productByFarmer[i].ProductID })
    }
    console.log(prodNum);

    //this function updates the number in the array, also allows to display the current number in the counter
    function updateNumber(pID, sign) {
        let i = props.productByFarmer.findIndex(p => p.ProductID === pID)
        if (i === -1)
            return 0;
        else if ((sign === -1 && prodNum[i].number !== 0) || (sign === +1 && prodNum[i].number < props.productByFarmer[i].Quantity))
            prodNum[i].number += sign;

        return prodNum[i].number;
    }

    function filterSubmit() { //deletes items not selected
        let submitData = prodNum.filter(p => p.number !== 0);
        return submitData;
    }

    return (
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="farmer-table" align="center">
                    {props.farmers.map(f =>
                        <FarmerRow farmer={f} productByFarmer={props.productByFarmer} updateNumber={updateNumber} />
                    )}
                </tbody>
            </Table>

        </Col>
    );
};


function FarmerRow(props) {
    console.log("quantirendeding");

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

                    <Row>
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
    return (
        <Card style={{ width: '21rem' }}>
            <Card.Img variant="top" src="/images/placeholder2.jpg" />
            <Card.Body>
                <Card.Title>{props.prodottoDelFarmer.NameProduct}</Card.Title>
                <Card.Text>{props.prodottoDelFarmer.Description}</Card.Text>
            </Card.Body>
            <ListGroup horizontal className="list-group-flush justify-content-center">
                <ListGroupItem>Available: {props.prodottoDelFarmer.Quantity}</ListGroupItem>
                <ListGroupItem>Unit: {props.prodottoDelFarmer.UnitOfMeasurement}</ListGroupItem>
                <ListGroupItem>Price: {props.prodottoDelFarmer.Price}€</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <ProductsCounter pID={props.prodottoDelFarmer.ProductID} updateNumber={props.updateNumber} />
            </Card.Body>
        </Card>
    );
}


function ProductsCounter(props) {
    const [number, setNumber] = useState(0)

    function updateIndex(sign) {
        let i = props.updateNumber(props.pID, sign);
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
