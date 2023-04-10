import {TIngredient} from "../types/Data";

export const ADD_INGREDIENT_DETAILS: "ADD_INGREDIENT_DETAILS" = "ADD_INGREDIENT_DETAILS"
export const CLOSE_BURGER_INGREDIENT_MODAL: "CLOSE_BURGER_INGREDIENT_MODAL" = "CLOSE_BURGER_INGREDIENT_MODAL"
export const MODAL_OPEN: "MODAL_OPEN" = "MODAL_OPEN"

export interface IAddIngredientDetails {
    readonly type: typeof ADD_INGREDIENT_DETAILS
    readonly item: TIngredient
}
export interface ICloseBurgerIngredientModal {
    readonly type: typeof CLOSE_BURGER_INGREDIENT_MODAL
}
export interface IModalOpen {
    readonly type: typeof MODAL_OPEN
}
export type TIngredientDetailsAction = IAddIngredientDetails | ICloseBurgerIngredientModal | IModalOpen