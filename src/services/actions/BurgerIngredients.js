import {request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const INCREASE_ITEM = 'INCREASE_ITEM'

export const DECREASE_ITEM = 'DECREASE_ITEM'

export const OPEN_BURGER_INGREDIENT_MODAL = "OPEN_BURGER_INGREDIENT_MODAL"

export const CLOSE_BURGER_INGREDIENT_MODAL = "CLOSE_BURGER_INGREDIENT_MODAL"


export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    request(`${BASE_URL}/ingredients`).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    });
  };
}