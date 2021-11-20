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
        return {'msg': 'JSON of the user, to know what kind of user has logged in'}
    } 
    
    return {'err': ''};
}

const API = {   
   
    getProductByFarmer,
    getFarmer,
    addOrder,
    
    getOrder,
    getProductInOrder, 
    getAllUsers,
<<<<<<< HEAD
    getOrders
=======

    userLogin
>>>>>>> 9253f3f848b0cddb6708fe87cc2c44e93065eea1
};
export default API;
