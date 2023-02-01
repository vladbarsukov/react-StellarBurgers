import {ADD_INGREDIENT_DETAILS, CLOSE_BURGER_INGREDIENT_MODAL} from "../actions/IngredientDetails";

const initialState = {
  item: null,
};

export const IngredientDetails = (state = initialState, action) => {
  switch (action.type) {
    case CLOSE_BURGER_INGREDIENT_MODAL: {
      return {
        ...state,
        item: null
      };
    }
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        item: action.item
      };
    default:
      return state;
  }
}