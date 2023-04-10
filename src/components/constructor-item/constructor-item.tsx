import React, {FC, useRef} from 'react';
import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {DECREASE_ITEM} from "../../services/actions/BurgerIngredients";
import {REMOVE_ITEMS_IN_CONSTRUCTOR} from "../../services/actions/BurgerConstructor";
import {TIngredient} from "../../services/types/Data";

type TConstructorItemProps = {
  ing: TIngredient;
  index: number;
  moveToppingItem: (dragIndex: number, hoverIndex: number) => void
}
const ConstructorItem: FC<TConstructorItemProps> = ({ing, index, moveToppingItem}) => {
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
    hover: (item: {index: number}, monitor: DropTargetMonitor) => {
      const dragIndex = item.index
      const hoverIndex = index
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      if (!hoverBoundingRect) return;
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return
      moveToppingItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const ref = useRef<HTMLLIElement>(null)
  const dragDropRef: any = dragRef(dropRef(ref))
  const removeIngredient = (ing: TIngredient) => {
    dispatch({
      type: DECREASE_ITEM,
      id: ing._id
    }, );
    dispatch({
      type: REMOVE_ITEMS_IN_CONSTRUCTOR,
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