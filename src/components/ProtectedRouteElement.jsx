import React, { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {SET_USER_LOADED} from "../services/actions/user";
import {useProvideAuth} from "../services/auth";
const ProtectedRouteElement = ({ element }) => {
  const { isUserLoaded, authData, user} = useSelector(
    state => state.User
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
  useEffect(() => {
    // При монтировании компонента запросим данные о пользователе
    init();
  }, []);
  if (!isUserLoaded) {
    return null;
  }
  return user ? element : <Navigate to="/login" replace/>;

}


export default ProtectedRouteElement;