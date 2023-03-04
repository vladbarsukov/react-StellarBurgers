import {NAVIGATE_TO} from "../actions/navigation";

const initialState = {
  page: '/',
};

export const Navigation = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATE_TO: {
      return {
        ...state,
        page: action.page
      };
    }
    default:
      return state;
  }
}