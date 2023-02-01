import React from 'react';
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import { useDrag } from "react-dnd";

const ConstructorItem = ({ing, index}) => {
  const dispatch = useDispatch();
  const [, dragRef]   = useDrag({
    type: "constructorIngredient",
    item: {ing, index}
  });
  const removeIngredient = (ing) => {
    dispatch({
      type: "DECREASE_ITEM",
      id: ing._id
    }, );
    dispatch({
      type: "REMOVE_ITEMS_IN_CONSTRUCTOR",
      selectedToppings: [ing]
    }, );
  }
  return (
    <li ref={dragRef} className={`${styles.list_item} mb-4`}>
      <div className={"mr-1"}>
        <DragIcon type={"primary"} />
      </div>
      <ConstructorElement
        handleClose={() => removeIngredient(ing)}
        text={ing.name}
        price={ing.price}
        thumbnail={ing.image}
      />
    </li>
  );
};

export default ConstructorItem;