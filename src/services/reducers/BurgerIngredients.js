import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  INCREASE_ITEM,
  DECREASE_ITEM,
  OPEN_BURGER_INGREDIENT_MODAL,
  CLOSE_BURGER_INGREDIENT_MODAL,
} from "../actions/BurgerIngredients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  isModalIngredientDetailsOpen: false,
};

export const BurgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_BURGER_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalIngredientDetailsOpen: true
      };
    }
    case CLOSE_BURGER_INGREDIENT_MODAL: {
      return {
        ...state,
        isModalIngredientDetailsOpen: false
      };
    }
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case INCREASE_ITEM: {
      const items = state.items.map(item => {
        if (item._id === action._id) {
          if (item.type === "bun") {
            // обнуляю счетчик остальных булок кроме выбранной
            state.items.filter(i => i.type === "bun" && i["_id"] !== item["_id"]).forEach(ing => ing["__v"] = 0);
            return { ...item, __v: 1 };
          } else {
            return { ...item, __v: item.__v + 1 };
          }
        } else {
          return item;
        }
      });

      return { ...state, items };
    }

    case DECREASE_ITEM: {
      return {
        ...state,
        items: [...state.items].map(item =>
          item._id === action.id ? { ...item, __v: item["__v"] -= 1 } : item
        )
      };
    }
    default: {
      return state;
    }
  }
};