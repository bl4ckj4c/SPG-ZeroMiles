# Solidarity Purchasing Group

## React Client Application Routes

- Route `/`: homepage page for the website

## API Server

- GET `/api/farmers`
  - **description**: get all farmers
  
  - **request parameters**: *none*
  
  - **response**: `200 OK` (success) or `500 Internal Server Error` (generic error)
  
  - **response body content**: array of objects, each describing a farmer
    
    ```json5
    [{
        "Name": "Pippo",
        "Surname": "Paperino",
        "FarmerID": "JJeuoVa8fpl4wHGLK8FO",
        "Email": "pippo@hotmail.com",
        "Phoneno": "4125364789",
        "Address": "via Garibaldi ",
        "State": "Rome",
        "Zipcode": "01578"
    },
    ...
    ]
    ```
  
- GET `/api/productByFarmer`
    - **description**: get all products by farmers

    - **request parameters**: *none*

    - **response**: `200 OK` (success), `404 Not Found ` (empty table in Firebase) or `500 Internal Server Error` (generic error)

    - **response body content**: array of objects, each describing a product by a farmer

      ```json5
      
      [{
          "FarmerID": "JJeuoVa8fpl4wHGLK8FO",
          "Name": "Pippo",
          "Surname": "Paperino",
          "Company": "Azienda 1",
          "Email": "pippo@hotmail.com",
          "Phoneno": "4125364789",
          "Address": "via Garibaldi ",
          "State": "Rome",
          "Zipcode": "01578",
          "ProductID": "MUQoYddzRZSmHQliVfkA",
          "NameProduct": "Banana",
          "Description": "yellow banana",
          "ImageID": "0",
          "Quantity": "20",
          "UnitOfMeasurement": "kg",
          "Price": "25"
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
    
- POST `/api/register`
  
  - **description**: insert a new user into the database
  
  - **request parameters**: *none*
  
  - **request body**: object describing the new user
  
      ```json5
      {
          "name": "Teddy",
          "lastName": "Agnez",
          "email": "mario.rossi@gmail.com",
          "address": "Via Bolivia",
          "phone": "9938893232",
          "city": "fi",
          "password": "qwerty"
      }
      ```
      
  - **response**: `201 Created` (success), `400 Bad Request` (error in passed parameters) or `500 Internal Server Error` (generic error)
  
  - **response body content**: *none* in case of success, error object in case of error
  
      ```json5
      {
          "info": "The server cannot process the request",
          "errors": [
              {
                  "param": "name",
                  "error": "Invalid value"
              },
              ...
          ]
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

- Table `User` is used to store user information and it contains the following fields and data:

   | ID                                   | name  | surname | email                 | address           | phone      | city | password |
   | ------------------------------------ | ----- | ------- | --------------------- | ----------------- | ---------- | ---- | -------- |
   | 37929302-bd1d-4364-99dc-b53ae22b38aa | maria | Rossa   | mariarossa@gmail.com  | via monginevro 21 | 9938893435 | ca   | qwerty   |
   | aa8eb4f9-4822-4772-b7ad-128a8710ac07 | Teddy | Agnez   | mario.rossi@gmail.com | Via Bolivia       | 9938893232 | fi   | qwerty   |

   

## Main React Components

- `Placeholder` (in `Placeholder.js`): component to generate a placeholder

## Screenshots

![Screenshot](./img/screenshot1.PNG)
