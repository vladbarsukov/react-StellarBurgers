import {BASE_URL} from "./constants";
import {getCookie} from "./auth";

export const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)
}


export const registrationRequest = async data =>
  await request(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const changeUserDataRequest = async data =>
  await request(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      data
    )
  },);

export const resetPasswordRequest = async data =>
  await request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const forgotPasswordRequest = async data =>
  await request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const loginRequest = async data =>
  await request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      data
    )
    },);

export const getUserRequest = async () =>
  await request(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    }},);
