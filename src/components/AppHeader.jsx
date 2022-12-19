import React from 'react';
import { Logo, BurgerIcon, ProfileIcon, ListIcon, } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AppHeader.module.css';
import NavButton from "./NavButton";
const AppHeader = () => {
  return (
    <div className={style.header}>
      <div className={style.navigationBlock}>
        <NavButton
          type={"primary"}
          IconComponent={BurgerIcon}
          description={'Конструктор'}
        />
        <div className={style.navigationBlock}>
          <NavButton
            type={"secondary"}
            IconComponent={ListIcon}
            description={'Лента заказов'}
          />
        </div>
      </div>
      <div className={style.logo}>
        <Logo></Logo>
      </div>
        <NavButton
          type={"secondary"}
          IconComponent={ProfileIcon}
          description={'Личный кабинет'}
        />
    </div>
  );
};

export default AppHeader;