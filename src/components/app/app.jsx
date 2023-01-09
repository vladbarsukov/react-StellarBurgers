import React, { useEffect, useState } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [modalIngredientDetailsActive, setModalIngredientDetailsActive] = useState(false);
  const [modalOrderActive, setModalOrderActive] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);

  const [data, setData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
  });

  const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

  const closeIngredientPopup = () => {
    setModalIngredientDetailsActive(false)
  }

  const closeOrderPopup = () => {
    setModalOrderActive(false)
  }

  useEffect(() => {
    const getIngredients = () => {
      setData({ ...data, hasError: false, isLoading: true });
      fetch(ingredientsUrl)
        .then((res) => res.json())
        .then((ingredients) => setData({ ...data, ingredients, isLoading: false }))
        .catch((e) => {
          setData({ ...data, hasError: true, isLoading: false });
        });
    };
    getIngredients();
  }, []);

  useEffect(() => {
    if (!modalIngredientDetailsActive) {
      setIngredientDetails(null);
    }
  }, [modalIngredientDetailsActive]);

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.content}>
        <div className={"mr-5 mt-10"}>
          <BurgerIngredients ingredientsData={data.ingredients.data} setActive={setModalIngredientDetailsActive} setIngredientDetails={setIngredientDetails} />
        </div>
        <div>
          <BurgerConstructor ingredientDetails={data.ingredients.data} setActive={setModalOrderActive} />
        </div>
      </main>
      {modalIngredientDetailsActive ? (
        <Modal active={modalIngredientDetailsActive} setActive={closeIngredientPopup}>
          <IngredientDetails ingredientDetails={ingredientDetails} />
        </Modal>
      ) : null}
      {modalOrderActive ? (
        <Modal active={modalOrderActive} setActive={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
