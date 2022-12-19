import React from 'react';
import style from './App.module.css';
import AppHeader from "./components/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients";


function App() {
  return (
    <div className={style.app}>
      <AppHeader/>
      <div className={style.content}>
        <div className='mr-5'>
          <BurgerIngredients/>
        </div>


      </div>
    </div>
  );
}

export default App;
