import React from 'react'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'
import { submit, nextStep, prevStep, onChange} from '../actions'

// function nextStep(step) {
//   if(step.secondaryForm){
//     // update secondary formData
//   } else {
//     // update normal
//   }
//
//   //increment state of form
// }
//
// function prevStep(){
//   //decrement state of form
// }
//
// function submit(){
//   //
// }

function FormGenerator ({ form, handleSubmit, handleNextStep, handlePrevStep, handleOnChange }) {
  let steps = form.steps.map((step, i, arr) => {
    let button,
        submitFunc
    if(i === arr.length - 1) {
      submitFunc = submit
    } else {
      submitFunc = () => handleNextStep(step, i)
    }

    if(step.secondaryFormShow === true) {
      return <Form
        schema={step.formData[step.name].schema}
        uiSchema={step.uiSchema}
        formData={step.formData}
        onSubmit={submitFunc}
        onChange={() => console.log(arguments)}
        >
        <div>
          <button type="submit">Next</button>
          <button type="button" onClick={handlePrevStep}>Back</button>
        </div>
      </Form>
    }

    return <Form
      schema={step.schema}
      uiSchema={step.uiSchema}
      formData={step.formData}
      onSubmit={submitFunc}
      onChange={result => handleOnChange(i, step.name, result.formData, false)}
      >
      <div>
        <button type="submit">Next</button>
        <button type="button">Back</button>
      </div>
    </Form>
  })
  return <div>
    {steps}
  </div>
}

export default connect(
  ({ form }) => ({ form }),
  dispatch => ({
    handleSubmit: () => dispatch(submit),
    handleNextStep: () => dispatch(nextStep),
    handlePrevStep: () => dispatch(prevStep),
    handleOnChange: (index, name, data, secondary) => dispatch(onChange(index, name, data, secondary))
  })
)(FormGenerator)
