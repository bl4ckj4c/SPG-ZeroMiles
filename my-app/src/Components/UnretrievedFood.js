import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Image, ButtonGroup, Spinner, Dropdown, DropdownButton, ProgressBar } from 'react-bootstrap';
import { PersonFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import "./EmployeeView.css";
import Modal from 'react-bootstrap/Modal'
import { ProductList } from './EmployeeView';

function Unretrieved(props) {

    const [ordersList, setOrdersList] = useState([]);
    const [farmerList, setFarmerList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.getWeeklyNotRetiredOrders(props.timeMachine().toString())
            .then(orders => {
                setOrdersList(orders);
                setLoading(false);
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

            {loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
            </Row > </> :
                <>
                    <Row>
                        <Col>
                            <Table className="d-flex justify-content-center">
                                <tbody id="employee-table" align="center">

                                    {farmerList.map(f =>
                                        <FarmerRow key={f.FarmerID} farmer={f} ordersList={ordersList} />)}

                                    {/*
                                {ordersList.filter(ol => props.status=== "all" ? true : ol.Status === props.status ).length > 0 ? <>
                                    {  
                                        ordersList.filter(ol => props.status=== "all" ? true : ol.Status === props.status ).length > 0 && selectedUser.length  > 0 && !ordersList.filter(ol => props.status=== "all" ? true : ol.Status === props.status ).some(ord=> ord.ClientID === selectedUser[0].UserID)  ?  <NoOrders message={"There are no"+(props.status === "all" ? "" : " "+props.status ) +" orders for the selected user"}/> : 
                                        ordersList.filter(ol => props.status=== "all" ? true : ol.Status === props.status ).slice(0).reverse().map(o => {

                                        if (selectedUser.length > 0 && o.ClientID === selectedUser[0].UserID || selectedUser.length === 0) {

                                                return <OrderRow order={o} />
                                            
                                        }
                                    }
                                    )
                                    } </> : <NoOrders message={"There are no"+(props.status === "all" ? "" : " "+props.status ) +" orders yet"}/>}
                                */}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
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

    console.log(product);

    //o.ProductInOrder.FarmerID === props.farmer.FarmerID ? product.push(o.ProductInOrder) : '')


    if (product.length > 0)
        return (<>
            <tr>
                <td className="producttable-col">

                    <Container>

                        <Row className="mt-2">
                            <h1 style={{ fontSize: 28 }} align={"left"}>{props.farmer.Company}</h1>
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
                </td>
            </tr>
        </>
        );
    else
        return "";

};

export default Unretrieved;
