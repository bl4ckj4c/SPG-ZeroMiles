import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import ZeroNavbar from '../Components/Navbar';

describe('Test for Navbar.js', () => {
    const employee = {
        userID: "838916f8-2b22-4365-8172-7a40211f2514",
        Role: "Employee",
        Surname: "Testsurname",
        Zipcode: "10140",
        State: "TO",
        Password: "test",
        Phoneno: "1234567890",
        Name: "Testname",
        City: "Torino",
        Email: "testname.testsurname@polito.it",
        Address: "Via Test 42",
        Wallet: 100
    };
    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '';
    const mockSetSideShow = jest.fn();

    test('Correct render of the component without orders', async () => {
        mockReturnTimeMachine.mockReturnValue('12-12-2021 11:11:11');
        const {getByText} = render(
            <Router>
                <ZeroNavbar
                    isLoggedIn={true}
                    user={employee}
                    logout={false}
                    timedev={true}
                    setTimeMachine={false}
                    timeMachine={mockReturnTimeMachine}
                    ReturnTimeMachine = {mockReturnTimeMachine}
                    setSideShow={mockSetSideShow}/>


            </Router>
        );

        await waitFor(() => {

        });
    });
});

