import {createSlice} from "@reduxjs/toolkit";

const IngredientDetailsSlice = createSlice(
  {
    name: "IngredientDetails",
    initialState: {
      item: null,
      isModalOpen: false,
    },
    reducers: {
      closeBurgerIngredientsModal(state) {
        state.isModalOpen = false
        state.item = null
      },
      addIngredientDetails(state, action) {
        state.item = action.payload
      },
      modalOpen(state) {
        state.isModalOpen = true
      },
    }
  }
)
const { actions, reducer } = IngredientDetailsSlice;
export const {closeBurgerIngredientsModal, addIngredientDetails, modalOpen} = actions
export default reducer