import React from 'react'
import FormGenerator from './FormGenerator.js'

export default () => {
  return (
    <div className="green">
      <div className="container">
      	<div className="row pa-m--s">
      	  <div className="col m4">
      	    <img src="img/logo-white.svg" alt="" /> 
      	  </div>
      	</div>
        <div className="row">
          <div className="col m10 offset-m1">
            <div className="col m12 l8 s12">
              <FormGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
