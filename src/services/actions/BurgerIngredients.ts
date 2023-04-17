import {checkResponse,request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";
import {TIngredient, TIngredientResponse} from "../types/Data";
import {IPostOrderSuccess} from "./BurgerConstructor";
import {AppDispatch} from "../types";

export const GET_ITEMS_REQUEST:'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS:'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED:'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const INCREASE_ITEM:'INCREASE_ITEM' = 'INCREASE_ITEM';

export const DECREASE_ITEM:'DECREASE_ITEM' = 'DECREASE_ITEM';

export interface IGetItemRequest {
    readonly type: typeof GET_ITEMS_REQUEST
}
export interface IGetItemSuccess {
    readonly type: typeof GET_ITEMS_SUCCESS
    readonly items: Array<TIngredient>;
}
export interface IGetItemFailed {
    readonly type: typeof GET_ITEMS_FAILED
}
export interface IIncreaseItem {
    readonly type: typeof INCREASE_ITEM
    readonly _id: string;
    readonly ingType: string;
}
export interface IDecreaseItem {
    readonly type: typeof DECREASE_ITEM
    readonly id: string;
}
export type TBurgerIngredientsAction = IGetItemRequest | IGetItemSuccess | IGetItemFailed | IIncreaseItem | IDecreaseItem | IPostOrderSuccess;
export const getItems = () =>
  (dispatch: AppDispatch) =>{
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    request(`${BASE_URL}/ingredients`)
      .then(checkResponse<TIngredientResponse>)
      .then(res => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
    })
      .catch(error => {
        console.log(error)
        dispatch({
          type: GET_ITEMS_FAILED
        });
      })
  };
