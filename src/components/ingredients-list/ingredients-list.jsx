import React, {useState, useContext, useEffect} from "react";
import PropTypes, {number} from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext} from "../../services/app-context";
import styles from "./ingredients-list.module.css";
import { useDispatch, useSelector } from 'react-redux';
import IngredientsItem from "../ingredients-item/IngredientsItem";


const IngredientsList = ({ ingredients, openPopup, setIngredientDetails }) => {
  const {data, setData} = useContext(IngredientsDataContext)

  return (
    <ul className={`${styles.list} ml-4 mr-4`}>
      {ingredients.map((ing) => (
       <IngredientsItem key={ing._id} ing={ing} openPopup={openPopup} setIngredientDetails={setIngredientDetails}/>
      ))}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  setIngredientDetails: PropTypes.func,
  openPopup: PropTypes.func,
}

export default IngredientsList;

