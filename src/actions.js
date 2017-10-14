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

export function onChange(index, name, data, secondary){
  return {
    type: 'UPDATE_FORM_DATA',
    index,
    secondary,
    name,
    data
  }
}


export function nextStep(step, i) {
  return dispatch => {
    if(step.secondaryForm){
      // update secondary formData
    } else {
      // update normal
    }

    dispatch(incrementStep(i + 1))
  }
  //increment state of form
}

export function prevStep(i){

  //decrement state of form
  return {
    type: 'PREV_STEP',
    currentStep: i - 1
  }
}

export function submit(){
  //
}
