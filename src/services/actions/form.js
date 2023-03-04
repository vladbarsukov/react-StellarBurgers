import {BASE_URL} from "../../utils/constants";

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
    default :
      return null
  }
}


export function register (data)  {
  return function(dispatch) {
    dispatch({
      type: PARTICIPANT_RESET_PASS_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    }).then(res=>{
      return res.json();
    }).then(data => {
      dispatch({
        type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS,
        data
      });
    }).catch(err => {
      dispatch({
        type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
      });
    })
  };
}

export function resetPass (data)  {
  return function(dispatch) {
    dispatch({
      type: PARTICIPANT_REGISTER_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    }).then(res=>{
      return res.json();
    }).then(data => {
      dispatch({
        type: PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
        data
      });
    }).catch(err => {
      dispatch({
        type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
      });
    })
  };
}