import TestRenderer from 'react-test-renderer';
import UserRegister from "../Components/UserRegister";
import {Form, Row, Button, Toast, Container} from "react-bootstrap";
import {Simulate} from "react-dom/test-utils";
import {fireEvent, waitFor} from "@testing-library/react";

let testRenderer = null;
let testInstance = null;

beforeEach(() => {
    // Create the render of the UserRegister component
    testRenderer = TestRenderer.create(<UserRegister/>);
    testInstance = testRenderer.root;
});

afterEach(() => {
    // Unmount the UserRegister component
    testRenderer.unmount();
    testRenderer = null;
    testInstance = null;
});

test("Check if the first sentence is correct", () => {
    expect(testInstance.findAllByType(Row)[1].props.children).toEqual('Sign up a new client');
});

test("Check if all fields are present", () => {
    expect(testInstance.findAllByType(Form.Group).length).toEqual(10);
});

test("Check if each field is correct", () => {
    const allFormGroup = testInstance.findAllByType(Form.Group);

    const fields = [
        'Name:',
        'Email:',
        'Address:',
        'Province:',
        'Password:',
        'Surname:',
        'Phone:',
        'City:',
        'Zipcode:',
        'Confirm Password:'
    ];

    const placeholders = [
        'Enter Name',
        'Enter Email',
        'Enter Address',
        'ProvincePlaceholder',
        'Enter password',
        'Enter Surname',
        'Enter Phone',
        'Enter City',
        'Enter ZipCode',
        'Confirm Password'
    ];

    allFormGroup.forEach((item, index) => {
        // Check field label
        expect(item.findByType(Form.Label).props.children).toEqual(fields[index]);
        // Check field placeholder, not checking the province (there is another assertion)
        if(item.findByType(Form.Control).props.name !== 'state') {
            expect(item.findByType(Form.Control).props.placeholder).toEqual(placeholders[index]);
        }
    });
});


