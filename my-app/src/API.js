import { Product, ProductByFarmer, ProductByFarmerLITE, Farmer } from './Products/Products.js';
import { ProductInOrder, Order, User } from './Orders/Orders.js';

/**
 * All the API calls
 */
 const BASEURL = '/api';


//get all products by all farmers
async function getProductInOrder() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/productinorder', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((pio) => new ProductInOrder(...Object.values(pio)));
}

async function getAllProductsByFarmers() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/allProductsByFarmers', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((pbf) => new ProductByFarmer(...Object.values(pbf)));
}


//get products by a single farmer
async function getProductsByFarmer(){
    let data = [];
    try {
        const res = await fetch(BASEURL + '/productsByFarmer', { method: 'GET' });
        console.log("HERE "+res.statusText);
        if (!res.ok) {
            
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((pbf) => new ProductByFarmerLITE(...Object.values(pbf)));
}

async function getFarmer() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/farmers', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((f) => new Farmer(...Object.values(f)));
}

async function getAllUsers() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/users', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((f) => new User(...Object.values(f)));
}

async function getAllProducts() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/products', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((f) => new Product(...Object.values(f)));
}

/*
async function getProductByFarmer(counterID) {
    const response = await fetch(BASEURL + '/productByFarmer');
    const responseBody = await response.json();
    if (response.ok) {
        return responseBody;
        ;
    }
    else {
        throw responseBody;
    }
} */

  async function addOrder(order){

    const response = await fetch(BASEURL + "/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...order})
    });  
  
    if(response.ok){
        return { 'msg': 'Order succesfully added' };
    }
    return { 'err': 'POST error' };
  }

  async function getOrders() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/orders', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((o) => new Order(...Object.values(o)));
}
  
async function getClient(){
    let data = [];
    try {
        const res = await fetch(BASEURL + '/userinfo', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data[0];
}

async function getClientOrders(clientid){
    let data = [];
    try {
        const res = await fetch(BASEURL + '/clientorders', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
        console.log(data.length);
    } catch (e) {
        throw new Error(e);
    }
    return data.map((o) => new Order(...Object.values(o)));
}

async function userRegister(name, surname, email, address, phone, city, password, zipcode, stateCaps) {

    const response = await fetch(BASEURL + "/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, surname, email, address, phone, city, password, zipcode, stateCaps})
    });
    return response;
}

/*
async function userLogin(username, password) {
    const response = await fetch(BASEURL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }); 
    return response;
}*/

async function userLogin(username, password) {
    let response = await fetch(BASEURL + "/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password}),
    });
    if(!response.ok) {
        try {
            const errDetail = await response.json();
            throw errDetail.error;
          }
          catch(err) {
            throw err;
          }
    }
    return response;
  }

async function userLogout(username, password) {
    const response = await fetch(BASEURL + "/logout", {
        method: 'POST',
    })
    
    if (response.ok) {
        console.log("User successfully logged out");
        return {'msg': 'User successfully logged out'}
    }
    else{
        console.log("Error logout");
        return {'err': 'LOGOUT error'};
    }
}

async function getUserInfo() {
    const response = await fetch('/api/sessions/current');
    const userInfo = await response.json();
    if (response.ok) {
        //console.log(userInfo);
        return userInfo;
    } else {
      return {};  // an object with the error coming from the server
    }
  }

async function modifyOrderStatus(order){

    const response = await fetch(BASEURL + "/modifyorder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: order.OrderID,
            Status: order.Status
        })
    });  
  
    if(response.ok){
        return { 'msg': 'Order status succesfully changed' };
    }
    return { 'err': 'POST error' };
  }


  async function modifyWallet(client){

    const response = await fetch(BASEURL + "/modifywallet", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...client})
    });  
  
    if(response.ok){
        return { 'msg': 'Wallet Aggiornato' };
    }
    return { 'err': 'POST error' };
  }
  
  async function clientCheck(idClient){

    const response = await fetch(BASEURL + "/checkClient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...idClient})
    });  
  
    if(response.ok){
        return response.json();
    }
    return { 'err': 'POST error' };
  }

  async function createProduct(newProduct) {
      const formData  = new FormData();

      formData.append('productJson', newProduct);
      formData.append('image', 'imagePlaceholder');


      const response = await fetch(BASEURL + "/newproduct", {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          body: formData
      });
  }


  async function farmerRegister(farmer) {

    const response = await fetch(BASEURL + "/farmerRegister", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...farmer})
    });
    return response;
}

async function addProduct(product){

    const response = await fetch(BASEURL + "/addProduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product})
    });  
  
    if(response.ok){
        return { 'msg': 'Order succesfully added' };
    }
    return { 'err': 'POST error' };
  }


  

const API = {   
   
    getAllProductsByFarmers,
    getProductsByFarmer,
    getFarmer,
    addOrder,
    addProduct,
    
    clientCheck,
    getProductInOrder, 
    getAllUsers,
    getAllProducts,
    getOrders,
    modifyOrderStatus,
    modifyWallet,

    createProduct,


    userRegister,
    userLogin,
    userLogout,
    getUserInfo,
    getClientOrders,
    getClient,
    farmerRegister,
};
export default API;
