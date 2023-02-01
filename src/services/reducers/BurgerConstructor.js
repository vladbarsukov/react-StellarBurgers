import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  REMOVE_ITEMS_IN_CONSTRUCTOR,
  CALCULATE_PRICE, OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL, POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS, POST_ORDER_FAILED,
  SWAP_ITEM
} from "../actions/BurgerConstructor";

const initialState = {
  selectedToppings: [],
  selectedBun: null,
  orderPrice: 0,
  isModalOrderOpen: false,
  postRequest: false,
  postFailed: false,
  orderDetails: {},
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWAP_ITEM: {
      return {
        ...state,
        selectedToppings: action.updatedList
      }
    }
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
      return action.selectedIngredients.type === "bun"
        ? {...state, selectedBun: action.selectedIngredients}
        : {...state, selectedToppings: [...state.selectedToppings, action.selectedIngredients]}
    case REMOVE_ITEMS_IN_CONSTRUCTOR:
      return {
        ...state,
        selectedToppings: state.selectedToppings.filter(item => !action.selectedToppings.includes(item))
      };

    default:
      return state;
  }
}
