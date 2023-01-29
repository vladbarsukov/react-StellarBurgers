import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  REMOVE_ITEMS_IN_CONSTRUCTOR,
  CALCULATE_PRICE, OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL, POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS, POST_ORDER_FAILED
} from "../actions/BurgerConstructor";


const initialState = {
  selectedItems: [],
  bun: null,
  orderPrice: 0,
  isModalOrderOpen: false,
  postRequest: false,
  postFailed: false,
  item: {}
};

export const BurgerConstructorReducer = (state = initialState, action) => {
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
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOrderOpen: true
      };
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isModalOrderOpen: false
      };
    }
    case CALCULATE_PRICE:
      return {
        ...state,
        orderPrice: action.orderPrice
      };
    case ADD_ITEMS_TO_CONSTRUCTOR:
      if (action.selectedItems.type === "bun") {
        return {
          ...state,
          bun: action.selectedItems
        }
      } else {
        return {
          ...state,
          selectedItems: [...state.selectedItems, action.selectedItems]
        };
      }

    case REMOVE_ITEMS_IN_CONSTRUCTOR:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => !action.selectedItems.includes(item))
      };

    default:
      return state;
  }
}
