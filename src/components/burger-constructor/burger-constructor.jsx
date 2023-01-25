import React, { useEffect, useState, useContext  } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext, OrderDataContext} from "../services/app-context";
import PropTypes, {element} from "prop-types";
import { v4 as uuidv4 } from 'uuid';

const BurgerConstructor = ({ openPopup}) => {
  const {data, setData} = useContext(IngredientsDataContext)
  const {setOrderData} = useContext(OrderDataContext)
  const [orderPrice, setOrderPrice] = useState(null);
  // const [ingredientList, setIngredientList] = useState([]);

  const post = () => {
    console.log(uuidv4())
    const ingredient =[]
     data.selectedIngredients.topping.forEach((ing) => {ingredient.push(ing._id) })
    if (data.selectedIngredients.bun) {
      ingredient.push(data.selectedIngredients.bun._id)
    }
    console.log(ingredient)
      fetch('https://norma.nomoreparties.space/api/orders',
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'ingredients': ingredient})
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(res => {
          setOrderData(res)
          openPopup(true)
        })
        .catch((e) => {
          console.log(e);
        });
  }

  useEffect(() => {
    // setIngredientList([data.selectedIngredients.topping])
    // ingredientList.forEach((ing) => {ing.id = uuidv4()})
    data.selectedIngredients.topping.forEach((ing) => {ing.id = uuidv4()})
    setOrderPrice(data.selectedIngredients.topping.reduce((prev, next) => prev + next.price, 0) + (data.selectedIngredients.bun?.price * 2 || 0));
    console.log(data.selectedIngredients.topping)
  }, [data.selectedIngredients]);

  const removeIngredient = (ing) => {
    setData({ ...data, selectedIngredients: {...data.selectedIngredients, topping: [...data.selectedIngredients.topping.filter(i => i.id !== ing.id)]} })
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
        { data.selectedIngredients.topping.map((ing, index) => (
          <li key={uuidv4()} className={styles.list_item + " " + "mb-4"}>
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
          <Button onClick={() =>   post()} htmlType="button" type="primary" size="large">
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
