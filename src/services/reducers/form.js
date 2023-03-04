import {
  LOGIN_PASS_HIDE,
  PARTICIPANT_FORGOT_PASS_SET_VALUE, PARTICIPANT_LOGIN_FORM_SET_VALUE,
  PARTICIPANT_REGISTER_FORM_SET_VALUE, PARTICIPANT_REGISTER_FORM_SUBMIT,
  PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
  PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS, PARTICIPANT_RESET_PASS_SET_VALUE, REGISTER_PASS_HIDE, RESET_PASS_HIDE
} from "../actions/form";

const initialState = {
  page: '/',
  loginData: {
    email: "",
    pass: "",
    isPasswordHidden: true,
  },
  forgotPassData: {
    email: "",
  },
  resetPassData: {
    pass: "",
    token: "",
    isPasswordHidden: true,
  },
  registration: {
    name: '',
    email: '',
    pass: '',
    isPasswordHidden: true,
    registrationRequest: false,
    registrationFailed: false,
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

    case PARTICIPANT_LOGIN_FORM_SET_VALUE: {
      return {
        ...state,
        loginData: {
          ...state.loginData,
          [action.field]: action.value
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

    default:
      return state;
  }
}