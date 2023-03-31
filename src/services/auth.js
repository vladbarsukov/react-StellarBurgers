import { useDispatch} from "react-redux";
import {
  changeUserDataRequest,
  forgotPasswordRequest, getUserRequest,
  loginRequest, logoutRequest,
  onResponse,
  registrationRequest,
  resetPasswordRequest
} from "../utils/api";
import {deleteCookie, setCookie} from "../utils/auth";
import {useNavigate} from "react-router-dom";
import {
  deleteUser,
  getUserFailed,
  getUserRequestDispatch,
  getUserSuccess, logoutUserFailed,
  logoutUserRequest,
  logoutUserSuccess, setUserLoaded
} from "./reducers/user";
import {
  forgotPassFormSubmit,
  forgotPassFormSubmitFailed,
  forgotPassFormSubmitSuccess,
  loginFormSubmit,
  loginFormSubmitFailed,
  loginFormSubmitSuccess,
  profileFormSubmit,
  profileFormSubmitFailed,
  profileFormSubmitSuccess,
  registerFormSubmit,
  registerFormSubmitFailed,
  registerFormSubmitSuccess,
  resetPassFormSubmit,
  resetPassFormSubmitFailed,
  resetPassFormSubmitSuccess
} from "./reducers/form";

export function useProvideAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const registration = async form => {
    dispatch(registerFormSubmit())
    return await registrationRequest(form)
      .then(onResponse)
      .then(data => {
        dispatch(registerFormSubmitSuccess())
      })
      .catch(err => {
        dispatch(registerFormSubmitFailed())
      })
  };
  const forgotPassword = async form => {
    dispatch(forgotPassFormSubmit());
    return await forgotPasswordRequest(form)
      .then(onResponse)
      .then((data) => {
        console.log(data)
        if (data.success) {
          navigate('/reset-password')
          dispatch(forgotPassFormSubmitSuccess());
        }
      })
      .catch(err => {
        dispatch(forgotPassFormSubmitFailed());
        console.log(err)
      })

  };
  const resetPassword = async form => {
    dispatch(resetPassFormSubmit());
    return  await resetPasswordRequest(form)
      .then(onResponse)
      .then(data => {
        if (data.success) {
          navigate('/login')
        }
        dispatch(resetPassFormSubmitSuccess());
      })
      .catch(err => {
        dispatch(resetPassFormSubmitFailed());

      })
  };
  const resetUserData = async form => {
    dispatch(profileFormSubmit());
    return await changeUserDataRequest(form)
      .then(onResponse)
      .then(data => {
        console.log(data)
        dispatch(profileFormSubmitSuccess({
          name: data.user.name,
          user: data.user.email,
        }));
      })
      .catch(err => {
        dispatch(profileFormSubmitFailed())
      })
  };
  const signIn = async (form) => {
    dispatch(loginFormSubmit());
    const data = await loginRequest(form)
      .then(onResponse)
      .then((data) =>
        data
      )
      .catch((err) => {
        dispatch(loginFormSubmitFailed());
      });
    if (data.success) {
      dispatch(loginFormSubmitSuccess(data))
      dispatch(getUserSuccess(data.user));
      let authToken;
      authToken = data.accessToken.split("Bearer ")[1];
      setCookie("accessToken", authToken, 120);
      setCookie("refreshToken", data.refreshToken);
    }
  };
  const getUser = async () => {
    dispatch(getUserRequestDispatch())
    return await getUserRequest()
      .then(onResponse)
      .then((data) => {
        if (data.success) {
          dispatch(getUserSuccess(data.user));
          dispatch(setUserLoaded())
        }
        return data.success;
      })
      .catch((error) => {
        console.log(error);
        dispatch(getUserFailed());
      });
  };
  const signOut = async () => {
    dispatch(logoutUserRequest());
    return await logoutRequest()
      .then(onResponse)
      .then(() => {
        dispatch(logoutUserSuccess())
        dispatch(deleteUser())
        navigate('/')
        deleteCookie("accessToken")
        deleteCookie("refreshToken")

      })
      .catch((error) => {
        console.log(error);
        dispatch(logoutUserFailed());
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
