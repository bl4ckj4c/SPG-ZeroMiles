# Library for JSON parsing
import json

import random
import numpy as np

import time

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

    # for product in JSONProducts['products']:
    for i in range(1, 5):
        # print(product)
        product = JSONProducts['products'][i]

        data = {
            'Name': product['name'],
            'Description': product['description'],
            'ImageID': product['photoId']
        }
        print(json.dumps(data, indent=4))
        db.collection(u'Product').add(data)
        count += 1

        print(count)


def deleteProducts():
    # Delete tuples in Product by Farmers
    docs = db.collection(u'Product').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Product').document(doc.id).delete()


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

    quantities = range(1, 10)
    units = ['kg', 'bag']
    prices = np.arange(0.5, 30, 0.5)

    for farmer in Farmers:
        farmerDict = farmer.to_dict()

        for i in range(1, 2):

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

def deleteOrdersTuples():
    # Delete tuples in Order
    docs = db.collection(u'Order').get()
    for doc in docs:
        #print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Order').document(doc.id).delete()

def insertOrdersTuples():
    Clients = db.collection(u'User').get()
    Products = db.collection(u'Product').get()
    ProductByFarmers = db.collection(u'Product by Farmers').get()

    quantities = range(1, 10)

    for client in Clients:
        clientDict = client.to_dict()
        productList = []

        numbers = range(1, random.choice([2, 3, 4, 5]))

        for i in numbers:

            randomProduct = random.choice(Products)
            randomProductDict = randomProduct.to_dict()

            productByFarmer = db.collection(u'Product by Farmers').where('ProductID', '==', str(randomProduct.id)).get()
            productByFarmerDict = productByFarmer[0].to_dict()

            #print(json.dumps(randomProductDict, indent=4))
            #print(json.dumps(productByFarmer[0].to_dict(), indent=4))


            quantity = random.choice(quantities)

            productList.append({
                'FarmerID': productByFarmerDict['FarmerID'],
                'ImageID': randomProductDict['ImageID'],
                'NameProduct': randomProductDict['Name'],
                'Price': productByFarmerDict['Price'],
                'ProductID': productByFarmerDict['ProductID'],
                'number': quantity
            })

        data = {
            'ClientID': client.id,
            'Products': productList,
            'Status': 'open',
            'Timestamp': time.strftime('%d-%m-%Y %H:%M:%S', time.localtime())
        }
        #print(json.dumps(data, indent=4))
        db.collection(u'Order').add(data)


if __name__ == '__main__':
    # deleteProducts()
    # loadProductsToFirebase()
    # deleteProductByFarmersTuples()
    # insertProductByFarmersTuples()
    deleteOrdersTuples()
    insertOrdersTuples()
    print('DONE')
