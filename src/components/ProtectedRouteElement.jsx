import React, { useEffect, useState } from 'react';

import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {SET_USER_LOADED} from "../services/actions/user";
import {useProvideAuth} from "../services/auth";
import ResetPassword from "./pages/reset-password";
const ProtectedRouteElement = ({ element, navigate }) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { isUserLoaded, authData, user} = useSelector(
    state => state.User
  );
  const {forgotPassData} = useSelector(
    state => state.Form
  );
  const dispatch = useDispatch();
  const auth = useProvideAuth();
  const init = async () => {
    // Вызовем запрос getUser и изменим состояние isUserLoaded
    await auth.getUser();
    dispatch({
      type: SET_USER_LOADED,
    })
  };
  if (element === <ResetPassword />) {
    console.log('сработало')
  }

  useEffect(() => {
    // При монтировании компонента запросим данные о пользователе
    init();
  }, []);
  if (!isUserLoaded) {
    return null;
  }
  if (location.pathname === '/reset-password' && !forgotPassData.forgotPassSuccess) {
    console.log('hallo')
    navigation('/forgot-password')
  }

  return user ? element : navigate;

}


export default ProtectedRouteElement;