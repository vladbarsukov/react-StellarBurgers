import React, { useEffect, useState } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {IngredientsDataContext} from "../services/app-context";

function App() {
  const [isModalIngredientDetailsOpen, setIsModalIngredientDetailsOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);

  const [data, setData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    selectedIngredients: {bun: null, topping: []},
  });

  const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients";

  const closeIngredientPopup = () => {
    setIsModalIngredientDetailsOpen(false)
  }

  const closeOrderPopup = () => {
    setIsModalOrderOpen(false)
  }

  useEffect(() => {
    const getIngredients = () => {
      setData({ ...data, hasError: false, isLoading: true });
      fetch(ingredientsUrl)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((ingredients) => setData({ ...data, ingredients, isLoading: false }))
        .catch((e) => {
          setData({ ...data, hasError: true, isLoading: false });
        });
    };
    getIngredients();
  }, []);

  useEffect(() => {
    if (!isModalIngredientDetailsOpen) {
      setIngredientDetails(null);
    }
  }, [isModalIngredientDetailsOpen]);

  return (
    <div className={style.app}>
      <AppHeader />
      <IngredientsDataContext.Provider value={{ data, setData }}>
        <main className={style.content}>
          <div className={"mr-5 mt-10"}>
            {data.ingredients.data? <BurgerIngredients openPopup={setIsModalIngredientDetailsOpen} setIngredientDetails={setIngredientDetails} /> : null}

          </div>
          <div>
            {data.ingredients.data ? <BurgerConstructor openPopup={setIsModalOrderOpen} /> : null}
          </div>
        </main>
      </IngredientsDataContext.Provider>

      {isModalIngredientDetailsOpen ? (
        <Modal closePopup={closeIngredientPopup}>
          <IngredientDetails ingredientDetails={ingredientDetails} />
        </Modal>
      ) : null}
      {isModalOrderOpen ? (
        <Modal isPopupOpen={isModalOrderOpen} closePopup={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
}

export default App;
