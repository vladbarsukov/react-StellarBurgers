// export const SET_USER: 'SET_USER' = 'SET_USER';

import {TUser} from "../types/Data";

export const DELETE_USER: 'DELETE_USER' = 'DELETE_USER';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'

export const SET_USER_LOADED: 'SET_USER_LOADED' = 'SET_USER_LOADED'

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED'

export interface IDeleteUser  {
    readonly type: typeof DELETE_USER
}
export interface IGetUserRequest  {
    readonly type: typeof GET_USER_REQUEST
}
export interface IGetUserSuccess  {
    readonly type: typeof GET_USER_SUCCESS
    readonly user: TUser
}
export interface IGetUserFailed  {
    readonly type: typeof GET_USER_FAILED
}
export interface ISetUserLoaded  {
    readonly type: typeof SET_USER_LOADED
}
export interface ILogoutUserRequest  {
    readonly type: typeof LOGOUT_USER_REQUEST
}
export interface ILogoutUserSuccess  {
    readonly type: typeof LOGOUT_USER_SUCCESS
}
export interface ILogoutUserFailed  {
    readonly type: typeof LOGOUT_USER_FAILED
}

export type TUserAction = IDeleteUser | IGetUserRequest | IGetUserSuccess | ILogoutUserFailed
    | IGetUserFailed | ISetUserLoaded | ILogoutUserRequest | ILogoutUserSuccess