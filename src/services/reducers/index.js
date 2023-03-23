import { combineReducers } from 'redux';
import BurgerConstructorReducer from "./BurgerConstructor";
import BurgerIngredients from "./BurgerIngredients";
import IngredientDetails from "./IngredientDetails";

import {Form} from "./form"
import {User} from "./user"
import {wsReducer} from "./wsReducer";

export const rootReducer = combineReducers({
    ingredients: BurgerIngredients,
    ingredientsConstructor: BurgerConstructorReducer,
    IngredientDetails,
    Form, User, wsReducer
})