import React from "react";
import { useDispatch} from "react-redux";
import {
  changeUserDataRequest,
  forgotPasswordRequest,
  getUserRequest,
  loginRequest, logoutRequest,
  onResponse,
  registrationRequest,
  resetPasswordRequest
} from "../utils/api";
import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS, LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS
} from "./actions/user";
import {deleteCookie, setCookie} from "../utils/auth";
import {
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_LOGIN_FORM_SUBMIT,
  PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
  PARTICIPANT_PROFILE_FORM_SUBMIT,
  PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED,
  PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_REGISTER_FORM_SUBMIT,
  PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
  PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS
} from "./actions/form";
import {useNavigate} from "react-router-dom";

export function useProvideAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = async form => {
    dispatch({
      type: PARTICIPANT_REGISTER_FORM_SUBMIT
    });
    return await registrationRequest(form)
      .then(onResponse)
      .then(data => {
        dispatch({
          type: PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
          data
        });
      })
      .catch(err => {
        dispatch({
          type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
        });
      })
  };
  const forgotPassword = async form => {
    dispatch({
      type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT
    });
    return await forgotPasswordRequest(form)
      .then(onResponse)
      .then(data => {
        if (data.success) {
          navigate('/reset-password')
        }
        dispatch({
          type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS,
        });
      })
      .catch(err => {
        dispatch({
          type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED,
        });
      })

  };
  const resetPassword = async form => {
    dispatch({
      type: PARTICIPANT_RESET_PASS_FORM_SUBMIT
    });
    return await resetPasswordRequest(form)
      .then(onResponse)
      .then(data => {
        if (data.success) {
          navigate('/login')
        }
        dispatch({
          type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS,
          data
        });
      })

      .catch(err => {
        dispatch({
          type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
        });
      })
  };
  const resetUserData = async form => {
    dispatch({
      type: PARTICIPANT_PROFILE_FORM_SUBMIT
    });
    return await changeUserDataRequest(form)
      .then(onResponse)
      .then(data => {
        dispatch({
          type: PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS,
          name: data.name,
          user: data.user,
        });
      })
      .catch(err => {
        dispatch({
          type: PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED,
        });
      })
  };
  const signIn = async (form) => {
    dispatch({
      type: PARTICIPANT_LOGIN_FORM_SUBMIT,
    });
    const data = await loginRequest(form)
      .then(onResponse)
      .then((data) => data)
      .catch((err) => {
        dispatch({
          type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
        });
      });
    if (data.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        user: data.user,
      });
      let authToken;
      authToken = data.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken, 1200);
      setCookie("refreshToken", data.refreshToken, 1200);
    }
  };
  const getUser = async () => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return await getUserRequest()
      .then(onResponse)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
          });
        }
        return data.success;
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
  const signOut = async () => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });
    return await logoutRequest()
      .then(onResponse)
      .then(() => {
        dispatch({
          type: LOGOUT_USER_SUCCESS,
        });
        navigate('/')
        deleteCookie("accessToken")
        deleteCookie("refreshToken")

      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOGOUT_USER_FAILED,
        });
      });
  };

  return {
    getUser,
    signIn,
    registration,
    resetPassword,
    forgotPassword,
    resetUserData,
    signOut,
  };
}
