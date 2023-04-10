export const PARTICIPANT_LOGIN_FORM_SET_VALUE: 'PARTICIPANT_LOGIN_FORM_SET_VALUE' = 'PARTICIPANT_LOGIN_FORM_SET_VALUE';
export const LOGIN_PASS_HIDE: 'LOGIN_PASS_HIDE' = 'LOGIN_PASS_HIDE';
export const PARTICIPANT_LOGIN_FORM_SUBMIT: 'PARTICIPANT_LOGIN_FORM_SUBMIT' = 'PARTICIPANT_LOGIN_FORM_SUBMIT';
export const PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS: 'PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS' = 'PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED: 'PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED' = 'PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED';

export const PARTICIPANT_REGISTER_FORM_SET_VALUE: 'PARTICIPANT_REGISTER_FORM_SET_VALUE' = 'PARTICIPANT_REGISTER_FORM_SET_VALUE';
export const REGISTER_PASS_HIDE: 'REGISTER_PASS_HIDE' = 'REGISTER_PASS_HIDE';
export const PARTICIPANT_REGISTER_FORM_SUBMIT: 'PARTICIPANT_REGISTER_FORM_SUBMIT' = 'PARTICIPANT_REGISTER_FORM_SUBMIT';
export const PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS: 'PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS' = 'PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED: 'PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED' = 'PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED';

export const PARTICIPANT_RESET_PASS_SET_VALUE: 'PARTICIPANT_RESET_PASS_SET_VALUE' = 'PARTICIPANT_RESET_PASS_SET_VALUE';
export const RESET_PASS_HIDE: 'RESET_PASS_HIDE' = 'RESET_PASS_HIDE';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT: 'PARTICIPANT_RESET_PASS_FORM_SUBMIT' = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS: 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS' = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED: 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED' = 'PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED';

export const PARTICIPANT_FORGOT_PASS_SET_VALUE: 'PARTICIPANT_FORGOT_PASS_SET_VALUE' = 'PARTICIPANT_FORGOT_PASS_SET_VALUE';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT: 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT' = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS: 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS' = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED: 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED' = 'PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED';

export const PARTICIPANT_PROFILE_FORM_SET_VALUE: 'PARTICIPANT_PROFILE_FORM_SET_VALUE' = 'PARTICIPANT_PROFILE_FORM_SET_VALUE';
export const PARTICIPANT_PROFILE_FORM_SUBMIT: 'PARTICIPANT_PROFILE_FORM_SUBMIT' = 'PARTICIPANT_PROFILE_FORM_SUBMIT';
export const PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS: 'PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS' = 'PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS';
export const PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED: 'PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED' = 'PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED';

export const PROFILE_FORM_BUTTON_HIDE: 'PROFILE_FORM_BUTTON_HIDE' = 'PROFILE_FORM_BUTTON_HIDE';

export interface ILoginFormSetValue {
  readonly type: typeof PARTICIPANT_LOGIN_FORM_SET_VALUE
  readonly field: string
  readonly value: string
}
export interface ILoginPassHide {
  readonly type: typeof LOGIN_PASS_HIDE
  readonly field: string
  readonly value: boolean
}

export interface ILoginFormSubmit {
  readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT
}
export interface ILoginFormSuccess {
  readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS
}
export interface ILoginFormFailed {
  readonly type: typeof PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED
}
export interface IRegisterFormSetValue {
  readonly type: typeof PARTICIPANT_REGISTER_FORM_SET_VALUE
  readonly field: string
  readonly value: string
}
export interface IRegisterPassHide {
  readonly type: typeof REGISTER_PASS_HIDE
  readonly field: string
  readonly value: boolean
}
export interface IRegisterFormSubmit {
  readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT
}
export interface IRegisterFormSuccess {
  readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS
}
export interface IRegisterFormFailed {
  readonly type: typeof PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED
}
export interface IResetFormSetValue {
  readonly type: typeof PARTICIPANT_RESET_PASS_SET_VALUE
  readonly field: string
  readonly value: string
}
export interface IResetPassHide {
  readonly type: typeof RESET_PASS_HIDE
  readonly field: string
  readonly value: boolean
}
export interface IResetFormSubmit {
  readonly type: typeof PARTICIPANT_RESET_PASS_FORM_SUBMIT
}
export interface IResetFormSuccess {
  readonly type: typeof PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS
}
export interface IResetFormFailed {
  readonly type: typeof PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED
}
export interface IForgotFormSetValue {
  readonly type: typeof PARTICIPANT_FORGOT_PASS_SET_VALUE
  readonly field: string
  readonly value: string
}
export interface IForgotFormSubmit {
  readonly type: typeof PARTICIPANT_FORGOT_PASS_FORM_SUBMIT
}
export interface IForgotFormSuccess {
  readonly type: typeof PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS
}
export interface IForgotFormFailed {
  readonly type: typeof PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED
}
export interface IProfileFormSetValue {
  readonly type: typeof PARTICIPANT_PROFILE_FORM_SET_VALUE
  readonly field: string
  readonly value: string
}
export interface IProfileFormSubmit {
  readonly type: typeof PARTICIPANT_PROFILE_FORM_SUBMIT
}
export interface IProfileFormSuccess {
  readonly type: typeof PARTICIPANT_PROFILE_FORM_SUBMIT_SUCCESS
  readonly name: string
  readonly email: string
}
export interface IProfileFormFailed {
  readonly type: typeof PARTICIPANT_PROFILE_FORM_SUBMIT_FAILED
}
export interface IProfilePassHide {
  readonly type: typeof PROFILE_FORM_BUTTON_HIDE
  readonly field: string
  readonly value: boolean
}

export type TFormAction = ILoginFormSetValue | ILoginPassHide | ILoginFormSubmit | ILoginFormSuccess | ILoginFormFailed
| IRegisterFormSetValue | IRegisterPassHide | IRegisterFormSubmit | IRegisterFormSuccess | IRegisterFormFailed | IResetFormSetValue
| IResetPassHide | IResetFormSubmit | IResetFormSuccess | IResetFormFailed | IForgotFormSetValue | IForgotFormSubmit
| IForgotFormSuccess | IForgotFormFailed | IProfileFormSetValue | IProfileFormSubmit | IProfileFormSuccess | IProfileFormFailed
| IProfilePassHide
export const setParticipantFormValue = (field: string, value: string | boolean, form: string):{field: string, type: any, value: string | boolean} | null => {
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

export const isInputActive = (field: string, value: string) => {
  return {
    type: PROFILE_FORM_BUTTON_HIDE,
    field: field,
    value: value,
  }
}