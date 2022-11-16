import Joi from 'joi-browser'
import { handleNextStep, setErrors, setRegistration } from '@components/registration/registrationSlice'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useForm from '@components/form/useForm'
import Input from '@components/input/Input'

const StepThree = () => {
  const registration = useSelector((state) => state.registration)
  const dispatch = useDispatch()
  const { name, contact, postalCode, errors } = registration

  const schema = {
    name: Joi.string().min(4).max(20).required().label('Name'),
    contact: Joi.string().min(11).max(11).required().label('Contact'),
    postalCode: Joi.string().required().label('PostalCode'),
  }

  // validation data
  const checkSchema = {
    name: name,
    contact: contact,
    postalCode: postalCode,
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
          value={name}
          placeholder="enter your name"
          name="name"
          label="name"
          error={errors.name}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={contact}
          placeholder="enter your contact"
          name="contact"
          label="contact"
          error={errors.contact}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={postalCode}
          placeholder="enter your postalCode"
          name="postalCode"
          label="postalCode"
          error={errors.postalCode}
        />

        <div className="space-x-4 my-4">
          <button className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-white-500">prev</button>
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

export default StepThree
