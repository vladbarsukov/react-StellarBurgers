import {onResponse, request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";
import {getItemFailed, getItemRequest, getItemSuccess} from "../reducers/BurgerIngredients";

export function getItems() {
  return function(dispatch) {
    dispatch(getItemRequest());
    request(`${BASE_URL}/ingredients`)
      .then(onResponse)
      .then(res => {
        dispatch(getItemSuccess(res.data));
      })
      .catch(error => {
        console.log(error)
        dispatch(getItemFailed());
      })
  };
}