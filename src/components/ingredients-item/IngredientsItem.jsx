import React from "react";
import styles from "../ingredients-list/ingredients-list.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from 'react-redux';
import { useDrag } from "react-dnd";


const IngredientsItem = ({ing}) => {
  const dispatch = useDispatch();

  const [{isDrag}, dragRef] = useDrag({
    type: "ing",
    item: ing,
    // collect: monitor => ({
    //   isDrag: monitor.isDragging()
    // })
  });

  const handleModalIngredientDetails = () => {
    dispatch({
      type: "OPEN_BURGER_INGREDIENT_MODAL",
    })
  };

  const increase = () => {
    dispatch({
      type: "ADD_INGREDIENT_DETAILS",
      item: ing,
    });
  };

  return (
    <li
      ref={dragRef}
      onClick={() => handleModalIngredientDetails(ing)}
      key={ing._id}
      className={`${styles.list_item} mt-6`}
    >
      <div className={styles.counter}>
        {ing["__v"]
          ? <Counter count={Number(ing["__v"])} size="default" extraClass="m-1" />
          : null}
      </div>
      <img
        onClick={() => increase(ing)}
        className={`${styles.image} ml-4 mr-4`}
        alt={ing.type}
        src={ing.image} />
      <div className={`${styles.description} mt-1`}>
        <div className={styles.price}>
          <p className="mr-1 text text_type_digits-default">{ing.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.item_name} text text_type_main-small mt-2`}>
          {ing.name}
        </h3>
      </div>
    </li>
  );
};

export default IngredientsItem;