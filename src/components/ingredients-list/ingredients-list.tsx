import React, {FC} from "react";
import styles from "./ingredients-list.module.css";
import IngredientsItem from "../ingredients-item/IngredientsItem";
import {TIngredient} from "../../services/types/Data";

type TIngredientsListProps = {
  ingredients: Array<TIngredient>
};
const IngredientsList: FC<TIngredientsListProps> = ({ ingredients}) => {

  return (
    <ul className={`${styles.list} ml-4 mr-4`}>
      {ingredients.map((ing) => (
       <IngredientsItem key={ing._id} ing={ing}/>
      ))}
    </ul>
  );
};

export default IngredientsList;

