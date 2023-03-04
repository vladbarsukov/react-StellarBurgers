import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setParticipantFormValue} from "../../services/actions/form";
import Form from "../form/form";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./reset-password.module.css";
import {Link} from "react-router-dom";

const ResetPassword = () => {
  const inputRef = React.useRef(null)
  const dispatch = useDispatch();
  const {resetPassData} = useSelector(
    state => state.Form
  );
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    dispatch(setParticipantFormValue("isPasswordHidden", !resetPassData.isPasswordHidden, 'resetPassHide'))
  }
  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, 'resetPass'))
  }
  return (
    <Form formName={'Восстановление пароля'}>
      <Input
        type={resetPassData.isPasswordHidden ? 'password' : 'text'}
        placeholder={"Введите новый"}
        onChange={onFormChange}
        icon={resetPassData.isPasswordHidden ? 'HideIcon' : 'ShowIcon'}
        value={resetPassData.pass}
        name={"pass"}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={onFormChange}
        value={resetPassData.token}
        name={"token"}
        error={false}
        ref={inputRef}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mt-6"
      />

      <Button  extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Сохранить
      </Button>
      <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Уже зарегистрированы?<Link to='/login' className={`${style.link} text text_type_main-default ml-2`}>Войти</Link></h2>
    </Form>
  );
};

export default ResetPassword;