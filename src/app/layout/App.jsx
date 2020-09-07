// modules
import React, { Fragment, useContext, useEffect } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';

// state
import { RootStoreContext } from '../stores/rootStore';

// components
import HomePage from '../../features/home/HomePage';
import AdminPage from '../../features/admin/AdminPage';
import NavBar from '../../features/nav/NavBar';
import LoginForm from '../../features/user/LoginForm';
import RegisterForm from '../../features/user/RegisterForm';
import ProductDetail from '../../features/product/ProductDetail';
import AdminProductDetail from '../../features/admin/AdminProductDetail';
import AdminUserDetail from '../../features/admin/AdminUserDetail';
import SellerPage from '../../features/seller/SellerPage';
import SellerProductDetail from '../../features/seller/SellerProductDetail';
import CartPage from '../../features/cart/CartPage';
import LoadingComponent from './LoadingComponent';
import PrivateRoute from './PrivateRoute';

const App = ({ location }) => {
    const rootStore = useContext(RootStoreContext);
    const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
    const { getUser } = rootStore.userStore;

    useEffect(() => {
        if (token) {
            getUser().finally(() => setAppLoaded());
        } else {
            setAppLoaded();
        }
    }, [getUser, setAppLoaded, token]);

    if (!appLoaded) return <LoadingComponent content="Loading app..." />;

    return (
        // <div className="container-fluid p-3 px-md-4">
        <>
            <ToastContainer position="bottom-right" />
            <Route
                // path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar />
                        <div>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/login" component={LoginForm} />
                                <Route exact path="/register" component={RegisterForm} />
                                <Route exact path="/product/:id" component={ProductDetail} />
                                <PrivateRoute role="admin" exact path="/admin" component={AdminPage} />
                                <PrivateRoute
                                    role="admin"
                                    exact
                                    path="/admin/product/:id"
                                    component={AdminProductDetail}
                                />
                                <PrivateRoute
                                    role="admin"
                                    exact
                                    path="/users/:id"
                                    component={AdminUserDetail}
                                />
                                <PrivateRoute role="seller" exact path="/sell" component={SellerPage} />
                                <PrivateRoute
                                    role="seller"
                                    exact
                                    path="/sell/product/:id"
                                    component={SellerProductDetail}
                                />
                                <PrivateRoute role="user" exact path="/cart" component={CartPage} />
                            </Switch>
                        </div>
                    </Fragment>
                )}
            />
            {/* </div> */}
        </>
    );
};

export default withRouter(observer(App));
