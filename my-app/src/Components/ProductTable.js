import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import {PersonFill, GeoAltFill} from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap';
import {useState} from 'react';
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
            <ProductsCounter/>

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
                            <td></td>
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
                                    <td><ProductsCounter quantity={p.Quantity}/></td>
                                </tr>
                                : '')}

                    </tbody>
                </Table>
            </td>
        </tr>
    </>
    );
};




function ProductsCounter(props){
    const [index, setIndex] = useState(0)

    function updateIndex(sign){
        if ((sign === -1 && index !== 0) || (sign === +1 && index < props.quantity))
          setIndex (index + sign);
         
    }
    return (
     <ButtonGroup>

      <ToggleButton style={{ minWidth : "2.5rem"}} variant='danger' onClick={ () => updateIndex(-1)}>{/* 
        key={idx}
        id={`radio-${idx}`}
        type="radio"
        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
        name="radio"
        value="-"
        checked={radioValue === radio.value}
        onChange={(e) => setRadioValue(e.currentTarget.value)}
      
        {radio.name}

 */}
 -
      </ToggleButton>      
      <ToggleButton style={{ minWidth : "3rem"}} disabled variant="warning">
          {index}
      </ToggleButton>    
        <ToggleButton style={{ minWidth : "2.5rem"}} variant="danger" onClick={ () => updateIndex(+1)}>
+
      </ToggleButton>
    
  </ButtonGroup>

    );

}
export default ProductTable;