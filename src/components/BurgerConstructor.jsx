import React, {useState} from 'react';
import styles from './BurgerConstructor.module.css'
import {ConstructorElement, Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../utils/data'
const BurgerConstructor = ({setActive}) => {

  const [orderPrice, setOrderPrice] = useState(610)

  return (
    <div style={{width: '600px', display: "flex", flexDirection: "column", alignItems: 'end'}} className='mt-25'>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className='mb-4'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].img}
          />
        </div>

        <div  style={{height: '464px', overflowY: 'scroll'}} className='mb-4'>
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
          {/*<ConstructorElement*/}
          {/*  text="Краторная булка N-200i (верх)"*/}
          {/*  price={50}*/}
          {/*  thumbnail={data[0].img}*/}
          {/*/>*/}
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].img}
        />
      </div>
      <div className={"mt-10" + ' ' + styles.orderPrice}>
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