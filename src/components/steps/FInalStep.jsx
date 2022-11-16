import Joi from 'joi-browser'
import { handlePrevStep, setErrors, setRegistration } from '@components/registration/registrationSlice'
import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import useForm from '@components/form/useForm'
import Input from '@components/input/Input'
import { useRouter } from 'next/router'

const FinalStep = () => {
  const router = useRouter()
  const registration = useSelector((state) => state.registration)
  const dispatch = useDispatch()
  const {
    companyName,
    representativeName,
    representativeNid,
    address,
    email,
    mobile,
    name,
    contact,
    postalCode,
    errors,
  } = registration

  const schema = {
    companyName: Joi.string().required().label('CompanyName'),
    representativeName: Joi.string().min(4).max(20).required().label('RepresentativeName'),
    representativeNid: Joi.string().min(10).max(13).required().label('RepresentativeNid'),
    address: Joi.string().required().label('Address'),
    email: Joi.string().required().label('Email'),
    mobile: Joi.string().min(11).max(11).required().label('Mobile'),
    name: Joi.string().min(4).max(20).required().label('Name'),
    contact: Joi.string().min(11).max(11).required().label('Contact'),
    postalCode: Joi.string().required().label('PostalCode'),
  }

  // validation data
  const checkSchema = {
    companyName: companyName,
    representativeName: representativeName,
    representativeNid: representativeNid,
    address: address,
    email: email,
    mobile: mobile,
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
    console.log('hello')
    const newUser = {
      companyName,
      representativeName,
      representativeNid,
      address,
      email,
      mobile,
      name,
      contact,
      postalCode,
    }

    try {
      await axios.post('http://localhost:3030/api/v1/register', newUser)
      router.push('/home')
    } catch (err) {
      console.error(err.message)
    }
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
        <Input
          type="text"
          onChange={handleChange}
          value={address}
          placeholder="enter your address"
          name="address"
          label="address"
          error={errors.address}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={email}
          placeholder="enter your email"
          name="email"
          label="email"
          error={errors.email}
        />
        <Input
          type="text"
          onChange={handleChange}
          value={mobile}
          placeholder="enter your mobile"
          name="mobile"
          label="mobile"
          error={errors.mobile}
        />
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
          <button
            onClick={() => dispatch(handlePrevStep())}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-white-500"
          >
            prev
          </button>
          <button
            onClick={handleSubmit}
            className="w-[100px] bg-sky-300 text-white capitalize p-1 rounded-md hover:bg-sky-500"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default FinalStep
