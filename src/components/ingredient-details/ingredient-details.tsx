import React, {useCallback, useEffect} from 'react';
import styles from './ingredient-details.module.css';
import {useParams} from "react-router-dom";
import {checkResponse, getIngredientsRequest, onResponse} from "../../utils/api";
import {ADD_INGREDIENT_DETAILS} from "../../services/actions/IngredientDetails";
import {useDispatch, useSelector} from "../../services/hooks";
import {TIngredientResponse} from "../../services/types/Data";

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { item, isModalOpen } = useSelector(
    state => state.IngredientDetails
  );
  const loadIngredientInfo = useCallback(
    (): void => {
      getIngredientsRequest().then(onResponse).then((ingredients => {
        dispatch({
          type: ADD_INGREDIENT_DETAILS,
          item: ingredients.data.find(({ _id }: {_id: string}): boolean => _id === id),
        });
      }));
    },
    [id]
  );

  useEffect((): void=> {
    loadIngredientInfo()
  },[])

  return  (
    <div className={`${styles.main} pt-10 pb-15`}>
      <h2 className= {`${isModalOpen ? styles.title : styles.titlePage} pl-10 pr-10 text text_type_main-large`}>Детали ингредиента</h2>
      <img className={styles.image} alt={item?.name} src={item?.image_large}/>
      <p className={`${styles.ingredient_name} mt-4 mb-8 text text_type_main-medium`}>{item?.name}</p>
      <ul className={styles.food_value}>
        <li  className={styles.food_value_item}>
          <p className='text text_type_main-default'>Калории,ккал</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{item?.calories}</p>
        </li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Белки, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{item?.proteins}</p></li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Жиры, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{item?.fat}</p>
        </li>
        <li className={styles.food_value_item}>
          <p className='text text_type_main-default'>Углеводы, г</p>
          <p style={{textAlign: "center"}} className='text text_type_digits-default'>{item?.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};


export default IngredientDetails;