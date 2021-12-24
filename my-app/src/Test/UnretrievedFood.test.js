import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import Unretrieved from "../Components/UnretrievedFood";
import API from "../API";
import FarmerProducts from "../Components/FarmerProducts";

describe('Test for UnretrievedFood.js', () => {

    const manager = {
        ID: "2071bd4e-afde-4bb6-b073-b86007bd8e6f",
        Name: "Michele",
        Surname: "Manager",
        Email: "michele.manager@zeromiles.it",
        Password: "supersecret4",
        Phoneno: "3244589300",
        Address: "Via dei cigni 4",
        City: "Torino",
        State: "TO",
        Zipcode: "10141",
        Role: "Manager",
        Wallet: 0,
        NotRetired: 0
    }

    const farmers = [
        {
            Name: "Sara",
            Surname: "Verdi",
            Company: "Azienda Agricola Sara Verdi",
            FarmerID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            State: "TO",
            Zipcode: "30100",
            Distance: 1
        },
        {
            Name: "Marco",
            Surname: "Rossi",
            Company: "L'orto del gallo",
            FarmerID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            State: "TO",
            Zipcode: "10138",
            Distance: 2
        },
        {
            Name: "Mara",
            Surname: "Maionchi",
            Company: "Societa' Agricola La Cascina Del Mulino",
            FarmerID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            State: "TO",
            Zipcode: "10138",
            Distance: 2
        },
        {
            Name: "Giovanna",
            Surname: "Bianchi",
            Company: "Cascina Roseleto Di Giovanna Bianchi",
            FarmerID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            State: "TO",
            Zipcode: "20100",
            Distance: 3
        },
        {
            Name: "Barbara",
            Surname: "D'Urso",
            Company: "Liriodendro Soc. Agr. Coop.",
            FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            State: "TO",
            Zipcode: "87023",
            Distance: 4
        },
        {
            Name: "Gerry",
            Surname: "Scotti",
            Company: "Il Cortile Delle Delizie",
            FarmerID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            State: "TO",
            Zipcode: "01578",
            Distance: 5
        }
    ];

    const notRetrievedOrders = [
        {
            OrderID: "M0HLmwkhMuv5FQ1Bx6Fw",
            Status: "pending",
            ClientID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
            Phoneno: "1234567890",
            Email: "testname.testsurname3@polito.it",
            Zipcode: "10140",
            State: "TO",
            Address: "Via Test 42",
            City: "Torino",
            Name: "Testname3",
            Password: "test",
            Role: "Client",
            Surname: "Testsurname3",
            Timestamp: "19-12-2021 22:38:06",
            ProductInOrder: [
                {
                    ImageID: "117ee408-e2ee-d0f1-57b7-9b5ed4de030c",
                    NameProduct: "TEST",
                    number: 3,
                    ProductID: "Mqn5MQEBi5XO7pG0AzZ",
                    FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
                    Price: 4
                }
            ],
            DeliveryDate: "",
            DeliveryPlace: "",
            pickupTimestamp: "",
            notRetired: "true"
        },
        {
            OrderID: "MgpSnzCsDoWHy6d260yp",
            Status: "pending",
            ClientID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
            Phoneno: "1234567890",
            Email: "testname.testsurname3@polito.it",
            Zipcode: "10140",
            State: "TO",
            Address: "Via Test 42",
            City: "Torino",
            Name: "Testname3",
            Password: "test",
            Role: "Client",
            Surname: "Testsurname3",
            Timestamp: "19-12-2021 22:42:53",
            ProductInOrder: [
                {
                    number: 3,
                    ImageID: "117ee408-e2ee-d0f1-57b7-9b5ed4de030c",
                    NameProduct: "TEST",
                    ProductID: "Mqn5MQEBi5XO7pG0AzZ",
                    FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
                    Price: 4
                }
            ],
            DeliveryDate: "",
            DeliveryPlace: "",
            pickupTimestamp: "",
            notRetired: "true"
        },
        {
            OrderID: "RquKPooXhDatu6MiKjTg",
            Status: "pending",
            ClientID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
            Phoneno: "1234567890",
            Email: "testname.testsurname3@polito.it",
            Zipcode: "10140",
            State: "TO",
            Address: "Via Test 42",
            City: "Torino",
            Name: "Testname3",
            Password: "test",
            Role: "Client",
            Surname: "Testsurname3",
            Timestamp: "19-12-2021 22:41:06",
            ProductInOrder: [
                {
                    ProductID: "Mqn5MQEBi5XO7pG0AzZ",
                    NameProduct: "TEST",
                    number: 3,
                    ImageID: "117ee408-e2ee-d0f1-57b7-9b5ed4de030c",
                    Price: 4,
                    FarmerID: "16cb0898-d613-4d01-8eee-9e6cc565feef"
                }
            ],
            DeliveryDate: "",
            DeliveryPlace: "",
            pickupTimestamp: "",
            notRetired: "true"
        }
    ];

    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '12-22-2021 11:11:11';
    const mockGetFarmer = (API.getFarmer = jest.fn());
    const mockGetWeeklyNotRetiredOrders = (API.getWeeklyNotRetiredOrders = jest.fn());
    const mockGetMonthlyNotRetiredOrders = (API.getMonthlyNotRetiredOrders = jest.fn());

    test('Correct render of the component', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockResolvedValue(farmers);
        mockGetWeeklyNotRetiredOrders.mockResolvedValue([]);
        mockGetMonthlyNotRetiredOrders.mockResolvedValue([]);

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            getByText('Managing page');
            getByText('Unretrived orders');
        });
    });

    test('getFarmer error', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockRejectedValue(new Error('test error'));
        mockGetWeeklyNotRetiredOrders.mockResolvedValue([]);
        mockGetMonthlyNotRetiredOrders.mockResolvedValue([]);

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            getByText('Managing page');
            getByText('Unretrived orders');
        });
    });

    test('getWeekly and getMonthly error', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockResolvedValue(farmers);
        mockGetWeeklyNotRetiredOrders.mockRejectedValue(new Error('test error'));
        mockGetMonthlyNotRetiredOrders.mockRejectedValue(new Error('test error'));

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            getByText('Managing page');
        });
    });

    test('Change the date', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockResolvedValue(farmers);
        mockGetWeeklyNotRetiredOrders.mockResolvedValue([]);
        mockGetMonthlyNotRetiredOrders.mockResolvedValue([]);

        const {getByText, getByLabelText, getByPlaceholderText, getByTestId} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Change date'));

            getByText('Select a date');
            getByText('Date');
            fireEvent.change(getByTestId('date-testid'), {target: {value: '2021-12-19'}});
            getByText('Time');
            fireEvent.change(getByTestId('time-testid'), {target: {value: '11:11'}});
            getByText('Select a date to see the unretrived orders for the week before');
            getByText('or for the month that contains the date');
            fireEvent.click(getByText('Confirm'));
        });
    });

    test('Change the date with error', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockResolvedValue(farmers);
        mockGetWeeklyNotRetiredOrders.mockResolvedValue([]);
        mockGetMonthlyNotRetiredOrders.mockResolvedValue([]);

        const {getByText, getByLabelText, getByPlaceholderText, getByTestId} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Change date'));

            getByText('Select a date');
            getByText('Date');
            fireEvent.change(getByTestId('date-testid'), {target: {value: '2022-12-19'}});
            getByText('Time');
            fireEvent.change(getByTestId('time-testid'), {target: {value: '11:11'}});
            getByText('Select a date to see the unretrived orders for the week before');
            getByText('or for the month that contains the date');
            fireEvent.click(getByText('Confirm'));

            setTimeout(function(){
                getByText('Error selecting a date');
                getByText('A date in the future cannot be selected');
                fireEvent.click(getByText('Close'));
            }, 1000);
        });
    });

    test('Show unretrieved orders monthly and weekly', async () => {
        mockReturnTimeMachine.mockReturnValue('12-22-2021 11:11:11');
        mockGetFarmer.mockResolvedValue(farmers);
        mockGetWeeklyNotRetiredOrders.mockResolvedValue(notRetrievedOrders);
        mockGetMonthlyNotRetiredOrders.mockResolvedValue(notRetrievedOrders);

        const {getByText, getByLabelText, getByPlaceholderText, getAllByText} = render(
            <Router>
                <Unretrieved
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}
                    user={manager}/>
            </Router>
        );

        await waitFor(() => {
            getByText('Managing page');
            getByText('Unretrived orders');

            // Monthly
            getByText('N° in the week before 22 December:');
            //fireEvent.click(getAllByText('Show')[0]);
            //fireEvent.click(getAllByText('Show')[0]);

            // Weekly
            getByText('N° in the month of December:');
            //fireEvent.click(getAllByText('Show')[1]);
            //fireEvent.click(getAllByText('Show')[1]);
        });
    });
});