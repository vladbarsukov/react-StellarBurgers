import React, {useEffect, useState} from 'react';
import style from './App.module.css';
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor";
import Modal from "./components/Modal";
import IngredientDetails from "./components/IngredientDetails";
import OrderDetails from "./components/OrderDetails";


function App() {
  const [modalActive, setModalActive] = useState(false)
  const [modalOrderActive, setModalOrderActive] = useState(false)
  const [ingredientDetails, setIngredientDetails] = useState(null)

  const [data, setData] = React.useState({
    isLoading: false,
    hasError: false,
    ingredients: []
  });

  const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

  useEffect(() => {
    const getIngredients = () => {
      setData({ ...data, hasError: false, isLoading: true });
      fetch(ingredientsUrl)
        .then(res => res.json())
        .then(ingredients => setData({ ...data, ingredients, isLoading: false }))
        .catch(e => {
          setData({ ...data, hasError: true, isLoading: false });
        });
    };
    getIngredients();
  }, [])


  useEffect(() => {
    if (!modalActive) {
      setIngredientDetails(null)
    }
  }, [modalActive])


  return (

    <div className={style.app}>
      <AppHeader/>
      <div className={style.content}>
        <div className='mr-5 mt-10'>
          <BurgerIngredients ingredientsData={data.ingredients.data} setActive={setModalActive} setIngredientDetails={setIngredientDetails}/>
        </div>
        <div className=''>
          <BurgerConstructor ingredientDetails={data.ingredients.data} setActive={setModalOrderActive}/>
        </div>

      </div>
      {modalActive ?
        <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={ingredientDetails}/>
      </Modal>
        : null}
      {modalOrderActive ?
        <Modal active={modalOrderActive} setActive={setModalOrderActive}>
          <OrderDetails/>
        </Modal>
        : null
      }
    </div>
  );
}

export default App;
