import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import style from './order-info.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {findIngredient, orderPriceCalculator} from "../../utils/find-ingredients-utils";
import OrderInfoIngredientItem from "../order-info-ingredient-item/order-info-ingredient-item";


const OrderInfo = () => {
  const { id } = useParams();
  const { orders } = useSelector(
    state => state.wsReducer
  );
  const { items } = useSelector(
    state => state.ingredients
  );

  const currentOrder = useMemo(() => {
    return orders.orders?.find(item => item._id === id);
  }, [id, orders.orders]);

  const counts = useMemo(() => {
    const counts = {};
    currentOrder?.ingredients.forEach((el) => {
      counts[el] = (counts[el] || 0) + 1;
    });
    return counts;
  }, [currentOrder]);

  const unique = useMemo(() => {
    return currentOrder?.ingredients.filter((el) => counts[el] === 1);
  }, [counts, currentOrder]);

  const duplicates = useMemo(() => {
    return Object.keys(counts).filter((el) => counts[el] > 1).map((el) => ({value: el, count: counts[el]}));
  }, [counts]);

  return (
  orders.orders && items ?
    <div className={`${style.container} mt-30`}>
     <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${currentOrder.number}`}</p>
      <h2 className={`${style.orderName} text text_type_main-medium mt-10`}>{currentOrder.name}</h2>
      <p className={`text text_type_main-small mt-3`}>{currentOrder.status}</p>
      <h2 className={`text text_type_main-medium mt-15`}>Состав:</h2>
      <ul className={`${style.ingredientList} mt-6`}>
        {duplicates.map((ing) => {
          let ingredient = findIngredient(ing.value, items);
          return <OrderInfoIngredientItem key={ing.value} ingredient={ingredient} count={ing.count} />;
        })}
        {unique.map((ing) => {
          let ingredient = findIngredient(ing, items);
          return <OrderInfoIngredientItem key={ing} ingredient={ingredient} count={1} />;
        })}
      </ul>
      <div className={`${style.orderTimeContainer} mt-10`}>
        <p className="text text_type_main-small text_color_inactive" >{currentOrder.createdAt.substring(0, 19)}</p>
        <div className={`${style.priceContainer}`}>
          <p className="text text_type_digits-default mr-2">{orderPriceCalculator(currentOrder.ingredients, items)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
   :
    <></>
  )
};

export default OrderInfo;