import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  REMOVE_ITEMS_IN_CONSTRUCTOR,
  CLOSE_ORDER_MODAL, POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS, POST_ORDER_FAILED,
  SWAP_ITEM
} from "../actions/BurgerConstructor";
import {bun} from "../../utils/constants";

const initialState = {
  selectedToppings: [],
  selectedBun: null,
  orderPrice: 0,
  postRequest: false,
  postFailed: false,
  orderDetails: null,
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWAP_ITEM: {
      const dragItem = state.selectedToppings[action.index.dragIndex]
      const hoverItem = state.selectedToppings[action.index.hoverIndex]
      const updatedList = [...state.selectedToppings]
      updatedList[action.index.dragIndex] = hoverItem
      updatedList[action.index.hoverIndex] = dragItem
      return {
        ...state,
        selectedToppings: updatedList
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
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        orderDetails: null
      };
    }

    case ADD_ITEMS_TO_CONSTRUCTOR:
      return action.selectedIngredients.type === bun
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
