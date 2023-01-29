import {POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../actions/Order";


const initialState = {
  postRequest: false,
  postFailed: false,
  item: {}
};

export const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        postRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return { ...state, postFailed: false, postRequest: false, item: action.items };
    }
    case POST_ORDER_FAILED: {
      return { ...state, postFailed: true, postRequest: false };
    }
    default:
      return state;
  }
}


