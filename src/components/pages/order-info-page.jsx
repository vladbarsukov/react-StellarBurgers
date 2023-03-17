import React from 'react';
import style from "./order-info-page.module.css"
import OrderInfo from "../order-info/order-info";
const OrderInfoPage = ({orders, type}) => {
  return (
    <div className={`${style.container} mt-30`}>
      <OrderInfo orders={orders} type={type}/>
    </div>
  );
};

export default OrderInfoPage;