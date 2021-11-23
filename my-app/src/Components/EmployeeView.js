import API from '../API';
import {useState, useEffect} from 'react';
import {Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Image, ButtonGroup} from 'react-bootstrap';
import {PersonFill, GeoAltFill, ClockFill} from 'react-bootstrap-icons';
import "./EmployeeView.css";
import {Typeahead} from "react-bootstrap-typeahead";

function EmployeeView(props) {
    const [ordersList, setOrdersList] = useState([]);
    const [ordersListSearch, setOrdersListSearch] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);
    const [orderStatusSelected, setOrderStatusSelected] = useState('all');
    const [orderClientSelected, setOrderClientSelected] = useState('');

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

    useEffect(() => {
        if (orderClientSelected !== '') {
            setOrdersListSearch(ordersList
                .filter(item => {
                    if (orderStatusSelected === 'all')
                        return true;
                    else
                        return item.Status === orderStatusSelected;
                })
                .filter(item => {
                    let name = orderClientSelected.split(' ')[0];
                    let surname = orderClientSelected.split(' ')[1];
                    return item.Name === name && item.Surname === surname;
                }));
        } else {
            setOrdersListSearch(ordersList
                .filter(item => {
                    if (orderStatusSelected === 'all')
                        return true;
                    else
                        return item.Status === orderStatusSelected;
                }));
        }


    }, [orderStatusSelected, orderClientSelected])

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
                    setOrderStatusSelected={setOrderStatusSelected}
                    setOrderClientSelected={setOrderClientSelected}/>
                <Col>
                    <Table className="d-flex justify-content-center">
                        <tbody id="employee-table" align="center">
                        {
                            ordersListSearch
                                .filter(order => {
                                    if (orderStatusSelected === 'all') {
                                        return true;
                                    } else {
                                        return order.Status === orderStatusSelected;
                                    }
                                })
                                .slice(0).reverse().map(o => <OrderRow order={o}/>)
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
}


const ostat = {
    'o': 'open',
    'p': 'pending',
    'c': 'closed'
}

function OrderRow(props) {
    let [stat, setStat] = useState(props.order.Status || 'o');


    let buttonstatus;
    // let stat;
    if (props.order.Status === "open") {
        stat = 'o';
        buttonstatus = "outline-primary";
    } else if (props.order.Status === "pending") {
        buttonstatus = "outline-danger";
        stat = 'p';
    } else if (props.order.Status === "closed") {
        buttonstatus = "outline-success";
        stat = 'c';
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
                                <Col className="ridotto-mobile">{props.order.Name} {props.order.Surname}</Col>
                                <Col className="ridotto-mobile">{props.order.Timestamp}</Col>
                                <Col className="ridotto-mobile">{props.order.Address}, {props.order.State}</Col>
                            </Row>
                        </Row>

                        {props.order.ProductInOrder.map(p => (
                            <ProductList product={p}/>
                        ))}

                        <Row className="mt-4 mb-3 align-items-center">
                            <Col>
                                <h1 style={{fontSize: 15, marginTop: 10}}>Total: €25</h1>
                            </Col>
                            <Col>
                                <Button onClick={() => {

                                    if (stat === 'o') {
                                        props.order.Status = "pending";
                                        setStat('p');
                                        API.modifyOrderStatus(props.order);


                                    }
                                    if (stat === 'p') {
                                        props.order.Status = "closed";
                                        setStat('c');
                                        API.modifyOrderStatus(props.order);

                                    }
                                    if (stat === 'c') {
                                        props.order.Status = "closed";
                                        setStat('c');
                                    }
                                    API.modifyOrderStatus(props.order);


                                }} variant={buttonstatus} size="sm">
                                    {ostat[stat]}


                                </Button>
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
                Price: €{props.product.Price.toFixed(2)}
            </Col>
        </Row>


    );
}

function Sidebar(props) {

    const allActive = props.orderStatusSelected === 'all' ? 'active' : '';
    const openActive = props.orderStatusSelected === 'open' ? 'active' : '';
    const pendingActive = props.orderStatusSelected === 'pending' ? 'active' : '';
    const closedActive = props.orderStatusSelected === 'closed' ? 'active' : '';
    const clientsActive = props.orderStatusSelected === 'clients' ? 'active' : '';

    return (
        <Col
            className='sfondosidebar collapse d-sm-block col col-3 below-nav'
            id="left-sidebar"
            style={{minHeight: '100vh'}}
            sticky='left'>
            <ListGroup variant="flush">
                <Form.Group>
                    <Typeahead
                        className='my-2 ml-2'
                        id="basic-typeahead-single"
                        labelKey={(option) => `${option}`}
                        options={props.ordersList
                            .map(item => [item.Name, item.Surname].join(" "))
                            .filter((item, index, self) => self.indexOf(item) === index)}
                        placeholder="Search by client"
                        onChange={selected => {
                            if (selected.length > 0)
                                props.setOrderClientSelected(selected[0]);
                            else
                                props.setOrderClientSelected('');
                        }}
                    />
                </Form.Group>
                <ListGroup.Item className='border-0'>
                    <div style={{fontSize: 20}}><b>Orders</b></div>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + allActive} action
                                onClick={() => props.setOrderStatusSelected('all')}>
                    All
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
                <ListGroup.Item className='border-0 mt-2 '>
                    <div style={{fontSize: 20}}><b>Clients</b></div>
                </ListGroup.Item>
                <ListGroup.Item className={'border-0 ' + clientsActive} action
                                onClick={() => props.setOrderStatusSelected('clients')}>
                    <div>All</div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
}

export {ProductList, EmployeeView};
