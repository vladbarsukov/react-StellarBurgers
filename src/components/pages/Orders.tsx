import React, {FC} from 'react';
import OrderCard from "../order-card/order-card";
import style from './Orders.module.css'
import {NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {OPEN_USER_ORDERS_MODAL} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../services/hooks";
import {TOrder} from "../../services/types/Data";

type TOrdersProps = {}
const Orders: FC<TOrdersProps> = () => {
  const dispatch = useDispatch();
  const { UserOrders } = useSelector
  (state => state.wsReducer);
  const navigate: NavigateFunction = useNavigate()

  const onClick = (number: number): void => {
    navigate(`/profile/orders/${number}`)
    dispatch({ type: OPEN_USER_ORDERS_MODAL });
  }


  return (
    <>
    <div className={style.container}>
      {UserOrders ? UserOrders.orders.sort((a:TOrder, b:TOrder) => b.number - a.number).map((order:TOrder)=>(
        <OrderCard onClick={onClick}  key={order._id} order={order}/>
      )): (<></>)}
    </div>
      <Outlet/>
    </>
  );
};

export default Orders;