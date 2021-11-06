# Solidarity Purchasing Group

## React Client Application Routes

- Route `/`: homepage page for the website

## API Server

- GET `/api/Product`
  - **description**: get all products by farmers
  
  - **request parameters**: *none*
  
  - **response**: `200 OK` (success), `404 Not Found ` (empty table in Firebase) or `500 Internal Server Error` (generic error)
  
  - **response body content**: array of objects, each describing a product by a farmer
    
    ```json5
    [{
        Name: "farmer1",
        Quantity: 2,
        UnitOfMeasurement: "kg",
        NameProduct: "product1"
    },{
        Name: "farmer1",
        Quantity: 500,
        UnitOfMeasurement: "g",
        NameProduct: "product2"
    },{
        Name: "farmer2",
        Quantity: 500,
        UnitOfMeasurement: "g",
        NameProduct: "product1"
    },
    ...
    ]
    ```
    
    Error response `404`:
    
    ```json
    {
        "error": "No matching documents."
    }
    ```
## Database Tables
- Table `Farmer` is used to store farmer information and it contains the following fields and data:

   | ID                   | Name   | Surname  | Email              | Phoneno    | Address                | State   | Zipcode |
   | -------------------- | ------ | -------- | ------------------ | ---------- | ---------------------- | ------- | ------- |
   | JJeuoVa8fpl4wHGLK8FO | Pippo  | Paperino | pippo@hotmail.com  | 4125364789 | via Garibaldi          | Rome    | 01578   |
   | lMeqm2RmkDtBURW4AeUy | Ciccio | Franco   | cicio@hotmail.com  | 9874515888 | via Giuseppe Verdi     | Torino  | 10138   |
   | zJbZkZDUPf9q91ZgS8ew | Franco | Roberto  | alessio@hotmail.it | 3400987654 | via Cristoforo Colombo | Cirella | 87023   |

-  Table `Product` is used to store a product and it contains the following fields and data:
   
   | ID                   | Name       | Description    | ImageID |
   | -------------------- | ---------- | -------------- | ------- |
   | MUQoYddzRZSmHQliVfkA | Banana     | yellow banana  | 0       |
   | jppCV62HMquGu2JP01Eu | Mela       | red apple      | 1       |
   | yO3IMNEUlAWnllA2Hxyf | Strawberry | red strawberry | 2       |
   
-  Table `Products by Farmers` is used to store the products sold by each farmer and it contains the following fields and data:
   
   | ID                   | FarmerID             | ProductID            | Quantity | Unitofmeasurement | Price |
   | -------------------- | -------------------- | -------------------- | -------- | ----------------- | ----- |
   | S0F5R4D1xF16w5mJmkHM | JJeuoVa8fpl4wHGLK8FO | MUQoYddzRZSmHQliVfkA | 20       | kg                | 25    |
   | jSgQy72Db130XsqiB3GI | lMeqm2RmkDtBURW4AeUy | jppCV62HMquGu2JP01Eu | 2        | bag               | 5     |


## Main React Components

- `Placeholder` (in `Placeholder.js`): component to generate a placeholder

## Screenshots

![Screenshot](./img/screenshot1.PNG)
