import {ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS} from "../actions/IngredientDetails";

const initialState = {
  item: {},
};

export const IngredientDetails = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DETAILS:
      return {
        ...state,
        item: action.item
        };

    case REMOVE_INGREDIENT_DETAILS:
      return {
        ...state,
        item: {}
      };
    default:
      return state;
  }
}