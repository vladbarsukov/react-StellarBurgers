
import React, {useState, useContext, useEffect} from "react";
import styles from "../ingredients-list/ingredients-list.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext} from "../../services/app-context";
import { useDispatch, useSelector } from 'react-redux';
import {INCREASE_ITEM} from "../../services/actions/BurgerIngredients";
import {ADD_ITEMS_TO_CONSTRUCTOR} from "../../services/actions/BurgerConstructor";
import {ADD_INGREDIENT_DETAILS} from "../../services/actions/IngredientDetails";

const IngredientsItem = ({ing, openPopup, setIngredientDetails}) => {
  const dispatch = useDispatch();

  const {data, setData} = useContext(IngredientsDataContext)
  const handleModalIngredientDetails = (ing) => {
    setIngredientDetails(ing);
    openPopup(true);
  };

  const increase = () => {
    dispatch({
      type: ADD_INGREDIENT_DETAILS,
      item: ing,
    });
    dispatch({
      type: "INCREASE_ITEM",
      _id: ing._id,
      ingType: ing.type,
    }, );
    dispatch({
        type: "ADD_ITEMS_TO_CONSTRUCTOR",
        selectedItems: [ing],
    });
  };

  return (
    <li onClick={() => handleModalIngredientDetails(ing)} key={ing._id} className={`${styles.list_item} mt-6`}>
      <div className={styles.counter}>
        {ing["__v"]  ? <Counter count={Number(ing["__v"])} size="default" extraClass="m-1" /> : null}
      </div>
      <img onClick={() => increase()} className={`${styles.image} ml-4 mr-4`} alt={ing.type} src={ing.image} />
      <div className={`${styles.description} mt-1`}>
        <div className={styles.price}>
          <p className="mr-1 text text_type_digits-default">{ing.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.item_name} text text_type_main-small mt-2`}>{ing.name}</h3>
      </div>
    </li>
  );
};

export default IngredientsItem;