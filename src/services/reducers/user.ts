import {
  DELETE_USER,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
  SET_USER_LOADED, TUserAction
} from "../actions/user";
import {TUser} from "../types/Data";

type TUserState = {
  isUserLoaded: boolean,
  user: TUser | null,
  userRequest: boolean,
  userFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
}

const initialState: TUserState = {
  // authData: null,
  isUserLoaded: false,
  user: null,
  userRequest: false,
  userFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};
export const User = (state = initialState, action: TUserAction) => {
  switch (action.type) {
    // case SET_USER: {
    //   return {
    //     ...state,
    //     authData: action.authData,
    //   };
    // }
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
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return { ...state, user: initialState.user, logoutRequest: false, logoutFailed: false, isUserLoaded: false};
    }
    case LOGOUT_USER_FAILED: {
      return { ...state, logoutFailed: true, logoutRequest: false };
    }
    default:
      return state;
  }
}