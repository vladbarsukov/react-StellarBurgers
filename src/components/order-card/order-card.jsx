import React, {useMemo} from 'react';
import style from "./order-card.module.css";
import {data, orderData} from "../../utils/data";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const OrderCard = ({order}) => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate(`/feed/${order._id}`)
  }
  const { items } = useSelector(
    state => state.ingredients
  );
  const findIngredient = ing => {
   return  items.find(({ _id }) => _id === ing)
  }
  const findAllIngredient = ingArr => {
    let arr = []
    ingArr.forEach((order)=> {
     arr.push(items.find(({ _id }) => _id === order))
    })
    return arr
  }
  const orderPriceCalculator = useMemo(() => (ingArr) => {
    return  findAllIngredient(ingArr)?.reduce((prev, next) => prev + next.price, 0)
  },[findAllIngredient])
  const maxIngredientsToShow = 6;
  // const displayedIngredients = data.slice(0, maxIngredientsToShow);

  const otherItemCounter = (ArrIng, ingToShow) => {
   return (ArrIng.length - ingToShow).toString()
  }
  return (
    <div onClick={onClick} className={`${style.container} pr-6 pl-6 pb-6 pt-6 mb-4`}>
      <div className={`${style.orderNumber} mb-6`}>
        <p className="text text_type_digits-default" >{`# ${order.number}`}</p>
        <p className="text text_type_main-small text_color_inactive" >{order.createdAt.substring(0, 19)}</p>
      </div>
      <h2 className={`${style.orderName} text text_type_main-medium`}>{order.name}</h2>
      <p className={`text text_type_main-small mt-2`}>{order.status}</p>
      <div className={`${style.orderIngredientsList} mt-6`}>
        <ul className={`${style.orderIngredientsContainer}`}>
          {order.ingredients.map((ing, index) => {
            let ingredient = findIngredient(ing)
            if (index === 5) {
            return  (
               <div key={index}>
                 <img className={`${style.orderIngredientsLastItem} `} src={ingredient?.image_mobile} alt={ing?.type}/>
                 <p className={`${style.orderIngredientsLastItemData} text text_type_main-small`}>{`+${otherItemCounter(order.ingredients, maxIngredientsToShow)}`}</p>
               </div>
              )
            }
           return (
              <img key={index} className={`${style.orderIngredientsItem} `} src={ingredient?.image_mobile} alt={ing.type}/>
            )
          })}
        </ul>
        <div className={style.priceContainer}>
          <p className="text text_type_digits-default mr-2">{orderPriceCalculator(order.ingredients)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;