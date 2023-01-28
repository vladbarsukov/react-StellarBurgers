import {
  ADD_ITEMS_TO_CONSTRUCTOR, POST_ORDER_FAILED,
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  REMOVE_ITEMS_IN_CONSTRUCTOR
} from "../actions/BurgerConstructor";


const initialState = {
  orderDetails: {},
  selectedItems: [],
  bun: [],
  postRequest: false,
  postFailed: false,

};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEMS_TO_CONSTRUCTOR:
      if (action.selectedItems[0].type === "bun") {
        return {
          ...state,
          bun: action.selectedItems
        }
      } else {
        return {
          ...state,
          selectedItems: [...state.selectedItems, ...action.selectedItems]
        };
      }

    case REMOVE_ITEMS_IN_CONSTRUCTOR:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => !action.selectedItems.includes(item))
      };

    case POST_ORDER_REQUEST: {
      return {
        ...state,
        postRequest: true
      };
    }
    case POST_ORDER_SUCCESS: {
      return { ...state, postFailed: false, postRequest: false, orderDetails: action.orderDetails };
    }
    case POST_ORDER_FAILED: {
      return { ...state, postFailed: true, postRequest: false };
    }


    default:
      return state;
  }
}
