import React from 'react'
import { connect } from 'react-redux'

const TrustSummary = ({ contractArguments}) => {
  return (
    <div>
      {contractArguments}
      Trust Summary
    </div>
  )
}

export default connect(({ contractArguments }) => ({ contractArguments }))(TrustSummary)
