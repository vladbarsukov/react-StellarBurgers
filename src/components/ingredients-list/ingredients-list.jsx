import React, {useState, useContext, useEffect} from "react";
import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext} from "../services/app-context";
import styles from "./ingredients-list.module.css";


const IngredientsList = ({ ingredients, openPopup, setIngredientDetails }) => {
  const {data, setData} = useContext(IngredientsDataContext)

    const counter = (ing) => {
      const ingredient = ingredients.find((obj) => obj["_id"] === ing._id);
        if (ing.type === "bun") {
          setData({ ...data, selectedIngredients: {...data.selectedIngredients, bun: ing} })
          ingredient["__v"] = 1
          ingredients.filter(i => i["_id"] !== ing["_id"]).map((ing) => ing["__v"] = 0)
        } else {
          setData({ ...data, selectedIngredients: {...data.selectedIngredients, topping: [...data.selectedIngredients.topping, ing]} })
          ingredient["__v"] += 1
        }

    };

  const handleModalIngredientDetails = (ing) => {
    setIngredientDetails(ing);
    openPopup(true);
  };

  return (
    <ul className={`${styles.list} ml-4 mr-4`}>
      {ingredients.map((ing) => (
        <li onClick={() => handleModalIngredientDetails(ing)} key={ing._id} className={`${styles.list_item} mt-6`}>
          <div className={styles.counter}>
            {ing["__v"]  ? <Counter count={ingredients.find((obj) => obj["_id"] === ing._id)["__v"]} size="default" extraClass="m-1" /> : null}

          </div>
          <img onClick={() => counter(ing)} className={`${styles.image} ml-4 mr-4`} alt={ing.type} src={ing.image} />
          <div className={`${styles.description} mt-1`}>
            <div className={styles.price}>
              <p className="mr-1 text text_type_digits-default">{ing.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <h3 className={`${styles.item_name} text text_type_main-small mt-2`}>{ing.name}</h3>
          </div>
        </li>
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

