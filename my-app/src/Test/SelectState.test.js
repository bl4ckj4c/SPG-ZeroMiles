import * as React from "react";
import {render} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import SelectCity from "../Components/SelectState";

describe('Test for SelectState.js', () => {
    test('Correct render of the component', async () => {
        const {getByText} = render(
            <Router>
                <SelectCity/>
            </Router>
        );
    });
});