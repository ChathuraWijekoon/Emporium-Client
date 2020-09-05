import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore';
import { observer } from 'mobx-react-lite';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
    const rootStore = useContext(RootStoreContext);
    const { isLoggedIn, user } = rootStore.userStore;

    return (
        <Route
            {...rest}
            render={(props) => (isLoggedIn && user.role === role ? <Component {...props} /> : <Redirect to="/" />)}
        />
    );
};

export default observer(PrivateRoute);
