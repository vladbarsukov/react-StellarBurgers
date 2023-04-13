import React, {FC, useRef} from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";
import {filterIngredients} from "../../utils/filterIngredients";
import {bun, main, sauce} from "../../utils/constants";
import {Outlet} from "react-router-dom";
import {useSelector} from "../../services/hooks";

type TBurgerIngredientsProps = {};
const BurgerIngredients: FC<TBurgerIngredientsProps> = () => {
  const { items } = useSelector(
    state => state.ingredients
  );
  const mainRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLDivElement>(null);

  const scrollMain = (): void => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollSauce = (): void => {
    if (saucesRef.current) {
      saucesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollBuns = () => {
    if (bunsRef.current) {
      bunsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <h1 className={"text text_type_main-large mb-5"}>Соберите бургер</h1>
        <div>
          <TabList scrollMain={scrollMain} scrollSauce={scrollSauce} scrollBuns={scrollBuns} />
        </div>
        <div className={styles.list}>
          <h2 ref={bunsRef} className={"mt-10 text text_type_main-medium"}>
            Булки
          </h2>
          <div>
            {items ? <IngredientsList ingredients={filterIngredients(items, bun)} /> : null}
          </div>
          <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
            Соусы
          </h2>
          <div>
            {items ? <IngredientsList ingredients={filterIngredients(items, sauce)}  /> : null}
          </div>
          <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
            Начинки
          </h2>
          <div>
            {items ? <IngredientsList ingredients={filterIngredients(items, main)} /> : null}
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default BurgerIngredients;

