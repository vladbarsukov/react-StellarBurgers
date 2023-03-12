import React from 'react';
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