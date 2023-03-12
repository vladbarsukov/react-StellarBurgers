import {ADD_INGREDIENT_DETAILS, CLOSE_BURGER_INGREDIENT_MODAL, MODAL_OPEN} from "../actions/IngredientDetails";

const initialState = {
  item: null,
  isModalOpen: false,
};

export const IngredientDetails = (state = initialState, action) => {
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