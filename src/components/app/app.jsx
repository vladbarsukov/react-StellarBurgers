import React, { useEffect} from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from 'react-redux';
import {getItems} from "../../services/actions/BurgerIngredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { items, isModalIngredientDetailsOpen } = useSelector(
    state => state.ingredients
  );
  const {isModalOrderOpen} = useSelector(
    state => state.ingredientsConstructor
  );

  const closeIngredientPopup = () => {
    dispatch({
      type: "CLOSE_BURGER_INGREDIENT_MODAL",
    })
    dispatch({
      type: "REMOVE_INGREDIENT_DETAILS",
    });
  }

  const closeOrderPopup = () => {
    dispatch({
      type: "CLOSE_ORDER_MODAL",
    })
  }


  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
    <div className={style.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.content}>
          <div className={"mr-5 mt-10"}>
            {items ? <BurgerIngredients /> : null}
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </main>
        </DndProvider>
      {isModalIngredientDetailsOpen ? (
        <Modal closePopup={closeIngredientPopup}>
          <IngredientDetails/>
        </Modal>
      ) : null}
      {isModalOrderOpen ? (
        <Modal closePopup={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;