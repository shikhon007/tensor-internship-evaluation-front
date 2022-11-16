import Joi from 'joi-browser'
import { handleNextStep, setErrors, setRegistration } from '@components/registration/registrationSlice'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useForm from '@components/form/useForm'
import Input from '@components/input/Input'

const StepOne = () => {
  const registration = useSelector((state) => state.registration)
  const { companyName, representativeName, representativeNid, errors } = registration
  const dispatch = useDispatch()

  // schema for validation
  const schema = {
    companyName: Joi.string().required().label('CompanyName'),
    representativeName: Joi.string().min(4).max(20).required().label('RepresentativeName'),
    representativeNid: Joi.string().min(10).max(13).required().label('RepresentativeNid'),
  }

  // validation data
  const checkSchema = {
    companyName: companyName,
    representativeName: representativeName,
    representativeNid: representativeNid,
  }

  // set onchange data
  const setRegistrationData = (data, inputName) => {
    let newdata = { ...data, inputName }
    dispatch(setRegistration(newdata))
  }

  // set error data
  const setErrorsData = (error) => {
    dispatch(setErrors(error))
  }

  // submit form data
  const doSubmit = async () => {
    dispatch(handleNextStep())
  }

  const { handleChange, handleSubmit } = useForm(
    schema,
    checkSchema,
    registration,
    setRegistrationData,
    errors,
    setErrorsData,
    doSubmit,
  )

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h3 className="text-2xl mb-5 text-sky-500">Registration Form</h3>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-full border-t-4 mb-10 border-sky-300"
      >
        <Input
          type="text"
          onChange={handleChange}
          value={companyName}
          placeholder="enter your companyName"
          name="companyName"
          label="companyName"
          error={errors.companyName}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={representativeName}
          placeholder="enter your representativeName"
          name="representativeName"
          label="representativeName"
          error={errors.representativeName}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={representativeNid}
          placeholder="enter your representativeNid"
          name="representativeNid"
          label="representativeNid"
          error={errors.representativeNid}
        />

        <div className="space-x-4 my-4">
          <button disabled className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-white-500">
            prev
          </button>
          <button
            onClick={handleSubmit}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            next
          </button>
        </div>
      </form>
    </div>
  )
}

export default StepOne
