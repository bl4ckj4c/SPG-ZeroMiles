import requests
import unittest
import json
import re


def TestSuiteBackend():
    suite = unittest.TestSuite()
    suite.addTest(TestStorySPG3('test_GET_farmers'))
    suite.addTest(TestStorySPG3('test_GET_productsByFarmer'))
    return suite


class TestStorySPG3(unittest.TestCase):

    def test_GET_farmers(self):
        errorLog = {
            'errors': []
        }
        flagError = False

        # Request sent
        r = requests.get('http://localhost:3001/api/farmers')

        # Check the resposne status code
        self.assertEqual(r.status_code, 200)

        # Check if the JSON is well-formed
        try:
            JSONbody = r.json()

            # Arrays for tests
            fields = [
                'Name',
                'Surname',
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
                r'^.+$',
                r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                r'^(\+(\([0-9]{1,2}\))?)?[0-9]+$',
                r'^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$',
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

        # Check the resposne status code
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
                r'^.+$',
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z]+$',
                r'^[a-zA-Z\-\_\s0-9\.\,]+$',
                r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$',
                r'^(\+(\([0-9]{1,2}\))?)?[0-9]+$',
                r'^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$',
                r'^[a-zA-Z]+$',
                r'^[0-9]{5}$',
                r'^.+$',
                r'^[a-zA-Z\-\_0-9\.\,]+$',
                r'^[a-zA-Z\,\.0-9\t\n\r\f\v\s]+$',
                r'^[0-9]+$',
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
