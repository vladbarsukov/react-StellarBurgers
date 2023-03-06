import React from 'react';
import style from './profile.module.css'
import {EmailInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {setParticipantFormValue} from "../../services/actions/form";

const Profile = () => {
  const {profile} = useSelector(
    state => state.Form
  );
  const dispatch = useDispatch();
  const inputRef = React.useRef(null)
  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, 'profile'))
  }
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
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
            type={'text'}
            placeholder={'Имя'}
            onChange={onFormChange}
            icon={'EditIcon'}
            value={profile.name}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <EmailInput placeholder={'Логин'} onChange={onFormChange} value={profile.email} name={"email"} icon={'EditIcon'} isIcon={false} extraClass="mt-6" />

          <Input
            type={'password'}
            placeholder={'Пароль'}
            onChange={onFormChange}
            icon={'EditIcon'}
            value={profile.pass}
            name={'pass'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1 mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;