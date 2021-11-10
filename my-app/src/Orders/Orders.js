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

export { ProductInOrder, Order };