import React, { useEffect} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useProvideAuth} from "../../services/auth";

const ProtectedRouteElement = ({ element, navigate}) => {
  const location = useLocation();
  const navigation = useNavigate();
  const { user} = useSelector(
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
  };

  useEffect(() => {
    // При монтировании компонента запросим данные о пользователе
    init();
  }, []);

  if (location.pathname === '/reset-password' && !forgotPassData.forgotPassSuccess) {
    navigation('/forgot-password')
  }

  return user ? element : navigate;

}


export default ProtectedRouteElement;