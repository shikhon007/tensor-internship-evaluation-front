import StepOne from '@components/steps/StepOne'
import StepTwo from '@components/steps/StepTwo'
import StepThree from '@components/steps/StepThree'
import FinalStep from '@components/steps/FInalStep'
import React from 'react'
import { useSelector } from 'react-redux'

const Registration = () => {
  const registration = useSelector((state) => state.registration)

  switch (registration.step) {
    case 1:
      return <StepOne />
    case 2:
      return <StepTwo />
    case 3:
      return <StepThree />
    case 4:
      return <FinalStep />
  }
}

export default Registration
