import React from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavButton from "../nav-button/nav-button";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {NAVIGATE_TO} from "../../services/actions/navigation";
const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { page } = useSelector(
    state => state.Navigation
  );

  const onClick = (link) => {
    navigate(link);
    dispatch({
      type: NAVIGATE_TO,
      page: link,
    });

  }

  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.navigation_block}>
        <div  onClick={() => onClick('/')}>
          <NavButton className={styles.link} type={page === '/' ? "primary" : "secondary"} IconComponent={BurgerIcon} description={"Конструктор"} />
        </div>
        <div className={`${styles.navigation_description} ml-2`}>
          <NavButton type={"secondary"} IconComponent={ListIcon} description={"Лента заказов"} />
        </div>
      </nav>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <div onClick={() => onClick('/login')}>
        <NavButton type={page === '/login' ? "primary" : "secondary"} IconComponent={ProfileIcon} description={"Личный кабинет"} />
      </div>
    </header>
  );
};

export default AppHeader;
