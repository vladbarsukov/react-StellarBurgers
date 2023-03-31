import {createSlice} from "@reduxjs/toolkit";

const FormSlice = createSlice(
  {
    name: "Form",
    initialState: {
      page: '/',
      loginData: {
        email: "",
        pass: "",
        isPasswordHidden: true,
        loginRequest: false,
        loginFailed: false,
      },
      forgotPassData: {
        email: "",
        forgotPassRequest: false,
        forgotPassFailed: false,
        forgotPassSuccess: false,
      },
      resetPassData: {
        pass: "",
        token: "",
        resetRequest: false,
        resetFailed: false,
        isPasswordHidden: true,
        resetPassSuccess: false,
      },
      registration: {
        name: '',
        email: '',
        pass: '',
        isPasswordHidden: true,
        registrationRequest: false,
        registrationFailed: false,
      },
      profile: {
        name: '',
        email: '',
        pass: '',
        profileRequest: false,
        profileFailed: false,
        isLoginInputActive: false,
        isNameInputActive: false,
        isPassInputActive: false,
      }
    },
    reducers: {
      registerFormSetValue(state, action) {
        state.registration[action.payload.field] = action.payload.value
      },
      registerPassHide(state, action) {
        state.registration[action.payload.field] = action.payload.value
      },
      registerFormSubmit(state) {
        state.registration.registrationRequest = true
        state.registration.registrationFailed = false
      },
      registerFormSubmitSuccess(state) {
        state.registration = FormSlice.getInitialState().registration
      },
      registerFormSubmitFailed(state) {
        state.registration.registrationRequest = false
        state.registration.registrationFailed = true
      },
      resetPassSetValue(state, action) {
        state.resetPassData[action.payload.field] = action.payload.value
      },
      resetPassHide(state, action) {
        state.resetPassData[action.payload.field] = action.payload.value
      },
      resetPassFormSubmit(state) {
        state.resetPassData.resetRequest = true
        state.resetPassData.resetFailed = false
      },
      resetPassFormSubmitSuccess(state) {
        state.resetPassData = FormSlice.getInitialState().resetPassData
      },
      resetPassFormSubmitFailed(state) {
        state.resetPassData.resetRequest = false
        state.resetPassData.resetFailed = true
      },
      forgotPassSetValue(state, action) {
        state.forgotPassData[action.payload.field] = action.payload.value
      },
      forgotPassFormSubmit(state) {
        state.forgotPassData.forgotPassRequest = true
        state.forgotPassData.forgotPassFailed = false
      },
      forgotPassFormSubmitSuccess(state) {
        // state.forgotPassData = FormSlice.getInitialState().forgotPassData
        state.forgotPassData.forgotPassSuccess = true
      },
      forgotPassFormSubmitFailed(state) {
        state.forgotPassData.forgotPassRequest = false
        state.forgotPassData.forgotPassFailed = true
      },
      loginFormSetValue(state, action) {
        state.loginData[action.payload.field] = action.payload.value
      },
      loginFormSubmit(state) {
        state.loginData.loginRequest = true
        state.loginData.loginFailed = false
      },
      loginFormSubmitSuccess(state) {
        state.loginData = FormSlice.getInitialState().loginData
      },
      loginFormSubmitFailed(state) {
        state.loginData.loginRequest = false
        state.loginData.loginFailed = true
      },
      loginPassHide(state, action) {
        state.loginData[action.payload.field] = action.payload.value
      },
      profileFormSetValue(state, action) {
        state.profile[action.payload.field] = action.payload.value
      },
      profileFormSubmit(state) {
        state.profile.profileRequest = true
        state.profile.profileFailed = false
      },
      profileFormSubmitSuccess(state, action) {
        state.profile.name = action.payload.name
        state.profile.login = action.payload.email
        // state.profile.pass = action.payload.password
      },
      profileFormSubmitFailed(state) {
        state.profile.profileRequest = false
        state.profile.profileFailed = true
      },
      profileButtonHide(state, action) {
        state.profile[action.payload.field] = action.payload.value
      },
    }
  }
)

const { actions, reducer } = FormSlice;
export const { registerFormSetValue, forgotPassFormSubmit, forgotPassFormSubmitFailed, profileFormSubmitSuccess,
  profileButtonHide, profileFormSubmitFailed, forgotPassFormSubmitSuccess, forgotPassSetValue, loginFormSetValue,
  loginFormSubmit, loginFormSubmitFailed, loginPassHide, loginFormSubmitSuccess, profileFormSetValue, registerFormSubmit,
  registerFormSubmitFailed, profileFormSubmit, registerFormSubmitSuccess, registerPassHide, resetPassHide, resetPassFormSubmitFailed,
  resetPassFormSubmit, resetPassSetValue, resetPassFormSubmitSuccess } = actions
export default reducer