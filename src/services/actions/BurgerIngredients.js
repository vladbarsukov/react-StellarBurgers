import {onResponse, request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const INCREASE_ITEM = 'INCREASE_ITEM'

export const DECREASE_ITEM = 'DECREASE_ITEM'


export function getItems() {
  return function(dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    request(`${BASE_URL}/ingredients`)
      .then(onResponse)
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
}