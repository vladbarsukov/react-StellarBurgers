import React, { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const BurgerConstructor = ({ openPopup, ingredientDetails}) => {
  const [orderPrice, setOrderPrice] = useState(null);
  const [ingredients, setIngredients] = useState({
    bun: null,
    topping: [],
  })

  useEffect(() => {
    setIngredients({
      bun: ingredientDetails[0],
      topping: ingredientDetails.filter((x) => x.type === "sauce" || x.type === "main")
    })
  }, [ingredientDetails]);

  useEffect(() => {
    setOrderPrice(String(ingredients.topping.reduce((prev, next) => prev + next.price, 0) + ingredients.bun?.price));
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
        <Button onClick={() => openPopup(true)} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredientDetails: PropTypes.array.isRequired,
  openPopup: PropTypes.func,
}

export default BurgerConstructor;
