import React, {FC} from 'react';
import style from "./orders-board.module.css";
import {useSelector} from "../../services/hooks";
import {TOrder} from "../../services/types/Data";
type TOrdersBoardProps = {}
const OrdersBoard: FC<TOrdersBoardProps> = () => {
  const { orders } = useSelector(
    state => state.wsReducer
  );
  const findIngredientsStatus = (array: Array<TOrder> , status: 'done' | 'pending'): Array<TOrder> => {
    return  array.filter(item => item.status === status);
  }


  return (
    <div className={`${style.container}`}>
      <div className={`${style.column} mr-9`}>
        <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
        <ul  className={style.list}>
          {orders ? findIngredientsStatus(orders.orders, 'done').map((order: TOrder)=>(
            <p key={order._id} className={`text text_type_digits-default mb-2`}>{order.number}</p>
          )): (<></>)}
        </ul>
      </div>
      <div className={style.column}>
        <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
        <ul  className={style.list}>
          {orders ? findIngredientsStatus(orders.orders, 'pending').map((order: TOrder)=>(
            <p key={order._id} className={`text text_type_digits-default mb-2`}>{order.number}</p>
          )): (<></>)}
        </ul>
      </div>
    </div>
  );
};

export default OrdersBoard;