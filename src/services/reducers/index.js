import { combineReducers } from 'redux';
import {BurgerIngredientsReducer} from "./BurgerIngredients";
import {BurgerConstructorReducer} from "./BurgerConstructor";
import {IngredientDetails} from "./IngredientDetails";
import {OrderReducer} from "./Order";

export const rootReducer = combineReducers({
    ingredients: BurgerIngredientsReducer,
    ingredientsConstructor: BurgerConstructorReducer,
    IngredientDetails,
    OrderReducer,
})