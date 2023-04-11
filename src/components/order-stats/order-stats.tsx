import React, {FC} from 'react';
import style from "./order-stats.module.css";
import OrdersBoard from "../orders-board/orders-board";
import {useSelector} from "../../services/hooks";
type TOrderStatsProps = {}
const OrderStats: FC<TOrderStatsProps> = () => {
  const { orders } = useSelector(
    state => state.wsReducer
  );
    return ( orders ?
        <div className={style.container}>
            <OrdersBoard/>
            <h3 className={`text text_type_main-medium mt-15`}>Выполнено за все время:</h3>
            <p className={`${style.completedOrderText} text text_type_digits-large`}>{orders?.total}</p>
            <h3 className={`text text_type_main-medium mt-15`}>Выполнено за сегодня:</h3>
            <p className={`${style.completedOrderText} text text_type_digits-large`}>{orders?.totalToday}</p>
        </div> : <></>
    );
};

export default OrderStats;