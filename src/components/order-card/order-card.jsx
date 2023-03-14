import React from 'react';
import style from "./order-card.module.css";
import {data, orderData} from "../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderCard = () => {
  const maxIngredientsToShow = 6;
  const displayedIngredients = data.slice(0, maxIngredientsToShow);
  const otherItemCounter = (ArrIng, ingToShow) => {
   return (ArrIng.length - ingToShow).toString()
  }
  return (
    <div className={`${style.container} pr-6 pl-6 pb-6 pt-6 mb-4`}>
      <div className={`${style.orderNumber} mb-6`}>
        <p className="text text_type_digits-default" >{`# ${orderData.order.number}`}</p>
        <p className="text text_type_main-small text_color_inactive" >Сегодня, 16:20 i-GMT+3</p>
      </div>
      <h2 className={`${style.orderName} text text_type_main-medium`}>{orderData.name}</h2>
      <p className={`text text_type_main-small mt-2`}>статус</p>
      <div className={`${style.orderIngredientsList} mt-6`}>
        <ul className={`${style.orderIngredientsContainer}`}>
          {displayedIngredients.map((ing, index) => {
            if (index === 5) {
            return  (
               <div key={ing._id}>
                 <img className={`${style.orderIngredientsLastItem} `} src={ing.image_mobile} alt={ing.type}></img>
                 <p className={`${style.orderIngredientsLastItemData} text text_type_main-small`}>{`+${otherItemCounter(data, maxIngredientsToShow)}`}</p>
               </div>
              )
            }
           return (
              <img className={`${style.orderIngredientsItem} `} src={ing.image_mobile} alt={ing.type}/>
            )
          })}
        </ul>
        <div className={style.priceContainer}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;