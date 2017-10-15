import React from 'react'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'
import { submit, nextStep, prevStep, onChange, reviewContract} from '../actions'
import { withRouter } from 'react-router-dom'


function FormGenerator ({ form, handleSubmit, handleNextStep, handlePrevStep, handleOnChange, web3, history }) {
  let steps = form.steps.map((step, i, arr) => {
    let submitButton,
        submitFunc

    if(i === arr.length - 1 && step.secondaryFormShow === true || step.secondaryForm === false) {
      submitButton = <button type="submit">Review Contract</button>
      submitFunc = () => handleSubmit(web3, form, history)
    } else {
      submitButton = <button type="submit">Next</button>
      submitFunc = () => handleNextStep(step, i)
    }

    if(step.secondaryFormShow === true) {
      let secondaryFormName = step.formData[step.name]
      let secondaryFormData = step.schema.secondaryForms[secondaryFormName].formData

      console.log(secondaryFormData)

      return <Form
        schema={step.schema.secondaryForms[secondaryFormName].schema}
        uiSchema={step.schema.secondaryForms[secondaryFormName].uiSchema}
        formData={secondaryFormData}
        onSubmit={submitFunc}
        onChange={(result) => {handleOnChange(i, step.name, result.formData, true)}}
        key={i}
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
      key={i}
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
  ({ form, web3 }) => ({ form, web3 }),
  dispatch => ({
    handleSubmit: (web3, form, history) => {
      let data = form.steps.reduce((acc, step) => {
        let obj = {
          ...acc,
          [step.name]: {
            value: step.formData[step.name],
          }
        }

        if(step.secondaryForm){
          let selected = step.formData[step.name]
          //step.schema.secondaryForm[]
          console.log(step)
          obj[step.name].details = step.schema.secondaryForms[selected].formData
        }

        return obj
      }, {})

      dispatch(reviewContract(data))
      history.push('/summary')
    },
    handleNextStep: (step, i) => dispatch(nextStep(step, i)),
    handlePrevStep: (step, i) => dispatch(prevStep(step, i)),
    handleOnChange: (index, name, data, secondary) => dispatch(onChange(index, name, data, secondary))
  })
)(withRouter(FormGenerator))
