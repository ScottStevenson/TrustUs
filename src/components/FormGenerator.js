import React from 'react'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'
import { submit, nextStep, prevStep, onChange} from '../actions'


function FormGenerator ({ form, handleSubmit, handleNextStep, handlePrevStep, handleOnChange }) {
  let steps = form.steps.map((step, i, arr) => {
    let submitButton,
        submitFunc
    if(i === arr.length - 1 && step.secondaryFormShow === true || step.secondaryForm === false) {
      submitButton = <button type="submit">Submit</button>
      submitFunc = submit
    } else {
      submitButton = <button type="submit">Next</button>
      submitFunc = () => handleNextStep(step, i)
    }

    if(step.secondaryFormShow === true) {
      let secondaryFormName = step.formData[step.schema.name]

      return <Form
        schema={step.schema.secondaryForms[secondaryFormName].schema}
        uiSchema={step.uiSchema}
        formData={step.formData}
        onSubmit={submitFunc}
        onChange={() => console.log(arguments)}
        >
        <div>
          {submitButton}
          <button type="button" onClick={() => handlePrevStep(step, i)}>Back</button>
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
        {submitButton}
        <button type="button" onClick={() => handlePrevStep(step, i)}>Back</button>
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
    handleNextStep: (step, i) => dispatch(nextStep(step, i)),
    handlePrevStep: (step, i) => dispatch(prevStep(step, i)),
    handleOnChange: (index, name, data, secondary) => dispatch(onChange(index, name, data, secondary))
  })
)(FormGenerator)
