import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import API from './API';
import NavigationBar from './Components/Manager.js';
import Customer from './Components/Customer.js';
import Officer from './Components/Officer.js';
import Manager from './Components/Manager.js';
import { useState, useEffect } from 'react';
import User from './Components/userReqister.js';
import Main from './main.js';
import ProductTable from './Components/ProductTable.js'
import { Container, Row, Col, Toast, Spinner } from 'react-bootstrap';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [productByFarmerList, setProductByFarmerList] = useState([]);
  const [productByFarmerListUpdated, setProductByFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata
  const [farmerList, setFarmerList] = useState([]);
  const [farmerListUpdated, setFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata


  useEffect(() => {
    //prima di chiamare le API avvio l'animazione di caricamento
    setLoading(true);

    API.getProductByFarmer()
      .then(productByFarmer => {
        setProductByFarmerList(productByFarmer);
        setProductByFarmerListUpdated(false);
      }).catch(pbf => handleErrors(pbf));

    API.getFarmer()
    .then(farmer => {
      setFarmerList(farmer);
      setFarmerListUpdated(false);
    }).catch(f => handleErrors(f)); 

    setLoading(false);

  }, [productByFarmerListUpdated, farmerListUpdated]);

  //Gestione di eventuali errori in risposta alle API
  const handleErrors = (err) => {
    setMessage({ msg: err.error, type: 'danger' });
    console.log(err);
  }

  return (
    <>
      <Router>

        {/* Visualizzazione di eventuali errori gestiti dalla funzione handleErrors*/}
        <Toast show={message !== ''} onClose={() => setMessage('')} delay={3000} autohide>
          <Toast.Body>{message?.msg}</Toast.Body>
        </Toast>

        <Switch>

          <Route exact path="/">
            <Main></Main>
          </Route>

          <Route exact path="/productsbyfarmer">
            <Row className="page">
              <Col as="main">

                {/* Stampa della lista dei prodotti o animazione di caricamento se necessaria */}
                {loading ? <Row className="justify-content-center mt-5">
                  <Spinner animation="border" size="xl" variant="primary" />
                </Row> :
                
                  <ProductTable productByFarmer={productByFarmerList} farmer={farmerList}/>}

              </Col>
            </Row>
          </Route>

          <Route exact path="/officer">
            <Officer></Officer>
          </Route>

          <Route exact path="/customer">
            <Customer></Customer>
          </Route>
          <Route exact path="/user">
            <User></User>
          </Route>

        </Switch>
      </Router>

    </>
  );


}


export default App;