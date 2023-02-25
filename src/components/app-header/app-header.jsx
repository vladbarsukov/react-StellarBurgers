import React from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavButton from "../nav-button/nav-button";
import { Link } from 'react-router-dom';
const AppHeader = () => {
  return (
    <header className={styles.header + " " + "mt-10"}>
      <nav className={styles.navigation_block}>
        <Link className={styles.link} to='/'>
          <NavButton type={"primary"} IconComponent={BurgerIcon} description={"Конструктор"} />
        </Link>
        <div className={styles.navigation_description + " " + "ml-2"}>
          <NavButton type={"secondary"} IconComponent={ListIcon} description={"Лента заказов"} />
        </div>
      </nav>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <Link className={styles.link} to='/login'>
        <NavButton type={"secondary"} IconComponent={ProfileIcon} description={"Личный кабинет"} />
      </Link>
    </header>
  );
};

export default AppHeader;
