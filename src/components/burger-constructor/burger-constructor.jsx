import React, { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
const BurgerConstructor = ({ setActive, ingredientDetails = [] }) => {
  const [orderPrice, setOrderPrice] = useState(null);
  const [topping, setTopping] = useState([]);
  const [bun, setBun] = useState(null);

  useEffect(() => {
    setBun(ingredientDetails[0]);
    setTopping(ingredientDetails.filter((x) => x.type === "sauce" || x.type === "main"));
  }, [ingredientDetails]);

  useEffect(() => {
    setOrderPrice(String(topping.reduce((prev, next) => prev + next.price, 0) + bun?.price));
  }, [topping, bun]);

  const removeIngredient = (ing) => {
    setTopping(topping.filter(i => i._id !== ing._id))
  }

  return (
    <div className={styles.main + " " + "mt-25 ml-1"}>
      <div className={"mb-4 ml-6"}>
        <ConstructorElement type="top" isLocked={true} text={bun?.name + " " + "(верх)"} price={bun?.price} thumbnail={bun?.image} />
      </div>

      <ul className={styles.list + " " + "mb-4"}>
        {topping.map((ing) => (
          <li key={ing._id} className={styles.list_item + " " + "mb-4"}>
            <div className={"pr-1"}>
              <DragIcon type={"primary"} />
            </div>
            <ConstructorElement handleClose={() => removeIngredient(ing)} text={ing.name} price={ing.price} thumbnail={ing.image} />
          </li>
        ))}
      </ul>

      <div className={"mb-4 ml-6"}>
        <ConstructorElement type="bottom" isLocked={true} text={ingredientDetails[0]?.name + " " + "(низ)"} price={bun?.price} thumbnail={ingredientDetails[0]?.image} />
      </div>

      <div className={"mt-6" + " " + styles.orderPrice}>
        <div className={"mr-10" + " " + styles.price}>
          <p className={"text text_type_digits-medium mr-2"}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => setActive(true)} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredientDetails: PropTypes.array,
  setActive: PropTypes.func,
}

export default BurgerConstructor;
