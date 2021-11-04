import { Container, Row, Table, Navbar, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import 'bootstrap-daterangepicker/daterangepicker.css'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import API from '../API.js';
import moment from 'moment';


function Manager() {
  const [startD, setStartD] = useState(null);
  const [endD, setEndD] = useState(null);
  const [numServed, setNumServed] = useState(null);
  const [numServicet, setNumServicet] = useState(null);

  const [updateDate, setUpdateDate] = useState(false);

  useEffect(() => {
    const getServed = async () => {
      const served = await API.getStatisticsForAllCounter(startD, endD);
      console.log(served);
      const servicet = await API.getStatisticsForServiceTypeNEW(startD, endD);
      setNumServed(served);
      setNumServicet(servicet);
    };

    if (updateDate) {
      getServed();
      setUpdateDate(false);
    }

  }, [updateDate]);


  const handleApply = (event, picker) => {
    setStartD(picker.startDate.format('YYYY-MM-DD'));
    setEndD(picker.endDate.format('YYYY-MM-DD'));
    setUpdateDate(true);

  };

  const maxDate = moment();

  return (
    <>
      <Navbar className="fixed-top" bg="info">
        <Navbar.Brand  >
          <svg className="bi bi-check-all" width="23" height="23" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
          </svg>
          <span className="text-white" > Administration analytics </span>
        </Navbar.Brand>
      </Navbar>


      <Container fluid style={{ marginTop: '5rem' }}>
        <Row>
          <h4> Select a date interval in order to retrieve the number of customers served by each counter   </h4>
        </Row>
        <Row style={{ margin: '10px' }}><Col md={3}>
          <DateRangePicker onApply={handleApply} initialSettings={{ maxDate: { maxDate } }}>
            <input type="text" className="form-control" />
          </DateRangePicker>
        </Col>
        </Row>

        <Row style={{ margin: '10px' }}><Col>
          {startD ? <Tables data={numServed} /> : ""}

        </Col>
        </Row>
        <Row style={{ margin: '10px' }}><Col>
          {startD ? <Tables2 data={numServicet} /> : ""}

        </Col>
        </Row>
      </Container>
    </>

  )
}


function Tables(props) {
  return (<Table striped bordered hover>
    <thead>
      <tr>
        <th>CounterID</th>
        <th>Type of service</th>
        <th>number of costumers served </th>
      </tr>
    </thead>
    <tbody>
      {props.data ? props.data.map(t =>
        <>
          <tr>
            <td>{t.counterId}</td>
            <td>{t.serviceType}</td>
            <td>{t.customerServed}</td>
          </tr>
        </>
      ) : ""}
    </tbody>
  </Table>
  );
}

function Tables2(props) {
  return (<Table striped bordered hover>
    <thead>
      <tr>
        <th>Type of service</th>
        <th>number of costumers served </th>
      </tr>
    </thead>
    <tbody>
      {props.data ? props.data.map(t =>
        <>
          <tr>
            <td>{t.serviceType}</td>
            <td>{t.customerServed}</td>
          </tr>
        </>
      ) : ""}
    </tbody>
  </Table>
  );
}

export default Manager;