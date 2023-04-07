import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  REMOVE_ITEMS_IN_CONSTRUCTOR,
  CLOSE_ORDER_MODAL, POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS, POST_ORDER_FAILED,
  SWAP_ITEM, TBurgerConstructorAction
} from "../actions/BurgerConstructor";
import {bun} from "../../utils/constants";
import {TIngredient, TOrderDetails} from "../types/Data";

type TBurgerConstructorState = {
  selectedToppings: Array<TIngredient>;
  selectedBun: TIngredient | null;
  postRequest: boolean;
  postFailed: boolean,
  orderDetails: TOrderDetails | null;
}

const initialState: TBurgerConstructorState = {
  selectedToppings: [],
  selectedBun: null,
  postRequest: false,
  postFailed: false,
  orderDetails: null,
};

export const BurgerConstructorReducer = (state:TBurgerConstructorState = initialState, action: TBurgerConstructorAction):TBurgerConstructorState => {
  switch (action.type) {
    case SWAP_ITEM: {
      const dragItem: TIngredient = state.selectedToppings[action.index.dragIndex]
      const hoverItem: TIngredient = state.selectedToppings[action.index.hoverIndex]
      const updatedList: TIngredient[] = [...state.selectedToppings]
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
      return { ...state, postFailed: false, selectedToppings: initialState.selectedToppings,  selectedBun: initialState.selectedBun, postRequest: false, orderDetails: action.orderDetails };
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
