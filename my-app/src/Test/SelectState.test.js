import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import SelectCity from "../Components/SelectState";
import API from "../API";

describe('Test for SelectState.js', () => {
    test('Correct render of the component', async () => {
        const {getByText} = render(
            <Router>
                <SelectCity/>
            </Router>
        );
    });
});