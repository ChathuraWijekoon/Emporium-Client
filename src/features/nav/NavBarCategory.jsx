/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';

const NavBarCategory = () => {
    const navDropdownTitle = (
        <>
            <i className="fa fa-bars"></i> All Categories
        </>
    );

    return (
        <Navbar className="navbar navbar-main navbar-expand-lg navbar-light border-bottom" expand="lg">
            <div className="container">
                <Navbar.Toggle aria-controls="navbar-category-main" />
                <Navbar.Collapse id="navbar-category-main">
                    <Nav className="navbar-nav">
                        <NavDropdown title={navDropdownTitle} id="navbar-category">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Fashion</Nav.Link>
                        <Nav.Link href="#link">Supermarket</Nav.Link>
                        <Nav.Link href="#link">Electronics</Nav.Link>
                        <Nav.Link href="#link">Baby & Toys</Nav.Link>
                        <Nav.Link href="#link">Fitness Sport</Nav.Link>
                        <Nav.Link href="#link">Clothing</Nav.Link>
                        <Nav.Link href="#link">Furniture</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavBarCategory;
