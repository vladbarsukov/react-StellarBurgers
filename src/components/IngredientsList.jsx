import React from 'react';
import style from "./BurgerIngredients.module.css";


const IngredientsList = ({ingredients}) => {
  console.log(ingredients[0].image_large)
  return (
    <ul className={style.list}>
      {
        ingredients.map((ing) =>
          <li key={ing._id} className={style.listItem}>
            <img alt={ing.type} src={ing.image_large}/>
          </li>
        )
      }
    </ul>
  );
};

export default IngredientsList;