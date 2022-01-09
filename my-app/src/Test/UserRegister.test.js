import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import UserRegister from "../Components/UserRegister";
import API from "../API";

describe('Test for WelcomeModal.js', () => {

    const employee = {
        userID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
        Password: "test",
        City: "Torino",
        Address: "Via Test 42",
        Wallet: 10,
        Phoneno: "1234567890",
        Email: "testname.testsurname3@polito.it",
        Name: "Testname3",
        Role: "Employee",
        Zipcode: "10140",
        State: "TO",
        Surname: "Testsurname3"
    };
    const client = {
        userID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
        Password: "test",
        City: "Torino",
        Address: "Via Test 42",
        Wallet: 10,
        Phoneno: "1234567890",
        Email: "testname.testsurname3@polito.it",
        Name: "Testname3",
        Role: "Client",
        Zipcode: "10140",
        State: "TO",
        Surname: "Testsurname3"
    };

    const mockSetLoggedIn = jest.fn();
    const mockTriggerUpdate = jest.fn();
    const mockUserRegister = (API.userRegister = jest.fn());
    const mockFarmerRegister = (API.farmerRegister = jest.fn());

    test('Correct render of the component', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            getByText('Get on board!');
            getByText('Name:');
            getByText('Surname:');
            getByText('Email:');
            getByText('Phone:');
            getByText('Address:');
            getByText('City:');
            getByText('Province:');
            getByText('Zipcode:');
            getByText('Password:');
            getByText('Confirm Password:');
            getByText('Sign Up');
        });
    });

    test('Name toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            //fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your name');
        });
    });

    test('Surname toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your surname');
        });
    });

    test('Password toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter a password');
        });
    });

    test('Password confirm toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please confirm your password');
        });
    });

    test('Passwords different toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecretNot'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Your two passwords are different!');
        });
    });

    test('Email toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your Email');
        });
    });

    test('City toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your City');
        });
    });

    test('Address toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.change(getByPlaceholderText('Enter City'), {target: {value: 'Turin'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your Address');
        });
    });

    test('Zipcode toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={false}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.change(getByPlaceholderText('Enter City'), {target: {value: 'Turin'}});
            fireEvent.change(getByPlaceholderText('Enter Address'), {target: {value: 'Turin'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please confirm your Zipcode');
        });
    });

    test('Signup client', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);
        mockUserRegister.mockResolvedValue({ok: true});

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={false}
                    setLoggedIn={mockSetLoggedIn}
                    user={client}
                    loggedIn={true}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.change(getByPlaceholderText('Enter City'), {target: {value: 'Turin'}});
            fireEvent.change(getByPlaceholderText('Enter Address'), {target: {value: 'Via Test 42'}});
            fireEvent.change(getByPlaceholderText('Enter ZipCode'), {target: {value: '12309'}});
            fireEvent.click(getByText('Sign Up'));
            getByText('Welcome! 🎉');
            getByText('Registration completed');
            fireEvent.click(getByText('Close'));
        });
    });

    test('Signup farmer company toast', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);
        mockFarmerRegister.mockResolvedValue({ok: true});

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={true}
                    setLoggedIn={mockSetLoggedIn}
                    user={employee}
                    loggedIn={true}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.change(getByPlaceholderText('Enter City'), {target: {value: 'Turin'}});
            fireEvent.change(getByPlaceholderText('Enter Address'), {target: {value: 'Via Test 42'}});
            fireEvent.change(getByPlaceholderText('Enter ZipCode'), {target: {value: '12309'}});
            fireEvent.click(getByText('Sign Up'));
            getAllByText('Attention!');
            getByText('Please enter your company name');
        });
    });

    test('Signup farmer', async () => {
        mockSetLoggedIn.mockResolvedValue(true);
        mockTriggerUpdate.mockResolvedValue(true);
        mockFarmerRegister.mockResolvedValue({ok: true, json: () => {}});

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserRegister
                    registerFarmer={true}
                    setLoggedIn={mockSetLoggedIn}
                    user={employee}
                    loggedIn={true}
                    triggerUpdate={mockTriggerUpdate} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter Name'), {target: {value: 'name'}});
            fireEvent.change(getByPlaceholderText('Enter Surname'), {target: {value: 'surname'}});
            fireEvent.change(getByPlaceholderText('Enter password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Confirm Password'), {target: {value: 'supersecret'}});
            fireEvent.change(getByPlaceholderText('Enter Email'), {target: {value: 'a@a.it'}});
            fireEvent.change(getByPlaceholderText('Enter City'), {target: {value: 'Turin'}});
            fireEvent.change(getByPlaceholderText('Enter Address'), {target: {value: 'Via Test 42'}});
            fireEvent.change(getByPlaceholderText('Enter ZipCode'), {target: {value: '12309'}});
            fireEvent.change(getByPlaceholderText('Enter company name'), {target: {value: 'company'}});
            fireEvent.click(getByText('Sign Up'));
            getByText('Welcome! 🎉');
            getByText('Registration completed');
            fireEvent.click(getByText('Close'));
        });
    });
});