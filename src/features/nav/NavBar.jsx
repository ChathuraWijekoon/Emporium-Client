import React from 'react';

const NavBar = () => {
    return (
        <div className="d-flex flex-column flex-md-row align-items-center mb-3 bg-white">
            <h5 className="my-0 mr-md-auto font-weight-normal">Emporium</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="#">
                    Products
                </a>
                <a className="p-2 text-dark" href="#">
                    Categories
                </a>
                <a className="p-2 text-dark" href="#">
                    Shipping
                </a>
                <a className="p-2 text-dark" href="#">
                    Sell
                </a>
            </nav>
            <a className="btn btn-outline-primary" href="#">
                Sign up
            </a>
        </div>
    );
};

export default NavBar;
