import {SET_USER} from "../actions/user";

const initialState = {
  authData: null,
  isUserLoaded: false
};

export const User = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        authData: action.authData,
        isUserLoaded: true,
      };
    }
    default:
      return state;
  }
}