import React, { useEffect, useState } from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {IngredientsDataContext, OrderDataContext} from "../../services/app-context";
import {BASE_URL} from "../../utils/constants";
import {request} from "../../utils/api";
import { useDispatch, useSelector } from 'react-redux';
import {getItems} from "../../services/actions/BurgerIngredients";
import {ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS} from "../../services/actions/IngredientDetails";

function App() {
  const [isModalIngredientDetailsOpen, setIsModalIngredientDetailsOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState(null);
  const [orderData, setOrderData] = useState({})


  const dispatch = useDispatch();
  const { items } = useSelector(
    state => state.ingredients
  );
  const { bun, selectedItems } = useSelector(
    state => state.ingredientsConstructor
  );

  const [data, setData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: [],
    selectedIngredients: {bun: null, topping: []},
  });

  const closeIngredientPopup = () => {
    setIsModalIngredientDetailsOpen(false)
    dispatch({
      type: REMOVE_INGREDIENT_DETAILS,
    });
  }

  const closeOrderPopup = () => {
    setIsModalOrderOpen(false)

  }

  // useEffect(() => {
  //   const getIngredients = () => {
  //     setData({ ...data, hasError: false, isLoading: true });
  //     request(`${BASE_URL}/ingredients`)
  //       .then((ingredients) => setData({ ...data, ingredients, isLoading: false }))
  //       .catch((e) => {
  //         setData({ ...data, hasError: true, isLoading: false });
  //       });
  //   };
  //   getIngredients();
  //
  // }, []);

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isModalIngredientDetailsOpen) {
      setIngredientDetails(null);
    }
  }, [isModalIngredientDetailsOpen]);

  return (
    <div className={style.app}>
      <AppHeader />
      <OrderDataContext.Provider value={{orderData, setOrderData}}>
      <IngredientsDataContext.Provider value={{ data, setData }}>
        <main className={style.content}>
          <div className={"mr-5 mt-10"}>
            {items? <BurgerIngredients openPopup={setIsModalIngredientDetailsOpen} setIngredientDetails={setIngredientDetails} /> : null}

          </div>
          <div>
            <BurgerConstructor openPopup={setIsModalOrderOpen} />
            {/*{items ? <BurgerConstructor openPopup={setIsModalOrderOpen} /> : null}*/}
          </div>
        </main>
      </IngredientsDataContext.Provider>

      {isModalIngredientDetailsOpen ? (
        <Modal closePopup={closeIngredientPopup}>
          <IngredientDetails/>
        </Modal>
      ) : null}
      {isModalOrderOpen ? (
        <Modal isPopupOpen={isModalOrderOpen} closePopup={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      ) : null}
      </OrderDataContext.Provider>
    </div>
  );
}

export default App;
