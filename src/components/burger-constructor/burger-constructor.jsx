import React, {useEffect, useCallback, useMemo} from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {pushData} from "../../services/actions/BurgerConstructor";
import {useDrop} from "react-dnd";
import ConstructorItem from "../constructor-item/constructor-item";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const { selectedBun, selectedToppings, orderPrice} = useSelector(
    state => state.ingredientsConstructor
  );
  const [, dropTarget] = useDrop({
    accept: "ing",
    drop(item) {
      addIngredientToConstructor(item)
    },
  });

  const moveToppingItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = selectedToppings[dragIndex]
      const hoverItem = selectedToppings[hoverIndex]
      const updatedList = () => {
        const list = [...selectedToppings]
        list[dragIndex] = hoverItem
        list[hoverIndex] = dragItem
        return list
      }
      dispatch({
        type: "SWAP_ITEM",
        updatedList: updatedList()
      });
    },
    [selectedToppings, dispatch],
  )

  const addIngredientToConstructor = (ing) => {
    dispatch({
      type: "INCREASE_ITEM",
      _id: ing._id,
      ingType: ing.type,
    }, );
    dispatch({
      type: "ADD_ITEMS_TO_CONSTRUCTOR",
      selectedIngredients: ing,
    });
  };
  const priceCalculator = useMemo(() => (topping, bun) => {
    return  topping?.reduce((prev, next) => prev + next.price, 0) + (bun?.price * 2 || 0)
  },[])

  const post = () => {
    const ingredients =[]
    selectedToppings.forEach((ing) => {ingredients.push(ing._id) })
    if (selectedBun) {
      ingredients.push(selectedBun._id)
    }
    dispatch(pushData(ingredients));
  }

  useEffect(() => {
    dispatch({
      type: "CALCULATE_PRICE",
      orderPrice: priceCalculator(selectedToppings, selectedBun)
    }, );
  }, [selectedToppings, selectedBun, dispatch, priceCalculator]);

  return (
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
