import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import UserLogin from "../Components/UserLogin";
//import WelcomeModal from './WelcomeModal'

import API from "../API";

describe('Test for WelcomeModal.js', () => {
    test('Correct render of the component', async () => {
        const {getByText} = render(
            <Router>
                <UserLogin/>
            </Router>
        );
    });
});