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

async function getAllProductsByFarmers(spg_date) {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/allProductsByFarmers/'+spg_date, { method: 'GET' });
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
async function getProductsByFarmer(spg_date1){
    let data = [];
    try {
        const res = await fetch(BASEURL + '/productsByFarmer/'+ spg_date1, { method: 'GET' });
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
    let res = await response.json();
    return res;
  }

  async function getOrders(spg_date1) {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/orders/'+ spg_date1, { method: 'GET' });
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

async function getClientOrders(spg_date1){
    let data = [];

    try {
        const res = await fetch(BASEURL + '/clientorders/'+ spg_date1, { method: 'GET' });
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


  async function createProduct(newProduct, newImage) {
      const formData  = new FormData();

      formData.append('productJson', JSON.stringify(newProduct));
      formData.append('newproductimage', newImage);

      const response = await fetch(BASEURL + "/newproduct", {
          method: 'POST',
          body: formData
      });

      return response;
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

async function addProduct(product,dayOfWeek){

    const response = await fetch(BASEURL + "/addProduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product, date :dayOfWeek })
    });  
  
    if(response.ok){
        return response.json();
    }
    return { 'err': 'POST error' };
  }


  async function deleteProduct(product){

    const response = await fetch(BASEURL + "/deleteProduct", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...product})
    });  
  
    if(response.ok){
        return { 'msg': 'Product succesfully deleted' };
    }
    return { 'err': 'POST error' };
  }


  async function modifyDelivery(delivery){

    const response = await fetch(BASEURL + "/modifyDelivery", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...delivery})
    });  
  
    if(response.ok){
        return { 'msg': 'Order update' };
    }
    return { 'err': 'POST error' };
  }
  
  async function setPickUpTime(pickupTimestamp){

    const response = await fetch(BASEURL + "/setPickUpTime", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...pickupTimestamp})
    });  
  
    if(response.ok){
        return { 'msg': 'Order update' };
    }
    return { 'err': 'POST error' };
  }
  


  async function setTimeMachine(newdate){

    const response = await fetch(BASEURL + "/timeMachine", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({newdate: newdate})
    })

    if(response.ok){
        console.log("Time machine successfully set")
        return { 'msg': 'Time machine successfully set' };
    }
    console.log("Something went wrong, Doc")
    return { 'err': 'Something went wrong, Doc ' };
  }
  

async function getMonthlyNotRetiredOrders(timestamp){
    let data = [];

    try {

        const res = await fetch(BASEURL + "/monthlyNotRetiredOrders/" + timestamp, { method: 'GET' })

        if(res.status===404){  //there are no entries 
            return [];
        }
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((o) => new Order(...Object.values(o)));
}

async function getWeeklyNotRetiredOrders(timestamp){
    let data = [];

    try {
        const res = await fetch(BASEURL + "/weeklyNotRetiredOrders/" + timestamp, { method: 'GET' })
        if(res.status===404){  //there are no entries 
            return [];
        }
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((o) => new Order(...Object.values(o)));
}

async function getNotRetiredOrder() {
    let data ;
    try {
        const res = await fetch(BASEURL + '/notRetiredOreder', { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data;
}


async function getProductsByOneFarmer(spg_date1) {
    let data = [];
    try {
        const res = await fetch(BASEURL + '/confirmationProduct/'+ spg_date1, { method: 'GET' });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        data = await res.json();
    } catch (e) {
        throw new Error(e);
    }
    return data.map((o) => new Order(...Object.values(o)));
}

const API = {   
   
    getAllProductsByFarmers,
    getProductsByFarmer,
    getFarmer,
    addOrder,
    addProduct,
    deleteProduct,
    modifyDelivery,
    clientCheck,
    getProductInOrder, 
    getAllUsers,
    getAllProducts,
    getOrders,
    modifyOrderStatus,
    modifyWallet,
    getNotRetiredOrder,
    getProductsByOneFarmer,

    createProduct,



    userRegister,
    userLogin,
    userLogout,
    getUserInfo,
    getClientOrders,
    getClient,
    farmerRegister,
    setTimeMachine,
    setPickUpTime,
    getMonthlyNotRetiredOrders,
    getWeeklyNotRetiredOrders
};
export default API;
