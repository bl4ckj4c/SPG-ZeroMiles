# Library for HTTP RESTful requests
import requests
# Library for unit test management
import unittest
# LIbrary for JSON parsing
import json
# Library for regexp
import re

# Firebase management libraries
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "./polito-se2-21-01-spg-firebase-adminsdk-76fui-7b28269ea6.json")
firebase_admin.initialize_app(cred, {
    'projectId': 'polito-se2-21-01-spg'
})
db = firestore.client()


def TestSuiteBackend():
    suite = unittest.TestSuite()

    suite.addTest(TestStorySPG2('test_GET_users'))
    suite.addTest(TestStorySPG2('test_POST_correct_user'))
    suite.addTest(TestStorySPG2('test_POST_wrong_user'))
    suite.addTest(TestStorySPG3('test_GET_farmers'))
    suite.addTest(TestStorySPG3('test_GET_productsByFarmer'))
    return suite


class TestStorySPG2(unittest.TestCase):

    def test_GET_users(self):
        errorLog = {
            'errors': []
        }
        flagError = False

        # Request sent
        r = requests.get('http://localhost:3001/api/users')

        # Check the response status code
        self.assertEqual(r.status_code, 200)

        # Check if the JSON is well-formed
        try:
            JSONbody = r.json()

            # Arrays for tests
            fields = [
                'Name',
                'Surname',
                'UserID',
                'Email',
                'Phoneno',
                'Address',
                'State',
                'Zipcode'
            ]
            regexes = [
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z]+$',
                r'^.+$',
                r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                r'^(\+(\([0-9]{1,2}\))?)?[0-9]+$',
                r'^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$',
                r'^[a-zA-Z]+$',
                r'^[0-9]{5}$'
            ]

            # Check that the JSON has all the fields expected and that them are all well-formed
            for user in JSONbody:
                tmpError = {
                    'user': user,
                    'errors': []
                }

                for item, regex in zip(fields, regexes):
                    if item not in user:
                        tmpError['errors'].append({
                            'field': item,
                            'error': 'missing'
                        })
                        flagError = True
                    else:
                        # Check that item is a string
                        if not isinstance(user[item], str):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not a string'
                            })
                            flagError = True
                        # Check that item is a correct string
                        pattern = re.compile(regex)

                        #print(str(item) + ' -> regex: ' + str(pattern.match(user[item]).group(0)))

                        if not pattern.match(user[item]):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not matching the regex'
                            })
                            flagError = True

                if len(tmpError['errors']) > 0:
                    errorLog['errors'].append(tmpError)

            # There is at least one error
            if flagError:
                self.fail(json.dumps(errorLog, indent=4))

        # The body in the response is not a valid JSON
        except requests.exceptions.JSONDecodeError:
            self.fail('The body received is not a valid JSON')

    def test_POST_correct_user(self):
        user = {
            'name': 'UserTest',
            'lastName': 'Correct',
            'email': 'user.test@gmail.com',
            'address': 'Via Test 404',
            'phone': '1234567890',
            'city': 'TestNet',
            'password': 'supersecrettest'
        }

        # Request sent
        r = requests.post(
           'http://localhost:3001/api/register',
           json=user
        )

        # Check the response status code
        self.assertEqual(r.status_code, 201)

        # If the insertion was successful, then remove the test user form Firebase
        # Check if the new user is present in Firebase
        # If yes, then remove the new user
        users_ref = db.collection(u'User').where(u'name', u'==', u'UserTest')
        docs = users_ref.stream()
        flagUser = False
            
        for doc in docs:
            # print(f'Remove => {json.dumps(doc.to_dict(), indent=4)}')
            db.collection(u'User').document(doc.id).delete()
            flagUser = True          
            
        # otherwise prompt an error, beacuse the server didn't work properly
        self.assertTrue(flagUser, 'The server didn\'t work properly, the test user is not present in Firebase.')

    def test_POST_wrong_user(self):
        user = {
            'name': '123test',
            'lastName': 'TEST456',
            'email': 'test.test@gmail.',
            'address': 'Via Test ',
            'phone': 'mywrongphonenumber',
            'city': 'mywrongcity234',
            'password': ''
        }

        # Request sent
        r = requests.post(
           'http://localhost:3001/api/register',
           json=user
        )

        # Check the response status code
        self.assertEqual(r.status_code, 400)

        # If the insertion was successful, then remove the test user form Firebase
        # Check if the new user is present in Firebase
        # If yes, then remove the new user
        users_ref = db.collection(u'User').where(u'name', u'==', u'123test')
        docs = users_ref.stream()
        flagUser = False
            
        for doc in docs:
            # print(f'Remove => {json.dumps(doc.to_dict(), indent=4)}')
            db.collection(u'User').document(doc.id).delete()
            flagUser = True          
            
        # otherwise prompt an error, beacuse the server didn't work properly
        self.assertFalse(flagUser, 'The server validation didn\'t work properly, the test user was present in Firebase.')


class TestStorySPG3(unittest.TestCase):

    def test_GET_farmers(self):
        errorLog = {
            'errors': []
        }
        flagError = False

        # Request sent
        r = requests.get('http://localhost:3001/api/farmers')

        # Check the response status code
        self.assertEqual(r.status_code, 200)

        # Check if the JSON is well-formed
        try:
            JSONbody = r.json()

            # Arrays for tests
            fields = [
                'Name',
                'Surname',
                'Company',
                'FarmerID',
                'Email',
                'Phoneno',
                'Address',
                'State',
                'Zipcode'
            ]
            regexes = [
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z\-\_\s0-9\.\,]+$',
                r'^.+$',
                r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                r'^(\+(\([0-9]{1,2}\))?)?[0-9]+$',
                r'^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$',
                r'^[a-zA-Z]+$',
                r'^[0-9]{5}$'
            ]

            # Check that the JSON has all the fields expected and that them are all well-formed
            for farmer in JSONbody:
                tmpError = {
                    'farmer': farmer,
                    'errors': []
                }

                for item, regex in zip(fields, regexes):
                    if item not in farmer:
                        tmpError['errors'].append({
                            'field': item,
                            'error': 'missing'
                        })
                        flagError = True
                    else:
                        # Check that item is a string
                        if not isinstance(farmer[item], str):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not a string'
                            })
                            flagError = True
                        # Check that item is a correct string
                        pattern = re.compile(regex)

                        #print(str(item) + ' -> regex: ' + str(pattern.match(farmer[item]).group(0)))

                        if not pattern.match(farmer[item]):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not matching the regex'
                            })
                            flagError = True

                if len(tmpError['errors']) > 0:
                    errorLog['errors'].append(tmpError)

            # There is at least one error
            if flagError:
                self.fail(json.dumps(errorLog, indent=4))

        # The body in the response is not a valid JSON
        except requests.exceptions.JSONDecodeError:
            self.fail('The body received is not a valid JSON')

    def test_GET_productsByFarmer(self):
        errorLog = {
            'errors': []
        }
        flagError = False

        # Request sent
        r = requests.get('http://localhost:3001/api/productByFarmer')

        # Check the response status code
        self.assertEqual(r.status_code, 200)

        # Check if the JSON is well-formed
        try:
            JSONbody = r.json()

            # Arrays for tests
            fields = [
                # Farmer
                'FarmerID',
                'Name',
                'Surname',
                'Company',
                'Email',
                'Phoneno',
                'Address',
                'State',
                'Zipcode',
                # Product
                'ProductID',
                'NameProduct',
                'Description',
                'ImageID',
                # Product by farmer
                'Quantity',
                'UnitOfMeasurement',
                'Price'
            ]
            regexes = [
                # Farmer
                r'^.+$',
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z\-\_\s0-9\.\,]+$',
                r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                r'^(\+(\([0-9]{1,2}\))?)?[0-9]+$',
                r'^(via|Via|corso|Corso|piazza|Piazza)\s[a-zA-Z\s\']+(\s+|\,\s*)([1-9][0-9]*)$',
                r'^[a-zA-Z]+$',
                r'^[0-9]{5}$',
                # Product
                r'^.+$',
                r'^[a-zA-Z\-\_0-9\.\,]+$',
                r'^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$',
                r'^[0-9]+$',
                # Product by farmer
                r'^[0-9]+$',
                r'^[a-zA-Z]+$',
                r'^([1-9][0-9]{,2}(,[0-9]{3})*|[0-9]+)(\.[0-9]{1,9})?$',
            ]

            # Check that the JSON has all the fields expected and that them are all well-formed
            for farmer in JSONbody:
                tmpError = {
                    'farmer': farmer,
                    'errors': []
                }

                for item, regex in zip(fields, regexes):
                    if item not in farmer:
                        tmpError['errors'].append({
                            'field': item,
                            'error': 'missing'
                        })
                        flagError = True
                    else:
                        # Check that item is a string
                        if not isinstance(farmer[item], str):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not a string'
                            })
                            flagError = True
                        # Check that item is a correct string
                        pattern = re.compile(regex)

                        #print(str(item) + ' -> regex: ' + str(pattern.match(farmer[item]).group(0)))

                        if not pattern.match(farmer[item]):
                            tmpError['errors'].append({
                                'field': item,
                                'error': 'wrong format, not matching the regex'
                            })
                            flagError = True

                if len(tmpError['errors']) > 0:
                    errorLog['errors'].append(tmpError)

            # There is at least one error
            if flagError:
                self.fail(json.dumps(errorLog, indent=4))

        # The body in the response is not a valid JSON
        except requests.exceptions.JSONDecodeError:
            self.fail('The body received is not a valid JSON')


if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(TestSuiteBackend())
