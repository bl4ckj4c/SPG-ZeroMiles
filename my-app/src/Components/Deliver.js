import API from '../API';
import {useState, useEffect, useCallback} from 'react';
import {Table, Row, Col, Form, ListGroup, Spinner, Card, Modal,Image, Button, Container} from 'react-bootstrap';
import {PersonCircle, GeoAltFill, MapFill, WalletFill,PersonFill, ClockFill} from 'react-bootstrap-icons';
import "./ClientView.css";
import { useLocation } from 'react-router-dom';
import "./ClientOrders.css";
import {useDropzone} from 'react-dropzone'
//import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';


import "react-datepicker/dist/react-datepicker.css";

function Deliver(props) {
    const [address, setAddress] = useState('');
    const [dateDelivery, setDateDelivery] = useState(new Date());
    const [timeDelivery, setTimeDelivery] = useState('');
    const [orderId, setOrderId] = useState('');
    const [modalShowProductNew, setModalShowProductNew] = useState(false);
    const [ordersList, setOrdersList] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        setLoading(true);
        API.getClientOrders()
            .then(orders => {
                setOrdersList(orders);
                setOrdersListUpdated(false);
                setLoading(false);
            }).catch(o => handleErrors(o));
    }, []);

    useEffect(() => {
        if (ordersListUpdated === true) {
            setLoading(true);
            API.getClientOrders()
                .then(orders => {
                    setOrdersList(orders);
                    setOrdersListUpdated(false);
                    setLoading(false);
                }).catch(o => handleErrors(o));
        }
    }, [ordersListUpdated]);


    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    async function submitDelivery() {


/*         let objectDelivery = {
            "address": address,
            "date": dateDelivery,
            "time": timeDelivery
        }
        let res = await API.createDelivery(objectDelivery);
        console.log(objectDelivery); */
    }

    return (
        <>
            {
                <>
                    <Col className="mt-3">
                        <Table className="d-flex justify-content-center">
                            <tbody id="client-table" align="center">
                            <DeliveryBottom  onShow={() => setModalShowProductNew(true)}/>
                            <ModalDeliveryNew
                                        setAddress={setAddress}
                                        setDateDelivery={setDateDelivery}
                                        setTimeDelivery={setTimeDelivery}
                                        submitDelivery={submitDelivery}
                                        show={modalShowProductNew}
                                        onHide={() => setModalShowProductNew(false)}/>
                            </tbody>
                        </Table>
                    </Col>

                    

                </>
            }



{loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
            </Row > </> :
                <>
                    <Row>
                        <Col>
                            <Table className="d-flex justify-content-center">
                                <tbody id="employee-table" align="center">

                                    {ordersList.length > 0 ? ordersList.slice(0).reverse().map(o => 
                                        <OrderRow order={o} onShow={() => setModalShowProductNew(true)}/>
                                    ) : <NoOrders/>
                                    } 

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            }



        </>
    );
}
const ostat = {
    'o': 'open',
    'p': 'pending',
    'c': 'closed'
}
function DeliveryBottom(props) {
    return (
        <>
            <Button onClick={props.onShow}>Schedule delivery</Button>
        </>
    );
}

const DateDeliveryRow = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (                                   
      <DatePicker selected={startDate}
       onChange={(date) => setStartDate(date)}
       onChange={(date) => props.setDateDelivery(date)}
       />
    );
  };

  const TimeDeliveryRow = (props) => {
    const [value, onChange] = useState('10:00');
  
    return (
      <div>
        <TimePicker
          onChange={onChange}
          onChange={(time) => props.setTimeDelivery(time)}
          value={value}
        />
      </div>
    );
  };



function ModalDeliveryNew(props) {

    return (
        <Modal show={props.show} onHide={props.onHide} size="md" aria-labelledby="contained-modal-title-vcenter"
               centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Schedule delivery
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => props.submitDelivery(e)} controlId="my-form">
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label className="label">Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address"
                                      onChange={(e) => props.setAddress(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dateDelivery">
                        <Form.Label className="label">Date for delivery</Form.Label>
                   <DateDeliveryRow setDateDelivery={props.setDateDelivery} ></DateDeliveryRow>
                   </Form.Group>
                   <Form.Group className="mb-3" controlId="timeDelivery">
                        <TimeDeliveryRow setTimeDelivery={props.setTimeDelivery} />
                  </Form.Group>
                    
                    <Button onClick={props.submitDelivery} variant="success">Create</Button>
                    {' '}{' '}
                    <Button variant='danger' onClick={props.onHide}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}



function OrderRow(props) {

    let buttonstatus;
    let buttonDeliveryDisabled ="true";
    if (props.order.Status === "open") {
        buttonstatus = "outline-primary";
        buttonDeliveryDisabled ="false";
    } else if (props.order.Status === "pending") {
        buttonstatus = "outline-danger";
    } else if (props.order.Status === "closed") {
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
                                <Col className="ridotto-mobile">{props.order.Name} {props.order.Surname}</Col>
                                <Col className="ridotto-mobile">{props.order.Timestamp}</Col>
                                <Col className="ridotto-mobile">{props.order.Address}, {props.order.State}</Col>
                            </Row>
                        </Row>

                        {props.order.ProductInOrder.map(p => (
                            <ProductList product={p} />
                        ))}

                        <Row className="mt-4 mb-3 align-items-center">
                            <Col>
                                <h1 style={{fontSize: 15, marginTop: 10}}>Total: €{props.order.ProductInOrder.reduce((sum, p) => {return sum + parseInt(p.number)* parseInt(p.Price)},0)}</h1>
                            </Col>
                            <Col>
                                <Button variant={buttonstatus} size="sm" disabled> {props.order.Status} </Button>
                            </Col>
                            <Col>
                                <Button variant={buttonstatus} size="sm" onClick={props.onShow} disable={buttonDeliveryDisabled}>Delivery</Button>
                               
                            </Col>
                        </Row>

                    </Container>
                </td>
            </tr>
        </>
    );
}


function ProductList(props) {

    let newSrc = "http://localhost:3001/images/" + props.product.ImageID + ".png"

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
                Price: €{props.product.Price.toFixed(2)}
            </Col>
        </Row>
    );
}

function NoOrders() {
    return (
        <tr>
            <td>
                <h3 className="mt-5 mb-5">You have no orders yet</h3>
            </td>
        </tr>
    );
}






export default Deliver;
