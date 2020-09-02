/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import NavBarForm from './NavBarForm';
import NavBarCategory from './NavBarCategory';

// assets
import imgLogo from '../../assets/images/logo/emporium-logo-resize.png';

const NavBar = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('ssss');
    };

    return (
        <>
            <header className="section-header">
                <nav className="navbar navbar-dark navbar-expand p-0 bg-primary">
                    <div className="container">
                        <ul className="navbar-nav d-none d-md-flex mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/delivery" className="nav-link">
                                    Delivery
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/payment" className="nav-link">
                                    Payment
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin" className="nav-link">
                                    Admin
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href={null} className="nav-link" role="button">
                                    {' '}
                                    Call: +94 71 552 0912{' '}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <section className="header-main border-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-6">
                                <Link to="/" className="brand-wrap">
                                    <img className="logo" src={imgLogo} alt="logo" />
                                </Link>
                            </div>
                            <div className="col-lg-6 col-12 col-sm-12">
                                <NavBarForm handleFormSubmit={handleFormSubmit} />
                            </div>
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className="widgets-wrap float-md-right">
                                    <div className="widget-header  mr-3">
                                        <a role="button" className="icon icon-sm rounded-circle border">
                                            <i className="fa fa-shopping-cart"></i>
                                        </a>
                                        <span className="badge badge-pill badge-danger notify">0</span>
                                    </div>
                                    <div className="widget-header icontext">
                                        <a role="button" className="icon icon-sm rounded-circle border">
                                            <i className="fa fa-user"></i>
                                        </a>
                                        <div className="text">
                                            <span className="text-muted">Welcome {user ? user.name : '!'}</span>
                                            {!user ? (
                                                <div>
                                                    <Link className="nav-link auth-links" to="/login">
                                                        Sign in
                                                    </Link>{' '}
                                                    |
                                                    <Link className="nav-link auth-links" to="/register">
                                                        {' '}
                                                        Register
                                                    </Link>
                                                </div>
                                            ) : (
                                                <div>
                                                    <a className="nav-link auth-links" role="button" onClick={logout}>
                                                        {' '}
                                                        Logout
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
            <NavBarCategory />
        </>
    );
};

export default observer(NavBar);
