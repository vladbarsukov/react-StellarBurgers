import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import {BASE_URL} from "../../utils/constants";
import {request} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import {pushData} from "../../services/actions/Order";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, selectedItems, orderPrice} = useSelector(
    state => state.ingredientsConstructor
  );

  const { items } = useSelector(
    state => state.ingredients
  );



  const post = () => {
    const ingredient =[]
    selectedItems.forEach((ing) => {ingredient.push(ing._id) })
    if (bun) {
      ingredient.push(bun._id)
    }
    request(`${BASE_URL}/orders`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'ingredients': ingredient})
      })
      .then(res => {
        dispatch({
          type: "ADD_ORDER",
          order: res
        })
      })

      .catch((e) => {
        console.log(e);
      });

    // dispatch(pushData(ingredient));
    dispatch({
      type: "OPEN_ORDER_MODAL",
    })
  }

  useEffect(() => {
    dispatch({
      type: "CALCULATE_PRICE",
      orderPrice: selectedItems.reduce((prev, next) => prev + next.price, 0) + (bun?.price * 2 || 0)
    }, );
  }, [selectedItems, bun, dispatch]);

  const removeIngredient = (ing) => {
    items.find(item => item._id === ing._id)["__v"] -= 1
    dispatch({
      type: "REMOVE_ITEMS_IN_CONSTRUCTOR",
      selectedItems: [ing]
    }, );
  }

  return (
    <div className={`${styles.main} mt-25 ml-10`}>
      <div className={`mb-4 ml-6 ${styles.bun}`}>
        {bun ?
          <ConstructorElement type="top" isLocked={true} text={`${bun?.name} (верх)`} price={bun?.price} thumbnail={bun?.image} />
          : null }
      </div>

      <ul className={`${styles.list} mb-4`}>

        { selectedItems.map((ing, index) => (
          <li key={index} className={`${styles.list_item} mb-4`}>
            <div className={"mr-1"}>
              <DragIcon type={"primary"} />
            </div>
            <ConstructorElement handleClose={() => removeIngredient(ing)} text={ing.name} price={ing.price} thumbnail={ing.image} />
          </li>
        ))}
      </ul>

      <div className={`mb-4 ml-6 ${styles.bun}`}>
        {bun ?
          <ConstructorElement type="bottom" isLocked={true} text={`${bun?.name} (низ)`} price={bun?.price} thumbnail={bun?.image} />
          : null }
      </div>

      <div className={`mt-6 ${styles.orderPrice}`}>
        <div className={`mr-10 ${styles.price}`}>
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
