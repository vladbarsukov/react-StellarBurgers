import React from 'react';
import style from './IngredientDetails.module.css';

const IngredientDetails = ({ingredientDetails}) => {
  console.log(ingredientDetails)
  return (
    <div className={style.main + ' ' + 'pt-10 pb-15'}>
      <h2 className= 'pl-10 pr-10 text text_type_main-large'>Детали ингредиента</h2>
      <img className={style.image} src={ingredientDetails?.image_large}/>
      <p className={style.ingredient_name + ' ' + 'mt-4 mb-8 text text_type_main-medium'}>{ingredientDetails?.name}</p>
      <ul className={style.food_value}>
        <li  className={style.food_value_item}>
          <p className='text text_type_main-default'>Калории,ккал</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.calories}</p>
        </li>
        <li className={style.food_value_item}>
          <p className='text text_type_main-default'>Белки, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.proteins}</p></li>
        <li className={style.food_value_item}>
          <p className='text text_type_main-default'>Жиры, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.fat}</p>
        </li>
        <li className={style.food_value_item}>
          <p className='text text_type_main-default'>Углеводы, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.carbohydrates}</p>
        </li>
      </ul>

    </div>
  );
};

export default IngredientDetails;