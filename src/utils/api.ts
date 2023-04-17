import {BASE_URL} from "./constants";
import {getCookie, setCookie} from "./auth";
import {
    TChangeUserDataRequest,
    TForgotPasswordRequest,
    TRegistrationRequest,
    TResetPasswordRequest, TResponse, TSignInRequest, TTokenResponse
} from "../services/types/Data";

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};
export const onResponse = (res: any) => {
  return res.ok ? res.json() : Promise.reject(res);
};
export const checkResponse = <T>(res: Response) => {
    return res.ok ? res.json().then(data => data as TResponse<T>) : Promise.reject(res.status);
};
// export const checkResponse = <T>(res: Response): Promise<T> => {
//     return res.ok ? res.json() : Promise.reject(res.status);
// };

export function request(url: string, options?: RequestOptions) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)
}


export const registrationRequest = async (data: TRegistrationRequest) =>
  await request(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const changeUserDataRequest = async (data: TChangeUserDataRequest) =>
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

export const resetPasswordRequest = async (data: TResetPasswordRequest) =>
  await request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const logoutRequest = async () =>
  await request(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    })
  },);

export const forgotPasswordRequest = async (data: TForgotPasswordRequest) =>
  await request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const loginRequest = async (data: TSignInRequest) =>
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
  await fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    }},);

export const getIngredientsRequest = async () =>
  await request(`${BASE_URL}/ingredients`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }},);

export const refreshAccessToken = async () => {
  return  await request(`${BASE_URL}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    })
  },)
    .then(checkResponse<TTokenResponse>)
    .then((data) => {
        console.log(data)
      let authToken;
      authToken = data.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken, 120);
    })

}

async function fetchWithRefresh(url: string, options: RequestInit = {}) {
    try {
        // Выполняем запрос с текущим токеном
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
        });
        if (response.status === 403) {
            // Если получили ошибку 403, то токен истек и нужно обновить его

            await refreshAccessToken(); // функция для обновления токена
            // Обновляем токен в куках и повторяем запрос

            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${getCookie("accessToken")}`,
                },
            });
        }
        return response;
    } catch (error: any) {
        if (error.message === "Failed to fetch") {
            // Если запрос завершился с ошибкой, то проверяем наличие токена в куках
            if (!getCookie("accessToken")) {
                // Если токен отсутствует, то обновляем его и повторяем запрос
                await refreshAccessToken(); // функция для обновления токена
                // Обновляем токен в куках и повторяем запрос

                return await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${getCookie("accessToken")}`,
                    },
                });
            }
        }

        return Promise.reject(error)
    }
}
