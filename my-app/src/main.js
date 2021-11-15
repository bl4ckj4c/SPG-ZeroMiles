import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { Col, Row, Container } from 'react-bootstrap';

function Main() {
    return (
        <Container>
            <Row></Row>
            <Row className="justify-content-center mt-3">
                <Col></Col>
                <Col>
                    <Link to="/productsByFarmer">
                        <Button size="lg" variant="secondary">LISTA DEI PRODOTTI</Button>
                    </Link>
                </Col>
                <Col></Col>
            </Row>
 
 {/*
            <Row className="justify-content-center mt-3">
                <Col></Col>
                    <Col>
                        <Link to="/officer">
                            <Button size="lg" variant="secondary">Officer</Button>
                        </Link>
                    </Col>
                <Col></Col>
            </Row>

            <Row className="justify-content-center mt-3">
                <Col></Col>
                    <Col>
                        <Link to="/manager">
                            <Button size="lg" variant="secondary">Manager</Button>
                        </Link>
                    </Col>
                <Col></Col>
            </Row>

*/}

        </Container>
    );
};

export default Main;
