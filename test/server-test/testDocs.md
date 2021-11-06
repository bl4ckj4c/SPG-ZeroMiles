# Unit test

## General aspects

The unit tests for the back-end side are written using Python as language. This allows to write tests in a very fast way, trying all the RESTful APIs exposed by the server. The main library used to send those requests is `requests`.

## GET all farmers

The unit test of this method consists in sending the GET request to the server and check if the response is correct and the JSON is well-formed. The URL contacted is `/api/farmers`. The test method uses two arrays, one is for store the fields that need to be checked and the other contains the expected formatting in the form of regular expressions.<br/>The outer for loop checks every farmer retrieved by the server, while the inner loop checks that each object inside the array is well-formed, so all fields present and valid.

| Field    | Regex                                               |
| -------- | --------------------------------------------------- |
| Name     | `^[a-zA-Z]+$`                                       |
| Surname  | `^[a-zA-Z]+$`                                       |
| FarmerID | `^.+$`                                              |
| Email    | `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$` |
| Phoneno  | `^(\+(\([0-9]{1,2}\))?)?[0-9]+$`                    |
| Address  | `a-zA-Z\,\.0-9\t\n\r\f\v\s]+$`                      |
| State    | `^[a-zA-Z]+$`                                       |
| Zipcode  | `^[0-9]{5}`                                         |

The output of the test is none if it passes, otherwise it's a JSON object containing an array in which object contains the wrong farmer and the wrong field(s) that caused the fail of the test.

```json5
{
    "errors": [
        {
            "farmer": {
                "Name": "Pippo",
                "Surname": "Paperino",
                "FarmerID": "JJeuoVa8fpl4wHGLK8FO",
                "Email": "pippo@hotmail.com",
                "Phoneno": "4125abcdfs64789",
                "Address": "via Garibaldi ",
                "State": "Rome",
                "Zipcode": "01578"
            },
            "errors": [
                {
                    "field": "Phoneno",
                    "error": "wrong format, not matching the regex"
                }
            ]
        },
        ...
    ]
}
```



## GET all products by farmer

The unit test of this method consists in sending the GET request to the server and check if the response is correct and the JSON is well-formed. The URL contacted is `/api/productByFarmer`. The test method uses two arrays, one is for store the fields that need to be checked and the other contains the expected formatting in the form of regular expressions.<br/>The outer for loop checks every product by farmer retrieved by the server, while the inner loop checks that each object inside the array is well-formed, so all fields present and valid.

| Field             | Regex                                     |
| ----------------- | ----------------------------------------- |
| FarmerID          | `^.+$`                                    |
| Name              | `^[a-zA-Z]+$`                             |
| Surname           | `^[a-zA-Z]+$`                             |
| Company           | `^[a-zA-Z\-\_\s0-9\.\,]+$`                |
| Email             | `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z` |
| Phoneno           | `^(\+(\([0-9]{1,2}\))?)?[0-9]+$`          |
| Address           | `^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$`          |
| State             | `^[a-zA-Z]+$`                             |
| Zipcode           | `^[0-9]{5}$`                              |
| ProductID         | `^.+$`                                    |
| NameProduct       | `^[a-zA-Z\-\_0-9\.\,]+$`                  |
| Description       | `^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$`          |
| ImageID           | `^[0-9]+$`                                |
| Quantity          | `^[0-9]+$`                                |
| UnitOfMeasurement | `^[a-zA-Z]+$`                             |
| Price             | `^([1-9][0-9]{,2}(,[0-9]{3})*`            |

The output of the test is none if it passes, otherwise it's a JSON object containing an array in which object contains the wrong farmer and the wrong field(s) that caused the fail of the test.

```json5
{
    "errors": [
        {
            "productbyfarmer": {
                "FarmerID": "JJeuoVa8fpl4wHGLK8FO",
                "Name": "Pippo",
                "Surname": "Paperino",
                "Company": "Azienda&%^$",
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
            "errors": [
                {
                    "field": "Company",
                    "error": "wrong format, not matching the regex"
                }
            ]
        },
        ...
    ]
}
```

