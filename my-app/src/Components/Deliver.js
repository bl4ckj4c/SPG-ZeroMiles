import API from '../API';
import { useState, useEffect, useCallback } from 'react';
import { Table, Row, Col, Form, ListGroup, Spinner, Card, Modal, Image, Button, Container } from 'react-bootstrap';
import { PersonCircle, GeoAltFill, MapFill, WalletFill, PersonFill, ClockFill } from 'react-bootstrap-icons';
import "./ClientView.css";
import { useLocation } from 'react-router-dom';
import "./ClientOrders.css";
import { useDropzone } from 'react-dropzone'
//import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';


import "react-datepicker/dist/react-datepicker.css";

function Deliver(props) {
    const [address, setAddress] = useState('');
    const [dateDelivery, setDateDelivery] = useState(new Date());
    const [timeDelivery, setTimeDelivery] = useState('');
    const [modalShowProductNew, setModalShowProductNew] = useState(false);

    async function submitDelivery() {
        var datestring = dateDelivery.getMonth() + 1 + "-" + (dateDelivery.getDate()) + "-" + dateDelivery.getFullYear()
        datestring = datestring + " " + timeDelivery
        datestring = datestring + ":00" //Add the seconds to the datetime delivery
        let objectDelivery = {
            "OrderID": props.orderId,
            "DeliveryPlace": address,
            "DeliveryDate": datestring
        }
        let res = await API.modifyDelivery(objectDelivery);
        console.log(objectDelivery);
        console.log(res);
        setModalShowProductNew(false)
    }




    return (
        <>
            {
                <>
                    <DeliveryBottom onShow={() => setModalShowProductNew(true)} />
                    <ModalDeliveryNew
                        setAddress={setAddress}
                        setDateDelivery={setDateDelivery}
                        setTimeDelivery={setTimeDelivery}
                        submitDelivery={submitDelivery}
                        show={modalShowProductNew}
                        onHide={() => setModalShowProductNew(false)} />



                </>
            }
        </>
    );
}




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
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label className="label">Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address"
                                    onChange={(e) => props.setAddress(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="dateDelivery">
                                <Form.Label className="label">Date for delivery</Form.Label>
                                <DateDeliveryRow setDateDelivery={props.setDateDelivery} ></DateDeliveryRow>
                                <TimeDeliveryRow setTimeDelivery={props.setTimeDelivery} ></TimeDeliveryRow>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant='secondary' onClick={props.onHide}>Close</Button>
                    {' '}{' '}
                    <Button onClick={props.submitDelivery} variant="warning">Create</Button>
                    
                    
                </Form>
            </Modal.Body>
        </Modal >
    );
}


function DeliveryBottom(props) {
    return (
        <>
            <Button onClick={props.onShow} size="sm" variant="outline-secondary">delivery</Button>
        </>
    );
}

const DateDeliveryRow = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            dateFormat="dd-MM-yyyy"
            selected={startDate}
            value={startDate}
            onChange={(date) => { setStartDate(date); props.setDateDelivery(date); }}
        />
    );
};

const TimeDeliveryRow = (props) => {
    const [value, onChange] = useState('10:00');

    props.setTimeDelivery(value);

    return (
        <div>
            <TimePicker
                onChange={(value) => { onChange(value); props.setTimeDelivery(value); }}
                value={value}
                disableClock={true}
            />
        </div>
    );
};


export default Deliver;