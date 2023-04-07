import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, RootState} from "./types";
// import {ThunkDispatch} from "redux-thunk";

// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;