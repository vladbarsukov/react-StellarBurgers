import {bun} from "../../utils/constants";
import {createSlice} from "@reduxjs/toolkit";

const BurgerIngredientsReducerSlice = createSlice(
  {
    name: "BurgerIngredients",
    initialState: {
      items: null,
      itemsRequest: false,
      itemsFailed: false,
    },
    reducers: {
      getItemRequest(state) {
        state.itemsRequest = true
      },
      getItemSuccess(state, action) {
        state.itemsFailed = false
        state.itemsRequest = false
        state.items = action.payload
      },
      getItemFailed(state) {
        state.itemsFailed = true
        state.itemsRequest = false
      },
      increaseItem(state, action) {
        state.items.forEach(item => {
            if (item._id === action.payload) {
              if (item.type === bun) {
                // обнуляю счетчик остальных булок кроме выбранной
                state.items.filter(i => i.type === bun && i["_id"] !== item["_id"]).forEach(ing => ing["__v"] = 0);
                return item.__v = 1 ;
              } else {
                return item.__v += 1 ;
              }
            } else {
              return item;
            }
        })
      },
      decreaseItem(state, action) {
        state.items.map(item =>
          item._id === action.payload ? item["__v"] -= 1  : null)
      },
      clearIngredientsCounter(state) {
        state.items.forEach(ing => ing["__v"] = 0)
      }
    }
  }
)

const { actions, reducer } = BurgerIngredientsReducerSlice;
export const {getItemRequest,  getItemSuccess,
  getItemFailed, increaseItem,
  decreaseItem, clearIngredientsCounter} = actions
export default reducer