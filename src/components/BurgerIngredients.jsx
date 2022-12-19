import React from 'react';
import classes from "./BurgerIngredients.module.css";
import data from '../utils/data'
import TabList from "./TabList";
import IngredientsList from "./IngredientsList";

const BurgerIngredients = () => {
  const bunArr = []

  const findIngredient = (Ingredient, IngredientArr) => {
    data.forEach(obj => {
      if(obj.type === Ingredient) {
        IngredientArr.push(obj)
      }
    })
  }

  findIngredient('bun', bunArr)
  console.log(bunArr[0].image_large)
  return (
    <div className={classes.main}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <TabList />
      <div>
        <h2>Булки</h2>
        <IngredientsList ingredients={bunArr}/>
        {/*<ul className={classes.list}>*/}
        {/*  <li className={classes.listItem}>*/}
        {/*    <img src={bunArr[0].image_large}/>*/}
        {/*  </li>*/}
        {/*  <li className={classes.listItem}>*/}
        {/*    <img src={bunArr[1].image_large}/>*/}
        {/*  </li>*/}
        {/*</ul>*/}
      </div>
    </div>

  );
};

export default BurgerIngredients;