import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import Modal from "./components/modal/modal";
import IngredientDetails from "./components/ingredient-details/ingredient-details";
import OrderDetails from "./components/order-details/order-details";

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
      <div className={style.content}>
        <div className={"mr-5 mt-10"}>
          <BurgerIngredients ingredientsData={data.ingredients.data} setActive={setModalIngredientDetailsActive} setIngredientDetails={setIngredientDetails} />
        </div>
        <div>
          <BurgerConstructor ingredientDetails={data.ingredients.data} setActive={setModalOrderActive} />
        </div>
      </div>
      {modalIngredientDetailsActive ? (
        <Modal active={modalIngredientDetailsActive} setActive={setModalIngredientDetailsActive}>
          <IngredientDetails ingredientDetails={ingredientDetails} />
        </Modal>
      ) : null}
      {modalOrderActive ? (
        <Modal active={modalOrderActive} setActive={setModalOrderActive}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
