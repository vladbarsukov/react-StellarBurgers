import { combineReducers } from 'redux';
import {BurgerIngredientsReducer} from "./BurgerIngredients";
import {BurgerConstructorReducer} from "./BurgerConstructor";
import {IngredientDetails} from "./IngredientDetails";

export const rootReducer = combineReducers({
    ingredients: BurgerIngredientsReducer,
    ingredientsConstructor: BurgerConstructorReducer,
    IngredientDetails
})