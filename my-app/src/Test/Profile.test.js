import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import Profile from "../Components/Profile";
import API from "../API";

describe('Test for Profile.js', () => {

    const user = {
        Name: "Eva",
        Surname: "Jobs",
        UserID: "d01f9dd2-91f4-4bba-a0c8-82b72197c1c8",
        Email: "eva.jobs@apple.com",
        Phoneno: "2907654356",
        Address: "Via Nizza 40",
        City: "Turin",
        State: "TO",
        Zipcode: "10129",
        Role: "Client",
        Wallet: 1000
    };

    const mockClientCheck = (API.clientCheck = jest.fn());

    test('Correct render of component', async () => {
        mockClientCheck.mockResolvedValue({
            Wallet: 1000,
            Money: 27
        });

        const {getByText} = render(
            <Router>
                <Profile user={user} />
            </Router>
        );

        await waitFor(() => {
            getByText('Eva Jobs');
            getByText('eva.jobs@apple.com');
            getByText('Address: Via Nizza 40');
            getByText('City: Turin, TO');
            getByText('Wallet balance: €1000');
        });
    });
});