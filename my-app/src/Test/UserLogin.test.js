import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import UserLogin from "../Components/UserLogin";
//import WelcomeModal from './WelcomeModal'

import API from "../API";

describe('Test for WelcomeModal.js', () => {

    const mockLogin = jest.fn();
    const mockSetLoggedIn = jest.fn();

    test('Correct render of the component', async () => {
        mockLogin.mockResolvedValue(true);
        mockSetLoggedIn.mockResolvedValue(false);

        const {getByText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            getByText('We missed you!');
            getByText('Email');
            getByText('Password');
            getByText('Login');
        });
    });

    test('Empty fields', async () => {
        mockLogin.mockResolvedValue(true);
        mockSetLoggedIn.mockResolvedValue(false);

        const {getByText, getAllByText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Login'));
            getAllByText('Warning');
            getByText('Please enter your email and password');
        });
    });

    test('Password empty', async () => {
        mockLogin.mockResolvedValue(true);
        mockSetLoggedIn.mockResolvedValue(false);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'test@mail.it'}});
            fireEvent.click(getByText('Login'));
            getAllByText('Warning');
            getByText('Please enter your password');
        });
    });

    test('Email empty', async () => {
        mockLogin.mockResolvedValue(true);
        mockSetLoggedIn.mockResolvedValue(false);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Password'), {target: {value: 'supersecret'}});
            fireEvent.click(getByText('Login'));
            getAllByText('Warning');
            getByText('Please enter your email');
        });
    });

    test('Incorrect login', async () => {
        mockLogin.mockRejectedValue(false);
        mockSetLoggedIn.mockResolvedValue(false);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'test@mail.it'}});
            fireEvent.change(getByPlaceholderText('Password'), {target: {value: 'supersecret'}});
            fireEvent.click(getByText('Login'));

            getByText('⚠️Login error');
            getByText('Wrong username or password');
        });
    });

    test('Correct login', async () => {
        mockLogin.mockResolvedValue(true);
        mockSetLoggedIn.mockResolvedValue(true);

        const {getByText, getAllByText, getByPlaceholderText} = render(
            <Router>
                <UserLogin login={mockLogin} setLoggedIn={mockSetLoggedIn}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.change(getByPlaceholderText('Enter email'), {target: {value: 'test@mail.it'}});
            fireEvent.change(getByPlaceholderText('Password'), {target: {value: 'supersecret'}});
            fireEvent.click(getByText('Login'));
        });
    });
});