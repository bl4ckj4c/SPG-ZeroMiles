import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import ProductNew from "../Components/AddNewProduct";
import API from "../API";

describe('Test for AddNewProduct.js', () => {
    test('Correct render of the component', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew/>
            </Router>
        );
        getByText('Create new product');
    });

    test('Modal show', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew/>
            </Router>
        );

        fireEvent.click(getByText('Create new product'));
        await waitFor(() => {
            getByText('New product');
            getByText('Name of new product');
            getByPlaceholderText('Enter name');
            getByText('Description of the new product');
            getByPlaceholderText('Enter description');
            getByText('Drag \'n\' drop a .png image here, or click to select one');
            getByText('Create');
            getByText('Close');
        });
    });

    test('Modal close', async () => {
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew/>
            </Router>
        );

        fireEvent.click(getByText('Create new product'));
        fireEvent.click(getByText('Close'));
    });


    const mockNewProduct = (API.createProduct=jest.fn());
    const mockUpdateProdList = jest.fn();

    test('Product submit error name', async () => {
        mockNewProduct.mockReturnValueOnce({ok: true});
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew UpdateProdList={mockUpdateProdList}/>
            </Router>
        );

        fireEvent.click(getByText('Create new product'));
        fireEvent.click(getByText('Create'));

        await waitFor(() => {
            getByText('⚠️Please, insert a valid product name');
        });

        fireEvent.click(getByText('Close'));
    });

    test('Product submit error image', async () => {
        mockNewProduct.mockReturnValueOnce({ok: true});
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew UpdateProdList={mockUpdateProdList}/>
            </Router>
        );

        fireEvent.click(getByText('Create new product'));
        fireEvent.change(getByPlaceholderText('Enter name'), {target: {value: 'Very new product'}});

        fireEvent.click(getByText('Create'));

        await waitFor(() => {
            getByText('⚠️Please, upload a .png image');
        });

        fireEvent.click(getByText('Close'));
    });

    /*test('Product submit', async () => {
        mockNewProduct.mockReturnValueOnce({ok: true});
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ProductNew UpdateProdList={mockUpdateProdList}/>
            </Router>
        );

        fireEvent.click(getByText('Create new product'));
        fireEvent.change(getByPlaceholderText('Enter name'), {target: {value: 'Very new product'}});
        fireEvent.change(getByPlaceholderText('Enter description'), {target: {value: 'Very loooong description'}});
        console.log(getByText('Drag \'n\' drop a .png image here, or click to select one'));
        //fireEvent.change(getByText('Drag \'n\' drop a .png image here, or click to select one'), {target: {value: 'Image'}});
        fireEvent.click(getByText('Create'));

        //expect(mockNewProduct).toBeCalledTimes(1);

        await waitFor(() => {
            getByText('Product added! 🎉');
            getByText('The product has been succesfully added to the database!');
            getByText('Close');
        });

        fireEvent.click(getByText('Close'));
    });*/
});