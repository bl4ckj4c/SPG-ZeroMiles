import * as React from "react";
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter as Router} from "react-router-dom";
import App from "../App";
import API from "../API";
import mockData from "./mockData";

describe('Test for App', () => {

    const mockReturnTimeMachine = jest.fn();
    const mockTimeMachine = '12-18-2021 11:11:11';
    const mockGetAllProductsByFarmers = (API.getAllProductsByFarmers = jest.fn());
    const mockGetFarmer = (API.getFarmer = jest.fn());
    const mockClientCheck = (API.clientCheck = jest.fn());
    const mockAddOrder = (API.addOrder = jest.fn());
    const mockGetAllProducts = (API.getAllProducts = jest.fn());
    const mockAddProduct = (API.addProduct = jest.fn());
    const mockDeleteProduct = (API.deleteProduct = jest.fn());
    const mockGetWeeklyNotRetiredOrders = (API.getWeeklyNotRetiredOrders = jest.fn());
    const mockGetMonthlyNotRetiredOrders = (API.getMonthlyNotRetiredOrders = jest.fn());
    const mockGetAllUsers = (API.getAllUsers = jest.fn());
    const mockGetUserInfo = (API.getUserInfo = jest.fn());
    const mockUserLogin = (API.userLogin = jest.fn());
    const mockUserLogout = (API.userLogout = jest.fn());

   test('Correct render of the app', async () => {
       mockGetAllUsers.mockResolvedValue(mockData.users);
       mockGetUserInfo.mockResolvedValue(mockData.userInfo);
       mockUserLogin.mockResolvedValue(true);
       mockUserLogout.mockResolvedValue(true);

       const {getByText, getByLabelText, getByPlaceholderText} = render(
           <Router>
               <App/>
           </Router>
       );
   });
});