import React from 'react'
import FormGenerator from './FormGenerator.js'

export default () => {
  return (
    <div className="green height">
      <div className="container">
      	<div className="row pa-m--s">
      	  <div className="col m4">
      	    <img src="img/logo-white.svg" alt="" /> 
      	  </div>
      	</div>
        <div className="row pb-xl--s">
          <div className="col m10 offset-m1">
            <div className="col m12 l8 s12">
              <div className="row">
              <h1 className="publico white-text">  Irrevocable Trust </h1>
              </div>
              <FormGenerator />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
