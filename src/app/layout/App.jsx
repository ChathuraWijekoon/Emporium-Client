import React, { Fragment } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';

const App = ({ location }) => {
    return (
        // <div className="container-fluid p-3 px-md-4">
        <>
            <Route
                // path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar />
                        <div>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                            </Switch>
                        </div>
                    </Fragment>
                )}
            />
            {/* </div> */}
        </>
    );
};

export default withRouter(App);
