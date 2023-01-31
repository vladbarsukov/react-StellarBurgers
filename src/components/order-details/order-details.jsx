import React from 'react';
import styles from './order-details.module.css';
import img from '../../images/graphics.svg';
import {useSelector} from "react-redux";

const OrderDetails = () => {
  const { orderDetails } = useSelector(
    state => state.ingredientsConstructor
  );

  return (
    <div className={`${styles.main} mt-30`}>
      <h2 className={`${styles.order_number} text text_type_digits-large  mb-8`}>
        {orderDetails.order.number}
      </h2>
      <p className={"text text_type_main-medium  mb-15"}>идентификатор заказа</p>
      <img alt={"готов"} className={"mb-15"} src={img}/>
      <p className={"mb-2 text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={"mb-30 text text_type_main-default  text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;