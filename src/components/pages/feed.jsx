import React from 'react';
import style from "./feed.module.css";
import OrderCard from "../order-card/order-card";


const Feed = () => {
  return (
    <div className={style.container}>
      <h2 className={"text text_type_main-large mt-10 mb-5"}>Лента заказов</h2>
      <div className={style.main}>
        <div className={style.feed}>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
          <OrderCard/>
        </div>
        <div></div>
      </div>

    </div>
  );
};

export default Feed;