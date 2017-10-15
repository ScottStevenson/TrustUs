import { deployContract } from './contract-compiler/compile-and-deploy'

export function defaultAction(){
  return {
    type: 'whoops'
  }
}

function incrementStep(num){
  return {
    type: 'INCREMENT_STEP',
    currentStep: num
  }
}

function decrementStep(num){
  return {
    type: 'DECREMENT_STEP',
    currentStep: num
  }
}

export function onChange(index, name, data, secondary){
  return {
    type: 'UPDATE_FORM_DATA',
    index,
    secondary,
    name,
    data
  }
}

function toggleSecondaryForm(index, name){
  return {
    type: 'TOGGLE_SECONDARY_FORM',
    index
  }
}

export function nextStep(step, i) {
  return dispatch => {
    if(step.secondaryForm){
      // update secondary formData
      dispatch(toggleSecondaryForm(i, step.name))
    } else {
      // update normal
      dispatch(incrementStep(i + 1))
    }
  }
  //increment state of form
}

export function prevStep(step, i){

  return dispatch => {
    if(step.secondaryForm){
      // update secondary formData
      dispatch(toggleSecondaryForm(i, step.name))
    } else {
      // update normal
      dispatch(decrementStep(i - 1))
    }
  }
}

export function submit(web3, form){
  return dispatch => {
    console.log('submitted yo', form)
    deployContract(web3, form)
  }
}

export function reviewContract(form){
  return {
    type: "REVIEW_CONTRACT",
    form
  }
}

export function setWeb3(web3){
  return {
    type: "SET_WEB3",
    web3
  }
}
