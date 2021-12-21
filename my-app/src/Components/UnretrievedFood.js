import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Badge, Collapse, Spinner, Dropdown, DropdownButton, ProgressBar } from 'react-bootstrap';
import { PersonFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import "./UnretrievedFood.css";
import Modal from 'react-bootstrap/Modal'
import { ProductList } from './EmployeeView';
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

    const customparseformat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customparseformat);

    useEffect(() => {
        setLoadingWeek(true);
        setLoadingMonth(true);

        API.getWeeklyNotRetiredOrders(ordersDate.toString())
            .then(orders => {
                setWeeklyOrdersList(orders);
                setLoadingWeek(false);
            }).catch(o => handleErrors(o));

        API.getMonthlyNotRetiredOrders(ordersDate.toString())
            .then(orders => {
                setMonthlyOrdersList(orders);
                setLoadingMonth(false);
            }).catch(o => handleErrors(o));

        API.getFarmer()
            .then(farmer => {
                setFarmerList(farmer);
            }).catch(f => console.log(f));

    }, []);


    const handleErrors = (err) => {
        {/*setMessage({ msg: err.error, type: 'danger' });*/
        }
        console.log(err);
    }

    return (
        <>
            <Row className="mt-3">
                <h1 style={{ textAlign: 'center' }}>ZeroMiles Managing page</h1>
            </Row>

            {loadingWeek && loadingMonth ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
            </Row > </> :
                <>
                    <Row className="mt-3">
                        <Col className='d-none d-sm-block' lg={3}></Col>
                        <Col className="unretrieved-mobile">
                            <div className="d-flex justify-content-between">
                                <h4>Unretrived orders</h4>
                                <Button size="sm" variant="outline-secondary" className="date-mobile">Change date</Button>
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
                                    <Button size="sm" variant="warning" className="margin-show" onClick={() => setOpenWeek(!openWeek)} aria-controls="example-collapse-text" aria-expanded={openWeek} >Show</Button>
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
                                    <Button size="sm" variant="warning" className="margin-show" onClick={() => setOpenMonth(!openMonth)} aria-controls="example-collapse-text" aria-expanded={openMonth} >Show</Button>
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
        return (<>
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
                                <ProductList product={p} />))}
                        </tbody>
                    </Table>

                </Container>
            </tr>
        </>
        );
    else
        return "";

};

export default Unretrieved;
