import React, {FC} from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavButton from "../nav-button/nav-button";
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';

type TAppHeaderProps = {};
const AppHeader: FC<TAppHeaderProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const onClick = (link: string): void => {
    navigate(link);
  }

  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.navigation_block}>
        <div  onClick={() => onClick('/')}>
          <NavButton  type={location.pathname === '/' ? "primary" : "secondary"} IconComponent={BurgerIcon} description={"Конструктор"} />
        </div>
        <div  onClick={() => onClick('/feed')} className={`${styles.navigation_description} ml-2`}>
          <NavButton type={location.pathname === '/feed' ? "primary" : "secondary"} IconComponent={ListIcon} description={"Лента заказов"} />
        </div>
      </nav>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <div onClick={() => onClick('/profile')}>
        <NavButton type={(location.pathname === '/profile' || location.pathname === '/profile/orders' ) ? "primary" : "secondary"} IconComponent={ProfileIcon} description={"Личный кабинет"} />
      </div>
    </header>
  );
};

export default AppHeader;
