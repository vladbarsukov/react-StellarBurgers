import {createSlice} from "@reduxjs/toolkit";

const UserSlice = createSlice(
  {
    name: "User",
    initialState: {
      authData: null,
      isUserLoaded: false,
      user: null,
      userRequest: false,
      userFailed: false,
      logoutRequest: false,
      logoutFailed: false,
    },
    reducers: {
      setUser(state, action) {
        state.authData = action.payload
      },
      deleteUser(state) {
        state = UserSlice.getInitialState()
      },
      getUserRequestDispatch(state) {
        state.userRequest = true
      },
      getUserSuccess(state, action) {
        state.userRequest = false
        state.userFailed = false
        state.user = action.payload
      },
      getUserFailed(state) {
        state.userRequest = false
        state.userFailed = true
      },
      setUserLoaded(state) {
        state.isUserLoaded = true
      },
      logoutUserRequest(state) {
        state.logoutRequest = true
      },
      logoutUserSuccess(state) {
        state.user = null
        state.logoutRequest = false
        state.userFailed = false
        state.isUserLoaded = false
      },
      logoutUserFailed(state) {
        state.logoutRequest = false
        state.userFailed = true
      },
    }
  }
)

const { actions, reducer } = UserSlice;
export const {setUser, deleteUser,
  getUserFailed, getUserRequestDispatch,
  getUserSuccess, logoutUserRequest,
  logoutUserSuccess, logoutUserFailed,
  setUserLoaded} = actions
export default reducer