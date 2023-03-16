import React from 'react';
import style from "./order-card.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {findIngredient, orderPriceCalculator} from "../../utils/find-ingredients-utils";


const OrderCard = ({order}) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/feed/${order._id}`)
  }
  const { items } = useSelector(
    state => state.ingredients
  );

  const maxIngredientsToShow = 6;
  const displayedIngredients = order.ingredients.slice(0, maxIngredientsToShow);
  const status = (status) => {
    switch (status) {
      case "created" :
        return "Создан";
      case "pending" :
        return "Готовится";
      case "done" :
        return "Выполнен";
      default :
        return "Статус не определен";
  }
  }

  const otherItemCounter = (ArrIng, ingToShow) => {
   return (ArrIng.length - ingToShow)
  }
  return (
    <div onClick={onClick} className={`${style.container} pr-6 pl-6 pb-6 pt-6 mb-4`}>
      <div className={`${style.orderNumber} mb-6`}>
        <p className="text text_type_digits-default" >{`# ${order.number}`}</p>
        <p className="text text_type_main-small text_color_inactive" >{order.createdAt.substring(0, 19)}</p>
      </div>
      <h2 className={`${style.orderName} text text_type_main-medium`}>{order.name}</h2>
      <p className={`text text_type_main-small mt-2`}>{status(order.status)}</p>
      <div className={`${style.orderIngredientsList} mt-6`}>
        <ul className={`${style.orderIngredientsContainer}`}>
          {displayedIngredients.map((ing, index) => {
            let ingredient = findIngredient(ing, items)
            let counter = otherItemCounter(order.ingredients, maxIngredientsToShow)
            if (index === 5 && counter >= 1) {
            return  (
              <div key={index}>
                 <img className={`${counter >= 1 ? style.orderIngredientsLastItem : style.orderIngredientsItem} `} src={ingredient?.image_mobile} alt={ing?.type}/>
                 <p className={`${style.orderIngredientsLastItemData} text text_type_main-small`}>{`+${counter}`}</p>
               </div>
              )
            }
           return (
              <img key={index} className={`${style.orderIngredientsItem} `} src={ingredient?.image_mobile} alt={ing.type}/>
            )
          })}
        </ul>
        <div className={style.priceContainer}>
          <p className="text text_type_digits-default mr-2">{orderPriceCalculator(order.ingredients, items)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;