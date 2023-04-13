import React, {FC, useEffect} from 'react';
import style from "./order-info-page.module.css"
import OrderInfo from "../order-info/order-info";
import {TOrdersRequest} from "../../services/types/Data";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_CONNECTION_START
} from "../../services/actions/wsActions";
import {useDispatch} from "../../services/hooks";

type TOrderInfoPage = {
    orders: TOrdersRequest | null;
    type: string;
}
const OrderInfoPage: FC<TOrderInfoPage> = ({orders, type}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === "profileOrder") {
            dispatch({ type: WS_USER_CONNECTION_START});
            return () => {
                dispatch({ type: WS_USER_CONNECTION_CLOSED});
            }
        }
        if (type === "allOrders") {
            dispatch({ type: WS_CONNECTION_START});
            return () => {
                dispatch({ type: WS_CONNECTION_CLOSED});
            }
        }
    }, [dispatch, type]);
  return (
    <div className={`${style.container} mt-30`}>
        {orders? <OrderInfo orders={orders} type={type}/>: <></>}
      {/*<OrderInfo orders={orders} type={type}/>*/}
    </div>
  );
};

export default OrderInfoPage;