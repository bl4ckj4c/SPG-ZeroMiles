import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import ZeroNavbar from "../Components/Navbar";
import {Image, Button, Navbar, Nav} from "react-bootstrap";

describe('<ZeroNavbar />', () => {
    test('Render the navbar without crash', () => {
        const wrapper = mount(<ZeroNavbar/>);
        expect(wrapper).toHaveLength(1);
    });

    test('Check navbar elements', () => {
        const wrapper = mount(<ZeroNavbar/>);

        // Image
        expect(wrapper.find(Image)).toHaveLength(1);
        expect(wrapper.find(Image).props().src).toEqual('/images/logo.png');

        // Button
        expect(wrapper.find(Button)).toHaveLength(1);
        expect(wrapper.find(Button).props().children).toEqual('Sign Up');
    });

    test('Simulate click on image', () => {
        const wrapper = mount(<ZeroNavbar/>);

        wrapper.find(Navbar.Brand).simulate('click');

        expect(window.location.href).toEqual('http://localhost/');
    });

    test('Simulate click on Sign Up', () => {
        const wrapper = mount(<ZeroNavbar/>);

        console.log(window.location.href);
        console.log(wrapper.find(Nav.Link).children().getElement().props.onClick);
        wrapper.find(Nav.Link).children().simulate('click');
        console.log(window.location.href);

        //expect(window.location.href).toEqual('http://localhost/');
    });

    test('AAA', () => {
        const wrapper = mount(<ZeroNavbar/>);

        console.log(toJson(wrapper.find(Nav.Link).children()));
        //console.log(wrapper.find(Nav.Link).children());
        //console.log(toJson(wrapper.find(Nav.Link).children().props().onClick));
        console.log(wrapper.find(Nav.Link).children().getElement().props.onClick);
    });
});