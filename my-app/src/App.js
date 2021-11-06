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
import Main from './main.js';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [productByFarmerList, setProductByFarmerList] = useState([]);
  const [productByFarmerListUpdated, setProductByFarmerListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata


  useEffect(() => {
    //prima di chiamare le API avvio l'animazione di caricamento
    setLoading(true);

    API.getProductByFarmer()
      .then(productByFarmer => {
        setProductByFarmerList(productByFarmer);
        console.log("Pippo due punti");
        console.log(productByFarmer);
        setProductByFarmerListUpdated(false);
        setLoading(false);
      }).catch(pbf => handleErrors(pbf));
  }, [productByFarmerListUpdated]);

  //Gestione di eventuali errori in risposta alle API
    const handleErrors = (err) => {
      setMessage({ msg: err.error, type: 'danger' });
      console.log(err);
    }

  return (
    <>
      <Router>
        <Switch>

          <Route exact path="/">
            <Main></Main>
          </Route>

          <Route exact path="/manager">
            <Manager></Manager>
          </Route>

          <Route exact path="/officer">
            <Officer></Officer>
          </Route>

          <Route exact path="/customer">
            <Customer></Customer>
          </Route>

        </Switch>
      </Router>

    </>
  );


}


export default App;