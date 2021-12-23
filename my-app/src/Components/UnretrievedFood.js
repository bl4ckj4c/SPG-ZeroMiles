import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Container, Image, Form, Button, Badge, Collapse, Spinner, Dropdown, DropdownButton, ProgressBar } from 'react-bootstrap';
import { PersonFill, GeoAltFill } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal'
import { ProductList } from './EmployeeView';
import "./UnretrievedFood.css";
import dayjs from 'dayjs';

function Unretrieved(props) {

    const [weeklyOrdersList, setWeeklyOrdersList] = useState([]);
    const [monthlyOrdersList, setMonthlyOrdersList] = useState([]);
    const [ordersDate, setOrdersDate] = useState(props.timeMachine());
    const [farmerList, setFarmerList] = useState([]);
    const [loadingWeek, setLoadingWeek] = useState(false);
    const [loadingMonth, setLoadingMonth] = useState(false);
    const [openWeek, setOpenWeek] = useState(false);
    const [openMonth, setOpenMonth] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const customparseformat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customparseformat);

    useEffect(() => {
        API.getFarmer()
            .then(farmer => {
                setFarmerList(farmer);
            }).catch(f => console.log(f));
    }, []);

    useEffect(() => {
        setLoadingWeek(true);
        setLoadingMonth(true);

        API.getWeeklyNotRetiredOrders(ordersDate.toString())
            .then(ordersWeek => {
                setWeeklyOrdersList(ordersWeek);
                setLoadingWeek(false);
            }).catch(o => handleErrors(o));

        API.getMonthlyNotRetiredOrders(ordersDate.toString())
            .then(ordersMonth => {
                setMonthlyOrdersList(ordersMonth);
                setLoadingMonth(false);
            }).catch(o => handleErrors(o));

    }, [ordersDate]);

    useEffect(() => {
        if (props.reloadTime)
            setOrdersDate(props.reloadTime);
        console.log(ordersDate);
    }, [props.reloadTime])

    function handleClose(newdate) {
        setModalShow(false);
        if (newdate) {
            setOrdersDate(newdate);
        }
    }

    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    return (
        <>
            {props.user.Role === "Manager" ? <>
                <Row className="justify-content-center mt-3">
                    <Image style={{ marginLeft: '-8px' }} id="logo" src="/images/logo.png" />
                </Row>

                <Row className="mt-1">
                    <h1 style={{ textAlign: 'center' }}>Managing page</h1>
                </Row>

                {loadingWeek && loadingMonth ? <> <Row className="justify-content-center mt-5">
                    < Spinner animation="border" size="xl" variant="secondary" />
                </Row > </> :
                    <>
                        <Row className="mt-4">
                            <Col className='d-none d-sm-block' lg={3}></Col>
                            <Col className="unretrieved-mobile">
                                <div className="d-flex justify-content-between">
                                    <h4>Unretrived orders</h4>
                                    <Button size="sm" variant="outline-secondary" className="date-mobile" onClick={setModalShow}>Change date</Button>
                                    <TimeSelect show={modalShow} onHide={(newdate) => handleClose(newdate)} timeMachine={props.timeMachine} getTime={props.timeMachine()} />
                                </div>
                            </Col>
                            <Col className='d-none d-sm-block' lg={3}></Col>
                        </Row>

                        <ListGroup className="mt-3">

                            <Row>
                                <Col className='d-none d-sm-block' lg={3}></Col>
                                <Col>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <h5 style={{ marginTop: '10px' }}>N° in the week before {(dayjs(dayjs(ordersDate, 'MM-DD-YYYY'))).format('DD MMMM').toString()}: <Badge bg="secondary" pill className="pill-placement">{weeklyOrdersList.length}</Badge></h5>
                                        {weeklyOrdersList.length === 0 ?
                                            <Button size="sm" variant="warning" className="margin-show" disabled>Show</Button> :
                                            <Button size="sm" variant="warning" className="margin-show" onClick={() => setOpenWeek(!openWeek)} aria-controls="example-collapse-text" aria-expanded={openWeek} >Show</Button>
                                        }
                                    </ListGroup.Item>
                                </Col>
                                <Col className='d-none d-sm-block' lg={3}></Col>

                                <Collapse in={openWeek}>
                                    <div>
                                        <Table className="d-flex justify-content-center">
                                            <tbody id="employee-table" align="center">
                                                {farmerList.map(f =>
                                                    <FarmerRow key={f.FarmerID} farmer={f} ordersList={weeklyOrdersList} />)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Collapse>
                            </Row>


                            <Row>
                                <Col className='d-none d-sm-block' lg={3}></Col>
                                <Col>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                        <h5 style={{ marginTop: '10px' }}>N° in the month of {(dayjs(dayjs(ordersDate, 'MM-DD-YYYY'))).format('MMMM').toString()}: <Badge bg="secondary" pill className="pill-placement">{monthlyOrdersList.length}</Badge></h5>
                                        {monthlyOrdersList.length === 0 ?
                                            <Button size="sm" variant="warning" className="margin-show" disabled>Show</Button> :
                                            <Button size="sm" variant="warning" className="margin-show" onClick={() => setOpenMonth(!openMonth)} aria-controls="example-collapse-text" aria-expanded={openMonth} >Show</Button>
                                        }
                                    </ListGroup.Item>
                                </Col>
                                <Col className='d-none d-sm-block' lg={3}></Col>

                                <Collapse in={openMonth}>
                                    <div>
                                        <Table className="d-flex justify-content-center">
                                            <tbody id="employee-table" align="center">
                                                {farmerList.map(f =>
                                                    <FarmerRow key={f.FarmerID} farmer={f} ordersList={monthlyOrdersList} />)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Collapse>
                            </Row>
                        </ListGroup>
                    </>
                }
            </> : ''}
        </>
    );
}


function FarmerRow(props) {
    let product = [];

    props.ordersList.map(o => {
        o.ProductInOrder.map(po =>
            po.FarmerID === props.farmer.FarmerID ? product.push(po) : '')
    })

    if (product.length > 0)
        return (
            <tr>
                <Container>

                    <Row className="mt-2">
                        <h1 style={{ fontSize: 24 }} align={"left"}>{props.farmer.Company}</h1>
                    </Row>

                    <Row className="mb-3">
                        <section className="d-flex justify-content-between">
                            <div> <PersonFill /><span>&nbsp;</span>
                                {props.farmer.Name}<span>&nbsp;</span>{props.farmer.Surname}
                            </div>
                            <div>
                                <GeoAltFill className="ml-3" /><span>&nbsp;</span>
                                {props.farmer.Address}<span>,&nbsp;</span>{props.farmer.State}
                            </div>
                        </section>
                    </Row>

                    <Table className="justify-content-center">
                        <tbody align="center">
                            {product.map(p => (
                                <ProductList key={p.ProductID} product={p} />))}
                        </tbody>
                    </Table>

                </Container>
            </tr>
        );
    else
        return "";

}

function TimeSelect(props) {
    var dayjs = require('dayjs');
    var customParseFormat = require('dayjs/plugin/customParseFormat');
    var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
    dayjs.extend(customParseFormat);
    dayjs.extend(isSameOrBefore);

    const now_time = new Object();
    const now_date = new Object();
    now_time.value = dayjs().format('HH:mm');
    now_date.value = dayjs().format('YYYY-MM-DD');
    var newdate = "";

    const [time, setTime] = useState(now_time);
    const [date, setDate] = useState(now_date);


    function onSubmit() {
        newdate = (dayjs(date.value).format('MM-DD-YYYY') + " " + time.value + ":00");

        if ((dayjs(newdate, 'MM-DD-YYYY HH:mm:ss')).isSameOrBefore((dayjs(props.timeMachine(), 'MM-DD-YYYY HH:mm:ss')))) {
            props.onHide(newdate);
        } else {
            console.log("TUTTO MALE");
            //APRIRE MODAL DI ERRORE 
        }
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Select a date
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="justify-content-center">
                        <Col lg={3} xl={3} md={3} sm={6} xs={6}>
                            <Form.Group className="mt-2" controlId="chosendate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" defaultValue={date.value.toString()} onChange={e => setDate({ value: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col lg={3} xl={3} md={3} sm={6} xs={6}>
                            <Form.Group className="mt-2" controlId="chosentime">
                                <Form.Label>Time</Form.Label>
                                <Form.Control type="time" defaultValue={time.value.toString()} onChange={e => setTime({ value: e.target.value })} />
                            </Form.Group>
                        </Col>

                        <Row className="justify-content-center mt-3" style={{ fontSize: '17px' }}>
                            Select a date to see the unretrived orders for the week before
                        </Row>
                        <Row className="justify-content-center mt-1" style={{ fontSize: '17px' }}>
                            or for the month that contains the date
                        </Row>
                    </Row>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={onSubmit}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Unretrieved;
