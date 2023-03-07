import React from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import ForgotPassword from "../pages/forgot-password";
import ResetPassword from "../pages/reset-password";
import Profile from "../pages/profile";
import ProtectedRouteElement from "../ProtectedRouteElement";

function App() {

  return (
    <div className={style.app}>
      <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <AppHeader/>
        <Routes>
          {/*<Route path="/" element={<Home />} />*/}
          <Route path="/" element={<ProtectedRouteElement element={<Home />}/>} />
          {/*<Route path="/profile" element={<Profile />} />*/}
          <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      </DndProvider>
    </div>
  );
}

export default App;