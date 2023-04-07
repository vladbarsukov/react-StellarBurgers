import {store} from "../../index";
import {TBurgerConstructorAction} from "../actions/BurgerConstructor";
import {Action, ActionCreator} from 'redux';
import { ThunkAction } from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TBurgerConstructorAction;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
