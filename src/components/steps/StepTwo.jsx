import Joi from 'joi-browser'
import axios from 'axios'
import { handleNextStep, handlePrevStep, setErrors, setValue } from '@components/registration/registrationSlice'
import { useSelector, useDispatch } from 'react-redux'
import useForm from '@components/form/useForm'
import Input from '@components/input/Input'

const StepTwo = () => {
  const registration = useSelector((state) => state.registration)
  const dispatch = useDispatch()
  const { address, email, mobile, errors } = registration

  // schema for validation
  const schema = {
    address: Joi.string().required().label('Address'),
    email: Joi.string().required().label('Email'),
    mobile: Joi.string().min(11).max(11).required().label('Mobile'),
  }

  // validation data
  const checkSchema = {
    address: address,
    email: email,
    mobile: mobile,
  }

  // set onchange data
  const setRegistrationData = (data) => {
    dispatch(setValue(data))
  }

  // set error data
  const setErrorsData = (error) => {
    dispatch(setErrors(error))
  }

  // submit form data
  const doSubmit = async () => {
    const checkEmail = {
      email: email,
    }
    const checkMobile = {
      mobile: mobile,
    }
    try {
      let res1 = await axios.post('http://localhost:3030/api/v1/register/duplicate', checkEmail)
      if (res1.data.data !== null) return dispatch(setErrors({ ...errors, email: 'This Email AllReady Exist' }))
      let res2 = await axios.post('http://localhost:3030/api/v1/register/duplicate', checkMobile)
      if (res2.data.data !== null)
        return dispatch(setErrors({ ...errors, mobile: 'This Mobile Number AllReady Exist' }))
      dispatch(handleNextStep())
    } catch (error) {
      console.error(error.message)
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
        className="flex flex-col items-center justify-center shadow-md shadow-slate-300 w-[550px] h-full border-t-4 mb-10 border-sky-300"
      >
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
            next
          </button>
        </div>
      </form>
    </div>
  )
}

export default StepTwo
