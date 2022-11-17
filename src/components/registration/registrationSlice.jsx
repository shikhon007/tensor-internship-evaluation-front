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
    errors: { username: '', companyName: '', mobile: '', email: '' },
    username: '',
    password: '',
    allUser: [],
    flag: 'data:image/jpeg;base64,',
    profileImage: {},
    profileImageType: '',
  },
  reducers: {
    handleNextStep: (state) => {
      state.step = state.step + 1
    },
    handlePrevStep: (state) => {
      state.step = state.step - 1
    },
    setValue: (state, action) => {
      // const { inputName } = action.payload
      // state[inputName] = action.payload[inputName]
      state.username = action.payload.username
      state.password = action.payload.password
      state.companyName = action.payload.companyName
      state.representativeName = action.payload.representativeName
      state.representativeNid = action.payload.representativeNid
      state.address = action.payload.address
      state.contact = action.payload.contact
      state.email = action.payload.email
      state.mobile = action.payload.mobile
      state.name = action.payload.name
      state.postalCode = action.payload.postalCode
      state.profileImage = action.payload.profileImage
      state.profileImageType = action.payload.profileImageType
    },
    allData: (state, action) => {
      state.allUser = action.payload
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
  },
})

export const { handleNextStep, handlePrevStep, setValue, setErrors, allData } = registrationSlice.actions
export default registrationSlice.reducer
