# Library for JSON parsing
import json

import time

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

credBackup2 = credentials.Certificate(
    "./polito-se2-21-01-spg-backup-2-firebase-adminsdk-rdqbs-c08f51d712.json"
)
credBackup3 = credentials.Certificate(
    "./polito-se2-21-01-spg-backup-3-firebase-adminsdk-kn5e2-979f8d4105.json"
)
credTest = credentials.Certificate(
    "./polito-se2-21-01-spg-test-firebase-adminsdk-r0o33-6fb9897bce.json"
)

appBackup2 = firebase_admin.initialize_app(credBackup2, {
    'projectId': 'polito-se2-21-01-spg-backup-2'
}, "Backup2")

appBackup3 = firebase_admin.initialize_app(credBackup3, {
    'projectId': 'polito-se2-21-01-spg-backup-3'
}, "Backup3")

appTest = firebase_admin.initialize_app(credTest, {
    'projectId': 'polito-se2-21-01-spg-test'
}, "Test")

dbBackup2 = firestore.client(appBackup2)
dbBackup3 = firestore.client(appBackup3)
dbTest = firestore.client(appTest)

# Remove old data from backup2 and backup3
def cleanBackup2And3():
    # User
    #docs = dbBackup2.collection(u'User').get()
    #for doc in docs:
        #dbBackup2.collection(u'User').document(doc.id).delete()
    docs = dbBackup3.collection(u'User').get()
    for doc in docs:
        dbBackup3.collection(u'User').document(doc.id).delete()

    # Farmer
    #docs = dbBackup2.collection(u'Farmer').get()
    #for doc in docs:
        #dbBackup2.collection(u'Farmer').document(doc.id).delete()
    docs = dbBackup3.collection(u'Farmer').get()
    for doc in docs:
        dbBackup3.collection(u'Farmer').document(doc.id).delete()

    # Product
    #docs = dbBackup2.collection(u'Product').get()
    #for doc in docs:
        #dbBackup2.collection(u'Product').document(doc.id).delete()
    docs = dbBackup3.collection(u'Product').get()
    for doc in docs:
        dbBackup3.collection(u'Product').document(doc.id).delete()

    # Order
    #docs = dbBackup2.collection(u'Order').get()
    #for doc in docs:
        #dbBackup2.collection(u'Order').document(doc.id).delete()
    docs = dbBackup3.collection(u'Order').get()
    for doc in docs:
        dbBackup3.collection(u'Order').document(doc.id).delete()

    # Product by Farmers
    #docs = dbBackup2.collection(u'Product by Farmers').get()
    #for doc in docs:
        #dbBackup2.collection(u'Product by Farmers').document(doc.id).delete()
    docs = dbBackup3.collection(u'Product by Farmers').get()
    for doc in docs:
        dbBackup3.collection(u'Product by Farmers').document(doc.id).delete()


# Copy all data from backup to bakup2 and backup3
def copyDataFromBackupTo2And3PlusLocal():
    backup = {
        "users": {},
        "farmers": {},
        "products": {},
        "orders": {},
        "productsByFarmers": {}
    }

    # User
    docs = dbBackup2.collection(u'User').get()
    for doc in docs:
        #dbBackup2.collection(u'User').document(doc.id).set(doc.to_dict())
        dbBackup3.collection(u'User').document(doc.id).set(doc.to_dict())
        backup["users"][doc.id] = doc.to_dict()

    # Farmer
    docs = dbBackup2.collection(u'Farmer').get()
    for doc in docs:
        #dbBackup2.collection(u'Farmer').document(doc.id).set(doc.to_dict())
        dbBackup3.collection(u'Farmer').document(doc.id).set(doc.to_dict())
        backup["farmers"][doc.id] = doc.to_dict()

    # Product
    docs = dbBackup2.collection(u'Product').get()
    for doc in docs:
        #dbBackup2.collection(u'Product').document(doc.id).set(doc.to_dict())
        dbBackup3.collection(u'Product').document(doc.id).set(doc.to_dict())
        backup["products"][doc.id] = doc.to_dict()

    # Order
    docs = dbBackup2.collection(u'Order').get()
    for doc in docs:
        #dbBackup2.collection(u'Order').document(doc.id).set(doc.to_dict())
        dbBackup3.collection(u'Order').document(doc.id).set(doc.to_dict())
        backup["orders"][doc.id] = doc.to_dict()

    # Product by Farmers
    docs = dbBackup2.collection(u'Product by Farmers').get()
    for doc in docs:
        #dbBackup2.collection(u'Product by Farmers').document(doc.id).set(doc.to_dict())
        dbBackup3.collection(u'Product by Farmers').document(doc.id).set(doc.to_dict())
        backup["productsByFarmers"][doc.id] = doc.to_dict()

    # Store the dictionary backup to file
    timestamp = time.strftime('%d-%m-%Y %H:%M:%S', time.localtime())
    f = open("backup_" + str(timestamp) + ".json", "w")
    f.write(json.dumps(backup, indent=4))
    

def makeLocalCopyOfFirebase(sourceDB=1):
    backup = {
        "users": {},
        "farmers": {},
        "products": {},
        "orders": {},
        "productsByFarmers": {}
    }
    
    if(sourceDB == 2):
        db = dbBackup2
    elif(sourceDB == 3):
        db = dbBackup3
    else:
        return

    # User
    docs = db.collection(u'User').get()
    for doc in docs:
        backup["users"][doc.id] = doc.to_dict()
    print("Users downloaded")

    # Farmer
    docs = db.collection(u'Farmer').get()
    for doc in docs:
        backup["farmers"][doc.id] = doc.to_dict()
    print("Farmers downloaded")

    # Product
    docs = db.collection(u'Product').get()
    for doc in docs:
        backup["products"][doc.id] = doc.to_dict()
    print("Products downloaded")

    # Order
    docs = db.collection(u'Order').get()
    for doc in docs:
        backup["orders"][doc.id] = doc.to_dict()
    print("Orders downloaded")

    # Product by Farmers
    docs = db.collection(u'Product by Farmers').get()
    for doc in docs:
        backup["productsByFarmers"][doc.id] = doc.to_dict()
    print("Products by Farmers downloaded")

    #print(json.dumps(backup, indent=4))

    # Store the dictionary backup to file
    timestamp = time.strftime('%d-%m-%Y %H:%M:%S', time.localtime()).replace(" ", "_").replace(":", "_").replace("-", "_")
    f = open("./backup_" + str(timestamp) + ".json", "w")
    f.write(json.dumps(backup, indent=4))

def updateWeek(week=1):
    # Product by Farmers
    docs = dbTest.collection(u'Product by Farmers').get()
    for doc in docs:
        dbTest.collection(u'Product by Farmers').document(doc.id).update({u'Week': week})


# Read data from backup firebase,
# store them in bakcup2 and bakup3,
# plus make a local copy in JSON format
if __name__ == '__main__':
    #cleanBackup2And3()
    #copyDataFromBackupTo2And3PlusLocal()

    updateWeek(week=2)

    #makeLocalCopyOfFirebase(sourceDB=2)

    print('DONE')



