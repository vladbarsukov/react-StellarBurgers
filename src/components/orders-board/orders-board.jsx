import React from 'react';
import style from "./orders-board.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const OrdersBoard = () => {
  const { orders } = useSelector(
    state => state.wsReducer
  );
  const findIngredientsStatus = (array , status) => {
    return  array.filter(item => item.status === status);
  }


  return (
    <div className={`${style.container}`}>
      <div className={`${style.column} mr-9`}>
        <h3 className={`text text_type_main-medium mb-6`}>Готовы:</h3>
        <ul  className={style.list}>
          {orders.orders ? findIngredientsStatus(orders.orders, 'done').map((order)=>(
            <p key={order._id} className={`text text_type_digits-default mb-2`}>{order.number}</p>
          )): (<></>)}
        </ul>
      </div>
      <div className={style.column}>
        <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
        <ul  className={style.list}>
          {orders.orders ? findIngredientsStatus(orders.orders, 'pending').map((order)=>(
            <p key={order._id} className={`text text_type_digits-default mb-2`}>{order.number}</p>
          )): (<></>)}
        </ul>
      </div>
    </div>
  );
};

export default OrdersBoard;