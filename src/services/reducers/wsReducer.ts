import {
  CLOSE_ORDERS_MODAL,
  CLOSE_USER_ORDERS_MODAL, OPEN_ORDERS_MODAL,
  OPEN_USER_ORDERS_MODAL, TWsAction,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE,
} from "../actions/wsActions";
import {TOrder} from "../types/Data";
type TWsReducerState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  UserOrders: Array<TOrder>;
  wsUserConnected: boolean;
  isModalOrdersOpen: boolean;
  isModalUserOrdersOpen: boolean;
}

const initialState: TWsReducerState= {
  wsConnected: false,
  orders: [],
  UserOrders: [],
  wsUserConnected: false,
  isModalOrdersOpen: false,
  isModalUserOrdersOpen: false,
};

export const wsReducer = (state = initialState, action: TWsAction) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload

      };

    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsUserConnected: true
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        wsUserConnected: false
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        wsUserConnected: false
      };

    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        UserOrders: action.payload,
      };

    case OPEN_USER_ORDERS_MODAL:
      return {
        ...state,
        isModalUserOrdersOpen: true
      };

    case CLOSE_USER_ORDERS_MODAL:
      return {
        ...state,
        isModalUserOrdersOpen: false
      };

    case OPEN_ORDERS_MODAL:
      return {
        ...state,
        isModalOrdersOpen: true
      };

    case CLOSE_ORDERS_MODAL:
      return {
        ...state,
        isModalOrdersOpen: false
      };
    default:
      return state;
  }
};