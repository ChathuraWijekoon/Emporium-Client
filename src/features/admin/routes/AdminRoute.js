import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import agent from '../../../app/api/agent';

const PrivateRoute = ({component: Component, ...rest}) => {
    let user = agent.User.current();
    return (
       
        <Route {...rest} render={props => (
          user ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;