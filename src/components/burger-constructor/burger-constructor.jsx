import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {pushData} from "../../services/actions/BurgerConstructor";


const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { bun, selectedItems, orderPrice} = useSelector(
    state => state.ingredientsConstructor
  );

  const post = () => {
    const ingredient =[]
    selectedItems.forEach((ing) => {ingredient.push(ing._id) })
    if (bun) {
      ingredient.push(bun._id)
    }
    dispatch(pushData(ingredient));
  }

  useEffect(() => {
    dispatch({
      type: "CALCULATE_PRICE",
      orderPrice: selectedItems.reduce((prev, next) => prev + next.price, 0) + (bun?.price * 2 || 0)
    }, );
  }, [selectedItems, bun, dispatch]);

  const removeIngredient = (ing) => {
    dispatch({
      type: "DECREASE_ITEM",
      id: ing._id
    }, );
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
