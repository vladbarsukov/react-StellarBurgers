import React, { useEffect, useState, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const BurgerConstructor = ({ openPopup, ingredientDetails}) => {
  const [ingredients, setIngredients] = useState({ bun: null, topping: [] });
  const [orderPrice, setOrderPrice] = useState(null);

  const filteredIngredients = useMemo(() => ingredientDetails.filter(ingredient => ingredient.type === "sauce" || ingredient.type === "main"), [ingredientDetails])

  useEffect(() => {
    setIngredients({ bun: ingredientDetails[0], topping: filteredIngredients });
  }, [filteredIngredients]);

  useEffect(() => {
    setOrderPrice(ingredients.topping.reduce((prev, next) => prev + next.price, 0) + (ingredients.bun?.price || 0));
  }, [ingredients]);

  const removeIngredient = (ing) => {
    setIngredients({...ingredients, topping: ingredients.topping.filter(i => i._id !== ing._id) })
  }

  return (
    <div className={styles.main + " " + "mt-25 ml-10"}>
      <div className={"mb-4 ml-6"}>
        <ConstructorElement type="top" isLocked={true} text={ingredients.bun?.name + " " + "(верх)"} price={ingredients.bun?.price} thumbnail={ingredients.bun?.image} />
      </div>

      <ul className={styles.list + " " + "mb-4"}>
        {ingredients.topping.map((ing) => (
          <li key={ing._id} className={styles.list_item + " " + "mb-4"}>
            <div className={"mr-1"}>
              <DragIcon type={"primary"} />
            </div>
            <ConstructorElement handleClose={() => removeIngredient(ing)} text={ing.name} price={ing.price} thumbnail={ing.image} />
          </li>
        ))}
      </ul>

      <div className={"mb-4 ml-6"}>
        <ConstructorElement type="bottom" isLocked={true} text={ingredients.bun?.name + " " + "(низ)"} price={ingredients.bun?.price} thumbnail={ingredients.bun?.image} />
      </div>

      <div className={"mt-6" + " " + styles.orderPrice}>
        <div className={"mr-10" + " " + styles.price}>
          <p className={"text text_type_digits-medium mr-2"}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div>
          <Button onClick={() => openPopup(true)} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredientDetails: PropTypes.array.isRequired,
  openPopup: PropTypes.func,
}

export default BurgerConstructor;
