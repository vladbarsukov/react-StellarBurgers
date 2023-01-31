import {request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const ADD_ITEMS_TO_CONSTRUCTOR = 'ADD_ITEMS_TO_CONSTRUCTOR';
export const REMOVE_ITEMS_IN_CONSTRUCTOR = 'REMOVE_ITEMS_IN_CONSTRUCTOR';
export const CALCULATE_PRICE = "CALCULATE_PRICE"
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL"
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL"

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
    }).then(res => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          orderDetails: res
        });

      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    })
      .then(()=> {
        dispatch({
          type: "OPEN_ORDER_MODAL",
        })
      })
  };
}