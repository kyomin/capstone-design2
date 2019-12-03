import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Store from './components/Store/Store'
import Read from './components/Read/Read';
import App from './App';


class Routes extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/store" component={Store} />
                    <Route exact path="/read" component={Read} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;