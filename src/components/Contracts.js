import React from 'react'

export default () => {
  return (
    <div>
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
          <div className="row pa-m--s mt-m--s ">
            <div className="col m8 offset-m2 z-depth-1">
              <div className="row white pa-m--s">
                <div className="row">
                  <div className="col m7">
                    <h2 className="publico">Non-Disclosure Agreement</h2>
                    <p className="text-m">A non-disclosure agreement is a legal contract between at least two parties that outlines confidential material, knowledge, or information that the parties wish to share with one another for certain purposes, but wish to restrict access to or by third parties</p>
                  </div>
                  <div className="col m4 right">
                    <h4>Overall Score: 9.5/10</h4>
                  </div>
                </div>
                <div className="row">
                  <h4> Audited </h4>
                  <img src="img/badge-oz.png" alt="open zeppelin" width="150"/>
                </div>
              </div>
              <div className="row">
                <a href="" className="btn-large btn-flush grey-text text-darken-3">Start Building</a>
              </div>
            </div>  
          </div>

          <div className="row pa-m--s mt-m--s ">
            <div className="col m8 offset-m2 z-depth-1">
              <div className="row white pa-m--s">
                <div className="row">
                  <div className="col m7">
                    <h2 className="publico">Trust Contract</h2>
                    <p className="text-m">A non-disclosure agreement is a legal contract between at least two parties that outlines confidential material, knowledge, or information that the parties wish to share with one another for certain purposes, but wish to restrict access to or by third parties</p>
                  </div>
                  <div className="col m4 right">
                    <h4>Overall Score: 9.5/10</h4>
                  </div>
                </div>
                <div className="row">
                  <h4> Audited </h4>
                  <img src="img/badge-oz.png" alt="open zeppelin" width="150"/>
                </div>
              </div>
              <div className="row">
                <a href="" className="btn-large btn-flush grey-text text-darken-3">Start Building</a>
              </div>
            </div>  
          </div>

        </div>
      </div>
    </div>
  )
}
