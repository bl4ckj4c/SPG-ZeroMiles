import API from '../API';
import { useState, useEffect } from 'react';
import { Table, Row, Col, ToggleButton, Container, FormControl, Form, Button, Image, ButtonGroup, Spinner, Dropdown, DropdownButton, ProgressBar } from 'react-bootstrap';
import { PersonFill, GeoAltFill, ClockFill } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import "./EmployeeView.css";
import UserDropdown from "./CustomerSearchBar"
import Modal from 'react-bootstrap/Modal'
import Deliver from "./Deliver.js"

function ConfirmProduct(props) {

    const [ordersList, setOrdersList] = useState([]);
    const [filteredOrdersList, setFilteredOrdersList] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        API.getProductsByOneFarmer(props.timeMachine().toString())
            .then(orders => {
                setOrdersList(orders);
                setFilteredOrdersList(orders);
                setLoading(false);
            }).catch(o => handleErrors(o));
    }, []);

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
                    <Col>
                        <Table className="d-flex justify-content-center">
                            <tbody id="employee-table" align="center">
                                {ordersList.length > 0 ? <>
                                    {
                                        ordersList.slice(0).reverse().map(o => {

                                                if (selectedUser.length > 0 && o.ClientID === selectedUser[0].UserID || selectedUser.length === 0) {

                                                    return <OrderRow key={o.OrderID} order={o} />

                                                }
                                            }
                                            )
                                    } </> : <NoOrders message={"There are no" + (props.status === "all" ? "" : " " + props.status) + " orders yet"} />}
                            </tbody>
                        </Table>
                    </Col>
                </>
            }
        </>
    );
}

let progressRate = 0;
let progressType = "success";


function OrderRow(props) {
    let [stat, setStat] = useState(props.order.Status || 'o');


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let buttonstatus;
    // let stat;
    if (props.order.Status === "open") {
        stat = 'o';
        progressType = "primary";
        buttonstatus = "outline-primary";
        progressRate = 33;
    } else if (props.order.Status == "pending") {
        buttonstatus = "outline-warning";
        stat = 'p';
        progressType = "warning";
        progressRate = 66;

    } else if (props.order.Status === "closed") {
        buttonstatus = "outline-success";
        stat = 'c';
        progressType = "success";
        progressRate = 100;
    } else if (props.order.Status === "cancelled") {
        stat = 'canc'
        buttonstatus = "outline-danger";
        progressType = "danger"
        progressRate = 100;
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

                        <Table className="justify-content-center">
                            <tbody align="center">
                                {props.order.ProductInOrder.map((p, i) => (
                                    <ProductList confirmed={p.Confirmed} key={p.ProductID+props.order.OrderID+"_"+i} uniqueID={p.ProductID+props.order.OrderID+"_"+i} product={p} />
                                ))}
                            </tbody>
                        </Table>

                        <Row className="mt-4 mb-3 align-items-center">
                            <Col>
                                <h1 style={{ fontSize: 15, marginTop: 10 }}>Total: €{props.order.ProductInOrder.reduce((sum, p) => { return sum + parseInt(p.number) * parseInt(p.Price) }, 0)}</h1>
                            </Col>

                            {(props.order.Status === 'pending' && props.order.DeliveryDate === '') ? <>
                                <Col>
                                    <Deliver orderId={props.order.OrderID}></Deliver>                            </Col>
                            </> : <></>}

                            {props.order.DeliveryDate != '' ? <>
                                <Col>
                                    Delivery requested for {props.order.DeliveryDate}
                                </Col>
                            </> : <></>}

                            <Col>

                                <DropdownButton title={props.order.Status.charAt(0).toUpperCase() + props.order.Status.slice(1)} variant={buttonstatus} size="sm">

                                    <Dropdown.Item onClick={() => {
                                        props.order.Status = "open";
                                        setStat('o');
                                        API.modifyOrderStatus(props.order);
                                        progressRate = 10;
                                        handleShow();


                                    }}>Open</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        props.order.Status = "pending";
                                        setStat('p');
                                        progressRate = 49;
                                        API.modifyOrderStatus(props.order);
                                        handleShow();

                                    }

                                    }>Pending</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        props.order.Status = "closed";
                                        setStat('c');
                                        progressRate = 99;
                                        handleShow();

                                        API.modifyOrderStatus(props.order);

                                    }}>Closed</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        props.order.Status = "cancelled";
                                        setStat('canc');
                                        progressRate = 100;
                                        API.modifyOrderStatus(props.order);
                                        handleShow();
                                    }}>Cancelled</Dropdown.Item>


                                </DropdownButton >
                                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Status Change!</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Ther order status has been changed to {props.order.Status}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}> Close </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Row>

                    </Container>
                </td>
            </tr>
        </>
    );
}


function ProductList(props) {

    function HandleConfirmation(bol){
        if (bol){
            setCheckedTrue(true);
        }else{
            setCheckedFalse(true);
        }
    }


    const [checkedTrue, setCheckedTrue] = useState(props.confirmed === "" ? false : props.confirmed === "true" ? true : false);
    const [checkedFalse, setCheckedFalse] = useState(props.confirmed === "" ? false : props.confirmed === "false" ? true : false);
console.log("confiemd" + props.confirmed)
    return (
        <tr>
            <td>
                <Container>
                    <Row className="mb-2 align-items-center font-tabella">
                        <Col>
                            <center>{props.product.NameProduct}</center>
                        </Col>
                        <Col>
                            Quantity: {props.product.number}
                        </Col>
                        <Col>
                            Price: €{props.product.Price.toFixed(2)}
                        </Col>
                        <Col>
                            <ConfirmButton log={props.product.Product} uniqueID={props.uniqueID} HandleConfirmation={HandleConfirmation} setCheckedTrue={setCheckedTrue} checkedTrue={checkedTrue} setCheckedFalse={setCheckedFalse} checkedFalse={checkedFalse} /> 
                        </Col>
                    </Row>
                </Container>
            </td>
        </tr>
    );
}

function ConfirmButton(props){

    return (
        <ButtonGroup className="mb-2">
                <ToggleButton style={{width: "3rem"}}
        className="mb-2"
        id={props.uniqueID+"true"}
        type="checkbox"
        variant="outline-success"
        disabled={props.checkedFalse || props.checkedTrue ? true : false  }
        checked={props.checkedTrue}
        onChange={(e) => props.HandleConfirmation(true)} >
       ✔
      </ToggleButton>
        <ToggleButton  style={{width: "3rem"}}
        className="mb-2"
        id={props.uniqueID+"false"}
        type="checkbox"
        disabled={props.checkedFalse || props.checkedTrue ? true : false  }
        variant="outline-danger"
        checked={props.checkedFalse}
        onChange={(e) => props.setCheckedFalse(e.currentTarget.checked)} >
        ✘
      </ToggleButton>

        </ButtonGroup>
    );

}

function NoOrders(props) {
    return (<Row style={{ height: "50vh" }} className="align-items-center">

        <div><Image className="d-block mx-auto img-fluid w-30" src="/images/logo.png" />
            <div className="d-flex justify-content-center "><h4>{props.message}</h4></div>
        </div>
    </Row>

    );
}


export default ConfirmProduct;
