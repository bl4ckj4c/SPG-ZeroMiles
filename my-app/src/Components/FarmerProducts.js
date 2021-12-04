import { Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';


import API from '../API';
import { useState, useEffect } from 'react'

function FarmerProducts(props) {
    const [products, setProducts] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);


    const [productsByFarmer, setProductsByFarmer] = useState(false);

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
        API.getProductByFarmer()
            .then(p => {
                //Trying inserting only products added in Product by farmer table by Gerry Scotti's farm
                
                setProductsByFarmer(p.filter( pbf => pbf.FarmerID ==="JJeuoVa8fpl4wHGLK8FO"));
            }).catch(f => console.log(f));
    }
        , []);


    if (updated) return (
    <><ProductsDropdown products={products} setSelectedProduct={setSelectedProduct} selectedProduct={selectedProduct} />
             {   productsByFarmer.map( p=> <p>prodId {p.ProductID}, prodName { p.NameProduct}, prodQty {p.Quantity} </p>)}

    </>)
    else return "";

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