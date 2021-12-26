import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toast, ToastContainer } from 'react-bootstrap'
import API from './API';
import UserLogin from './Components/UserLogin.js';
import UserRegister from './Components/UserRegister.js';
import ProductTable from './Components/ProductTable.js'
import "./App.css";
import ZeroNavbar from './Components/Navbar';
import { EmployeeView } from './Components/EmployeeView';
import ClientView from './Components/ClientView';
import Welcome from './Components/Welcome';
import ClientOrders from './Components/ClientOrders'
import Profile from './Components/Profile'
import FarmerProducts from './Components/FarmerProducts';
import Deliver from './Components/Deliver';
import Unretrieved from './Components/UnretrievedFood';
import ConfirmProduct from './Components/FarmerConfirmsProduct';

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userListUpdated, setUserListUpdated] = useState(true); 
  const [sideShow, setSideShow] = useState(false); //for the sidebar
  const [timeMachine, setTimeMachine] = useState(false); 
  const [toastPickups, setToastPickups] = useState(false);
  const toggleToast = () => {setToastPickups(!toastPickups)};
  var dayjs = require('dayjs');

  const timedev = true; 
  useEffect(() => {
    if(timeMachine)
    console.log(timeMachine);
  }, [timeMachine]);

  useEffect(() => {
    if (loggedIn && userListUpdated === true) {
      API.getAllUsers()
        .then(u => {
          setUserList(u);
          setUserListUpdated(false);
        }).catch(f => console.log(f));
    }
  }
    , [loggedIn, userListUpdated]);


  function ReturnTimeMachine(){

    let now_time = dayjs().format('HH:mm:ss');
    let now_date = dayjs().format('MM-DD-YYYY');

    let now = (now_date + " " + now_time);

    if (timeMachine)
      return timeMachine;

    return now;
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userinfo = await API.getUserInfo();
        if (userinfo.user) {
          setUser(userinfo.user ? userinfo.user : {});
          if (!loggedIn)
            setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, [loggedIn]);


  function HandleToast(){
    toggleToast();
  }


  const login = async (email, password) => {
      API.userLogin(email, password).then( () => {

        HandleToast();
        setLoggedIn(true);  
      }
      )
  }

  const logout = () => {
    API.userLogout().then(() => {
      setUser({});
      setLoggedIn(false);
    });
  }



  return (
    <Router>
      <ZeroNavbar isLoggedIn={loggedIn} user={user} logout={logout} timedev={timedev} setTimeMachine={setTimeMachine} setSideShow={setSideShow} sideShow={sideShow}/>
      <ToastContainer style={{position: "absolute", zIndex: 999}} position="middle-center">
                    <Toast bg="light" onClose={() => toggleToast()} show={toastPickups} >
                        <Toast.Header>
                            <strong className="me-auto">⚠️ Warning</strong>
                        </Toast.Header>
                        <Toast.Body>TEST: toast for unretrieved orders</Toast.Body>
                    </Toast>
                </ToastContainer>

      <Switch style={{position: "absolute", zIndex: 1}}>
        <Route exact path="/">
            <ProductTable isLoggedIn={loggedIn} user={user} userList={userList} timeMachine={ReturnTimeMachine} setSideShow={setSideShow} reloadTime={timeMachine}/>
        </Route>

        <Route exact path="/signout">
          {loggedIn ? <Redirect to="/" /> : ''}
          <Welcome/>
        </Route>

        <Route exact path="/login">
          {loggedIn ? <Redirect to="/" /> : <UserLogin login={login} setLoggedIn={setLoggedIn} />}
        </Route>

        <Route exact path="/signupClient">
          <UserRegister registerFarmer={false} setLoggedIn={setLoggedIn} user={user} loggedIn={loggedIn} triggerUpdate={() => setUserListUpdated(true)} />
        </Route>

        <Route exact path="/signupEmployee">
        <UserRegister registerFarmer={true} setLoggedIn={setLoggedIn} user={user} loggedIn={loggedIn} triggerUpdate={() => setUserListUpdated(true)}/>
        </Route>

        <Route exact path="/orders/:status" render={({ match }) => (
          <EmployeeView users={userList} status={match.params.status} timeMachine={ReturnTimeMachine} reloadTime={timeMachine}/>)} />

        <Route exact path="/clients">
          <ClientView users={userList} filterBy={"Client"} triggerUpdate={() => setUserListUpdated(true)} />
        </Route>

        <Route exact path="/farmers">
          <ClientView users={userList} filterBy={"Farmer"} triggerUpdate={() => setUserListUpdated(true)} />
        </Route>

        <Route exact path="/myorders">
          <ClientOrders timeMachine={ReturnTimeMachine} reloadTime={timeMachine}/>
        </Route>

        <Route exact path="/deliver">
          <Deliver />
        </Route>

        <Route exact path="/profile">
          <Profile user={user} />
        </Route>

        <Route exact path="/farmerview">
          <FarmerProducts user={user} timeMachine={ReturnTimeMachine} reloadTime={timeMachine}/>
        </Route>

        <Route exact path="/manager">
          <Unretrieved timeMachine={ReturnTimeMachine} reloadTime={timeMachine} user={user}/>
        </Route>


        <Route exact path="/productconfirm">
          <ConfirmProduct timeMachine={ReturnTimeMachine} users={userList} />
        </Route>



      </Switch>
    </Router >
  );
}

export default App;
