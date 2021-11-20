import API from '../API';
import {useState, useEffect} from 'react';
import {Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Image} from 'react-bootstrap';
import { PersonFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';
import { User } from '../Orders/Orders.js';
import "./EmployeeView.css";

function EmployeeView(props) {
    const [ordersList, setOrdersList] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);
    const [orderStatusSelected, setOrderStatusSelected] = useState('Open');

    useEffect(() => {
        API.getOrders()
            .then(orders => {
                setOrdersList(orders);
                setOrdersListUpdated(false);
            }).catch(o => handleErrors(o));
    }, []);

    useEffect(() => {
        if (ordersListUpdated === true) {
            API.getOrders()
                .then(orders => {
                    setOrdersList(orders);
                    setOrdersListUpdated(false);
                }).catch(o => handleErrors(o));
        }
    }, [ordersListUpdated]);

    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/ }
        console.log(err);
    }

    return (
        <>
            <Sidebar orderStatusSelected={orderStatusSelected} setOrderStatusSelected={setOrderStatusSelected}/>
            <Row>
                <Table className="d-flex justify-content-center">
                    <tbody id="employee-table" align="center">
                    {ordersList.map(o =>
                        <OrderRow order={o}/>
                    )}
                    </tbody>
                </Table>
            </Row>
        </>
    );
}

function OrderRow(props) {
    //new User (user);

    //props.users.map(u => u.UserId === order.ClientId ? user=u : '')

    console.log(props.order);

    let buttonstatus;

    if (props.order.Status === "open") {
        buttonstatus = "outline-primary";
    } else if (props.order.Status === "pending") {
        buttonstatus = "outline-secondary";
    } else if (props.order.Status === "completed") {
        buttonstatus = "outline-success";
    }

    return (
        <>
            <tr>
                <td>

                    <Container>

                        <Row className="mt-2">
                            <h1 style={{ fontSize: 25 }} align={"left"}>Order #{props.order.OrderID}</h1>
                        </Row>

                        <Row className="mb-3 sfondoriga">
                        <Row>
                            <Col><PersonFill /></Col>
                            <Col><ClockFill /></Col>
                            <Col><GeoAltFill /></Col>
                        </Row>

                        <Row className="mb-1">
                            <Col>{props.order.Name} {props.order.Surname}</Col>
                            <Col>{props.order.Timestamp}</Col>
                            <Col>{props.order.Address}, {props.order.State}</Col>
                        </Row>
                        </Row>

                        {props.order.ProductInOrder.map(p => (
                            <ProductList product={p} />
                        ))}

                        <Row className="mb-3 align-items-center">
                            <Col>
                                <h1 style={{ fontSize: 15, marginTop: 10 }}>Total: 25€</h1>
                            </Col>
                            <Col>
                                <Button variant={buttonstatus} size="sm" >{props.order.Status}</Button>
                            </Col>
                        </Row>

                    </Container>
                </td>
            </tr>
        </>
    );
}

function ProductList(props) {

    let newSrc = "https://filer.cdn-thefoodassembly.com/photo/" + props.product.ImageID + "/view/large"

    return (

        <Row className="mb-2 align-items-center">
            <Col>
                <Image src={newSrc} height={"60 px"} rounded />
            </Col>
            <Col>
                <center>{props.product.NameProduct}</center>
            </Col>
            <Col>
                Quantity: {props.product.number}
            </Col>
            <Col>
                Price: €{props.product.Price}
            </Col>
        </Row>


    );
}

function Sidebar(props) {
    return (
        <Col
            className='collapse d-sm-block col-sm-4 col-12 below-nav bg-light'
            id="left-sidebar"
            style={{height: '100vh'}}>
            <ListGroup variant="flush">
                <Form className="d-flex my-2">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-warning" size='sm'>Search</Button>
                </Form>
                <ListGroup.Item className='border-0'>
                    <div style={{fontSize: 20}}><b>Orders</b></div>
                </ListGroup.Item>
                <ListGroup.Item className='border-0' action href='#open'>
                    Open
                </ListGroup.Item>
                <ListGroup.Item className='border-0' action href='#pending'>
                    Pending
                </ListGroup.Item>
                <ListGroup.Item className='border-0' action href='#closed'>
                    Closed
                </ListGroup.Item>
                <ListGroup.Item className='mt-2' action href='#clients'>
                    <div style={{fontSize: 20}}><b>Clients</b></div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}

export default EmployeeView;
