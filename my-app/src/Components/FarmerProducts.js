import { Form, Card, InputGroup, Button, Col, Container, Modal } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


import API from '../API';
import { useState, useEffect } from 'react'

function FarmerProducts(props) {
    const [products, setProducts] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productsByFarmer, setProductsByFarmer] = useState(false);
    const [addProdShow, setAddProdShow] = useState(false);
    const [ProductsByFarmerUpdate, setProductsByFarmerUpdate] =  useState(true);

    async function addProdTest(prod){

        try{

        let result = await API.addProduct(prod);
        setProductsByFarmerUpdate(true);
        setSelectedProduct([]);
        }
        catch (err) {
            console.log(err);
            //TODO Error message
        }
    }


    async function deleteProductByFarmer(PbFid){
      try{
        let result = await API.deleteProduct({ productByFarmerID : PbFid })
        setProductsByFarmerUpdate(true);
        setSelectedProduct([]);

        }
        catch (err) {
          console.log(err);
          //TODO Error message
        }
    }

    useEffect(() => {
        API.getAllProducts()
            .then(p => {
                // filter the products that are already present in ProductByFarmer table
                setProducts(p); 
                setUpdated(true);
            }).catch(f => console.log(f));
    }
        , []);

    useEffect(() => {
        if (ProductsByFarmerUpdate) {
        API.getProductsByFarmer()
            .then(p => {
                setProductsByFarmer(p);
                setProductsByFarmerUpdate(false);
            }).catch(f => {
              setProductsByFarmer([]);
                setProductsByFarmerUpdate(false);
                console.log(f)
            });
    }
}
        , [ProductsByFarmerUpdate]);


    if (updated) return (
    <Container>
        <Col>
    <ProductsDropdown products={productsByFarmer.length >0 ? products.filter(pp => !productsByFarmer.some(pbf => pbf.ProductID === pp.ProductID)) : products  } setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />
    <Button disabled={selectedProduct.length > 0 ? false : true } onClick={() => setAddProdShow(true)}>Add product</Button>
            {productsByFarmer!==false ? productsByFarmer.map( p=>  <div><ProductCard key={p.ProdByFarmerID} p={p}  deleteProductByFarmer={deleteProductByFarmer} addProdTest={addProdTest}/></div> ) : "" } 
<AddProductModal addProdTest={addProdTest}  product={selectedProduct.length > 0 ? selectedProduct[0] : null } show={addProdShow} onHide={() => setAddProdShow(false)}/>
</Col>
    </Container>)
    else return "";

}




function ProductCard(props){
    const [show, setShow] = useState(false);


    return (
        <>
        <EditProductModal addProdTest={props.addProdTest} p={props.p} show={show} onHide={() => setShow(false)}/>
        <Card  className="createSurCardMargin">
          <Card.Header >
            <svg onClick={() => setShow(true)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            <svg onClick={() => props.deleteProductByFarmer(props.p.ProdByFarmerID)} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash createSurUpDownDeleteMargin" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
            {props.p.NameProduct}
            <Card.Subtitle  >
            Quantity: {props.p.Quantity} Unit: {props.p.UnitOfMeasurement} Price: {props.p.Price}
             </Card.Subtitle>

          </Card.Header>

        </Card>
</>
      );

}


function AddProductModal(props) {
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");

    function AddProduct(){
        let prod = {
            productByFarmerID : false,
            UnitOfMeasurement : unit,
            Quantity : parseInt(quantity),
            Price : parseFloat(price),
            ProductID : props.product.ProductID
        }

        props.addProdTest(prod);
        props.onHide();
        setPrice("");
        setQuantity("");
        setUnit("");
    }




    //TODO VALIDATION
    if(!props.product)
    return ""
    else
    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.product.Name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

           <Form onSubmit={(event) => event.preventDefault()}>
                    <Form.Label>Enter the price</Form.Label>
                    <InputGroup>
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control value={price}  onChange={(event) => { setPrice(event.target.value) }}  /><br />
                    </InputGroup>

                    <Form.Label>Enter the quantity</Form.Label>
                    <Form.Control value={quantity}  onChange={(event) => { setQuantity(event.target.value) }}  /><br />
                    <Form.Label>Enter the unitofmeasurement</Form.Label>
                    <Form.Control value={unit}  onChange={(event) => { setUnit(event.target.value) }} /><br />

          </Form>

        </Modal.Body>
        <Button onClick={AddProduct} variant="success">Add the product</Button>

      </Modal>
    );
  }
  
  function EditProductModal(props) {
    const [price, setPrice] = useState(props.p.Price);
    const [quantity, setQuantity] = useState(props.p.Quantity);
    const [unit, setUnit] = useState(props.p.UnitOfMeasurement);

    function AddProduct(){
        let prod = {
            productByFarmerID : props.p.ProdByFarmerID,
            UnitOfMeasurement : unit,
            Quantity : parseInt(quantity),
            Price : parseFloat(price),
            ProductID : props.p.ProductID
        }

        props.addProdTest(prod);
        props.onHide();
    }




    //TODO VALIDATION

    return (
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.p.Name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

           <Form onSubmit={(event) => event.preventDefault()}>
                    <Form.Label>Enter the price in the 0.00 format</Form.Label>
                    <InputGroup>
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control value={price}  onChange={(event) => { setPrice(event.target.value) }}  /><br />
                    </InputGroup>

                    <Form.Label>Enter the quantity</Form.Label>
                    <Form.Control value={quantity}  onChange={(event) => { setQuantity(event.target.value) }}  /><br />
                    <Form.Label>Enter the unitofmeasurement</Form.Label>
                    <Form.Control value={unit}  onChange={(event) => { setUnit(event.target.value) }} /><br />

          </Form>

        </Modal.Body>
        <Button onClick={AddProduct} variant="success">Add the product</Button>

      </Modal>
    );
  }
  


function ProductsDropdown(props) {




    const filterByFields = ['Name'];
    return (
        <>
            <Form.Group>
                <Typeahead
                    filterBy={filterByFields}
                    id="basic-typeahead-single"
                    labelKey={(option) => `${option.Name}`}
                    onChange={props.setSelectedProduct}
                    options={props.products}
                    placeholder="🍳 Choose a product..."
                    selected={props.selectedProduct}
                    renderMenuItemChildren={(option) => (
                        <div>
                            {option.Name}
                            <div>
                                <small>{option.Description} </small>
                            </div>
                        </div>
                    )}
                />
            </Form.Group>

        </>


    );
};

export default FarmerProducts;