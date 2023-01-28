import {request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";

export const ADD_ITEMS_TO_CONSTRUCTOR = 'ADD_ITEMS_TO_CONSTRUCTOR';
export const REMOVE_ITEMS_IN_CONSTRUCTOR = 'REMOVE_ITEMS_IN_CONSTRUCTOR';

export const POST_ORDER_REQUEST = 'GET_ITEMS_REQUEST';
export const POST_ORDER_SUCCESS = 'GET_ITEMS_SUCCESS';
export const POST_ORDER_FAILED = 'GET_ITEMS_FAILED';

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
          orderDetails: res.data
        });

      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
    })

  };
}