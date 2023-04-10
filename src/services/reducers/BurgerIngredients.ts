import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  INCREASE_ITEM,
  DECREASE_ITEM, TBurgerIngredientsAction,
} from "../actions/BurgerIngredients";
import {bun} from "../../utils/constants";
import {POST_ORDER_SUCCESS} from "../actions/BurgerConstructor";
import {TIngredient} from "../types/Data";

type TBurgerIngredientsState = {
  items: Array<TIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
}

const initialState: TBurgerIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const BurgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsAction) => {
  switch (action.type) {
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
          if (item.type === bun) {
            // обнуляю счетчик остальных булок кроме выбранной
            state.items.filter(i => i.type === bun && i["_id"] !== item["_id"]).forEach(ing => ing["__v"] = 0);
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
    case POST_ORDER_SUCCESS: {
      const items = state.items
      items.forEach(ing => ing["__v"] = 0)
      return {
        ...state,
        items: items
      };
    }
    default: {
      return state;
    }
  }
};