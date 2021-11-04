import { Col, Row, Container } from 'react-bootstrap';
import { Button, Card } from 'react-bootstrap';
import API from '../API.js';
import { useState, useEffect } from 'react';

const counterID = 1;  //the system handles just one counter, for now

function Officer(props) {

    const [customer, setCustomer] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const getNextCustomer = async () => {
          const customer = await API.getNextCustomer(counterID);
          setCustomer(customer);
        };
  
      if(ready){
          getNextCustomer();
          setReady(false);
      }
      
      }, [ready]);

    function handleClick(){
        setReady(true);
    }  

    return (
        <Container>

            <Row className="mt-5">
                <Col></Col>
                <Col sm="auto">
                    <Button variant="primary" size="lg" onClick={() => handleClick()}>Next Client</Button>
                </Col>
                <Col></Col>
            </Row>

            <Row className ="mt-5">
                <Col><h4>Next customer to serve:</h4></Col>
                <CustomerInfo data={customer}/>
            </Row>

        </Container>
    );

    function CustomerInfo(props){

        return (<>
            <Col>
                Ticket num: {props.data ? ( props.data.ticketNumber === 0 ? "No customers to serve yet" : props.data.ticketNumber ) : ""}
            </Col>
            {/* <Col>
                Service Type: {props.data ? props.data.serviceType:""}
            </Col> */}
        </>);
    }
};

export default Officer;

