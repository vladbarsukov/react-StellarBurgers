import React, {FC} from "react";
import styles from "../ingredients-list/ingredients-list.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import {
  MODAL_OPEN
} from "../../services/actions/IngredientDetails";
import {useNavigate} from "react-router-dom";
import {TIngredient} from "../../services/types/Data";
import {useDispatch} from "../../services/hooks";

type TIngredientsItemProps = {
  ing: TIngredient
}
const IngredientsItem: FC<TIngredientsItemProps> = ({ing}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ing",
    item: ing,
  });

  const addIngredientDetails = () => {
    navigate(`/ingredients/${ing._id}`)
    dispatch({
      type: MODAL_OPEN,
    })
  };

  return (
    <li
      ref={dragRef}
      key={ing._id}
      className={`${styles.list_item} mt-6`}
    >
      <div className={styles.counter}>
        {ing["__v"]
          ? <Counter count={Number(ing["__v"])} size="default" extraClass="m-1" />
            : null}
      </div>
      <img
        onClick={() => addIngredientDetails()}
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