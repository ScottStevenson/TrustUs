import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import App from "./App";
import Contracts from './components/Contracts'
import Trust from './components/Trust'
import TrustSummary from './components/TrustSummary'
import { connect } from 'react-redux'
import getWeb3 from './utils/getWeb3'
import { setWeb3 } from './actions'


// const Root = ( { store } ) => (
//     <Provider store={store}>
//         <Router>
//             <div>
//               <Route exact path="/" component={App} />
//               <Route path="/contracts" component={Contracts} />
//               <Route path="/trust" component={Trust} />
//               <Route path="/summary" component={TrustSummary} />
//             </div>
//         </Router>
//     </Provider>
// );

class Root extends React.Component {
  componentWillMount(){
    getWeb3
      .then(results => {
        console.log('web3 is hapening')
        this.props.handleSetWeb3(results.web3)

        // Instantiate contract once web3 provided.
        //this.instantiateContract()
      })
  }

  render(){
    const { store } = this.props
    return <Provider store={store}>
        <Router>
            <div>
              <Route exact path="/" component={App} />
              <Route path="/contracts" component={Contracts} />
              <Route path="/trust" component={Trust} />
              <Route path="/summary" component={TrustSummary} />
            </div>
        </Router>
    </Provider>
  }
}



Root.propTypes = {
    store: PropTypes.oneOfType( [
        PropTypes.func.isRequired,
        PropTypes.object.isRequired,
    ] ).isRequired,
};


export default connect(()=>{ return {} }, (dispatch)=>{ return {
  handleSetWeb3: (web3) => dispatch(setWeb3(web3))
}})(Root)
