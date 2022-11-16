import { createSlice } from '@reduxjs/toolkit'

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    step: 1,
    companyName: '',
    representativeName: '',
    representativeNid: '',
    address: '',
    email: '',
    mobile: '',
    name: '',
    contact: '',
    postalCode: '',
    errors: {},
    username: '',
    password: '',
    allUser: [],
  },
  reducers: {
    handleNextStep: (state) => {
      state.step = state.step + 1
    },
    handlePrevStep: (state) => {
      state.step = state.step - 1
    },
    setRegistration: (state, action) => {
      const { inputName } = action.payload
      state[inputName] = action.payload[inputName]
    },
    allData: (state, action) => {
      console.log(action.payload)
      state.allUser = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
  },
})

export const { handleNextStep, handlePrevStep, setRegistration, setErrors, allData } = registrationSlice.actions
export default registrationSlice.reducer
