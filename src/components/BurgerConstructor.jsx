import React, {useEffect, useState} from 'react';
import styles from './BurgerConstructor.module.css'
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
const BurgerConstructor = ({setActive, ingredientDetails =[]}) => {

  const [orderPrice, setOrderPrice] = useState(610)


  return (
    <div className={styles.main + " " + 'mt-25'}>



          <div className='mb-4 ml-6'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={ingredientDetails[0]?.name + " "+"(верх)"}
              price={200}
              thumbnail={ingredientDetails[0]?.image}
            />
          </div>

        <ul  style={{height: '464px', overflowY: 'scroll'}} className='mb-4'>
          {ingredientDetails.map((ing, index) =>
            <li key={ing._id} className={styles.listItem + ' ' + 'mb-4'}>
              <div className={'pr-1'}>
                <DragIcon type={"primary"}/>
              </div>
              <ConstructorElement
                text={ing.name}
                price={ing.price}
                thumbnail={ing.image}
              />
            </li>

          )}

        </ul>


        <div className='mb-4 ml-6'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={ingredientDetails[0]?.name + " "+"(низ)"}
            price={200}
            thumbnail={ingredientDetails[0]?.image}
          />
        </div>


      <div className={"mt-6" + ' ' + styles.orderPrice}>
        <div className={"mr-10" + ' ' + styles.price}>
          <p className={"text text_type_digits-medium mr-2"}>{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button onClick={() => setActive(true)} htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;