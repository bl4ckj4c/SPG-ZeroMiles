import { Col, Row, Container } from 'react-bootstrap';
import { Button, Card, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import Axios from 'axios'

import API from '../API.js';
import "./user.css";
import icon1 from './icons/1.jpg';
import icon2 from './icons/2.jpg';
import icon3 from './icons/3.jpg';
import icon4 from './icons/4.jpg';

function User(props) {
    const [name, setname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [modalShow, setModalShow] = useState(false);
    


    const closeModal = () => setModalShow(false);

    function validform(e) {
        var a = document.forms["my-form"]["name"].value;
        var b = document.forms["my-form"]["lastName"].value;
        var c = document.forms["my-form"]["email"].value;
        var d = document.forms["my-form"]["address"].value;
        var e = document.forms["my-form"]["city"].value;
        var f = document.forms["my-form"]["password"].value;
        var g = document.forms["my-form"]["confPassword"].value;
        if (a==null || a=="")
        {
            alert("Please Enter Your Full Name");
            return false;
        }else if (b==null || b=="")
        {
            alert("Please Enter Your last Name");
            return false;
        } else if (f==null || f=="")
        {
            alert("Please Enter Your password");
            return false;
        }
        else if (g==null || g=="")
        {
            alert("Please Enter Your confirmation password");
            return false;
        }else if ( !(f == g))
        {
            alert("The password is not the same");
            return false;
        }else if (c==null || c=="")
        {
            alert("Please Enter Your Email Address");
            return false;
        }else if (d==null || d=="")
        {
            alert("Please Enter Your Address");
            return false;
        }else if (e==null || e=="")
        {
            alert("Please Enter Your permanent city");
            return false;
        }else{
        
            sendRegister();
         }

    }

    async function sendRegister() {
       // console.log("aca",e);
       // e.preventDefault();
        let data = {name, lastName, email, address, phone, city,password };
        Axios.post('/api/register', data)
          .then((response) => {
              console.log(response);
          })
          .catch(error => console.log("Error from server: ", error))

        // const ticket = await API.getClient(selectedService);
        // console.log( "fgdfssfgh", ticket)
    }
   

    
//     useEffect(() => {
//       const getClient = async () => {
//         const ticket = await API.getClient(selectedService);
//         console.log("test");
//         setTicketNum(ticket);
//         setModalShow(true);

//     };

// //	if(selectedService){
//         //getClient()
//        // setSelectedService(null);
// //	}
	

//     }, [selectedService]);
  
    return (
        <Container>
            <Row className="justify-content-center mt-2 mb-2">
                <Col xs lg="1">


<body>

<nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
    <div class="container">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Register</a>
            </li>
        </ul>

    </div>
    </div>
</nav>

<main class="my-form">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                    <div class="card">
                        <div class="card-header">Register</div>
                        <div class="card-body">
                            <form name="my-form">
                                <div class="form-group row">
                                    <label for="full_name" class="col-md-4 col-form-label text-md-right">Name</label>
                                    <div class="col-md-8">
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Put the name"
                                            required
                                            value = { name }
                                            onChange={(e) => setname(e.target.value)}
                                          ></input>
                                     </div>
                                 </div>
                                 <div class="form-group row">
                                    <label for="last_name" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                    <div class="col-md-8">
                                       <input
                                           type="text"
                                            id="lastName"
                                            name="username"
                                            class="form-control"
                                            placeholder="Put the last name"
                                            required
                                            value = { lastName }
                                            onChange={(e) => setLastname(e.target.value)}
                                          ></input>
                                     </div>
                                 </div>
                                 <div class="form-group row">
                                    <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail</label>
                                    <div class="col-md-8">
                                   
                                        <input
                                          type="text"
                                          class="form-control"
                                          name="email"
                                          id="email"
                                          placeholder="put the email"
                                          required
                                          onChange={(e) => setEmail(e.target.value)}
                                        ></input>
                                   
                                   
                                   </div>
                                </div>

                                <div class="form-group row">
                                    <label for="password" class="col-md-4 col-form-label text-md-right">password</label>
                                    <div class="col-md-8">
                                   
                                        <input
                                          type="password"
                                          class="form-control"
                                          name="password"
                                          id="passsword"
                                          placeholder="put the password"
                                          onChange={(e) => setPassword(e.target.value)}
                                          required
                                        ></input>
                                   
                                   
                                   </div>
                                </div>
                                <div class="form-group row">
                                    <label for="confPassword" class="col-md-4 col-form-label text-md-right">Confirm password</label>
                                    <div class="col-md-8">
                                   
                                        <input
                                          type="password"
                                          class="form-control"
                                          name="confPassword"
                                          id="confPassword"
                                          placeholder="put the password"
                                          required
                                        ></input>
                                   
                                   
                                   </div>
                                </div>

                                <div class="form-group row">
                                    <label htmlFor="address" class="col-md-4 col-form-label text-md-right">Address *</label>
                                    <div class="col-md-8">
                                            <input
                                            type="text"
                                            class="form-control"
                                            name="address"
                                            id="address"
                                            placeholder="put the address"
                                            required
                                            onChange={(e) => setAddress(e.target.value)}
                                          ></input>                                    
                                    
                                    
                                    
                                    
                                    
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="phone" class="col-md-4 col-form-label text-md-right">Phone Number</label>
                                    <div class="col-md-8">

                                        <input
                                                type="phone"
                                                id="phone"
                                                class="form-control"
                                                placeholder="put the phone"
                                                required
                                                onChange={(e) => setPhone(e.target.value)}
                                              ></input>




                                    </div>
                                </div>

                                <div class="form-group row">
                                    <label for="city" class="col-md-4 col-form-label text-md-right">City</label>
                                    <div class="col-md-8">                                    
         
                                    
                                        <select 
                                              type="city"
                                              id="city"
                                              class="form-control"
                                              placeholder="put the city"
                                              required
                                              onChange={(e) => setCity(e.target.value)}
                                              name="city">
                                                    <option value="ag">Agrigento</option>
                                                    <option value="al">Alessandria</option>
                                                    <option value="an">Ancona</option>
                                                    <option value="ao">Aosta</option>
                                                    <option value="ar">Arezzo</option>
                                                    <option value="ap">Ascoli Piceno</option>
                                                    <option value="at">Asti</option>
                                                    <option value="av">Avellino</option>
                                                    <option value="ba">Bari</option>
                                                    <option value="bt">Barletta-Andria-Trani</option>
                                                    <option value="bl">Belluno</option>
                                                    <option value="bn">Benevento</option>
                                                    <option value="bg">Bergamo</option>
                                                    <option value="bi">Biella</option>
                                                    <option value="bo">Bologna</option>
                                                    <option value="bz">Bolzano</option>
                                                    <option value="bs">Brescia</option>
                                                    <option value="br">Brindisi</option>
                                                    <option value="ca">Cagliari</option>
                                                    <option value="cl">Caltanissetta</option>
                                                    <option value="cb">Campobasso</option>
                                                    <option value="ci">Carbonia-iglesias</option>
                                                    <option value="ce">Caserta</option>
                                                    <option value="ct">Catania</option>
                                                    <option value="cz">Catanzaro</option>
                                                    <option value="ch">Chieti</option>
                                                    <option value="co">Como</option>
                                                    <option value="cs">Cosenza</option>
                                                    <option value="cr">Cremona</option>
                                                    <option value="kr">Crotone</option>
                                                    <option value="cn">Cuneo</option>
                                                    <option value="en">Enna</option>
                                                    <option value="fm">Fermo</option>
                                                    <option value="fe">Ferrara</option>
                                                    <option value="fi">Firenze</option>
                                                    <option value="fg">Foggia</option>
                                                    <option value="fc">Forl&igrave;-Cesena</option>
                                                    <option value="fr">Frosinone</option>
                                                    <option value="ge">Genova</option>
                                                    <option value="go">Gorizia</option>
                                                    <option value="gr">Grosseto</option>
                                                    <option value="im">Imperia</option>
                                                    <option value="is">Isernia</option>
                                                    <option value="sp">La spezia</option>
                                                    <option value="aq">L'aquila</option>
                                                    <option value="lt">Latina</option>
                                                    <option value="le">Lecce</option>
                                                    <option value="lc">Lecco</option>
                                                    <option value="li">Livorno</option>
                                                    <option value="lo">Lodi</option>
                                                    <option value="lu">Lucca</option>
                                                    <option value="mc">Macerata</option>
                                                    <option value="mn">Mantova</option>
                                                    <option value="ms">Massa-Carrara</option>
                                                    <option value="mt">Matera</option>
                                                    <option value="vs">Medio Campidano</option>
                                                    <option value="me">Messina</option>
                                                    <option value="mi">Milano</option>
                                                    <option value="mo">Modena</option>
                                                    <option value="mb">Monza e della Brianza</option>
                                                    <option value="na">Napoli</option>
                                                    <option value="no">Novara</option>
                                                    <option value="nu">Nuoro</option>
                                                    <option value="og">Ogliastra</option>
                                                    <option value="ot">Olbia-Tempio</option>
                                                    <option value="or">Oristano</option>
                                                    <option value="pd">Padova</option>
                                                    <option value="pa">Palermo</option>
                                                    <option value="pr">Parma</option>
                                                    <option value="pv">Pavia</option>
                                                    <option value="pg">Perugia</option>
                                                    <option value="pu">Pesaro e Urbino</option>
                                                    <option value="pe">Pescara</option>
                                                    <option value="pc">Piacenza</option>
                                                    <option value="pi">Pisa</option>
                                                    <option value="pt">Pistoia</option>
                                                    <option value="pn">Pordenone</option>
                                                    <option value="pz">Potenza</option>
                                                    <option value="po">Prato</option>
                                                    <option value="rg">Ragusa</option>
                                                    <option value="ra">Ravenna</option>
                                                    <option value="rc">Reggio di Calabria</option>
                                                    <option value="re">Reggio nell'Emilia</option>
                                                    <option value="ri">Rieti</option>
                                                    <option value="rn">Rimini</option>
                                                    <option value="rm">Roma</option>
                                                    <option value="ro">Rovigo</option>
                                                    <option value="sa">Salerno</option>
                                                    <option value="ss">Sassari</option>
                                                    <option value="sv">Savona</option>
                                                    <option value="si">Siena</option>
                                                    <option value="sr">Siracusa</option>
                                                    <option value="so">Sondrio</option>
                                                    <option value="ta">Taranto</option>
                                                    <option value="te">Teramo</option>
                                                    <option value="tr">Terni</option>
                                                    <option value="to">Torino</option>
                                                    <option value="tp">Trapani</option>
                                                    <option value="tn">Trento</option>
                                                    <option value="tv">Treviso</option>
                                                    <option value="ts">Trieste</option>
                                                    <option value="ud">Udine</option>
                                                    <option value="va">Varese</option>
                                                    <option value="ve">Venezia</option>
                                                    <option value="vb">Verbano-Cusio-Ossola</option>
                                                    <option value="vc">Vercelli</option>
                                                    <option value="vr">Verona</option>
                                                    <option value="vv">Vibo valentia</option>
                                                    <option value="vi">Vicenza</option>
                                                    <option value="vt">Viterbo</option>
                                         </select>
                                    
                                    
                                    </div>
                                </div>

                                    <div class="col-md-8 offset-md-4">
                                        <button variant="primary" onClick={(e) => validform("control 1")} class="btn btn-primary">
                                        Register
                                        </button>
                                    </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    </div>

</main>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
</body>




















</Col>

<Col xs lg="4">
    
</Col>
</Row>
<Row className="justify-content-center mt-2 mb-2">
<Col xs lg="4">
   
</Col>
<Col xs lg="4">
</Col>
</Row>
</Container>

);
};

function ShowTicketModal(props) {

return (
<Modal
show={props.show}
onHide={props.handleClose}
size="md"
aria-labelledby="contained-modal-title-vcenter"
centered>
<Modal.Header className="text-center font-weight-bold" closeButton onClick={props.handleClose}>Dear customer, here's your ticket number: </Modal.Header>
<Modal.Body className="display-1 text-center font-weight-bold">{props.message.number}</Modal.Body>
</Modal>
);
}


export default User;