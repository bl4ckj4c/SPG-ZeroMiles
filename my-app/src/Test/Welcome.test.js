import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import Welcome from "../Components/Welcome";
import API from "../API";

describe('Test for Welcome.js', () => {
    test('Correct render of the component', async () => {
        const {getByText} = render(
            <Router>
                <Welcome/>
            </Router>
        );
    });


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