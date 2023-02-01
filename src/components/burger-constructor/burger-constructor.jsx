import React, {useEffect, useMemo} from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  CLOSE_ORDER_MODAL,
  pushData,
  SWAP_ITEM
} from "../../services/actions/BurgerConstructor";
import {useDrop} from "react-dnd";
import ConstructorItem from "../constructor-item/constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {getItems, INCREASE_ITEM} from "../../services/actions/BurgerIngredients";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  const { selectedBun, selectedToppings, orderDetails} = useSelector(
    state => state.ingredientsConstructor
  );
  const [, dropTarget] = useDrop({
    accept: "ing",
    drop(item) {
      addIngredientToConstructor(item)
    },
  });

  const closeOrderPopup = () => {
    dispatch({
      type: CLOSE_ORDER_MODAL,
    })
  }

  const moveToppingItem = (dragIndex, hoverIndex) => {
    dispatch({
      type: SWAP_ITEM,
      index: {dragIndex, hoverIndex}
    });
  }

  const addIngredientToConstructor = (ing) => {
    dispatch({
      type: INCREASE_ITEM,
      _id: ing._id,
      ingType: ing.type,
    }, );
    dispatch({
      type: ADD_ITEMS_TO_CONSTRUCTOR,
      selectedIngredients: ing,
    });
  };
  const priceCalculator = useMemo(() => (topping, bun) => {
    return  topping?.reduce((prev, next) => prev + next.price, 0) + (bun?.price * 2 || 0)
  },[])

  const post = () => {
    const ingredients = selectedToppings.reduce((acc, ing) => {
      acc.push(ing._id);
      return acc;
    }, []);
    if (selectedBun) {
      ingredients.push(selectedBun._id);
    }
    dispatch(pushData(ingredients));
  };

  return (
    <div>
      <div ref={dropTarget} className={`${styles.main} mt-25 ml-10`}>
        <div className={`mb-4 ml-6 ${styles.bun}`}>
          {selectedBun ?
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectedBun?.name} (верх)`} price={selectedBun?.price}
              thumbnail={selectedBun?.image}
            />
            : null }
        </div>

        <ul  className={`${styles.list} mb-4`}>
          { selectedToppings.map((ing, index) => (
            <ConstructorItem moveToppingItem={moveToppingItem} index={index} key={index} ing={ing}/>
          ))}
        </ul>

        <div className={`mb-4 ml-6 ${styles.bun}`}>
          {selectedBun ?
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun?.name} (низ)`}
              price={selectedBun?.price}
              thumbnail={selectedBun?.image}
            />
            : null }
        </div>

        <div className={`mt-6 ${styles.orderPrice}`}>
          <div className={`mr-10 ${styles.price}`}>
            <p className={"text text_type_digits-medium mr-2"}>{priceCalculator(selectedToppings, selectedBun)}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div className={"mr-10"}>
            <Button onClick={() =>   post()} htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>

        </div>
      </div>
      {(orderDetails !== null) ? (
        <Modal closePopup={closeOrderPopup}>
          <OrderDetails />
        </Modal>
      ) : null}
    </div>
  );
};

export default BurgerConstructor;
