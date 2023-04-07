import {store} from "../../index";
import {TBurgerConstructorAction} from "../actions/BurgerConstructor";
// import {Action, ActionCreator} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TBurgerConstructorAction;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
