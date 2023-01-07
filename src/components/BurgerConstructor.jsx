import React from 'react';
import styles from './BurgerConstructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import data from '../utils/data'
const BurgerConstructor = () => {
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
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
          <ConstructorElement
            text="Краторная булка N-200i (верх)"
            price={50}
            thumbnail={data[0].img}
          />
        </div>

        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].img}
        />
      </div>
    </div>
  );
};

export default BurgerConstructor;