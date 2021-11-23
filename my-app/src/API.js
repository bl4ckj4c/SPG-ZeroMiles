import { ProductByFarmer, Farmer } from './Products/Products.js';
import { ProductInOrder, Order, User } from './Orders/Orders.js';

/**
 * All the API calls
 */
 const BASEURL = '/api';



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


async function getOrder() {
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




async function getProductByFarmer() {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/productByFarmer', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((pbf) => new ProductByFarmer(...Object.values(pbf)));
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
  

async function userLogin(username, password) {
    const response = await fetch(BASEURL + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }); 

    if (response.ok) {
        console.log(response.json());
        return response;
    } 
    
    return {'err': 'LOGIN error'};
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



const API = {   
   
    getProductByFarmer,
    getFarmer,
    addOrder,
    
    getOrder,
    getProductInOrder, 
    getAllUsers,
    getOrders,
    modifyOrderStatus,

    userLogin,
    userLogout,
    getUserInfo
};
export default API;
