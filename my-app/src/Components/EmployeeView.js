import API from '../API';
import {useState, useEffect} from 'react';
import {Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Image, ButtonGroup} from 'react-bootstrap';
import {PersonFill, GeoAltFill, ClockFill} from 'react-bootstrap-icons';
import {User} from '../Orders/Orders.js';
import "./EmployeeView.css";
import {Typeahead} from "react-bootstrap-typeahead";

function EmployeeView(props) {
    const [ordersList, setOrdersList] = useState([]);
    const [ordersListSearch, setOrdersListSearch] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);
    const [orderStatusSelected, setOrderStatusSelected] = useState('open');

    useEffect(() => {
        API.getOrders()
            .then(orders => {
                setOrdersList(orders);
                setOrdersListSearch(orders);
                setOrdersListUpdated(false);
            }).catch(o => handleErrors(o));
    }, []);

    useEffect(() => {
        if (ordersListUpdated === true) {
            API.getOrders()
                .then(orders => {
                    setOrdersList(orders);
                    setOrdersListSearch(orders);
                    setOrdersListUpdated(false);
                }).catch(o => handleErrors(o));
        }
    }, [ordersListUpdated]);

    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    return (
        <>
            <Row>
                <Sidebar
                    ordersList={ordersList}
                    ordersListSearch={ordersListSearch}
                    setOrderListSearch={setOrdersListSearch}
                    setOrderListUpdated={setOrdersListUpdated}
                    orderStatusSelected={orderStatusSelected}
                    setOrderStatusSelected={setOrderStatusSelected}/>
                <Col>
                    <Table className="d-flex justify-content-center">
                        <tbody id="employee-table" align="center">
                        {ordersListSearch
                            .filter((order, index) => {
                                return order.Status === orderStatusSelected;
                            })
                            .map(o =>
                                <OrderRow order={o}/>
                            )}
                        </tbody>
                    </Table>
                </Col>
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
                            <h1 style={{fontSize: 25}} align={"left"}>Order #{props.order.OrderID}</h1>
                        </Row>

                        <Row className="mb-3 sfondoriga">
                            <Row>
                                <Col><PersonFill/></Col>
                                <Col><ClockFill/></Col>
                                <Col><GeoAltFill/></Col>
                            </Row>

                            <Row className="mb-1">
                                <Col>{props.order.Name} {props.order.Surname}</Col>
                                <Col>{props.order.Timestamp}</Col>
                                <Col>{props.order.Address}, {props.order.State}</Col>
                            </Row>
                        </Row>

                        {props.order.ProductInOrder.map(p => (
                            <ProductList product={p}/>
                        ))}

                        <Row className="mb-3 align-items-center">
                            <Col>
                                <h1 style={{fontSize: 15, marginTop: 10}}>Total: 25€</h1>
                            </Col>
                            <Col>
                                <Button variant={buttonstatus} size="sm">{props.order.Status}</Button>
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
                <Image src={newSrc} height={"60 px"} rounded/>
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

    const openActive = props.orderStatusSelected === 'open' ? 'active' : '';
    const pendingActive = props.orderStatusSelected === 'pending' ? 'active' : '';
    const closedActive = props.orderStatusSelected === 'closed' ? 'active' : '';
    const clientsActive = props.orderStatusSelected === 'clients' ? 'active' : '';

    function ManageSearch(text) {
        props.setOrderListSearch(props.ordersList.filter(p => p.OrderID.toLowerCase().startsWith(text.trim().toLowerCase())));
    }


    return (
        <Col
            className='collapse d-sm-block col col-3 below-nav bg-light'
            id="left-sidebar"
            style={{height: '100vh'}}>
            <ListGroup variant="flush">
                <Form
                    className='m-2'
                    onSubmit={(event) => event.preventDefault()}>
                    <Form.Control
                        placeholder="Search by order ID"
                        type='text'
                        value={props.username}
                        onChange={(event) => {
                            ManageSearch(event.target.value)
                        }}/>
                </Form>
                {/*<Form.Group>
                    <Typeahead
                        filterBy={['OrderID', 'Name', 'Surname', 'Timestamp']}
                        id="basic-typeahead-single"
                        labelKey={(option) => `${option.OrderID}`}
                        options={props.ordersList}
                        placeholder="Search a product..."
                        onChange={selected => props.setOrderListSearch(selected)}
                        onInputChange={(text, event) => {
                            if(text === '') {
                                props.setOrderListUpdated(true);
                            }
                        }}
                    />
                </Form.Group>*/}
                {/*<Form className="d-flex my-2">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-warning" size='sm'>Search</Button>
                </Form>*/}
                <ListGroup.Item className='border-0'>
                    <div style={{fontSize: 20}}><b>Orders</b></div>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + openActive} action
                                onClick={() => props.setOrderStatusSelected('open')}>
                    Open
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + pendingActive} action
                                onClick={() => props.setOrderStatusSelected('pending')}>
                    Pending
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + closedActive} action
                                onClick={() => props.setOrderStatusSelected('closed')}>
                    Closed
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 mt-2 ' + clientsActive} action
                                onClick={() => props.setOrderStatusSelected('clients')}>
                    <div style={{fontSize: 20}}><b>Clients</b></div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}

export default EmployeeView;
