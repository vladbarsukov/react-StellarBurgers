import React, {useEffect} from 'react';
import style from "./feed.module.css";
import OrderCard from "../order-card/order-card";
import OrderStats from "../order-stats/order-stats";
import {useSelector} from "react-redux";


const Feed = () => {

  const { orders } = useSelector(
    state => state.wsReducer
  );

  // useEffect(()=>{
  //   console.log(orders)
  // },[orders])
  return (
    <div className={style.container}>
      <h2 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h2>
      <div className={style.main}>
        <div className={style.feed}>
          {orders.orders ? orders.orders.map((order)=>(
            <OrderCard  key={order._id} order={order}/>
          )): (<></>)}
        </div>
        <div className={`ml-15`}>
          <OrderStats/>
        </div>
      </div>

    </div>
  );
};

export default Feed;