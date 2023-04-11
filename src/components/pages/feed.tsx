import React, {FC, useEffect} from 'react';
import style from "./feed.module.css";
import OrderCard from "../order-card/order-card";
import OrderStats from "../order-stats/order-stats";
// import {useDispatch, useSelector} from "react-redux";
import {NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {
  OPEN_ORDERS_MODAL, WS_CONNECTION_CLOSED, WS_CONNECTION_START,
} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../services/hooks";

type TFeedProps = {}
const Feed: FC<TFeedProps> = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(
    state => state.wsReducer
  );
  const navigate: NavigateFunction = useNavigate()
  const onClick = (number: number):void => {
    navigate(`/feed/${number}`)
    dispatch({ type: OPEN_ORDERS_MODAL });
  }
  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
      return (): void => {
        dispatch({ type: WS_CONNECTION_CLOSED});
      }
    },
    [dispatch]
  );


  return (
    <div className={style.container}>
      <h2 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h2>
      <div className={style.main}>
        <div className={style.feed}>
          {orders ? orders.orders.map((order)=>(
            <OrderCard onClick={onClick}  key={order._id} order={order}/>
          )): (<></>)}
        </div>
        <div className={`ml-15`}>
          <OrderStats/>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Feed;