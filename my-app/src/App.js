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
import Main from './main.js';

function App() {

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