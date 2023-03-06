import {SET_USER} from "../actions/user";

const initialState = {
  authData: null,
};

export const User = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        authData: action.authData
      };
    }
    default:
      return state;
  }
}