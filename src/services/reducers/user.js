import {
  DELETE_USER,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  SET_USER,
  SET_USER_LOADED
} from "../actions/user";
import {PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS} from "../actions/form";

const initialState = {
  authData: null,
  isUserLoaded: false,
  user: null,
  userRequest: false,
  userFailed: false,
};
export const User = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        authData: action.authData,
      };
    }
    case DELETE_USER: {
      return {
        initialState
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      }
    }
    case GET_USER_SUCCESS: {
      return { ...state, userFailed: false, user: action.user, userRequest: false };
    }
    case GET_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false };
    }
    case SET_USER_LOADED: {
      return {
        ...state,
        isUserLoaded: true,
      };
    }
    default:
      return state;
  }
}