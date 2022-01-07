import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import {ClientOrders} from "../Components/ClientOrders";
import API from "../API";

describe('Test for ClientOrders.js', () => {

    const clientOrders = [{
        OrderID: "wBGvIF45zhSvGcYe4pWk",
        Status: "open",
        ClientID: "d01f9dd2-91f4-4bba-a0c8-82b72197c1c8",
        Phoneno: "2907654356",
        Email: "eva.jobs@apple.com",
        Zipcode: "10129",
        State: "TO",
        Address: "Via Nizza 40",
        City: "Turin",
        Name: "Eva",
        Password: "supersecret3",
        Role: "Client",
        Surname: "Jobs",
        Timestamp: "08-01-2022 14:14:00",
        ProductInOrder: [
            {
                ImageID: "d00e6d5b-7f12-403b-bf81-3f825c1d5393",
                NameProduct: "Finocchio",
                Confirmed: "",
                ProductID: "Mqn59ZJN1Q8cyrj3oGj",
                FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
                Price: 8,
                number: 2
            },
            {
                ProductID: "Mqn4HUlBrmA7gRw2Bly",
                NameProduct: "Wurstel di suino",
                FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
                Price: 3,
                ImageID: "3a1e9e73-1df7-43ed-95ee-9b224e4f3a25",
                number: 1
            },
            {
                number: 1,
                Price: 8,
                ProductID: "Mqn5Fe57EePWUW6WeoI",
                FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
                ImageID: "6fd5e5df-5fd3-4f15-98b3-8a75824ae14a",
                NameProduct: "Costine"
            }
        ],
        DeliveryDate: "",
        DeliveryPlace: "",
        pickupTimestamp: "",
        notRetired: "false"
    }];

    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '01-04-2022 11:11:11';
    const mockGetClientOrders = (API.getClientOrders = jest.fn());

    test('Correct render of the component without orders', async () => {
        mockReturnTimeMachine.mockReturnValue('01-04-2022 11:11:11');
        mockGetClientOrders.mockResolvedValue([]);
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ClientOrders
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>
            </Router>
        );

        await waitFor(() => {
            getByText('You have no orders yet');
        });
    });

    test('Correct render of the component with orders', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetClientOrders.mockResolvedValue(clientOrders);
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ClientOrders
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={'01-08-2022 15:15:15'}/>
            </Router>
        );

        await waitFor(() => {
            getByText('Order #wBGvIF45zhSvGcYe4pWk');
            getByText('Eva Jobs');
            getByText('08-01-2022 14:14:00');
            getByText('Via Nizza 40, TO');
            getByText('Finocchio');
            getByText('Wurstel di suino');
            getByText('Costine');
            getByText('Total: €27');
            getByText('open');
        });
    });

    test('Request delivery open and close modal', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetClientOrders.mockResolvedValue(clientOrders);
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ClientOrders
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={'01-08-2022 15:15:15'}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Request Delivery'));

            getByText('Delivery address');
            getByText('Date');
            getByText('Time');

            fireEvent.click(getByText('Confirm'));
        });
    });




    test('Request pickup wrong', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 07:00:15');
        mockGetClientOrders.mockResolvedValue(clientOrders);
        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <ClientOrders
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={'01-08-2022 15:15:15'}/>
            </Router>
        );

        await waitFor(async () => {
            fireEvent.click(getByText('Request Pickup'));

            getByText('Select a date for pickup on-site');
            getByText('Date');
            getByText('Time');
            fireEvent.click(getByText('Confirm'));

            await waitFor(() => {
                getByText('Error requesting pickup');
            });

            fireEvent.click(getByText('Close'));
        });
    });
});
