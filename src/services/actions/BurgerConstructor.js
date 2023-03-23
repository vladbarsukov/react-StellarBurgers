import {onResponse, request} from "../../utils/api";
import {BASE_URL} from "../../utils/constants";
import {getCookie} from "../../utils/auth";
import {postOrderFailed, postOrderRequest, postOrderSuccess} from "../reducers/BurgerConstructor";
import {clearIngredientsCounter} from "../reducers/BurgerIngredients";

export function pushData (ingredients)  {
  return function(dispatch) {
    dispatch(postOrderRequest());
    request(`${BASE_URL}/orders`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
         Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      body: JSON.stringify({'ingredients': ingredients})
    })
      .then(onResponse)
      .then(res => {
        dispatch(postOrderSuccess(res));
        dispatch(clearIngredientsCounter())
    })
      .catch(error => {
        console.log(error)
        postOrderFailed();
      })
  };
}