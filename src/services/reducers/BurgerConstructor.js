import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  REMOVE_ITEMS_IN_CONSTRUCTOR,
  CALCULATE_PRICE, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL, ADD_ORDER
} from "../actions/BurgerConstructor";

const initialState = {
  selectedItems: [],
  bun: null,
  postRequest: false,
  postFailed: false,
  orderPrice: 0,
  isModalOrderOpen: false,
  order: {}
};

export const BurgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isModalOrderOpen: true
      };
    }
    case ADD_ORDER: {
      return {
        ...state,
        order: action.order
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
