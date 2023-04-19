import React, {FC, useMemo} from 'react';
import {useParams} from "react-router-dom";
import style from './order-info.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {findIngredient, orderPriceCalculator} from "../../utils/find-ingredients-utils";
import OrderInfoIngredientItem from "../order-info-ingredient-item/order-info-ingredient-item";
import {TOrder, TOrdersRequest} from "../../services/types/Data";
import {useSelector} from "../../services/hooks";

type TOrderInfoProps = {
  orders: TOrdersRequest;
  type: string;
}

const OrderInfo: FC<TOrderInfoProps> = ({orders, type})=> {
  const { id  } = useParams();
  const { items } = useSelector(
    state => state.ingredients
  );
  const status = (status: string): string => {
    switch (status) {
      case "created" :
        return "Создан";
      case "pending" :
        return "Готовится";
      case "done" :
        return "Выполнен";
      default :
        return "Статус не определен";
    }
  }
  const currentOrder: TOrder | undefined = useMemo(() => {

    return orders.orders?.find((item: TOrder):boolean => item.number === Number(id));
  }, [id, orders.orders]);

  const counts: { [id: string]: number; } = useMemo(() => {
    const counts: { [id: string]: number; } = {};
    currentOrder?.ingredients.forEach((el: string): void => {
      counts[el] = (counts[el] || 0) + 1;
    });
    return counts;
  }, [currentOrder]);

  const unique: Array<string> | undefined = useMemo(() => {
    return currentOrder?.ingredients.filter((el: string): boolean => counts[el] === 1);
  }, [counts, currentOrder]);

  const duplicates: Array<{value: string, count: number}> = useMemo(() => {
    return Object.keys(counts).filter((el: string): boolean => counts[el] > 1).map((el: string): {value: string, count: number} => ({value: el, count: counts[el]}));
  }, [counts]);

  return (
  orders && items && currentOrder ?
    <div className={`${style.container} pt-10 pb-10 pr-10 pl-10`}>
     <p className={`${type ? style.orderNumber : ""} text text_type_digits-default`}>{`#${currentOrder.number}`}</p>
      <h2 className={`${style.orderName} text text_type_main-medium mt-10`}>{currentOrder.name}</h2>
      <p className={`text text_type_main-small mt-3`}>{status(currentOrder.status)}</p>
      <h2 className={`text text_type_main-medium mt-15`}>Состав:</h2>
      <ul className={`${style.ingredientList} mt-6`}>
        {duplicates.map((ing) => {
          let ingredient = findIngredient(ing.value, items);
          return <OrderInfoIngredientItem key={ing.value} ingredient={ingredient} count={ing.count} />;
        })}
        {unique?.map((ing: any) => {
          let ingredient = findIngredient(ing, items);
          return <OrderInfoIngredientItem key={ing} ingredient={ingredient} count={1} />;
        })}
      </ul>
      <div className={`${style.orderTimeContainer} mt-10`}>
        <p className="text text_type_main-small text_color_inactive" >{currentOrder?.createdAt.substring(0, 19)}</p>
        <div className={`${style.priceContainer}`}>
          <p className="text text_type_digits-default mr-2">{orderPriceCalculator(currentOrder?.ingredients, items)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
   :
    <></>
  )
};

export default OrderInfo;