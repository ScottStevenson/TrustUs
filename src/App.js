import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import FormGenerator from './components/FormGenerator'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    //const { form } = this.props
    return (
      <div className="row app">
        <div className="row container pa-m--s">
          <div className="col m5">
            <a href="#"> 
              <img src="img/logo.svg" alt="" /> 
            </a>
          </div>
          <div className="col m4 right">
            <a href="" className="btn btn-round red"> </a>
          </div>
        </div>
        <div className="row pa-m--s mt-l--s">
          <div className="container pa-m--s">
            <div className="col m6">
              <h1 className="publico text-xl">Hello</h1>
              <h2 className="publico">Lets Build a Smart Contract!</h2>
            </div>
            <div className="col m6">
              <div className="windmill-container">
                <div className="stolby">
                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="511.411px" height="407.229px" viewBox="0 0 511.411 407.229" enableBackground="new 0 0 511.411 407.229"
                 xmlSpace="preserve">
              <g>
                <polygon points="374.238,407.229 336.238,407.229 346.238,32.229 364.238,32.229  "/>
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="374.3179" y1="233.0791" x2="332.9839" y2="234.4131">
                  <stop  offset="0" style={{stopColor:'#6A4301'}}/>
                  <stop  offset="0.1656" style={{stopColor:'#030500'}}/>
                  <stop  offset="0.4969" style={{stopColor:'#06224B'}}/>
                  <stop  offset="1" style={{stopColor:'#132457'}}/>
                </linearGradient>
                <path fill="url(#SVGID_1_)" d="M354.571,60.562c-3.076,0-6.105-0.24-9.07-0.698l-9.263,347.365h38l-9.27-347.601
                  C361.581,60.229,358.11,60.562,354.571,60.562z"/>
                <path fill="#010E2B" d="M365.125,0.643c0,0-45.873,12.13-40.393,26.906c5.48,14.776,50.432,2.771,50.432,2.771
                  s14.19-8.514,7.741-21.09C376.238-3.771,365.125,0.643,365.125,0.643z"/>
                <g>
                  <path d="M382.905,9.229c-0.193-0.376-0.391-0.734-0.591-1.082c0.701,8.776-8.046,15.199-8.046,15.199s-41.478,15.309-49.883,2.916
                    c0.074,0.427,0.187,0.855,0.347,1.287c5.48,14.776,50.432,2.771,50.432,2.771S389.354,21.806,382.905,9.229z"/>
                  <path fill="#010E2B" d="M374.268,23.346c0,0,8.747-6.422,8.046-15.199c-6.711-11.663-17.189-7.504-17.189-7.504
                    s-43.229,11.432-40.739,25.619C332.791,38.655,374.268,23.346,374.268,23.346z"/>
                </g>
                <circle cx="369.561" cy="15.612" r="15.611"/>
                <path fill="#8C330C" d="M351.489,8.312c0,0-20.962,7.299-23.834,14.25c-2.146,5.193,22.5-2.667,22.5-2.667s-1.083-2.333-0.666-6
                  S351.489,8.312,351.489,8.312"/>
              </g>
              <g>
                <polygon points="39.658,407.268 9.494,407.268 17.432,109.596 31.72,109.596  "/>
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="39.7222" y1="269.0303" x2="6.912" y2="270.0892">
                  <stop  offset="0" style={{stopColor:'#6A4301'}}/>
                  <stop  offset="0.1656" style={{stopColor:'#030500'}}/>
                  <stop  offset="0.4969" style={{stopColor:'#06224B'}}/>
                  <stop  offset="1" style={{stopColor:'#132457'}}/>
                </linearGradient>
                <path fill="url(#SVGID_2_)" d="M24.047,132.086c-2.442,0-4.847-0.19-7.2-0.554L9.494,407.268h30.164L32.3,131.345
                  C29.611,131.822,26.856,132.086,24.047,132.086z"/>
                <path fill="#010E2B" d="M32.424,84.523c0,0-36.414,9.628-32.063,21.358c4.351,11.729,40.032,2.199,40.032,2.199
                  s11.264-6.758,6.145-16.741C41.246,81.02,32.424,84.523,32.424,84.523z"/>
                <g>
                  <path d="M46.538,91.339c-0.154-0.299-0.31-0.583-0.469-0.859c0.557,6.966-6.387,12.064-6.387,12.064s-32.924,12.152-39.597,2.314
                    c0.059,0.339,0.148,0.679,0.275,1.022c4.351,11.729,40.032,2.199,40.032,2.199S51.657,101.322,46.538,91.339z"/>
                  <path fill="#010E2B" d="M39.682,102.545c0,0,6.943-5.098,6.387-12.064c-5.327-9.258-13.645-5.957-13.645-5.957
                    s-34.315,9.075-32.339,20.336C6.758,114.697,39.682,102.545,39.682,102.545z"/>
                </g>
                <circle cx="35.946" cy="96.405" r="12.392"/>
                <path fill="#8C330C" d="M21.6,90.611c0,0-16.639,5.794-18.919,11.312c-1.703,4.123,17.86-2.117,17.86-2.117
                  s-0.86-1.852-0.529-4.763C20.344,92.133,21.6,90.611,21.6,90.611"/>
              </g>
              
              <g opacity="0.95">
                <polygon points="505.428,407.268 484.645,407.268 490.115,202.164 499.959,202.164  "/>
                <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="505.4741" y1="312.0166" x2="482.8659" y2="312.7462">
                  <stop  offset="0" style={{stopColor:'#6A4301'}}/>
                  <stop  offset="0.1656" style={{stopColor:'#030500'}}/>
                  <stop  offset="0.4969" style={{stopColor:'#06224B'}}/>
                  <stop  offset="1" style={{stopColor:'#132457'}}/>
                </linearGradient>
                <path fill="url(#SVGID_4_)" d="M494.671,217.661c-1.681,0-3.339-0.133-4.961-0.383l-5.065,189.989h20.783l-5.068-190.118
                  C498.505,217.479,496.608,217.661,494.671,217.661z"/>
                <path fill="#010E2B" d="M500.444,184.889c0,0-25.089,6.635-22.093,14.716c2.999,8.082,27.583,1.516,27.583,1.516
                  s7.762-4.657,4.234-11.535C506.522,182.475,500.444,184.889,500.444,184.889z"/>
                <g>
                  <path d="M510.168,189.585c-0.104-0.206-0.212-0.401-0.322-0.592c0.384,4.8-4.4,8.312-4.4,8.312s-22.686,8.374-27.283,1.596
                    c0.041,0.232,0.102,0.467,0.188,0.703c2.999,8.082,27.583,1.516,27.583,1.516S513.696,196.463,510.168,189.585z"/>
                  <path fill="#010E2B" d="M505.446,197.306c0,0,4.784-3.513,4.4-8.312c-3.671-6.379-9.402-4.104-9.402-4.104
                    s-23.643,6.252-22.281,14.013C482.76,205.68,505.446,197.306,505.446,197.306z"/>
                </g>
                <circle cx="502.872" cy="193.075" r="8.539"/>
                <path fill="#8C330C" d="M492.986,189.084c0,0-11.465,3.991-13.035,7.793c-1.173,2.84,12.308-1.458,12.308-1.458
                  s-0.594-1.276-0.365-3.282C492.122,190.132,492.986,189.084,492.986,189.084"/>
              </g>
              </svg>
              </div>
              <div id="v1">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="386.318px" height="383.263px" viewBox="0 0 386.318 383.263" enableBackground="new 0 0 386.318 383.263"
                 xmlSpace="preserve">
              <g>
                <g>
                  <path d="M130.94,3.861c0,0,22.969,107.389,27.945,126.642c7.857,30.4,27.35,60.646,27.35,60.646l12.485-2.974
                    c0,0-59.456-196.799-67.78-187.881"/>
                  <path d="M48.472,334.449c0,0,85.37-69.078,100.287-82.228c23.553-20.765,41.703-51.834,41.703-51.834l-8.302-9.789
                    c0,0-148.589,142.079-136.869,145.465"/>
                  <path d="M383.356,248.43c0,0-101.435-42.082-120.107-48.92c-29.485-10.797-65.449-11.929-65.449-11.929l-4.644,11.965
                    c0,0,195.751,62.826,193.136,50.909"/>
                </g>
                <circle cx="193.021" cy="192.458" r="14.449"/>
              </g>
              </svg>
                </div>
                
               
               <div id="v1">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="386.318px" height="383.263px" viewBox="0 0 386.318 383.263" enableBackground="new 0 0 386.318 383.263"
                 xmlSpace="preserve">
              <g>
                <g>
                  <path d="M130.94,3.861c0,0,22.969,107.389,27.945,126.642c7.857,30.4,27.35,60.646,27.35,60.646l12.485-2.974
                    c0,0-59.456-196.799-67.78-187.881"/>
                  <path d="M48.472,334.449c0,0,85.37-69.078,100.287-82.228c23.553-20.765,41.703-51.834,41.703-51.834l-8.302-9.789
                    c0,0-148.589,142.079-136.869,145.465"/>
                  <path d="M383.356,248.43c0,0-101.435-42.082-120.107-48.92c-29.485-10.797-65.449-11.929-65.449-11.929l-4.644,11.965
                    c0,0,195.751,62.826,193.136,50.909"/>
                </g>
                <circle cx="193.021" cy="192.458" r="14.449"/>
              </g>
              </svg>
                </div>
                
               
                <div id="v2">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="386.318px" height="383.263px" viewBox="0 0 386.318 383.263" enableBackground="new 0 0 386.318 383.263"
                 xmlSpace="preserve">
              <g>
                <g>
                  <path d="M130.94,3.861c0,0,22.969,107.389,27.945,126.642c7.857,30.4,27.35,60.646,27.35,60.646l12.485-2.974
                    c0,0-59.456-196.799-67.78-187.881"/>
                  <path d="M48.472,334.449c0,0,85.37-69.078,100.287-82.228c23.553-20.765,41.703-51.834,41.703-51.834l-8.302-9.789
                    c0,0-148.589,142.079-136.869,145.465"/>
                  <path d="M383.356,248.43c0,0-101.435-42.082-120.107-48.92c-29.485-10.797-65.449-11.929-65.449-11.929l-4.644,11.965
                    c0,0,195.751,62.826,193.136,50.909"/>
                </g>
                <circle cx="193.021" cy="192.458" r="14.449"/>
              </g>
              </svg>
                </div>
                
                
                <div id="v3">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 width="386.318px" height="383.263px" viewBox="0 0 386.318 383.263" enableBackground="new 0 0 386.318 383.263"
                 xmlSpace="preserve">
              <g>
                <g>
                  <path d="M130.94,3.861c0,0,22.969,107.389,27.945,126.642c7.857,30.4,27.35,60.646,27.35,60.646l12.485-2.974
                    c0,0-59.456-196.799-67.78-187.881"/>
                  <path d="M48.472,334.449c0,0,85.37-69.078,100.287-82.228c23.553-20.765,41.703-51.834,41.703-51.834l-8.302-9.789
                    c0,0-148.589,142.079-136.869,145.465"/>
                  <path d="M383.356,248.43c0,0-101.435-42.082-120.107-48.92c-29.485-10.797-65.449-11.929-65.449-11.929l-4.644,11.965
                    c0,0,195.751,62.826,193.136,50.909"/>
                </g>
                <circle cx="193.021" cy="192.458" r="14.449"/>
              </g>
              </svg>
                </div>
                
              
                
                
              </div>
            </div>
          </div>
        </div>
        <div className="green pa-m--s">
          <div className="container">
            <div className="row">
              <div className="col m4">
                <img src="img/logo-white.svg" alt="" /> 
              </div>
              <div className="col m4 right">
                <div className="input-field search">
                  <i className="material-icons prefix">search</i>
                  <input id="icon_telephone" type="search" class="validate" />
                </div>
              </div>
            </div>
            <div className="row pa-m--s mt-m--s">
              <div className="col m8 offset-m2">
                <div className="row white pa-m--s">
                  <div className="col m7">
                    <h2 className="publico">Non-Disclosure Agreement</h2>
                    <p className="text-m">A non-disclosure agreement is a legal contract between at least two parties that outlines confidential material, knowledge, or information that the parties wish to share with one another for certain purposes, but wish to restrict access to or by third parties</p>
                  </div>
                  <div className="col m4 right">
                  <h4>Overall Score: 9.5/10</h4>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        <div className="row container">
            <FormGenerator />
        </div>
      </div>
      
    );
  }
}

export default App
