import React from 'react';
import {useSelector} from "react-redux";
import OrderCard from "../order-card/order-card";
import style from './Orders.module.css'

const Orders = () => {
  const { UserOrders } = useSelector(
    state => state.wsReducer
  );
  return (
    <div className={style.container}>
      {UserOrders.orders ? UserOrders.orders.map((order)=>(
        <OrderCard  key={order._id} order={order}/>
      )): (<></>)}
    </div>
  );
};

export default Orders;