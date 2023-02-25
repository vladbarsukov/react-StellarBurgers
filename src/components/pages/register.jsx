import React from 'react';
import Form from "../form/form";
import style from "./register.module.css"
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const Register = () => {
  const [value, setValue] = React.useState({login:'', pass: '', name: ''})
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (
    <Form formName={'Регистрация'}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValue({ ...value, name: e.target.value })}
        value={value.name}
        name={"name"}
        error={false}
        ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <EmailInput onChange={(e) => setValue({ ...value, login: e.target.value })} value={value.login} name={"email"} isIcon={false} extraClass="mt-6" />
      <Input
        type={"text"}
        placeholder={"Пароль"}
        onChange={(e) => setValue({ ...value, pass: e.target.value })}
        icon={"ShowIcon"}
        value={value.pass}
        name={"pass"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <Button extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Зарегистрироваться
      </Button>
      <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Уже зарегистрированы?<Link to='/login' className={`${style.link} text text_type_main-default ml-2`}>Войти</Link></h2>
    </Form>
  );
};

export default Register;