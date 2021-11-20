import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Col } from 'react-bootstrap';
import { User } from '../Orders/Orders.js';

function EmployeeView(props) {
    const [ordersList, setOrdersList] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);

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
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="employee-table" align="center">
                    {ordersList.map(o =>
                        <OrderRow order={o}/>
                    )}
                </tbody>
            </Table>
        </Col>
    );
}

function OrderRow(props) {
    //new User (user);

    //props.users.map(u => u.UserId === order.ClientId ? user=u : '')

    return (
        <></>
    );
}

export default EmployeeView;
