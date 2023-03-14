import React from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavButton from "../nav-button/nav-button";
import {useLocation, useNavigate} from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = (link) => {
    navigate(link);
  }

  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.navigation_block}>
        <div  onClick={() => onClick('/')}>
          <NavButton className={styles.link} type={location.pathname === '/' ? "primary" : "secondary"} IconComponent={BurgerIcon} description={"Конструктор"} />
        </div>
        <div  onClick={() => onClick('/feed')} className={`${styles.navigation_description} ml-2`}>
          <NavButton type={"secondary"} IconComponent={ListIcon} description={"Лента заказов"} />
        </div>
      </nav>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <div onClick={() => onClick('/profile')}>
        <NavButton type={(location.pathname === '/profile' || location.pathname === '/profile/orders') ? "primary" : "secondary"} IconComponent={ProfileIcon} description={"Личный кабинет"} />
      </div>
    </header>
  );
};

export default AppHeader;
