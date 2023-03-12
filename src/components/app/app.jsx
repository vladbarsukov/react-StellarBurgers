import React, {useEffect} from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";
import Profile from "../pages/profile";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import IngredientsDetailsPage from "../pages/ingredients-details-page";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../services/actions/BurgerIngredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Orders from "../pages/Orders";
import {NotFound404} from "../pages/not-found";

function App() {
  const dispatch = useDispatch();
  const {isModalOpen } = useSelector(
    state => state.IngredientDetails
  );
  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <div className={style.app}>
      <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <AppHeader/>
        <Routes>
          {isModalOpen ?
            <Route path="/" element={<Home />} >
              <Route path="/ingredients/:id" element={
                <Modal close={'ingredient'}>
                  <IngredientDetails/>
                </Modal>
              } />
            </Route>
            :
            <Route path="/" element={<Home />} />
          }
          <Route path="*" element={<NotFound404/>}/>
          <Route path="/ingredients/:id" element={<IngredientsDetailsPage/>} />
          <Route path="/profile" element={<ProtectedRouteElement  navigate={<Navigate to="/login" replace/>} element={<Profile />}/>} >
            <Route path="/profile/orders" element={<Orders/>} />
          </Route>
          <Route path="/login" element={<ProtectedRouteElement navigate={<Login />} element={<Navigate to="/profile" replace/>}/>} />
          <Route path="/register" element={<ProtectedRouteElement navigate={<Register />} element={<Navigate to="/profile" replace/>}/>} />
          <Route path="/forgot-password" element={<ProtectedRouteElement navigate={<ForgotPassword />} element={<Navigate to="/profile" replace/>}/>} />
          <Route path="/reset-password" element={<ProtectedRouteElement navigate={<ResetPassword />} element={<Navigate to="/profile" replace/>}/>} />
        </Routes>
      </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;