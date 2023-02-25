import React from 'react';
import style from "./login.module.css";
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import Form from "../form/form";

const Login = () => {
  const [value, setValue] = React.useState({login:'', pass: ''})
  const onChangeLog = e => {
    setValue({...value, login: e.target.value})
  }

  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Form formName={'Вход'}>
      <EmailInput onChange={onChangeLog} value={value.login} name={"email"} isIcon={false} extraClass="mt-6" />
      <Input
        type={"text"}
        placeholder={"Пароль"}
        onChange={(e) => setValue({ ...value, pass: e.target.value })}
        icon={"ShowIcon"}
        value={value.pass}
        name={"name"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <Button extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Войти
      </Button>
        <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Вы — новый пользователь?<Link to='/register' className={`${style.link} text text_type_main-default ml-2`}>Зарегистрироваться</Link></h2>
        <h2 className={`${style.text} text text_type_main-default text_color_inactive`} >Забыли пароль?<Link to='/forgot-password' className={`${style.link} text text_type_main-default ml-2`}>Восстановить пароль</Link></h2>
    </Form>
  );
};

export default Login;