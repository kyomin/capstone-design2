import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from './components/Landing/Landing';
import Store from './components/Store/Store'
import Read from './components/Read/Read';
import Error from './components/Error/Error';

function App() {
    return (
      <Router>
        <div>  
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/store" component={Store} />
            <Route exact path="/read" component={Read} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    );
  }

export default App;