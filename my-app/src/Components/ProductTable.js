import { Container, Row, Col, Table, ButtonGroup, ToggleButton } from 'react-bootstrap';
import {PersonFill, GeoAltFill} from 'react-bootstrap-icons';
import { Image } from 'react-bootstrap';
import {useState} from 'react';
import "./ProductTable.css";




function ProductTable(props) {
// Here I create an array that contains all the product ids and the number of ordered products. I initialized it to zero.
    let prodNum =[];
    for (let i = 0 ; i < props.productByFarmer.length ; i++ ){
        prodNum.push({"number" : 0, "pID" : props.productByFarmer[i].ProductID})
    }
    console.log(prodNum);

//this function updates the number in the array, also allows to display the current number in the counter
    function updateNumber(i, sign){
        if ((sign === -1 && prodNum[i].number !== 0) || (sign === +1 && prodNum[i].number < props.productByFarmer[i].Quantity)) {
            prodNum[i].number+=sign;
        }
        return prodNum[i].number;
    }

   

    return (
        <Col>
            <Table className="d-flex justify-content-center">
                <tbody id="farmer-table" align="center">
                    {props.farmers.map(f =>
                        <FarmerRow farmer={f} productByFarmer={props.productByFarmer} updateNumber={updateNumber} />
                    )}
                </tbody>
            </Table>

        </Col>
    );
};

function FarmerRow(props) {
    console.log("quantirendeding");
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

                <Table striped hover size="sm" className="justify-content-center">
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
                        {props.productByFarmer.map((p, idx) =>
                            p.FarmerID === props.farmer.FarmerID ?
                                <tr className="centrami">
                                    <td><Image src="/images/placeholder.jpg" rounded width={"60px"} /></td>
                                    <td>{p.NameProduct}</td>
                                    <td>{p.Description}</td>
                                    <td>{p.Quantity}</td>
                                    <td>{p.UnitOfMeasurement}</td>
                                    <td>{p.Price}€</td>
                                    <td><ProductsCounter numIndex={idx} updateNumber={props.updateNumber}/></td>
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
    const [number, setNumber] = useState(0)

    function updateIndex(sign){
       let i = props.updateNumber(props.numIndex,sign);
       setNumber (i);
       console.log(i);

    }
    return (
     <ButtonGroup>

      <ToggleButton style={{ minWidth : "2.5rem"}} variant='secondary' onClick={() => updateIndex(-1)}>{/*

 */}
 -
      </ToggleButton>
      <ToggleButton style={{ minWidth : "3rem"}} disabled variant="light">
          {number}
      </ToggleButton>
        <ToggleButton style={{ minWidth : "2.5rem"}} variant="secondary" onClick={() => updateIndex(+1)} >
+
      </ToggleButton>

  </ButtonGroup>

    );

}

export default ProductTable;
