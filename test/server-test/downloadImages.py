import requests

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "./polito-se2-21-01-spg-backup-firebase-adminsdk-toolm-860caeccd2.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'polito-se2-21-01-spg-backup'
})
db = firestore.client()


downloadsFailed = []

# Get all the products id
docs = db.collection(u'Product').get()


for doc in docs:
    print(f'Download image for product id {doc.id}')
    imageID = doc.to_dict()['ImageID']
    response = requests.get('https://filer.cdn-thefoodassembly.com/photo/' + str(imageID) + '/view/large')

    if response.status_code != 200:
        downloadsFailed.append(doc.id)
        continue
    else:
        file = open('./images/' + str(imageID) + '.png', 'wb')
        file.write(response.content)
        file.close()

if len(downloadsFailed) > 0:
    print('Error in dowloading some images: ', end='')
    print(downloadsFailed)