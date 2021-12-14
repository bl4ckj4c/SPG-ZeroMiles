# Library for JSON parsing
import json

import random
import numpy as np

import time

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

credBackup3 = credentials.Certificate(
    './polito-se2-21-01-spg-backup-3-firebase-adminsdk-kn5e2-979f8d4105.json'
)
appBackup3 = firebase_admin.initialize_app(credBackup3, {
    'projectId': 'polito-se2-21-01-spg-backup-3'
}, 'Backup3')

db = firestore.client(appBackup3)

# Global variables for products, users and farmers
global JSONData
global JSONProducts
global JSONUsers
global JSONFarmers

# Load all data from JSON file
file = open('FirebaseDataFill.json')
JSONData = json.load(file)

JSONProducts = JSONData['products']
JSONUsers = JSONData['users']
JSONFarmers = JSONData['farmers']

# Remove old data from Firebase
def cleanFirebase():
    # User
    docs = db.collection(u'User').get()
    for doc in docs:
        db.collection(u'User').document(doc.id).delete()

    # Farmer
    docs = db.collection(u'Farmer').get()
    for doc in docs:
        db.collection(u'Farmer').document(doc.id).delete()

    # Product
    docs = db.collection(u'Product').get()
    for doc in docs:
        db.collection(u'Product').document(doc.id).delete()

    # Order
    docs = db.collection(u'Order').get()
    for doc in docs:
        db.collection(u'Order').document(doc.id).delete()

    # Product by Farmers
    docs = db.collection(u'Product by Farmers').get()
    for doc in docs:
        db.collection(u'Product by Farmers').document(doc.id).delete()

# Load users inside 'User' table in Firebase
def loadUsers():

    count = 0

    for user in JSONUsers:
        print(json.dumps(user, indent=4))
        db.collection(u'User').document(user['ID']).set({
            'Name': user['Name'],
			'Surname': user['Surname'],
			'Email': user['Email'],
			'Phoneno': user['Phoneno'],
			'Address': user['Address'],
			'City': user['City'],
			'State': user['State'],
			'Zipcode': user['Zipcode'],
			'Password': user['Password'],
			'Role': user['Role'],
			'Wallet': user['Wallet']
        })
        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' users!')

# Load farmers inside 'Farmer' adn 'User' tables in Firebase
def loadFarmers():

    count = 0

    for farmer in JSONFarmers:
        print(json.dumps(farmer, indent=4))
        db.collection(u'Farmer').document(farmer['ID']).set({
            'Name': farmer['Name'],
			'Surname': farmer['Surname'],
			'Email': farmer['Email'],
            'Company': farmer['Company'],
			'Phoneno': farmer['Phoneno'],
			'Address': farmer['Address'],
			'State': farmer['State'],
			'Zipcode': farmer['Zipcode'],
			'Distance': farmer['Distance']
        })
        db.collection(u'User').document(farmer['ID']).set({
            'Name': farmer['Name'],
			'Surname': farmer['Surname'],
			'Email': farmer['Email'],
            'Company': farmer['Company'],
			'Phoneno': farmer['Phoneno'],
			'Address': farmer['Address'],
			'City': farmer['City'],
			'State': farmer['State'],
			'Zipcode': farmer['Zipcode'],
			'Password': farmer['Password'],
			'Role': farmer['Role'],
			'Wallet': farmer['Wallet']
        })
        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' farmers!')

# Load products inside 'Product' table in Firebase
def loadProducts():
    count = 0

    for product in JSONProducts:

        data = {
            'Name': product['name'],
            'Description': product['description'],
            'ImageID': product['photoId']
        }
        print(json.dumps(data, indent=4))
        productId = db.collection(u'Product').document(product['id']).set(data)

        count += 1

        #print(count)
    print('Inserted ' + str(count) + ' products!')

# Load products by farmers inside 'Product by Farmers' table in Firebase
def loadProductsByFarmers():
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
                'FarmerID': farmer['ID'],
                'ProductID': randomProduct['id'],
                'Quantity': quantity,
                'Unitofmeasurement': unit,
                'Price': price,
                'Week': 51
            }
            #print(json.dumps(data, indent=4))
            db.collection(u'Product by Farmers').add(data)
            print('.', end = '')
        print('\n')
    print('- Product by Farmers uploaded')

if __name__ == '__main__':
    cleanFirebase()
    print('Cleaning done')

    loadUsers()

    loadFarmers()

    loadProducts()

    loadProductsByFarmers()

    print('DONE')