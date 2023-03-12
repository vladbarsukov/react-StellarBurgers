import {
  LOGIN_PASS_HIDE,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_FORGOT_PASS_SET_VALUE,
  PARTICIPANT_LOGIN_FORM_SET_VALUE,
  PARTICIPANT_LOGIN_FORM_SUBMIT,
  PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
  PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_PROFILE_FORM_SET_VALUE,
  PARTICIPANT_PROFILE_FORM_SUBMIT,
  PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED,
  PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_REGISTER_FORM_SET_VALUE,
  PARTICIPANT_REGISTER_FORM_SUBMIT,
  PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
  PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_RESET_PASS_SET_VALUE, PROFILE_FORM_BUTTON_HIDE,
  REGISTER_PASS_HIDE,
  RESET_PASS_HIDE
} from "../actions/form";

const initialState = {
  page: '/',
  loginData: {
    email: "",
    pass: "",
    isPasswordHidden: true,
    loginRequest: false,
    loginFailed: false,
  },
  forgotPassData: {
    email: "",
    forgotPassRequest: false,
    forgotPassFailed: false,
    forgotPassSuccess: false,
  },
  resetPassData: {
    pass: "",
    token: "",
    resetRequest: false,
    resetFailed: false,
    isPasswordHidden: true,
    resetPassSuccess: false,
  },
  registration: {
    name: '',
    email: '',
    pass: '',
    isPasswordHidden: true,
    registrationRequest: false,
    registrationFailed: false,
  },
  profile: {
    name: '',
    email: '',
    pass: '',
    profileRequest: false,
    profileFailed: false,
    isLoginInputActive: false,
    isNameInputActive: false,
    isPassInputActive: false,
  }
};


export const Form = (state = initialState, action) => {
  switch (action.type) {
    case PARTICIPANT_REGISTER_FORM_SET_VALUE: {
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.field]: action.value
        }
      }
    }
    case REGISTER_PASS_HIDE: {
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.field]: action.value
        }
      }
    }
    case PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        registration: {
          ...initialState.registration,
        }
      }
    }

    case PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        registration: {
          ...state.registration,
          registrationRequest: false,
          registrationFailed: true
        }
      }
    }

    case PARTICIPANT_REGISTER_FORM_SUBMIT: {
      return {
        ...state,
        registration: {
          ...state.registration,
          registrationRequest: true,
          registrationFailed: false
        }
      }
    }

    case PARTICIPANT_RESET_PASS_SET_VALUE: {
      return {
        ...state,
        resetPassData: {
          ...state.resetPassData,
          [action.field]: action.value
        }
      }
    }
    case RESET_PASS_HIDE: {
      return {
        ...state,
        resetPassData: {
          ...state.resetPassData,
          [action.field]: action.value
        }
      }
    }
    case PARTICIPANT_FORGOT_PASS_SET_VALUE: {
      return {
        ...state,
        forgotPassData: {
          ...state.forgotPassData,
          [action.field]: action.value
        }
      }
    }
    case PARTICIPANT_FORGOT_PASS_FORM_SUBMIT: {
      return {
        ...state,
        forgotPassData: {
          ...state.forgotPassData,
          forgotPassRequest: true,
          forgotPassFailed: false
        }
      }
    }
    case PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        forgotPassData: {
          ...initialState.forgotPassData,
          forgotPassSuccess: true
        }
      }
    }
    case PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        forgotPassData: {
          ...state.forgotPassData,
          forgotPassRequest: false,
          forgotPassFailed: true
        }
      }
    }
    case PARTICIPANT_RESET_PASS_FORM_SUBMIT: {
      return {
        ...state,
        resetPassData: {
          ...state.resetPassData,
          resetRequest: true,
          resetFailed: false
        }
      }
    }
    case PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        resetPassData: {
          ...initialState.resetPassData,
        }
      }
    }
    case PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        resetPassData: {
          ...state.resetPassData,
          resetRequest: false,
          resetFailed: true
        }
      }
    }
    case PARTICIPANT_LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          [action.field]: action.value
        }
      }
    }
    case PARTICIPANT_LOGIN_FORM_SUBMIT: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          loginRequest: true,
          loginFailed: false
        }
      }
    }

    case PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        loginData: {
          ...initialState.loginData,
        }
      }
    }

    case PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          loginRequest: false,
          loginFailed: true
        }
      }
    }

    case LOGIN_PASS_HIDE: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          [action.field]: action.value
        }
      }
    }
    case PARTICIPANT_PROFILE_FORM_SET_VALUE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.field]: action.value
        }
      }
    }

    case PARTICIPANT_PROFILE_FORM_SUBMIT: {
      return {
        ...state,
        profile: {
          ...state.profile,
          profileRequest: true,
          profileFailed: false
        }
      }
    }
    case PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        profile: {
          name: action.name,
          login: action.email,
          pass: action.password
        }
      }
    }
    case PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED: {
      return {
        ...state,
        profile: {
          ...state.profile,
          profileRequest: false,
          profileFailed: true
        }
      }
    }
    case PROFILE_FORM_BUTTON_HIDE: {
      return {
        ...state,
        profile: {
          ...state.profile,
          [action.field]: action.value
        }
      }
    }
    default:
      return state;
  }
}