import {store} from "../../index";
import {TBurgerConstructorAction} from "../actions/BurgerConstructor";
// import {Action, ActionCreator} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TBurgerIngredientsAction} from "../actions/BurgerIngredients";
import {TIngredientDetailsAction} from "../actions/IngredientDetails";
import {TUserAction} from "../actions/user";
import {TFormAction} from "../actions/form";
import {TWsAction} from "../actions/wsActions";

export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TBurgerConstructorAction | TBurgerIngredientsAction | TIngredientDetailsAction
    | TUserAction | TFormAction | TWsAction;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
