/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Footer = () => {
    return (
        <footer className="section-footer border-top bg">
            <div className="container">
                <section className="footer-top  padding-y">
                   <div className="row">
                       <aside className="col-md col-6">
                            <h6 className="title">Company</h6>
                            <ul className="list-unstyled">
                                <li>
                                    {' '}
                                    <a href="#">About us</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#">Career</a>
                                </li>
                            </ul>
                        </aside> 
                        <aside className="col-md col-6">
                            <h6 className="title">Help</h6>
                            <ul className="list-unstyled">
                                <li>
                                    {' '}
                                    <a href="#">Contact us</a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#">Money refund</a>
                                </li>
                            </ul>
                        </aside> 
                        <aside className="col-md col-6">
                            <h6 className="title">Account</h6>
                            <ul className="list-unstyled">
                                <li>
                                    {' '}
                                    <a href="#"> User Login </a>
                                </li>
                                <li>
                                    {' '}
                                    <a href="#"> User register </a>
                                </li>
                            </ul>
                        </aside>
                        <aside className="col-md">
                            <h6 className="title">Social</h6>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#">
                                        {' '}
                                        <i className="fab fa-facebook"></i> Facebook{' '}
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        {' '}
                                        <i className="fab fa-twitter"></i> Twitter{' '}
                                    </a>
                                </li> 
                            </ul>  
                        </aside>      
                    </div>  
                </section>

                <section className="footer-bottom row">
                    <div className="col-md-2">
                        <p className="text-muted"> @ {new Date().getFullYear()} Space Coders </p>
                    </div>
                    <div className="col-md-8 text-md-center">
                        <span className="px-2">info@spacecoders.com</span>
                        <span className="px-2">+94 71 552 0912</span>
                        <span className="px-2">No.372/3, Straford Avenue</span>
                    </div>
                    <div className="col-md-2 text-md-right text-muted">
                        <i className="fab fa-lg fa-cc-visa"></i>
                        <i className="fab fa-lg fa-cc-paypal"></i>
                        <i className="fab fa-lg fa-cc-mastercard"></i>
                    </div>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
