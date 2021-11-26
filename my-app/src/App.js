import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import API from './API';
import { useState, useEffect } from 'react';
import UserLogin from './Components/UserLogin.js';
import UserRegister from './Components/UserRegister.js';
import Main from './main.js';
import ProductTable from './Components/ProductTable.js'
import { Container, Row, Col, Toast, ToastContainer, Spinner, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import "./App.css";
import ZeroNavbar from './Components/Navbar';
import { EmployeeView } from './Components/EmployeeView';
import ClientView from './Components/ClientView';
import Welcome from './Components/Welcome';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sidebarCollapse, setSidebarCollapse] = useState(true);
  const [userList, setUserList] = useState([]);
  const [userListUpdated, setUserListUpdated] = useState(true); //all'inizio la lista deve essere aggiornata


  useEffect(() => {
    if(loggedIn){
      API.getAllUsers()
        .then(u => {
          setUserList(u);
          setUserListUpdated(false);
        }).catch(f => console.log(f));
      }

    }
  , [loggedIn]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userinfo = await API.getUserInfo();
        console.log(userinfo);
        if (userinfo.user) {
          setUser(userinfo.user ? userinfo.user : {});
          if (!loggedIn) //TODO riguardare
            setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, [loggedIn]);



  //Gestione di eventuali errori in risposta alle API
  const handleErrors = (err) => {
    {/*setMessage({ msg: err.error, type: 'danger' });*/ }
    //setMessage({ msg: "Dear customer, we are experiencing some technical difficulties. Please come back later.", type: 'danger' });
    console.log(err);
  }

  const login = (email, password) => {
    API.userLogin(email, password).then((response) => {
      if(response.ok){
        setLoggedIn(true);
      }
      
    }
    ).catch(error => { console.log(error); }); //handle login error
  }

  const logout = () => {
    API.userLogout().then(() => {
      setUser({});
      setLoggedIn(false);
    });
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

      <ZeroNavbar
        isLoggedIn={loggedIn}
        user={user}
        logout={logout}
        sidebarCollapse={sidebarCollapse}
        setSidebarCollapse={setSidebarCollapse} />

      <Switch>

      <Route exact path="/">
      {loggedIn ? <Redirect to="/products" /> : ""}
          <Welcome/>
      </Route>

        <Route exact path="/products">
          <Col as="main">
         
          {!loggedIn ? <Redirect to="/" /> :  <ProductTable  isLoggedIn={loggedIn} user={user} />}
            {/* Stampa della lista dei prodotti o animazione di caricamento se necessaria
            {loading ? <Row className="justify-content-center mt-5">
            
              <Spinner animation="border" size="xl" variant="secondary" />
            </Row> :
              
              <ProductTable  isLoggedIn={loggedIn} user={user} />}
 */}
          </Col>
        </Route>

        <Route exact path="/login">
          <UserLogin login={login} />
          {loggedIn ? <Redirect to="/products" /> : ""}
        </Route>

        <Route exact path="/signup">
          <UserRegister/>
        </Route>

        <Route exact path="/employee">
       <EmployeeView
            users={userList}
            sidebarCollapse={sidebarCollapse}
            setSidebarCollapse={setSidebarCollapse} />
         
        </Route>

        <Route exact path="/clients">
       <ClientView users={userList} />
        
        </Route>

      </Switch>
    </Router >
  );
}

export default App;