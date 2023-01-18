import React, { useEffect, useState, useContext  } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext} from "../services/app-context";
import PropTypes from "prop-types";
const BurgerConstructor = ({ openPopup}) => {
  const {data, setData} = useContext(IngredientsDataContext)
  const [orderPrice, setOrderPrice] = useState(null);

  useEffect(() => {
    setOrderPrice(data.selectedIngredients.topping.reduce((prev, next) => prev + next.price, 0) + (data.selectedIngredients.bun?.price || 0));
  }, [data]);

  const removeIngredient = (ing) => {
    setData({ ...data, selectedIngredients: {...data.selectedIngredients, topping: [...data.selectedIngredients.topping.filter(i => i._id !== ing._id)]} })
    ing["__v"] -= 1
  }

  return (
    <div className={styles.main + " " + "mt-25 ml-10"}>
      <div className={"mb-4 ml-6" + ' ' + styles.bun}>
        {data.selectedIngredients.bun ?
          <ConstructorElement type="top" isLocked={true} text={data.selectedIngredients.bun?.name + " " + "(верх)"} price={data.selectedIngredients.bun?.price} thumbnail={data.selectedIngredients.bun?.image} />
          : null }
      </div>

      <ul className={styles.list + " " + "mb-4"}>
        {data.selectedIngredients.topping.map((ing) => (
          <li key={ing._id} className={styles.list_item + " " + "mb-4"}>
            <div className={"mr-1"}>
              <DragIcon type={"primary"} />
            </div>
            <ConstructorElement handleClose={() => removeIngredient(ing)} text={ing.name} price={ing.price} thumbnail={ing.image} />
          </li>
        ))}
      </ul>

      <div className={"mb-4 ml-6" + ' ' + styles.bun}>
        {data.selectedIngredients.bun ?
          <ConstructorElement type="top" isLocked={true} text={data.selectedIngredients.bun?.name + " " + "(верх)"} price={data.selectedIngredients.bun?.price} thumbnail={data.selectedIngredients.bun?.image} />
          : null }
      </div>

      <div className={"mt-6" + " " + styles.orderPrice}>
        <div className={"mr-10" + " " + styles.price}>
          <p className={"text text_type_digits-medium mr-2"}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={"mr-10"}>
          <Button onClick={() => openPopup(true)} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>

      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  openPopup: PropTypes.func,
}

export default BurgerConstructor;
