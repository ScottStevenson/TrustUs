import React from 'react'
import { connect } from 'react-redux'
import { submit } from '../actions'

const TrustSummary = ({ contractArguments, web3, deploy}) => {
  let triggerType = contractArguments.trigger.value
  let beneficaries = contractArguments.beneficaries.value.map(bene =>
    <div>
      {bene}
    </div>)

  let trustType = contractArguments.typeOfTrust.value
  return (

      	<div className="row green pa-m--s">
        	<div className="container">
        		<div className="row">
        		  <div className="col m4">
        		    <img src="img/logo-white.svg" alt="" />
        		  </div>
        		  <div className="col m4 right">
        		    <div className="input-field search">
        		      <i className="material-icons prefix">search</i>
        		      <input id="icon_telephone" type="search" className="validate" />
        		    </div>
        		  </div>
        		</div>
        		<div className="row mt-l--s">
        			<div className="col m8 white pa-m--s">
	        			<h1 className="publico"> Revocable Trust</h1>
	    				<p>Enter the name of the SETTLOR (person making the trust), referred to herein as SETTLOR, and Name the initial TRUSTEE, referred to herein as TRUSTEE, (the singular term "TRUSTEE" shall refer to multiple TRUSTEES if multiple TRUSTEES are appointed) in consideration of the covenants and undertakings herein agree:
	    				</p>
	    				<h3 className="tw-ultrabold mt-m--s">ARTICLE I </h3>
	    				<h4 className="tw-ultrabold mt-m--s">CONVEYANCE OF PROPERTY TO THE TRUSTEE </h4>
	    				<p>SETTLOR herewith assigns and conveys to the TRUSTEE, the property described in Exhibit "1" hereto. All of said property, together with any income, accessions and additions herein, shall be held by the TRUSTEE in trust for the purposes set forth in this revocable living trust.</p>
	    				<h3 className="tw-ultrabold mt-m--s">ARTICLE II </h3>
	    				<h4 className="tw-ultrabold mt-m--s">REVOCATION </h4>
	    				<p>SETTLOR hereby reserves the right to revoke this trust at any time, by written instrument. Revocation shall be effective upon mailing or delivery to the TRUSTEE of a notice of revocation.</p>
        			</div>
        			<div className="col m4 pa-m--s">
        				<div className="row red pa-m--s z-depth-1">
        					<p className="white-text">WARNING: Upon deployment this contract is irreversible. Please take the precaution of proof reading your doc. Thanks</p>
        				</div>
        				<div className="row mt-m--s">
        					<button className="btn-large btn-flush secondary " onClick={() => deploy(web3, contractArguments)}>DEPLOY </button>
        				</div>
        			</div>
        		</div>
        	</div>

       	</div>

  )
}

export default connect(({ contractArguments, web3 }) => ({ contractArguments, web3 }), dispatch => ({ deploy: (web3, form) => dispatch(submit(web3,form))}))(TrustSummary)
