import React, {useEffect, useState} from 'react';
import style from './App.module.css';
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor";
import Modal from "./components/Modal";
import IngredientDetails from "./components/IngredientDetails";
import modal from "./components/Modal";


function App() {
  const [modalActive, setModalActive] = useState(false)
  const [ingredientDetails, setIngredientDetails] = useState(null)
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
          <BurgerIngredients setActive={setModalActive} setIngredientDetails={setIngredientDetails}/>
        </div>
        <div className='mt-10'>
          <BurgerConstructor/>
        </div>

      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <IngredientDetails ingredientDetails={ingredientDetails}/>
      </Modal>
    </div>
  );
}

export default App;
