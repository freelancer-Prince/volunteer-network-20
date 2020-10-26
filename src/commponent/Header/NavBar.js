import React from 'react';
import './NavBar.css'
import * as ReactBootstrap from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = () => {

  


    return (
        <>
            <ReactBootstrap.Navbar bg="light" expand="lg">
            <Link  className="nav-link-logo" to="/">Volunteer Network-20</Link>
            <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootstrap.Nav className="ml-auto">
                <Link  className="nav-link" to="/">Home</Link>
                <Link  className="nav-link" to="/">Link</Link>
                <Link  className="nav-link" to="/">Link</Link>
                <Link  className="nav-link link-login" to="/signinandsignup">Log in</Link>
                </ReactBootstrap.Nav>
            </ReactBootstrap.Navbar.Collapse>
            </ReactBootstrap.Navbar>
        </>
    );
};

export default NavBar;