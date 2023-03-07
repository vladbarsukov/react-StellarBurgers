import React from 'react';
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux";
const ProtectedRouteElement = ({ element }) => {
  const { isUserLoaded, authData} = useSelector(
    state => state.User
  );
  // if (!isUserLoaded) {
  //    // null;
  //   return null
  // }

  return authData?.user ? element : <Navigate to="/login" replace/>;
}


export default ProtectedRouteElement;