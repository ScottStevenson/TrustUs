import React from 'react'
import { connect } from 'react-redux'

const TrustSummary = ({ contractArguments}) => {
  console.log(contractArguments)
  let triggerType = contractArguments.trigger.value
  let beneficaries = contractArguments.beneficaries.value.map(bene =>
    <div>
      {bene}
    </div>)

  let trustType = contractArguments.typeOfTrust.value
  return (
    <div>
      <h2>Trust Summary</h2>
      <div>Type of Trust: {trustType}</div>
      <div>{beneficaries}</div>
      <div>Trigger: {triggerType}</div>
    </div>
  )
}

export default connect(({ contractArguments }) => ({ contractArguments }))(TrustSummary)
