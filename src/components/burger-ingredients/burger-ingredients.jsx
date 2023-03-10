import React, { useRef} from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";
import {useDispatch, useSelector} from "react-redux";
import {filterIngredients} from "../../utils/filterIngredients";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {bun, main, sauce} from "../../utils/constants";
import {CLOSE_BURGER_INGREDIENT_MODAL} from "../../services/actions/IngredientDetails";
import {Outlet} from "react-router-dom";


const BurgerIngredients = () => {

  const dispatch = useDispatch();

  const { item } = useSelector(
    state => state.IngredientDetails
  );

  const { items } = useSelector(
    state => state.ingredients
  );

  const closeIngredientPopup = () => {
    dispatch({
      type: CLOSE_BURGER_INGREDIENT_MODAL,
    })
  }

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

        {(item !== null) ? (
          <Outlet/>
        ) : null}
    </div>
  );
};

export default BurgerIngredients;

