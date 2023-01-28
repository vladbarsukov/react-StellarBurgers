import React, { useEffect, useState, useContext  } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsDataContext, OrderDataContext} from "../../services/app-context";
import PropTypes from "prop-types";
import {BASE_URL} from "../../utils/constants";
import {request} from "../../utils/api";
import {useDispatch, useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {pushData} from "../../services/actions/BurgerConstructor";
import {getItems} from "../../services/actions/BurgerIngredients";

const BurgerConstructor = ({ openPopup}) => {
  const {data, setData} = useContext(IngredientsDataContext)
  const {setOrderData} = useContext(OrderDataContext)
  const [orderPrice, setOrderPrice] = useState(null);
  const dispatch = useDispatch();

  const { bun, selectedItems } = useSelector(
    state => state.ingredientsConstructor
  );

  const { items } = useSelector(
    state => state.ingredients
  );



  const post = () => {
    const ingredient =[]
     data.selectedIngredients.topping.forEach((ing) => {ingredient.push(ing._id) })
    if (data.selectedIngredients.bun) {
      ingredient.push(data.selectedIngredients.bun._id)
    }
    // request(`${BASE_URL}/orders`,
    //   {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({'ingredients': ingredient})
    //   })
    //   .then(res => {
    //     setOrderData(res)
    //     openPopup(true)
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //
    dispatch(pushData(ingredient));

  }

  useEffect(() => {
    setOrderPrice(selectedItems.reduce((prev, next) => prev + next.price, 0) + (bun[0]?.price * 2 || 0));
  }, [selectedItems, bun]);

  const removeIngredient = (ing) => {
    items.find(item => item._id === ing._id)["__v"] -= 1
    dispatch({
      type: "REMOVE_ITEMS_IN_CONSTRUCTOR",
      selectedItems: [ing]
    }, );
  }

  return (
    <div className={styles.main + " " + "mt-25 ml-10"}>
      <div className={"mb-4 ml-6" + ' ' + styles.bun}>
        {bun[0] ?
          <ConstructorElement type="top" isLocked={true} text={bun[0]?.name + " " + "(верх)"} price={bun[0]?.price} thumbnail={bun[0]?.image} />
          : null }
      </div>

      <ul className={styles.list + " " + "mb-4"}>

        { selectedItems.map((ing, index) => (
          <li key={index} className={styles.list_item + " " + "mb-4"}>
            <div className={"mr-1"}>
              <DragIcon type={"primary"} />
            </div>
            <ConstructorElement handleClose={() => removeIngredient(ing)} text={ing.name} price={ing.price} thumbnail={ing.image} />
          </li>
        ))}
      </ul>

      <div className={"mb-4 ml-6" + ' ' + styles.bun}>
        {bun[0] ?
          <ConstructorElement type="bottom" isLocked={true} text={bun[0]?.name + " " + "(низ)"} price={bun[0]?.price} thumbnail={bun[0]?.image} />
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
