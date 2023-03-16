import React from 'react';
import {useSelector} from "react-redux";
import OrderCard from "../order-card/order-card";
import style from './Orders.module.css'
import {useNavigate} from "react-router-dom";

const Orders = () => {
  const { UserOrders } = useSelector(
    state => state.wsReducer
  );
  const navigate = useNavigate()
  const onClick = (number) => {
    navigate(`/profile/orders/${number}`)
  }
  return (
    <div className={style.container}>
      {UserOrders.orders ? UserOrders.orders.map((order)=>(
        <OrderCard onClick={onClick}  key={order._id} order={order}/>
      )): (<></>)}
    </div>
  );
};

export default Orders;