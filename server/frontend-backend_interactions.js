/* 
** 
**
*/

/* 
** 
*/

// *************************
// *** Database structure **
// *** (and related JSON) **
// *************************


const user = {
    Name: "",
    Surname: "",
    UserID: "(automatic)",
    Email: "",
    Phoneno: "",
    Address: "",
    State: "",
    Zipcode: ""
}

const farmer = {
    Name: "",
    Surname: "",
    FarmerID: "(automatic",
    Email: "",
    Phoneno: "",
    Address: "",
    State: "",
    Zipcode: ""
}

const product = {
    Name: "",
    ProductID: "(automatic)",
    ImageID: "",
    Description: ""
}

const product_by_farmers = {
    ProductbyfarmerID: "(automatic)",
    FarmerID: "(foreign)",
    ProductID: "(foreign)",
    Quantity: "",
    Unitofmeasurement: "",
    Price: ""
}

const image = {
    ImageID: "(automatic)",
    Impagepath: ""
}

const order = {
    OrderID: "(automatic)",
    ClientID: "(foreign)",
    Timestamp: "",
    ProductinorderID: "(foreign)"
}

const product_in_order = {
    ProductinorderID: "(automatic)",
    OrderID: "(foreign)",
    ProductbyfarmerID: "(foreign)",
    Quantity
}