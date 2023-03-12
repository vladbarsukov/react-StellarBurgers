import {onResponse, request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const ADD_ITEMS_TO_CONSTRUCTOR = 'ADD_ITEMS_TO_CONSTRUCTOR';
export const REMOVE_ITEMS_IN_CONSTRUCTOR = 'REMOVE_ITEMS_IN_CONSTRUCTOR';
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL"

export const SWAP_ITEM = "SWAP_ITEM"

export function pushData (ingredients)  {
  return function(dispatch) {
    dispatch({
      type: POST_ORDER_REQUEST
    });
    request(`${BASE_URL}/orders`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'ingredients': ingredients})
    })
      .then(onResponse)
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
}