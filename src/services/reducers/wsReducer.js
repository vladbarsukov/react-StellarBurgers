import {
  CLOSE_ORDERS_MODAL,
  CLOSE_USER_ORDERS_MODAL, OPEN_ORDERS_MODAL,
  OPEN_USER_ORDERS_MODAL,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE,
} from "../actions/wsActions";
import {createSlice} from "@reduxjs/toolkit";
import {bun} from "../../utils/constants";

const initialState = {
  wsConnected: false,
  orders: [],
  UserOrders: [],
  wsUserConnected: false,
  isModalOrdersOpen: false,
  isModalUserOrdersOpen: false,
};

export const wsReducer = (state = initialState, action) => {
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

const wsReducerSlice = createSlice(
  {
    name: "wsReducer",
    initialState: {
      wsConnected: false,
      orders: [],
      UserOrders: [],
      wsUserConnected: false,
      isModalOrdersOpen: false,
      isModalUserOrdersOpen: false,
    },
    reducers: {
      wsConnectionSuccess(state) {
        state.wsConnected = true
      },
      wsConnectionError(state) {
        state.wsConnected = false
      },
      wsConnectionClosed(state) {
        state.wsConnected = false
      },
      wsGetMessage(state, action) {
        state.orders = action.payload
      },
      wsUserConnectionSuccess(state) {
        state.wsUserConnected = true
      },
      wsUserConnectionError(state) {
        state.wsUserConnected = false
      },
      wsUserConnectionClosed(state) {
        state.wsUserConnected = false
      },
      wsUserGetMessage(state, action) {
        state.UserOrders = action.payload
      },
      openOrdersModal(state) {
        state.isModalOrdersOpen = true
      },
      closeOrdersModal(state) {
        state.isModalOrdersOpen = false
      },
      openUserOrdersModal(state) {
        state.isModalUserOrdersOpen = true
      },
      closeUserOrdersModal(state) {
        state.isModalUserOrdersOpen = false
      },
    }
  }
)

const { actions, reducer } = wsReducerSlice;
export const {wsConnectionSuccess, wsUserConnectionError, closeUserOrdersModal,
  closeOrdersModal, openUserOrdersModal, wsConnectionClosed,
  openOrdersModal, wsUserConnectionSuccess, wsConnectionError,
  wsUserConnectionClosed, wsUserGetMessage, wsGetMessage} = actions
export default reducer