import API from '../API';
import {useState, useEffect, useCallback} from 'react';
import {Table, Row, Col, Form, ListGroup, Spinner, Card, Modal, Button, Container} from 'react-bootstrap';
import {PersonCircle, GeoAltFill, MapFill, WalletFill} from 'react-bootstrap-icons';
import "./ClientView.css";
import {useDropzone} from 'react-dropzone'
//import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";

function Deliver(props) {
    const [address, setAddress] = useState('');
    const [dateDelivery, setDateDelivery] = useState(new Date());
    const [timeDelivery, setTimeDelivery] = useState('');
    const [modalShowProductNew, setModalShowProductNew] = useState(false);


    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    async function submitDelivery() {


        let objectDelivery = {
            "address": address,
            "date": dateDelivery,
            "time": timeDelivery
        }
        let res = await API.createDelivery(objectDelivery);
        console.log(objectDelivery);
    }

    return (
        <>
            {
                <>
                    <Col className="mt-3">
                        <Table className="d-flex justify-content-center">
                            <tbody id="client-table" align="center">
                            <DeliveryBottom  onShow={() => setModalShowProductNew(true)}/>
                            </tbody>
                        </Table>
                    </Col>

                    <ModalDeliveryNew
                         setAddress={setAddress}
                      /*  setStartDate={setStartDate} */
                        setDateDelivery={setDateDelivery}
                        setTimeDelivery={setTimeDelivery}
                        submitDelivery={submitDelivery}
                        show={modalShowProductNew}
                        onHide={() => setModalShowProductNew(false)}/>

                </>
            }
        </>
    );
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



export default Deliver;
