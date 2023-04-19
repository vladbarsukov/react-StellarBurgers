import React, {FC} from 'react';
import style from './order-info-ingredient-item.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
type TOrderInfoIngredientIteProps = {
    ingredient: any;
    count: any;
}

const OrderInfoIngredientItem:FC<TOrderInfoIngredientIteProps> = React.memo(({ ingredient, count }) => {
  return (
    <div className={`${style.orderIngredientsItemContainer} mb-4`}>
      <div className={`${style.orderIngredientsItem}`}>
        <img className={`${style.orderIngredientsImage}`} src={ingredient?.image_mobile} alt={ingredient?.type}/>
        <p className={`${style.orderIngredientsName} ml-4 text text_type_main-small`}>{ingredient.name}</p>
      </div>
      <div className={`${style.priceContainer} mr-6`}>
        <p className="text text_type_digits-default mr-2">{`${count} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
});

export default OrderInfoIngredientItem;