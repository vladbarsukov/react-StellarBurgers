import React, {FC} from 'react';
import style from "./Ingredients-Details-Page.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";

type TIngredientsDetailsPageProps = {}
const IngredientsDetailsPage: FC<TIngredientsDetailsPageProps> = () => {
  return (
    <div className={`${style.container} mt-30`}>
      <IngredientDetails/>
    </div>
  );
};

export default IngredientsDetailsPage;