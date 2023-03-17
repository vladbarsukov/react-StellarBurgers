import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import OrderCard from "../order-card/order-card";
import style from './Orders.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import {OPEN_USER_ORDERS_MODAL} from "../../services/actions/wsActions";


const Orders = () => {
  const dispatch = useDispatch();
  const { UserOrders } = useSelector(
    state => state.wsReducer
  );
  const navigate = useNavigate()
  const onClick = (number) => {
    navigate(`/profile/orders/${number}`)
    dispatch({ type: OPEN_USER_ORDERS_MODAL });
  }
  return (
    <>
    <div className={style.container}>
      {UserOrders.orders ? UserOrders.orders.reverse().map((order)=>(
        <OrderCard onClick={onClick}  key={order._id} order={order}/>
      )): (<></>)}

    </div>
      <Outlet/>
    </>
  );
};

export default Orders;