import {
  changeUserDataRequest, checkResponse,
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
import {useDispatch} from "./hooks";
import {
  TChangeUserDataRequest, TChangeUserDataResponse,
  TForgotPasswordRequest,
  TRegistrationRequest,
  TResetPasswordRequest, TSignInRequest, TSignInResponse, TUserRequest
} from "./types/Data";

type AuthProvider = {
  getUser: () => Promise<void>;
  signIn: (form: TSignInRequest) => Promise<void>;
  registration: (form: TRegistrationRequest) => Promise<void>;
  resetPassword: (form: TResetPasswordRequest) => Promise<void>;
  forgotPassword: (form: TForgotPasswordRequest) => Promise<void>;
  resetUserData: (form: TChangeUserDataRequest) => Promise<void>;
  signOut: () => Promise<void>;
};

export function useProvideAuth(): AuthProvider {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = async (form: TRegistrationRequest): Promise<void> => {
    dispatch({
      type: PARTICIPANT_REGISTER_FORM_SUBMIT
    });
    return await registrationRequest(form)
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
        });
        navigate('/login')
      })
      .catch(err => {
        dispatch({
          type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
        });
      })
  };
  const forgotPassword = async (form: TForgotPasswordRequest): Promise<void> => {
    dispatch({
      type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT
    });
    return await forgotPasswordRequest(form)
      .then(checkResponse)
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
  const resetPassword = async (form: TResetPasswordRequest): Promise<void> => {
    dispatch({
      type: PARTICIPANT_RESET_PASS_FORM_SUBMIT
    });
    return await resetPasswordRequest(form)
      .then(checkResponse)
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
  const resetUserData = async (form: TChangeUserDataRequest): Promise<void> => {
    dispatch({
      type: PARTICIPANT_PROFILE_FORM_SUBMIT
    });
    return await changeUserDataRequest(form)
      .then(checkResponse<TChangeUserDataResponse>)
      .then(data => {
        dispatch({
          type: PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS,
          name: data.user.name,
          email: data.user.email,
        });
      })
      .catch(err => {
        dispatch({
          type: PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED,
        });
      })
  };
  const signIn = async (form: TSignInRequest): Promise<void> => {
    dispatch({
      type: PARTICIPANT_LOGIN_FORM_SUBMIT,
    });
    return await loginRequest(form)
      .then(checkResponse<TSignInResponse>)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
          });
          let authToken;
          authToken = data.accessToken.split("Bearer ")[1];
          setCookie("accessToken", authToken, 120);
          setCookie("refreshToken", data.refreshToken);
          console.log(data)
        }
      })
      .catch((err) => {
        dispatch({
          type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
        });
      });

  };
  const getUser = async () => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    return await getUserRequest()
      .then(onResponse)
      .then(data => {
        if (data.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
          });
        }
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
      .then(checkResponse)
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
