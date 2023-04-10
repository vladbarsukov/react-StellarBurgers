import {TOrdersRequest} from "../types/Data";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';


export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';
export const OPEN_USER_ORDERS_MODAL: 'OPEN_USER_ORDERS_MODAL' = 'OPEN_USER_ORDERS_MODAL';
export const CLOSE_USER_ORDERS_MODAL: 'CLOSE_USER_ORDERS_MODAL' = 'CLOSE_USER_ORDERS_MODAL';
export const OPEN_ORDERS_MODAL: 'OPEN_ORDERS_MODAL' = 'OPEN_ORDERS_MODAL';
export const CLOSE_ORDERS_MODAL: 'CLOSE_ORDERS_MODAL' = 'CLOSE_ORDERS_MODAL';

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}
export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IWsConnectionMessage {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: TOrdersRequest
}

export interface IWsUserConnectionStart {
    readonly type: typeof WS_USER_CONNECTION_START
}
export interface IWsUserConnectionSuccess {
    readonly type: typeof WS_USER_CONNECTION_SUCCESS
}

export interface IWsUserConnectionError {
    readonly type: typeof WS_USER_CONNECTION_ERROR
}

export interface IWsUserConnectionClosed {
    readonly type: typeof WS_USER_CONNECTION_CLOSED
}
export interface IWsUserConnectionMessage {
    readonly type: typeof WS_USER_GET_MESSAGE
    readonly payload: TOrdersRequest
}
export interface IOpenUserOrdersModal {
    readonly type: typeof OPEN_USER_ORDERS_MODAL
}
export interface ICloseUserOrdersModal {
    readonly type: typeof CLOSE_USER_ORDERS_MODAL
}
export interface IOpenOrdersModal {
    readonly type: typeof OPEN_ORDERS_MODAL
}
export interface ICloseOrdersModal {
    readonly type: typeof CLOSE_ORDERS_MODAL
}
export type TWsAction = IWsConnectionStart | IWsConnectionSuccess | IWsConnectionError
    | IWsConnectionClosed | IWsConnectionMessage | IWsUserConnectionStart | IWsUserConnectionSuccess
    | IWsUserConnectionError | IWsUserConnectionClosed | IWsUserConnectionMessage
    | IOpenUserOrdersModal | ICloseUserOrdersModal | IOpenOrdersModal | ICloseOrdersModal