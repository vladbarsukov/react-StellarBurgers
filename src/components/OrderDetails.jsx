import React from 'react';
import style from './OrderDetails.module.css';
import img from '../images/graphics.svg';


const OrderDetails = () => {
  return (
    <div className={style.main + ' ' + "mt-30"}>
      <h2 className={style.orderNumber + " " + "text text_type_digits-large  mb-8"}>034546</h2>
      <p className={"text text_type_main-medium  mb-15"}>идентификатор заказа</p>
      <img className={"mb-15"} src={img}/>
      <p className={"mb-2 text text_type_main-default"}>Ваш заказ начали готовить</p>
      <p className={"mb-30 text text_type_main-default  text_color_inactive"}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;