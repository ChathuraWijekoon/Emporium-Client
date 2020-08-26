import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

const App = ({ location }) => {
    return (
        <Fragment>
            <Route exact path="/" component={HomePage} />
        </Fragment>
    );
};

export default withRouter(App);
