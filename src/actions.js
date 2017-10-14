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
      dispatch(incrementStep(i - 1))
    }
  }
}

export function submit(){
  //
}
