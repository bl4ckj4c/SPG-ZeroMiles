function ProductInOrder(ProductinorderID, OrderID, ProductbyfarmerID, ProductName, Quantity) {
    this.ProductinorderID = ProductinorderID;
    this.OrderID = OrderID;
    this.ProductbyfarmerID = ProductbyfarmerID;
    this.ProductName = ProductName;
    this.Quantity = Quantity;
   
}

function Order(OrderID, Status, ClientID, Client, Timestamp, ProductInOrder, DeliveryDate, DeliveryPlace, pickupTimestamp, notRetired){
    this.OrderID = OrderID;
    this.Status = Status;
    this.ClientID = ClientID;
    this.Phoneno = Client.Phoneno;
    this.Email = Client.Email;
    this.Zipcode = Client.Zipcode;
    this.State = Client.State;
    this.Address = Client.Address;
    this.City = Client.City;
    this.Name = Client.Name;
    this.Password = Client.Password;
    this.Role = Client.Role;
    this.Surname = Client.Surname;
    this.Timestamp = Timestamp;
    this.ProductInOrder = ProductInOrder;
    this.DeliveryDate = DeliveryDate;
    this.DeliveryPlace = DeliveryPlace;
    this.pickupTimestamp = pickupTimestamp;
    this.notRetired = notRetired;
}


function User(Name, Surname, UserID, Email, Phoneno, Address, City, State, Zipcode, Role, Wallet){
    this.Name = Name;
    this.Surname = Surname;
    this.UserID = UserID;
    this.Email = Email;
    this.Phoneno = Phoneno;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.Zipcode = Zipcode;
    this.Role = Role;
    this.Wallet = Wallet;
}

export { ProductInOrder, Order, User };