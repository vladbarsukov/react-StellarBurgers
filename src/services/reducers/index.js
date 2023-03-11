import { combineReducers } from 'redux';
import {BurgerIngredientsReducer} from "./BurgerIngredients";
import {BurgerConstructorReducer} from "./BurgerConstructor";
import {IngredientDetails} from "./IngredientDetails";
import {Form} from "./form"
import {User} from "./user"

export const rootReducer = combineReducers({
    ingredients: BurgerIngredientsReducer,
    ingredientsConstructor: BurgerConstructorReducer,
    IngredientDetails,
    Form, User
})