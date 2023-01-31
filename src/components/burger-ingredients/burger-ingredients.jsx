import React, { useRef} from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {filterIngredients} from "../../utils/filterIngredients";


const BurgerIngredients = () => {

  const { items } = useSelector(
    state => state.ingredients
  );

  const mainRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);

  const scrollMain = () => {
    mainRef.current.scrollIntoView({behavior: "smooth"});
  };

  const scrollSauce = () => {
    saucesRef.current.scrollIntoView({behavior: "smooth"});
  };

  const scrollBuns = () => {
    bunsRef.current.scrollIntoView({behavior: "smooth"});
  };

  return (
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
          <IngredientsList ingredients={filterIngredients(items, "bun")} />
        </div>
        <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
          Соусы
        </h2>
        <div>
          <IngredientsList ingredients={filterIngredients(items, "sauce")}  />
        </div>
        <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
          Начинки
        </h2>
        <div>
          <IngredientsList ingredients={filterIngredients(items, "main")} />
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  openPopup: PropTypes.func,
  setIngredientDetails: PropTypes.func,
}

export default BurgerIngredients;

