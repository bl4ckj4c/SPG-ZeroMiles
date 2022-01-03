import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import WelcomeModal from "../Components/WelcomeModal";
import API from "../API";

describe('Test for WelcomeModal.js', () => {

    test('Modal show', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <Welcome/>
            </Router>
        );

        await waitFor(() => {
            getByText('Your next');
            getByText('ingredient is');
            getByText('ZeroMiles away');
            getByText('Login');
            getByText('Sign Up');
        });
    });
});