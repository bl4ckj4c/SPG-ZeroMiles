# Library for JSON parsing
import json

import random
import numpy as np

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "./polito-se2-21-01-spg-firebase-adminsdk-76fui-7b28269ea6.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'polito-se2-21-01-spg'
})
db = firestore.client()


def loadProductsToFirebase():
    file = open('ProductsJSON.json')
    JSONProducts = json.load(file)

    count = 0

    for product in JSONProducts['products']:
        print(product)

        data = {
            'Name': product['name'],
            'Description': product['description'],
            'ImageID': product['photoId']
        }
        print(json.dumps(data, indent=4))
        db.collection(u'Product').add(data)
        count += 1

        print(count)

def deleteProductByFarmersTuples():
    # Delete tuples in Product by Farmers
    docs = db.collection(u'Product by Farmers').get()
    for doc in docs:
        #print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Product by Farmers').document(doc.id).delete()

def insertProductByFarmersTuples():
    # Insertion of Product by Farmers
    Farmers = db.collection(u'Farmer').get()
    Products = db.collection(u'Product').get()

    quantities= range(1, 10)
    units = ['kg', 'bag']
    prices = np.arange(0.5, 30, 0.5)

    for farmer in Farmers:
        farmerDict = farmer.to_dict()

        for i in range(1, 20):

            randomProduct = random.choice(Products)
            randomProductDict = randomProduct.to_dict()

            quantity = random.choice(quantities)
            unit = random.choice(units)
            if unit == 'kg':
                price = random.choice(prices)
            else:
                price = int(random.choice(prices))


            data = {
                'FarmerID': farmer.id,
                'ProductID': randomProduct.id,
                'Quantity': quantity,
                'Unitofmeasurement': unit,
                'Price': price
            }
            #print(json.dumps(data, indent=4))
            db.collection(u'Product by Farmers').add(data)

if __name__ == '__main__':
    #loadProductsToFirebase()
    deleteProductByFarmersTuples()
    insertProductByFarmersTuples()