import API from '../API';
import {useState, useEffect} from 'react';
import {Table, Row, Col, ListGroup, Container, FormControl, Form, Button} from 'react-bootstrap';
import {User} from '../Orders/Orders.js';
import {Link} from "react-bootstrap-icons";
import Navbar from "./Navbar";

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
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
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

    return (
        <></>
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
