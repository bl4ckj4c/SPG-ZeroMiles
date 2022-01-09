import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";

import {EmployeeView} from "../Components/EmployeeView";
import API from "../API";

describe('Test for FarmerProducts.js', () => {

    const userList = [
        {
            Name: "Barbara",
            Surname: "D'Urso",
            UserID: "16cb0898-d613-4d01-8eee-9e6cc565feef",
            Email: "barbara.durso@hotmail.it",
            Phoneno: "3400987654",
            Address: "Via Riva",
            City: "Chieri",
            State: "TO",
            Zipcode: "87023",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Jon",
            Surname: "Snow",
            UserID: "213bcac1-f304-42ee-85ad-a6bab6229a11",
            Email: "game@example.com",
            Phoneno: "3466373622",
            Address: "Via Politecnico 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10141",
            Role: "Client",
            Wallet: 315.5
        },
        {
            Name: "Testname3",
            Surname: "Testsurname3",
            UserID: "2d0c057a-6e0d-4e85-a5ea-a58cb2b54216",
            Email: "testname.testsurname3@polito.it",
            Phoneno: "1234567890",
            Address: "Via Test 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10140",
            Role: "Client",
            Wallet: 10
        },
        {
            Name: "Maurizio",
            Surname: "Costanzo",
            UserID: "36581648-5006-4416-aec8-73021b677bb7",
            Email: "maurizio.costanzo@gmail.com",
            Phoneno: "3248967546",
            Address: "Corso Torino 33",
            City: "Milan",
            State: "MI",
            Zipcode: "20019",
            Role: "Client",
            Wallet: 661.5
        },
        {
            Name: "Sara",
            Surname: "Verdi",
            UserID: "3a875cbf-6bb7-44e9-b3c8-cb9b1607a044",
            Email: "sara.verdi@hotmail.it",
            Phoneno: "1264857963",
            Address: "Corso Ferrucci 92",
            City: "Torino",
            State: "TO",
            Zipcode: "30100",
            Wallet: 0
        },
        {
            Name: "Gerry",
            Surname: "Scotti",
            UserID: "44e2841a-b652-4615-8fa7-725f49e9ef31",
            Email: "gerry.scotti@hotmail.com",
            Phoneno: "4125364789",
            Address: "Via Armando Diaz",
            City: "Pinerolo",
            State: "TO",
            Zipcode: "01578",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Cristiano",
            Surname: "Malgioglio",
            UserID: "5057856b-3a5e-4425-a62c-1173742bfbae",
            Email: "cristiano.malgioglio@governo.it",
            Phoneno: "0987867564",
            Address: "Via Vinadio 45",
            City: "Mesagne",
            State: "BR",
            Zipcode: "72023",
            Role: "Client",
            Wallet: 50
        },
        {
            Name: "Massimo",
            Surname: "Bianchi",
            UserID: "62a85f21-42a9-4370-b258-8aed958b9903",
            Email: "massimobianchi@gmail.com",
            Phoneno: "3405126456",
            Address: "Via Verdi 61",
            City: "Nichelino",
            State: "TO",
            Zipcode: "10134",
            Role: "Employee",
            Wallet: 100
        },
        {
            Name: "Testname",
            Surname: "Testsurname",
            UserID: "838916f8-2b22-4365-8172-7a40211f2514",
            Email: "testname.testsurname@polito.it",
            Phoneno: "1234567890",
            Address: "Via Test 42",
            City: "Torino",
            State: "TO",
            Zipcode: "10140",
            Role: "Employee",
            Wallet: 100
        },
        {
            Name: "Guido",
            Surname: "Saracco",
            UserID: "9ba87f26-c850-43dc-addc-f660bde113a9",
            Email: "guido.saracco@polito.it",
            Phoneno: "0171563452",
            Address: "Corso Nizza 112",
            City: "Cuneo",
            State: "CN",
            Zipcode: "12100",
            Role: "Client",
            Wallet: 200
        },
        {
            Name: "Marco",
            Surname: "Rossi",
            UserID: "b815cb11-6fbe-470d-80fe-8342516c077a",
            Email: "marco.rossi@gmail.com",
            Phoneno: "0321469758",
            Address: "Corso Rossini 101",
            City: "Torino",
            State: "TO",
            Zipcode: "10138",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Eva",
            Surname: "Jobs",
            UserID: "d01f9dd2-91f4-4bba-a0c8-82b72197c1c8",
            Email: "eva.jobs@apple.com",
            Phoneno: "2907654356",
            Address: "Via Nizza 40",
            City: "Turin",
            State: "TO",
            Zipcode: "10129",
            Role: "Client",
            Wallet: 1000
        },
        {
            Name: "Mara",
            Surname: "Maionchi",
            UserID: "d542c276-bd4a-4da7-885c-4406d9bf5311",
            Email: "mara.maionchi@hotmail.com",
            Phoneno: "9874515888",
            Address: "Via Giuseppe Verdi 33",
            City: "Torino",
            State: "TO",
            Zipcode: "10138",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Giovanna",
            Surname: "Bianchi",
            UserID: "de9c414f-c624-4b59-a6e8-c8b6ac1f2072",
            Email: "giovanna.bianchi@gmail.com",
            Phoneno: "1254796832",
            Address: "Via Chiffi",
            City: "Carmagnola",
            State: "TO",
            Zipcode: "20100",
            Role: "Farmer",
            Wallet: 0
        },
        {
            Name: "Mario",
            Surname: "Rossi",
            UserID: "fa6ecc89-4a74-4a05-9251-c89f8b0cbf41",
            Email: "mario.rossi@gmail.com",
            Phoneno: "011789675",
            Address: "Corso Francia 24",
            City: "Turin",
            State: "TO",
            Zipcode: "10129",
            Role: "Client",
            Wallet: 61
        }
    ];

    const orders = [{
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
    const mockTimeMachine = '01-08-2022 15:15:15';
    const mockGetOrders = (API.getOrders = jest.fn());
    const mockModifyOrderStatus = (API.modifyOrderStatus = jest.fn());

    test('Correct render of the component with orders', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetOrders.mockResolvedValue(orders);
        mockModifyOrderStatus.mockResolvedValue({ 'msg': 'Order status succesfully changed' });

        const {getByText} = render(
            <Router>
                <EmployeeView
                    users={userList}
                    status={'open'}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>)} />
            </Router>
        );

        await waitFor(() => {
            getByText('Order #wBGvIF45zhSvGcYe4pWk');
        });
    });

    test('Correct render of the component without orders', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetOrders.mockResolvedValue([]);
        mockModifyOrderStatus.mockResolvedValue({ 'msg': 'Order status succesfully changed' });

        const {getByText} = render(
            <Router>
                <EmployeeView
                    users={userList}
                    status={'open'}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>)} />
            </Router>
        );

        await waitFor(() => {
            getByText('There are no open orders yet');
        });
    });

    test('Change order status open -> pending', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetOrders.mockResolvedValue(orders);
        mockModifyOrderStatus.mockResolvedValue({ 'msg': 'Order status succesfully changed' });

        const {getByText} = render(
            <Router>
                <EmployeeView
                    users={userList}
                    status={'open'}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>)} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Open'));
            fireEvent.click(getByText('Pending'));

            getByText('Status Change!');
            getByText('Ther order status has been changed to pending');
            fireEvent.click(getByText('Close'));
        });
    });

    /*test('Change order status open -> closed', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetOrders.mockResolvedValue(orders);
        mockModifyOrderStatus.mockResolvedValue({ 'msg': 'Order status succesfully changed' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <EmployeeView
                    users={userList}
                    status={'open'}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>)} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Open'));
            fireEvent.click(getByText('Closed'));

            getByText('Status Change!');
            getByText('Ther order status has been changed to closed');
            fireEvent.click(getByText('Close'))
        });
    });

    test('Change order status open -> cancelled', async () => {
        mockReturnTimeMachine.mockReturnValue('01-08-2022 15:15:15');
        mockGetOrders.mockResolvedValue(orders);
        mockModifyOrderStatus.mockResolvedValue({ 'msg': 'Order status succesfully changed' });

        const {getByText, getByLabelText, getByPlaceholderText} = render(
            <Router>
                <EmployeeView
                    users={userList}
                    status={'open'}
                    timeMachine={mockReturnTimeMachine}
                    reloadTime={mockTimeMachine}/>)} />
            </Router>
        );

        await waitFor(() => {
            fireEvent.click(getByText('Open'));
            fireEvent.click(getByText('Cancelled'));

            getByText('Status Change!');
            getByText('Ther order status has been changed to cancelled');
            fireEvent.click(getByText('Close'))
        });
    });*/
});