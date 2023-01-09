import React, { useState } from "react";
import styles from "./ingredients-list.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const IngredientsList = ({ ingredients, addSelectedBuns, setActive, setIngredientDetails }) => {
  const [selectedBun, setSelectedBun] = useState([]);
  const [topping, setTopping] = useState([]);

  // счетчик ингредиентов, меняет значение счетчика ис охраняет в стейт ID ингредиента
  const counter = (ing) => {
    ingredients.forEach((element) => {
      if (element["_id"] === ing._id && ing.type !== "bun") {
        element["__v"] += 1;
      } else {
        element["__v"] = 1;
      }
    });

    if (ing.type === "bun") {
      addSelectedBuns(ing._id);
      if (selectedBun.includes(ing._id)) {
        setSelectedBun(selectedBun.filter((e) => e !== ing._id));
      } else {
        setSelectedBun([ing._id]);
      }
    }

    if (ing.type !== "bun") {
      setTopping([...topping, ing._id]);
    }
  };
  const handleModalIngredientDetails = (ing) => {
    setIngredientDetails(ing);
    setActive(true);
  };

  return (
    <ul className={styles.list + " " + "ml-4 mr-4"}>
      {ingredients.map((ing) => (
        <li onClick={() => handleModalIngredientDetails(ing)} key={ing._id} className={styles.list_item + " " + "mt-6"}>
          {(selectedBun.includes(ing._id) || topping.includes(ing._id)) && (
            <div className={styles.counter}>
              <Counter count={ingredients.find((obj) => obj["_id"] === ing._id)["__v"]} size="default" extraClass="m-1" />
            </div>
          )}
          <img onClick={() => counter(ing)} className={styles.image + " " + "ml-4 mr-4"} alt={ing.type} src={ing.image} />
          <div className={styles.description + " " + "mt-1"}>
            <div className={styles.price}>
              <p className="mr-1 text text_type_digits-default">{ing.price}</p>
              <CurrencyIcon type="primary" />
            </div>
            <h3 className={styles.item_name + " " + "text text_type_main-small mt-2"}>{ing.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.array,
  setIngredientDetails: PropTypes.func,
  setActive: PropTypes.func,
  addSelectedBuns: PropTypes.func,
  addSelectedTopping: PropTypes.func,
}

export default IngredientsList;
