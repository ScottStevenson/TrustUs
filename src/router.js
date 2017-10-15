import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import App from "./App";
import Contracts from './components/Contracts'
import Trust from './components/Trust'
import TrustSummary from './components/TrustSummary'

const Root = ( { store } ) => (
    <Provider store={store}>
        <Router>
            <div>
              <Route exact path="/" component={App} />
              <Route path="/contracts" component={Contracts} />
              <Route path="/contracts/trust" component={Trust} />
              <Route path="/contracts/trust/summary" component={TrustSummary} />
            </div>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.oneOfType( [
        PropTypes.func.isRequired,
        PropTypes.object.isRequired,
    ] ).isRequired,
};


export default Root;
