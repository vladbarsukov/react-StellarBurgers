import React, {FC} from 'react';
import style from "./home.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
type THomeProps = {}
const Home: FC<THomeProps> = () => {
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