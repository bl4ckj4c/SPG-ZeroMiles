import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import WelcomeModal from "../Components/WelcomeModal";

import API from "../API";
import Welcome from "../Components/Welcome";

describe('Test for WelcomeModal.js', () => {

    const mockSetWelcomeShow = jest.fn();

    test('Correct render of the component', async () => {
        const {getByText} = render(
            <Router>
                <WelcomeModal
                    show={true}
                    onHide={mockSetWelcomeShow}/>
            </Router>
        );
    });

    test('Login', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <WelcomeModal
                    show={true}
                    onHide={mockSetWelcomeShow}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Login'));
        });
    });

    test('Sign Up', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <WelcomeModal
                    show={true}
                    onHide={mockSetWelcomeShow}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Sign Up'));
        });
    });

    test('Take a quick look', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <WelcomeModal
                    show={true}
                    onHide={mockSetWelcomeShow}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('or take a quick look'));
        });
    });
});