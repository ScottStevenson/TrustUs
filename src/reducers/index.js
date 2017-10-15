import { combineReducers } from 'redux'
import form from './formReducer'

function web3(state = {}, action){
  if(action.type === 'SET_WEB3') {
    return action.web3
  }

  return state
}

function contractArguments(state = {}, action){
  if(action.type === 'REVIEW_CONTRACT'){
    return action.form
  }
  return state
}

const reducers = combineReducers( {
    form,
    web3,
    contractArguments
} );

export default reducers
