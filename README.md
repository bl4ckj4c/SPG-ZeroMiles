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
    {
        "Name": "Ciccio",
        "Surname": "Franco",
        "FarmerID": "lMeqm2RmkDtBURW4AeUy",
        "Email": "cicio@hotmail.com",
        "Phoneno": "9874515888",
        "Address": "via Giuseppe Verdi",
        "State": "Torino",
        "Zipcode": "10138"
    },
    {
        "Name": "Franco",
        "Surname": "Roberto",
        "FarmerID": "zJbZkZDUPf9q91ZgS8ew",
        "Email": "alessio@hotmail.it",
        "Phoneno": "3400987654",
        "Address": "via Cristoforo Colombo",
        "State": "Cirella",
        "Zipcode": "87023"
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
      {
          "FarmerID": "lMeqm2RmkDtBURW4AeUy",
          "Name": "Ciccio",
          "Surname": "Franco",
          "Company": "Azienda 2",
          "Email": "cicio@hotmail.com",
          "Phoneno": "9874515888",
          "Address": "via Giuseppe Verdi",
          "State": "Torino",
          "Zipcode": "10138",
          "ProductID": "jppCV62HMquGu2JP01Eu",
          "NameProduct": "Mela",
          "Description": "red apple",
          "ImageID": "1",
          "Quantity": "2",
          "UnitOfMeasurement": "bag",
          "Price": "5"
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
