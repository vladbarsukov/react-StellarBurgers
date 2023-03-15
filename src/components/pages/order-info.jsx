import React, {useEffect, useMemo} from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import style from './order-info.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const OrderInfo = () => {
  const { id } = useParams();
  const { orders } = useSelector(
    state => state.wsReducer
  );
  const { items } = useSelector(
    state => state.ingredients
  );


  const findIngredient = ing => {
    return  items?.find(({ _id }) => _id === ing)
  }

  const findAllIngredient = ingArr => {
    let arr = []
    ingArr?.forEach((order)=> {
      arr.push(items?.find(({ _id }) => _id === order))
    })
    return arr
  }

  const orderPriceCalculator = useMemo(() => (ingArr) => {
    return  findAllIngredient(ingArr)?.reduce((prev, next) => prev + next?.price, 0)
  },[])

  const currentOrder = orders.orders?.find(item => item._id === id)

  const counts = {};
  currentOrder?.ingredients.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  });
  const unique = currentOrder?.ingredients.filter((el) => counts[el] === 1);
  const duplicates = Object.keys(counts).filter((el) => counts[el] > 1).map((el) => ({value: el, count: counts[el]}));

  return (
  orders.orders && items ?
    <div className={`${style.container} mt-30`}>
     <p className={`${style.orderNumber} text text_type_digits-default`}>{`#${currentOrder.number}`}</p>
      <h2 className={`${style.orderName} text text_type_main-medium mt-10`}>{currentOrder.name}</h2>
      <p className={`text text_type_main-small mt-3`}>{currentOrder.status}</p>
      <h2 className={`text text_type_main-medium mt-15`}>Состав:</h2>
      <ul className={`${style.ingredientList} mt-6`}>
        {duplicates.map((ing)=> {
          let ingredient = findIngredient(ing.value)
          return (
            <div key={ing.value} className={`${style.orderIngredientsItemContainer} mb-4`}>
              <div className={`${style.orderIngredientsItem}`}>
                <img className={`${style.orderIngredientsImage}`} src={ingredient?.image_mobile} alt={ing?.type}/>
                <p className={`${style.orderIngredientsName} ml-4 text text_type_main-small`}>{ingredient.name}</p>
              </div>
              <div className={`${style.priceContainer} mr-6`}>
                <p className="text text_type_digits-default mr-2">{`${ing.count} x ${ingredient.price}`}</p>
                <CurrencyIcon type="primary" />
              </div>

            </div>)
        })}
        {unique.map((ing)=> {
          let ingredient = findIngredient(ing)
          console.log(currentOrder)
           return (
             <div key={ing} className={`${style.orderIngredientsItemContainer} mb-4`}>
               <div className={`${style.orderIngredientsItem}`}>
                 <img className={`${style.orderIngredientsImage}`} src={ingredient?.image_mobile} alt={ing?.type}/>
                 <p className={`${style.orderIngredientsName} ml-4 text text_type_main-small`}>{ingredient.name}</p>
               </div>
               <div className={`${style.priceContainer} mr-6`}>
                 <p className="text text_type_digits-default mr-2">{`1 x ${ingredient.price}`}</p>
                 <CurrencyIcon type="primary" />
               </div>
            </div>)
        })}
      </ul>
      <div className={`${style.orderTimeContainer} mt-10`}>
        <p className="text text_type_main-small text_color_inactive" >{currentOrder.createdAt.substring(0, 19)}</p>
        <div className={`${style.priceContainer}`}>
          <p className="text text_type_digits-default mr-2">{orderPriceCalculator(currentOrder.ingredients)}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
   :
    <></>
  )
};

export default OrderInfo;