import {bun} from "../../utils/constants";
import {createSlice} from "@reduxjs/toolkit";

const BurgerConstructorReducerSlice = createSlice(
  {
    name: "BurgerConstructor",
    initialState: {
      selectedToppings: [],
      selectedBun: null,
      postRequest: false,
      postFailed: false,
      orderDetails: null,
    },
    reducers: {
      postOrderRequest(state) {
        state.postRequest = true
      },
      postOrderSuccess(state, action) {
        state.postFailed = false
        state.postRequest = false
        state.selectedToppings = []
        state.selectedBun = null
        state.orderDetails = action.payload
      },
      postOrderFailed(state) {
        state.postFailed = true
        state.postRequest = false
      },
      closeOrderModal(state) {
        state.orderDetails = null
      },
      addItemsToConstructor(state, action) {
        action.payload.type  === bun
          ? state.selectedBun = action.payload
          : state.selectedToppings.push(action.payload)
      },
      removeItemsInConstructor(state, action) {
        state.selectedToppings.splice(action.payload, 1)
      },
      swapItem(state, action) {
        const dragItem = state.selectedToppings[action.payload.dragIndex]
        const hoverItem = state.selectedToppings[action.payload.hoverIndex]
        const updatedList = [...state.selectedToppings]
        updatedList[action.payload.dragIndex] = hoverItem
        updatedList[action.payload.hoverIndex] = dragItem
        state.selectedToppings = updatedList
      },
    }
  }
)

const { actions, reducer } = BurgerConstructorReducerSlice;
export const {postOrderRequest, postOrderSuccess,
  postOrderFailed, closeOrderModal,
  addItemsToConstructor, removeItemsInConstructor,
  swapItem} = actions
export default reducer
