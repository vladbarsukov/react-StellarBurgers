export const PARTICIPANT_LOGIN_FORM_SET_VALUE = 'PARTICIPANT_LOGIN_FORM_SET_VALUE';
export const LOGIN_PASS_HIDE = 'LOGIN_PASS_HIDE';
export const PARTICIPANT_LOGIN_FORM_SUBMIT = 'PARTICIPANT_LOGIN_FORM_SUBMIT';
export const PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS = 'PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED = 'PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED';

export const PARTICIPANT_REGISTER_FORM_SET_VALUE = 'PARTICIPANT_REGISTER_FORM_SET_VALUE';
export const REGISTER_PASS_HIDE = 'REGISTER_PASS_HIDE';
export const PARTICIPANT_REGISTER_FORM_SUBMIT = 'PARTICIPANT_REGISTER_FORM_SUBMIT';
export const PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS = 'PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED = 'PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED';

export const PARTICIPANT_RESET_PASS_SET_VALUE = 'PARTICIPANT_RESET_PASS_SET_VALUE';
export const RESET_PASS_HIDE = 'RESET_PASS_HIDE';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED';

export const PARTICIPANT_FORGOT_PASS_SET_VALUE = 'PARTICIPANT_FORGOT_PASS_SET_VALUE';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED';

export const PARTICIPANT_PROFILE_FORM_SET_VALUE = 'PARTICIPANT_PROFILE_FORM_SET_VALUE';
export const PARTICIPANT_PROFILE_FORM_SUBMIT = 'PARTICIPANT_PROFILE_FORM_SUBMIT';
export const PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS = 'PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED = 'PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED';

export const PROFILE_FORM_BUTTON_HIDE = 'PROFILE_FORM_BUTTON_HIDE';


export const setParticipantFormValue = (field, value, form) => {
  switch (form) {
    case 'registration': {
      return {
        type: PARTICIPANT_REGISTER_FORM_SET_VALUE,
        field,
        value
      };
    }
    case 'registerPassHide': {
      return {
        type: REGISTER_PASS_HIDE,
        field,
        value
      }
    }
    case 'resetPass': {
      return {
        type: PARTICIPANT_RESET_PASS_SET_VALUE,
        field,
        value
      };
    }
    case 'resetPassHide': {
      return {
        type: RESET_PASS_HIDE,
        field,
        value
      }
    }
    case 'forgotPass': {
      return {
        type: PARTICIPANT_FORGOT_PASS_SET_VALUE,
        field,
        value
      };
    }
    case 'login': {
      return {
        type: PARTICIPANT_LOGIN_FORM_SET_VALUE,
        field,
        value
      };
    }
    case 'loginPassHide': {
      return {
        type: LOGIN_PASS_HIDE,
        field,
        value
      };
    }
    case 'profile': {
      return {
        type: PARTICIPANT_PROFILE_FORM_SET_VALUE,
        field,
        value
      };
    }
    default :
      return null
  }
}

export const isInputActive = (field, value) => {
  return {
    type: PROFILE_FORM_BUTTON_HIDE,
    field: field,
    value: value,
  }
}