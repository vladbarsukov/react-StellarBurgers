import {
  ADD_INGREDIENT_DETAILS,
  CLOSE_BURGER_INGREDIENT_MODAL,
  MODAL_OPEN,
  TIngredientDetailsAction
} from "../actions/IngredientDetails";
import {TIngredient} from "../types/Data";

type TIngredientDetailsState = {
  item: TIngredient | null;
  isModalOpen: boolean
}

const initialState: TIngredientDetailsState = {
  item: null,
  isModalOpen: false,
};

export const IngredientDetails  = (state = initialState, action: TIngredientDetailsAction) => {
  switch (action.type) {
    case CLOSE_BURGER_INGREDIENT_MODAL: {
      return {
        ...state,
        item: null,
        isModalOpen: false
      };
    }
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        item: action.item
      };
    case MODAL_OPEN:
      return {
        ...state,
        isModalOpen: true
      };
    default:
      return state;
  }
}