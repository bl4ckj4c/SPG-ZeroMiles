# Library for JSON parsing
import json

import random
import numpy as np

import time

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "./polito-se2-21-01-spg-backup-3-firebase-adminsdk-kn5e2-979f8d4105.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'polito-se2-21-01-spg-backup-3'
})
db = firestore.client()

# Global variables for products, users and farmers
global JSONData
global JSONProducts
global JSONUsers
global JSONFarmers

global ProductsIDByFirebase
ProductsIDByFirebase = []
global FarmersIDByFirebase
FarmersIDByFirebase = []

# Load all data from JSON file
file = open('FirebaseDataFill.json')
JSONData = json.load(file)

JSONProducts = JSONData['products']
JSONUsers = JSONData['users']
JSONFarmers = JSONData['farmers']

# Delete tuples inside 'Product' table in Firebase
def deleteProducts():
    count = 0

    docs = db.collection(u'Product').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Product').document(doc.id).delete()
        count += 1
    print('Deleted ' + str(count) + ' products!')

# Load products inside 'Product' table in Firebase
def loadProductsToFirebase():
    count = 0

    for product in JSONProducts:
    #for i in range(1, 5):
        # print(product)
        #product = JSONProducts['products'][i]

        data = {
            'Name': product['name'],
            'Description': product['description'],
            'ImageID': product['photoId']
        }
        print(json.dumps(data, indent=4))
        productId = db.collection(u'Product').add(data)

        ProductsIDByFirebase.append(productId[1].id)

        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' products!')

# Delete tuples inside 'User' table in Firebase
def deleteUserTuples():
    count = 0

    docs = db.collection(u'User').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'User').document(doc.id).delete()
        count += 1
    print('Deleted ' + str(count) + ' users!')

# Load users inside 'User' table in Firebase
def loadUsers():
    count = 0

    for user in JSONUsers:
    #for i in range(1, 5):
        # print(product)
        #product = JSONProducts['products'][i]

        print(json.dumps(user, indent=4))
        db.collection(u'User').add(user)
        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' users!')

# Delete tuples inside 'Farmer' table in Firebase
def deleteFarmerTuples():
    count = 0

    docs = db.collection(u'Farmer').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Farmer').document(doc.id).delete()
        count += 1
    print('Deleted ' + str(count) + ' farmers!')

# Load users inside 'Farmer' table in Firebase
def loadFarmers():
    count = 0

    for farmer in JSONFarmers:
    #for i in range(1, 5):
        # print(product)
        #product = JSONProducts['products'][i]

        print(json.dumps(farmer, indent=4))
        farmerID = db.collection(u'Farmer').add(farmer)

        FarmersIDByFirebase.append(farmerID[1].id)

        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' farmers!')

# Delete tuples inside 'Product by Farmers' table in Firebase
def deleteProductByFarmersTuples():
    count = 0

    docs = db.collection(u'Product by Farmers').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Product by Farmers').document(doc.id).delete()
        count += 1
    print('Deleted ' + str(count) + ' products by farmers!')


# Load products by farmers inside 'Product by Farmers' table in Firebase
def insertProductByFarmersTuples():
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


# Delete tuples inside 'Order' table in Firebase
def deleteOrdersTuples():
    count = 0

    docs = db.collection(u'Order').get()
    for doc in docs:
        print(f'Remove tuple => {json.dumps(doc.to_dict(), indent=4)}\n')
        db.collection(u'Order').document(doc.id).delete()
        count += 1
    print('Deleted ' + str(count) + ' orders!')


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

# Load products, farmers and products by farmers
def loadProductsFarmersAndProductsByFarmers(delete=False):

    # Delete tuples only if the variable is set
    if delete:
        # Delete all products
        deleteProducts()
        # Delete all farmers
        deleteFarmerTuples()
        # Delete all product by farmers
        deleteProductByFarmersTuples()
    
    # Populate Firebase collections
    # Insert products
    print('Starting upload')
    print('- Uploading products')
    loadProductsToFirebase()
    print('- Products uploaded')
    # Insert farmers
    print('- Uploading farmers')
    loadFarmers()
    print('- Farmers uploaded')
    # Insert products by farmers
    productsInserted = []
    for indexFarmer, farmer in enumerate(JSONFarmers):

        print('  - Farmer ' + str(indexFarmer) + ': ', end = '')

        for i in range(1, random.choice(range(5, 10))):
            # Find a random product not already inserted
            randomProductIndex = random.choice(range(0, len(JSONProducts)))
            while randomProductIndex in productsInserted:
                randomProductIndex = random.choice(range(0, len(JSONProducts)))

            productsInserted.append(randomProductIndex)
            randomProduct = JSONProducts[randomProductIndex]

            quantity = randomProduct['offers'][indexFarmer]['quantity']
            unit = randomProduct['offers'][indexFarmer]['unitofmeasurement']
            price = randomProduct['offers'][indexFarmer]['price']

            data = {
                'FarmerID': FarmersIDByFirebase[indexFarmer],
                'ProductID': ProductsIDByFirebase[randomProductIndex],
                'Quantity': quantity,
                'Unitofmeasurement': unit,
                'Price': price,
                'Week': 2
            }
            #print(json.dumps(data, indent=4))
            db.collection(u'Product by Farmers').add(data)
            print('.', end = '')
        print('\n')
    print('- Product by Farmers uploaded')



    
    


if __name__ == '__main__':
    # deleteProducts()
    loadProductsToFirebase()
    # deleteProductByFarmersTuples()
    insertProductByFarmersTuples()
    # deleteOrdersTuples()
    # insertOrdersTuples()
    loadUsers()
    loadProductsFarmersAndProductsByFarmers(delete=True)
    print('DONE')