import React, {useEffect, useState} from 'react';
import style from './profile.module.css'
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setParticipantFormValue} from "../../services/actions/form";
import {useProvideAuth} from "../../services/auth";


const Profile = () => {
  const [isInputDisabled, setInputDisabled] = useState({name: true, pass: true, email: true})
  const {profile} = useSelector(
    state => state.Form
  );
  const auth = useProvideAuth();
  const {user} = useSelector(
    state => state.User
  );
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)
  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, 'profile'))
  }
  useEffect(
    () => {
      dispatch(setParticipantFormValue('name', user?.name, 'profile'))
      dispatch(setParticipantFormValue('email', user?.email, 'profile'))
    },
    [dispatch]
  );
  const onFormSubmit = (e) => {
    e.preventDefault();
    auth.resetUserData({
      email: profile.email,
      name: profile.name
    })
    setInputDisabled({name: true, pass: true, email: true})
  }

  const onNameIconClick = () => {
    setInputDisabled({...isInputDisabled, name: !isInputDisabled.name})
  }
  const onLoginIconClick = () => {
    setInputDisabled({...isInputDisabled, email: !isInputDisabled.email})
  }
  const onPassIconClick = () => {
    setInputDisabled({...isInputDisabled, pass: !isInputDisabled.pass})
  }
  return (
    <div className={`${style.container} mt-30`}>
      <div className={`${style.sidebar} mr-15`}>
        <ul>
          <li className={"text text_type_main-medium"}>Профиль</li>
          <li className={"text text_type_main-medium"}>История заказов</li>
          <li className={"text text_type_main-medium"}>Выход</li>
        </ul>
        <p className="mt-20 text text_type_main-default text_color_inactive">В этом разделе вы можете
          изменить свои персональные данные</p>
      </div>
      <div>
        <form>
          <Input
            disabled={isInputDisabled.name}
            type={'text'}
            placeholder={'Имя'}
            onChange={onFormChange}
            icon={'EditIcon'}
            value={profile.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onNameIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <EmailInput onIconClick={onLoginIconClick} disabled={isInputDisabled.email} placeholder={'Логин'} onChange={onFormChange} value={profile.email} name={"email"} icon={'EditIcon'} isIcon={false} extraClass="mt-6" />

          <Input
            disabled={isInputDisabled.pass}
            type={'password'}
            placeholder={'Пароль'}
            onChange={onFormChange}
            icon={'EditIcon'}
            value={profile.pass}
            name={'pass'}
            error={false}
            ref={inputRef}
            onIconClick={onPassIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1 mt-6"
          />
          <Button onClick={onFormSubmit}  extraClass={`${style.button} mt-6 mb-20`} htmlType="button" type="primary" size="large">
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;