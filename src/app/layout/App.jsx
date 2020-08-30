import React, { Fragment, useContext } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from '../stores/rootStore';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import RegisterForm from '../../features/user/RegisterForm';
import LoginForm from '../../features/user/LoginForm';

const App = ({ location }) => {
    const rootStore = useContext(RootStoreContext);

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
                                <Route exact path="/register" component={RegisterForm} />
                                <Route exact path="/login" component={LoginForm} />
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
