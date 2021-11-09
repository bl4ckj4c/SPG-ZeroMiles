import { Container, Row, Col, ListGroup, Table } from 'react-bootstrap';
import {PersonFill, GeoAltFill} from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap';
import "./ProductTable.css";

function ProductTable(props) {
    return (
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="farmer-table" align="center">
                    {props.farmers.map(f =>
                        <FarmerRow farmer={f} productByFarmer={props.productByFarmer} />
                    )}
                </tbody>
            </Table>
        </Col>

    );
};

function FarmerRow(props) {
    return (<>
        <tr>
            <td className="producttable-col">
                <h1 style={{ fontSize: 25 }} align={"left"}>{props.farmer.Company}</h1>

                <section className = "d-flex justify-content-between">
                    <div> <PersonFill/><span>&nbsp;</span>
                    {props.farmer.Name}<span>&nbsp;</span>{props.farmer.Surname}
                    </div>
                    <div>
                    <GeoAltFill className="ml-3"/><span>&nbsp;</span>
                    {props.farmer.Address}<span>,&nbsp;</span>{props.farmer.State}
                    </div>
                </section>

                <Table striped hover className="justify-content-center">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.productByFarmer.map(p =>
                            p.FarmerID === props.farmer.FarmerID ?
                                <tr className="centrami">
                                    <td><Image src="/images/placeholder.jpg" rounded width={"60px"} /></td>
                                    <td>{p.NameProduct}</td>
                                    <td>{p.Description}</td>
                                    <td>{p.Quantity}</td>
                                    <td>{p.UnitOfMeasurement}</td>
                                    <td>{p.Price}€</td>
                                </tr>
                                : '')}

                    </tbody>
                </Table>
            </td>
        </tr>
    </>
    );
};
export default ProductTable;