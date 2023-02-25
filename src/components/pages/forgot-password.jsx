import React from 'react';
import Form from "../form/form";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './forgot-passwprd.module.css'
import {Link} from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState('')
  return (
    <Form formName={"Восстановление пароля"}>
      <EmailInput onChange={(e) => setEmail( e.target.value )} value={email} name={"email"} isIcon={false} extraClass="mt-6" />
      <Button extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Восстановить
      </Button>
      <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Вспомнили пароль?<Link to='/login' className={`${style.link} text text_type_main-default ml-2`}>Войти</Link></h2>

    </Form>
  );
};

export default ForgotPassword;