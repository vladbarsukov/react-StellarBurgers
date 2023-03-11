import React from 'react';
import style from "./login.module.css";
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import Form from "../form/form";
import {useDispatch, useSelector} from "react-redux";
import {setParticipantFormValue} from "../../services/actions/form";
import { Navigate } from 'react-router-dom';
import {useProvideAuth} from "../../services/auth";


const Login = () => {
  const auth = useProvideAuth();
  const dispatch = useDispatch();
  const { loginData} = useSelector(
    state => state.Form
  );
  const {user} = useSelector(
    state => state.User
  );
  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, 'login'))
  }
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    dispatch(setParticipantFormValue("isPasswordHidden", !loginData.isPasswordHidden, 'loginPassHide'))
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    auth.signIn({
        email: loginData.email,
        password: loginData.pass
      })
  }
  if (user) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  return (
    <Form formName={'Вход'}>
      <EmailInput onChange={onFormChange} value={loginData.email} name={"email"} isIcon={false} extraClass="mt-6" />
      <Input
        type={loginData.isPasswordHidden ? 'password' : 'text'}
        placeholder={"Пароль"}
        onChange={onFormChange}
        icon={loginData.isPasswordHidden ? 'HideIcon' : 'ShowIcon'}
        value={loginData.pass}
        name={"pass"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <Button onClick={onFormSubmit} extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Войти
      </Button>
        <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Вы — новый пользователь?<Link to='/register' className={`${style.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link></h2>
        <h2 className={`${style.text} text text_type_main-default text_color_inactive`} >Забыли пароль?<Link to='/forgot-password' className={`${style.link} text text_type_main-default ml-2`}>Восстановить пароль</Link></h2>
    </Form>
  );
};

export default Login;