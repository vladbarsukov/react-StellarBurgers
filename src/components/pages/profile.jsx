import React, { useEffect} from "react";
import style from "./profile.module.css";
import { EmailInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {isInputActive, setParticipantFormValue} from "../../services/actions/form";
import { useProvideAuth } from "../../services/auth";
import {Outlet, useLocation, useNavigate} from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.Form);
  const auth = useProvideAuth();
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const location = useLocation();


  const onFormChange = (e) => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, "profile"));
  };
  useEffect(() => {
    dispatch(setParticipantFormValue("name", user?.name, "profile"));
    dispatch(setParticipantFormValue("email", user?.email, "profile"));

  }, [dispatch]);
  const onFormCancel = (e) => {
    e.preventDefault();
    dispatch(setParticipantFormValue("name", user.name, "profile"));
    dispatch(setParticipantFormValue("email", user.email, "profile"));
    dispatch(setParticipantFormValue("pass", "", "profile"));
    dispatch(isInputActive("isNameInputActive", false))
    dispatch(isInputActive("isLoginInputActive", false))
    dispatch(isInputActive("isPassInputActive", false))
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    auth.resetUserData({
      email: profile.email,
      name: profile.name,
      password: profile.pass,
    });
  };

  const onIconClick = (field) => {
    switch (field) {
      case 'name' : {
       return  dispatch(isInputActive("isNameInputActive", !profile.isNameInputActive))
      }
      case 'login' : {
       return  dispatch(isInputActive("isLoginInputActive", !profile.isLoginInputActive))
      }
      case 'pass' : {
       return  dispatch(isInputActive("isPassInputActive", !profile.isPassInputActive))
      }
      default :
        return null
    }
  }

  const onLogoutButtonClick = () => {
    auth.signOut();
  };

  return (
    <div className={`${style.container} mt-30`}>
      <div className={`${style.sidebar} mr-15`}>
        <ul>
          <li onClick={() => navigate( '/profile')} className={location.pathname === '/profile' ? "text text_type_main-medium" : "text text_type_main-medium text_color_inactive"}>Профиль</li>
          <li onClick={() => navigate( '/profile/orders')} className={location.pathname === '/profile/orders' ? "text text_type_main-medium" : "text text_type_main-medium text_color_inactive"}>История заказов</li>
          <li onClick={onLogoutButtonClick} className={"text text_type_main-medium text_color_inactive"}>
            Выход
          </li>
        </ul>
        <p className="mt-20 text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      {location.pathname === '/profile' ?
        <div>
          <form>
            <Input
              disabled={!profile.isNameInputActive}
              type={"text"}
              placeholder={"Имя"}
              onChange={onFormChange}
              icon={profile.isNameInputActive ? "CloseIcon" : "EditIcon"}
              value={profile.name}
              name={"name"}
              error={false}
              ref={inputRef}
              onIconClick={() => onIconClick("name")}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1"
            />
            <EmailInput
              onIconClick={() => onIconClick("login")}
              disabled={!profile.isLoginInputActive}
              placeholder={"Логин"}
              onChange={onFormChange}
              value={profile.email}
              name={"email"}
              icon={profile.isLoginInputActive ? "CloseIcon" : "EditIcon"}
              isIcon={false}
              extraClass="mt-6"
            />
            <Input
              disabled={!profile.isPassInputActive}
              type={"password"}
              placeholder={"Пароль"}
              onChange={onFormChange}
              icon={profile.isPassInputActive ? "CloseIcon" : "EditIcon"}
              value={profile.pass}
              name={"pass"}
              error={false}
              ref={inputRef}
              onIconClick={() => onIconClick("pass")}
              errorText={"Ошибка"}
              size={"default"}
              extraClass="ml-1 mt-6"
            />
            {profile.isNameInputActive || profile.isLoginInputActive || profile.isPassInputActive ? (
              <div className={`${style.buttons} mt-6`}>
                <Button onClick={onFormCancel} extraClass={`${style.button}`} htmlType="button" type="secondary" size="large">
                  Отмена
                </Button>
                <Button onClick={onFormSubmit} extraClass={`${style.button} ml-7`} htmlType="button" type="primary" size="large">
                  Сохранить
                </Button>
              </div>
            ) : null}
          </form>
        </div>
        :
        <Outlet/>
      }
    </div>
  );
};

export default Profile;
