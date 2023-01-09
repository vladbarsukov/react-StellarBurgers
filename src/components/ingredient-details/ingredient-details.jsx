import React from 'react';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ingredientDetails}) => {
  return (
    <div className={styles.main + ' ' + 'pt-10 pb-15'}>
      <h2 className= {styles.title + ' ' + 'pl-10 pr-10 text text_type_main-large'}>Детали ингредиента</h2>
      <img className={styles.image} src={ingredientDetails?.image_large}/>
      <p className={styles.ingredient_name + ' ' + 'mt-4 mb-8 text text_type_main-medium'}>{ingredientDetails?.name}</p>
      <ul className={styles.food_value}>
        <li  className={styles.food_value_item}>
          <p className='text text_type_main-default'>Калории,ккал</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.calories}</p>
        </li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Белки, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.proteins}</p></li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Жиры, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.fat}</p>
        </li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Углеводы, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{ingredientDetails?.carbohydrates}</p>
        </li>
      </ul>

    </div>
  );
};

export default IngredientDetails;