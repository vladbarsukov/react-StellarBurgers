import React, {ChangeEvent, FC, SyntheticEvent, useRef} from 'react';
import Form from "../form/form";
import style from "./register.module.css"
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
import {setParticipantFormValue} from "../../services/actions/form";
import {useProvideAuth} from "../../services/auth";
import {useDispatch, useSelector} from "../../services/hooks";

type TRegisterProps = {}
const Register: FC<TRegisterProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch();
  const auth = useProvideAuth();
  const { registration} = useSelector(
    state => state.Form
  );
  const onFormSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    auth.registration({
      email: registration.email,
      password: registration.pass,
      name: registration.name
    })
  }
  const onFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
      dispatch(setParticipantFormValue(e.target.name, e.target.value, 'registration'))
  }
  const onIconClick = (): void => {
      setTimeout((): void => {
          if (inputRef.current) {
              inputRef.current.focus();
          }
      }, 0);
    dispatch(setParticipantFormValue("isPasswordHidden", !registration.isPasswordHidden, 'registerPassHide'))
  }
  return (
    <Form formName={'Регистрация'}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={onFormChange}
        value={registration.name}
        name={"name"}
        error={false}
        ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <EmailInput onChange={onFormChange} value={registration.email} name={"email"} isIcon={false} extraClass="mt-6" />
      <Input
        type={registration.isPasswordHidden ? 'password' : 'text'}
        placeholder={"Пароль"}
        onChange={onFormChange}
        icon={registration.isPasswordHidden ? 'HideIcon' : 'ShowIcon'}
        value={registration.pass}
        name={"pass"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <Button onClick={onFormSubmit} extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Зарегистрироваться
      </Button>
      <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Уже зарегистрированы?<Link to='/login' className={`${style.link} text text_type_main-default ml-2`}>Войти</Link></h2>
    </Form>

  );
};

export default Register;