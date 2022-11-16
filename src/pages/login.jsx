import React from 'react'
import Input from '@components/input/Input'
import Joi from 'joi-browser'
import axios from 'axios'
import { setErrors, setRegistration } from '@components/registration/registrationSlice'
import useForm from '@components/form/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const Login = () => {
  const registration = useSelector((state) => state.registration)
  const { username, password, errors } = registration

  const router = useRouter()
  const dispatch = useDispatch()

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  }

  // validation data
  const checkSchema = {
    username: username,
    password: password,
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
    const login = {
      username,
      password,
    }
    try {
      await axios.post('http://localhost:3030/api/v1/register/login', login)
      router.push('/alluser')
    } catch (err) {
      console.log(err.response)
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
      <h3 className="text-2xl mb-5 text-sky-300">Login Form</h3>
      <form className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[400px] h-[450px] border-t-8 border-sky-200">
        <Input
          type="text"
          onChange={handleChange}
          value={username}
          placeholder="enter your name"
          name="username"
          label="Username"
          error={errors.username}
        />
        <Input
          type="password"
          onChange={handleChange}
          value={password}
          placeholder="enter your password"
          name="password"
          label="Password"
          error={errors.password}
        />
        <button
          onClick={handleSubmit}
          className="w-[300px] bg-sky-300 mt-4 text-white capitalize p-2 rounded-md hover:bg-sky-500"
        >
          login
        </button>
      </form>
    </div>
  )
}

export default Login
