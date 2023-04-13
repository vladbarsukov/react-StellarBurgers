import React, {ChangeEvent, FC, SyntheticEvent} from 'react';
import Form from "../form/form";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import style from './forgot-passwprd.module.css'
import {Link} from "react-router-dom";
import {setParticipantFormValue} from "../../services/actions/form";
import {useProvideAuth} from "../../services/auth";
import {useDispatch, useSelector} from "../../services/hooks";

type TForgotPasswordProps = {}
const ForgotPassword: FC<TForgotPasswordProps> = () => {
  const { forgotPassData} = useSelector(
    state => state.Form
  );
  const dispatch = useDispatch();
  const auth = useProvideAuth();
  const onFormChange = (e: ChangeEvent<HTMLInputElement>):void => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, 'forgotPass'))
  }
  const onFormSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    auth.forgotPassword({
        email: forgotPassData.email,
    }).then((r): void => r)
   }

  return (
    <Form formName={"Восстановление пароля"}>
      <EmailInput onChange={onFormChange} value={forgotPassData.email} name={"email"} isIcon={false} extraClass="mt-6" />
      <Button onClick={onFormSubmit} extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
        Восстановить
      </Button>
      <h2 className={`${style.text} text text_type_main-default text_color_inactive mb-4`} >Вспомнили пароль?<Link to='/login' className={`${style.link} text text_type_main-default ml-2`}>Войти</Link></h2>
    </Form>
  );
};

export default ForgotPassword;