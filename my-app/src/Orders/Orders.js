function ProductInOrder(ProductinorderID, OrderID, ProductbyfarmerID, ProductName, Quantity) {
    this.ProductinorderID = ProductinorderID;
    this.OrderID = OrderID;
    this.ProductbyfarmerID = ProductbyfarmerID;
    this.ProductName = ProductName;
    this.Quantity = Quantity;
   
}

function Order(OrderID, ClientID, Timestamp, ProductinorderID){
    this.OrderID = OrderID;
    this.ClientID = ClientID;
    this.Timestamp = Timestamp;
    this.ProductinorderID = ProductinorderID;
  
}


function User(Name, Surname, UserID, Email, Phoneno, Address, City, State, Zipcode){
    this.Name = Name;
    this.Surname = Surname;
    this.UserID = UserID;
    this.Email = Email;
    this.Phoneno = Phoneno;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.Zipcode = Zipcode;
}

export { ProductInOrder, Order, User };