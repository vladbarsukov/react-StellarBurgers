import React, { useRef } from 'react';
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import { useDrag,useDrop } from "react-dnd";

const ConstructorItem = ({ing, index, toppingsList}) => {
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef]   = useDrag({
    type: "constructorIngredient",
    item: {index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: 'constructorIngredient',
    hover: (item, monitor) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
      toppingsList(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const ref = useRef(null)
  const dragDropRef = dragRef(dropRef(ref))
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
    <li ref={dragDropRef} className={`${styles.list_item} mb-4`}>
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