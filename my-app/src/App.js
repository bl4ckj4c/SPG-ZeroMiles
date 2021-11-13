import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import API from './API';
import { useState, useEffect } from 'react';
import UserLogin from './Components/UserLogin.js';
import UserRegister from './Components/UserRegister.js';
import Main from './main.js';
import ProductTable from './Components/ProductTable.js'
import { Container, Row, Col, Toast, ToastContainer, Spinner, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import "./App.css";

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [productByFarmerList, setProductByFarmerList] = useState([]);
  const [productByFarmerListUpdated, setProductByFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata
  const [farmerList, setFarmerList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [farmerListUpdated, setFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata
  const [userListUpdated, setUserListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata


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

    API.getAllUsers()
      .then(u => {
        setUserList(u);
        setUserListUpdated(false);
      }).catch(f => handleErrors(f));


  }, []);


  useEffect(()=> {
    if(!userListUpdated && !farmerListUpdated && !productByFarmerListUpdated)
    setLoading(false);

  }, [userListUpdated, farmerListUpdated, productByFarmerListUpdated]);

  //Gestione di eventuali errori in risposta alle API
  const handleErrors = (err) => {
    {/*setMessage({ msg: err.error, type: 'danger' });*/ }
    //setMessage({ msg: "Dear customer, we are experiencing some technical difficulties. Please come back later.", type: 'danger' });
    console.log(err);
  }

  return (
    <Router>
      {/* Visualizzazione di eventuali errori gestiti dalla funzione handleErrors*/}
      {/*ToastContainer className="p-3" position="middle-center">
        <Toast bg="warning" onClose={() => setMessage('')} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Error :(</strong>
          </Toast.Header>
          <Toast.Body>{message?.msg}</Toast.Body>
        </Toast>
        </ToastContainer> */}

      <Navbar bg="warning">
        <Container>
          <Navbar.Brand href="/">
            <Image id="logo" src="/images/logo.png" />
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="posizionamento" href="/login">Login</Nav.Link>
            <Nav.Link className="posizionamentoPulsante" href="/user">
              <Button variant="secondary" size="sm">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Switch>

        {/*}
        <Route exact path="/">
          <Main></Main>
        </Route> */}

        <Route exact path="/">
            <Col as="main">

              {/* Stampa della lista dei prodotti o animazione di caricamento se necessaria */}
              {loading ? <Row className="justify-content-center mt-5">
                <Spinner animation="border" size="xl" variant="secondary" />
              </Row> :

                <ProductTable productByFarmer={productByFarmerList} farmers={farmerList} users={userList} />}

            </Col>
        </Route>

        <Route exact path="/login">
          <UserLogin></UserLogin>
        </Route>

        <Route exact path="/user">
          <UserRegister></UserRegister>
        </Route>

      </Switch>
    </Router >
  );
}

export default App;