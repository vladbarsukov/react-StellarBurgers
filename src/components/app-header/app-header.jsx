import React from "react";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavButton from "../nav-button/nav-button";
const AppHeader = () => {
  return (
    <header className={styles.header + " " + "mt-10"}>
      <nav className={styles.navigation_block}>
        <NavButton type={"primary"} IconComponent={BurgerIcon} description={"Конструктор"} />
        <div className={styles.navigation_description + " " + "ml-2"}>
          <NavButton type={"secondary"} IconComponent={ListIcon} description={"Лента заказов"} />
        </div>
      </nav>
      <div className={styles.logo}>
        <Logo></Logo>
      </div>
      <NavButton type={"secondary"} IconComponent={ProfileIcon} description={"Личный кабинет"} />
    </header>
  );
};

export default AppHeader;
