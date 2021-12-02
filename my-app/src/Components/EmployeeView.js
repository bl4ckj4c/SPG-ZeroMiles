import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ListGroup, Container, FormControl, Form, Button, Image, ButtonGroup, Spinner,Dropdown, DropdownButton, ProgressBar  } from 'react-bootstrap';
import { PersonFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import "./EmployeeView.css";
import UserDropdown from "./CustomerSearchBar"
import Sidebar from "./Sidebar";

function EmployeeView(props) {

    const [ordersList, setOrdersList] = useState([]);
    const [filteredOrdersList, setFilteredOrdersList] = useState([]);
    const [ordersListUpdated, setOrdersListUpdated] = useState(true);
    const [selectedUser, setSelectedUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.getOrders()
            .then(orders => {
                setOrdersList(orders);
                setFilteredOrdersList(orders);
                setOrdersListUpdated(false);
                setLoading(false);
            }).catch(o => handleErrors(o));
    }, []);

    useEffect(() => {
        if (ordersListUpdated === true) {
            setLoading(true);
            API.getOrders()
                .then(orders => {
                    setOrdersList(orders);
                    setFilteredOrdersList(orders);
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

    return (
        <>
        <Container>
            <Row className="mt-3 margine-cerca-desktop">
                <UserDropdown users={props.users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            </Row>
        </Container>

            {loading ? <> <Row className="justify-content-center mt-5">
                < Spinner animation="border" size="xl" variant="secondary" />
                        </Row > </> :
                <>
                    <Row>
                        <Col>
                            <Table className="d-flex justify-content-center">
                                <tbody id="employee-table" align="center">
                                    {
                                        ordersList.slice(0).reverse().map(o => {
                                            if(selectedUser.length >0 && o.ClientID === selectedUser[0].UserID || selectedUser.length === 0 ){
                                                if (o.Status == "open" && props.status == "open") {
                                                    return <OrderRow order={o} />
                                                }
                                                if (o.Status == "pending" && props.status == "pending") {
                                                    return <OrderRow order={o} />
                                                }
                                                if (o.Status == "closed" && props.status == "closed") {
                                                    return <OrderRow order={o} />
                                                }
                                                if (props.status == "all") {
                                                    return <OrderRow order={o} />
                                                }
                                        }
                                        }

                                        )
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

let progressRate=0;
let progressType="success";


function OrderRow(props) {
    let [stat, setStat] = useState(props.order.Status || 'o');



    let buttonstatus;
    // let stat;
    if (props.order.Status === "open") {
        stat = 'o';
        progressType="info";   
        buttonstatus = "outline-primary";
        progressRate=10;
    } else if (props.order.Status == "pending") {
        buttonstatus = "outline-danger";
        stat = 'p';
        progressType="danger";   
        progressRate=49;

    } else if (props.order.Status === "closed") {
        buttonstatus = "outline-success";
        stat = 'c';
        progressType="success";   
        progressRate=100;

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
                                <DropdownButton onClick={()=>{alert("You click to change the status of order with orderID:"+ props.order.OrderID)}} title={props.order.Status}  variant={buttonstatus} size="sm">

                                    <Dropdown.Item onClick={() => {
                                        props.order.Status = "open";
                                        setStat('o');
                                        API.modifyOrderStatus(props.order);
                                        progressRate=10;
                                        

                                    } }>Open</Dropdown.Item>
                                    <Dropdown.Item onClick={() =>  {
                                        props.order.Status = "pending";
                                        setStat('p');
                                        progressRate=49;
                                        API.modifyOrderStatus(props.order);
                                        }
                                    
                                      }>Pending</Dropdown.Item>
                                    <Dropdown.Item onClick={() =>{
                                        props.order.Status = "closed";
                                        setStat('c');

                                        progressRate=99;

                                        API.modifyOrderStatus(props.order);
                                        
                                    } }>Closed</Dropdown.Item>
                                    


                                </DropdownButton >
                            </Col>
                        </Row>

                    </Container>
                </td>
            </tr>
        </>
    );
}


function ProductList(props) {

    let newSrc = "https://filer.cdn-thefoodassembly.com/photo/" + props.product.ImageID + "/view/large"

    return (
        <Table >
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
        <Row>
        <ProgressBar striped variant={progressType} animated now={progressRate} /> 

</Row></Table>
    );
}


export { ProductList, EmployeeView };
