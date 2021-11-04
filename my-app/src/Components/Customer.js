import { Col, Row, Container } from 'react-bootstrap';
import { Button, Card, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import API from '../API.js';
import "./customer.css";
import icon1 from './icons/1.jpg';
import icon2 from './icons/2.jpg';
import icon3 from './icons/3.jpg';
import icon4 from './icons/4.jpg';

function Customer(props) {

    const [ticketNum, setTicketNum] = useState(-1);
    const [selectedService, setSelectedService] = useState(null); 
    const [modalShow, setModalShow] = useState(false);
    const closeModal = () => setModalShow(false);
  
    useEffect(() => {
      const getTicket = async () => {
        const ticket = await API.getTicket(selectedService);
        setTicketNum(ticket);
        setModalShow(true);
      };


	if(selectedService){
        getTicket();
        setSelectedService(null);
	}
	

    }, [selectedService]);
  
    return (
        <Container>
            <ShowTicketModal show={modalShow} handleClose={()=>setModalShow(false)} message={ticketNum}/>

            <Row className="justify-content-center mt-3">GET YOUR TICKET</Row>
            <Row className="justify-content-center mt-3">
                <Col xs lg="4">
                    <Card>
                        <Card.Img variant="top" src={icon1} />
                        <Card.Body>
                            <Card.Title>BILL</Card.Title>
                            <Button variant="primary" onClick={() => setSelectedService(1)}>Add me to queue</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs lg="4">
                    <Card>
                        <Card.Img variant="top" src={icon2} />
                        <Card.Body>
                            <Card.Title>POST</Card.Title>
                            <Button variant="primary" onClick={() => setSelectedService(2)}>Add me to queue</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-2 mb-2">
                <Col xs lg="4">
                    <Card>
                        <Card.Img variant="top" src={icon3}/>
                        <Card.Body>
                            <Card.Title>BOX</Card.Title>
                            <Button variant="primary" onClick={() => setSelectedService(3)}>Add me to queue</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs lg="4">
                    <Card>
                        <Card.Img variant="top" src={icon4}/>
                        <Card.Body>
                            <Card.Title>WITHDRAWAL</Card.Title>
                            <Button variant="primary" onClick={() => setSelectedService(4)}>Add me to queue</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
};

function ShowTicketModal(props) {

    return (
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header className="text-center font-weight-bold" closeButton onClick={props.handleClose}>Dear customer, here's your ticket number: </Modal.Header>
        <Modal.Body className="display-1 text-center font-weight-bold">{props.message.number}</Modal.Body>
      </Modal>
    );
}
  

export default Customer;

