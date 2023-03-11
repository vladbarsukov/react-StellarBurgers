import React from 'react';
import style from "./Ingredients-Details-Page.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientsDetailsPage = () => {
  return (
    <div className={`${style.container} mt-30`}>
      <IngredientDetails/>
    </div>
  );
};

export default IngredientsDetailsPage;