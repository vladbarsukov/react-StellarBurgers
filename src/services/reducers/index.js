import { combineReducers } from 'redux';
import {BurgerIngredientsReducer} from "./BurgerIngredients";
import {BurgerConstructorReducer} from "./BurgerConstructor";
import {IngredientDetails} from "./IngredientDetails";
import {Navigation} from "./navigation";
import {Form} from "./form"
export const rootReducer = combineReducers({
    ingredients: BurgerIngredientsReducer,
    ingredientsConstructor: BurgerConstructorReducer,
    IngredientDetails, Navigation, Form,
})