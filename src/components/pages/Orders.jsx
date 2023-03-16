import React from 'react';
import {useSelector} from "react-redux";
import OrderCard from "../order-card/order-card";
import style from './Orders.module.css'

const Orders = () => {
  const { orders } = useSelector(
    state => state.wsReducer
  );
  return (
    <div className={style.container}>
      {orders.orders ? orders.orders.map((order)=>(
        <OrderCard  key={order._id} order={order}/>
      )): (<></>)}
    </div>
  );
};

export default Orders;