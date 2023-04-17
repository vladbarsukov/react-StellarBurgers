import {checkResponse, onResponse, request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";
import {getCookie} from "../../utils/auth";
import {TIngredient, TOrderDetails, TPostOrderResponse} from "../types/Data";
import {AppDispatch} from "../types";

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST'= 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const ADD_ITEMS_TO_CONSTRUCTOR:'ADD_ITEMS_TO_CONSTRUCTOR' = 'ADD_ITEMS_TO_CONSTRUCTOR';
export const REMOVE_ITEMS_IN_CONSTRUCTOR: 'REMOVE_ITEMS_IN_CONSTRUCTOR'= 'REMOVE_ITEMS_IN_CONSTRUCTOR';
export const CLOSE_ORDER_MODAL: "CLOSE_ORDER_MODAL" = "CLOSE_ORDER_MODAL"
export const SWAP_ITEM: "SWAP_ITEM" = "SWAP_ITEM"
export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST
}

export interface IPostOrderSuccess {
    readonly type: typeof POST_ORDER_SUCCESS
    readonly orderDetails: TOrderDetails;
}
export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED
}

export interface IAddItemsToConstructor {
    readonly type: typeof ADD_ITEMS_TO_CONSTRUCTOR
    readonly selectedIngredients: TIngredient;
}

export interface IRemoveItemsInConstructor {
    readonly type: typeof REMOVE_ITEMS_IN_CONSTRUCTOR
    readonly selectedToppings: Array<TIngredient>;
}
export interface ICloseOrderModal {
    readonly type: typeof CLOSE_ORDER_MODAL
}

export interface ISwapItem {
    readonly type: typeof SWAP_ITEM
    readonly index: {dragIndex: number, hoverIndex: number};
}

export type TBurgerConstructorAction = IPostOrderRequest | IPostOrderSuccess | IPostOrderFailed |
    IAddItemsToConstructor | IRemoveItemsInConstructor | ICloseOrderModal | ISwapItem;
export const pushData = (ingredients: string[]) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    request(`${BASE_URL}/orders`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify({'ingredients': ingredients})
    })
      .then(checkResponse<TPostOrderResponse>)
      .then(res => {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderDetails: res
        });
    })
      .catch(error => {
        console.log(error)
        dispatch({
          type: POST_ORDER_FAILED
        });
      })
  };
