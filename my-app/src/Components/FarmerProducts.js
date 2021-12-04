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


    function addProdTest(prod){
        setProductsByFarmer([...productsByFarmer, prod]);
        setSelectedProduct([]);

    }

    useEffect(() => {
        if(productsByFarmer!==false)
        API.getAllProducts()
            .then(p => {
                // filter the products that are already present in ProductByFarmer table
                setProducts(p.filter(pp => !productsByFarmer.some(pbf => pbf.ProductID === pp.ProductID))); 
                setUpdated(true);
            }).catch(f => console.log(f));
    }
        , [productsByFarmer]);

    useEffect(() => {
        API.getProductsByFarmer()
            .then(p => {
                setProductsByFarmer(p);
            }).catch(f => console.log(f));
    }
        , []);


    if (updated) return (
    <Container>
        <Col>
    <ProductsDropdown products={products} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />
    <Button disabled={selectedProduct.length > 0 ? false : true } onClick={() => setAddProdShow(true)}>Add product</Button>
            {   productsByFarmer.map( p=>  <div><Product p={p}/></div> )} 
<AddProductModal addProdTest={addProdTest}  product={selectedProduct.length > 0 ? selectedProduct[0] : null } show={addProdShow} onHide={() => setAddProdShow(false)}/>
</Col>
    </Container>)
    else return "";

}




function Product(props){

    return (
        <Card  className="createSurCardMargin">
          <Card.Header >
            <svg /* onClick={() => DeleteQuestion(i)} */ xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash createSurUpDownDeleteMargin" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
            {props.p.NameProduct}
            <Card.Subtitle  >
            Quantity: {props.p.Quantity} Unit: {props.p.UnitOfMeasurement} Price: {props.p.Price}
             </Card.Subtitle>

          </Card.Header>

        </Card>

      );

}


function AddProductModal(props) {
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");

    function AddProduct(){
        let prod = {
            NameProduct : props.product.Name,
            UnitOfMeasurement : unit,
            Quantity : quantity,
            Price : price,
            ProductID : props.product.ProductID
        }

        props.addProdTest(prod);
        props.onHide();
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
  


function ProductsDropdown(props) {




    const filterByFields = ['Name'];
    return (
        <>
        <p>+++ATTENTION+++ Right now it only shows products from farmer Gerry Scotti (id: JJeuoVa8fpl4wHGLK8FO) </p>
            <Form.Group>
                <Typeahead
                    filterBy={filterByFields}
                    id="basic-typeahead-single"
                    labelKey={(option) => `${option.Name}`}
                    onChange={props.setSelectedProduct}
                    options={props.products}
                    placeholder="👤 Choose a product..."
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