import React from 'react';
import AppHeader from "../app-header/app-header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import style from "./home.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
const Home = () => {
  return (
    <div>
        <main className={style.content}>
          <div className={"mr-5 mt-10"}>
            <BurgerIngredients />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </main>
    </div>
  );
};

export default Home;