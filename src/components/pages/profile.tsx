import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useRef} from "react";
import style from "./profile.module.css";
import {Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {isInputActive, setParticipantFormValue} from "../../services/actions/form";
import { useProvideAuth } from "../../services/auth";
import {Location, NavigateFunction, Outlet, useLocation, useNavigate} from "react-router-dom";
import {
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_START
} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../services/hooks";

type TProfileProps = {}
const Profile: FC<TProfileProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { profile } = useSelector((state) => state.Form);
  const auth = useProvideAuth();
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const location: Location = useLocation();


  const onFormChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setParticipantFormValue(e.target.name, e.target.value, "profile"));
  };
  useEffect(() => {
    dispatch(setParticipantFormValue("name", user?.name, "profile"));
    dispatch(setParticipantFormValue("login", user?.email, "profile"));
    dispatch({ type: WS_USER_CONNECTION_START});
    return () => {
      dispatch({ type: WS_USER_CONNECTION_CLOSED});
    }
  }, [dispatch, user]);
  const onFormCancel = (e: SyntheticEvent): any => {
    e.preventDefault();
    dispatch(setParticipantFormValue("name", user?.name, "profile"));
    dispatch(setParticipantFormValue("login", user?.email, "profile"));
    dispatch(setParticipantFormValue("pass", "", "profile"));
    dispatch(isInputActive("isNameInputActive", false))
    dispatch(isInputActive("isLoginInputActive", false))
    dispatch(isInputActive("isPassInputActive", false))
  };

  const onFormSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    auth.resetUserData({
      email: profile.login,
      login: profile.name,
      password: profile.pass,
    }).then((): void => {
      dispatch(isInputActive("isNameInputActive", false))
      dispatch(isInputActive("isLoginInputActive", false))
      dispatch(isInputActive("isPassInputActive", false))
    });
  };

  const onIconClick = (field: 'name' | 'login' | 'pass'): void | null => {
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

  const onLogoutButtonClick = (): void => {
    auth.signOut();
    dispatch({ type: WS_USER_CONNECTION_CLOSED });
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
                <Input
                    onIconClick={() => onIconClick("login")}
                    disabled={!profile.isLoginInputActive}
                    placeholder={"Логин"}
                    onChange={onFormChange}
                    value={profile.login}
                    name={"login"}
                    icon={profile.isLoginInputActive ? "CloseIcon" : "EditIcon"}
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