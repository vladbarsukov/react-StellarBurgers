import React, {useEffect, useRef, useState} from 'react';
import style from "./IngredientsList.module.css";
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


const IngredientsList = ({ingredients, addSelectedBuns, addSelectedTopping, setActive, setIngredientDetails}) => {
  const [selectedBun, setSelectedBun] = useState([])
  const [topping, setTopping] = useState([])


  const select = (ing) => {

    ingredients.forEach(element => {
      if ((element['_id'] === ing._id) && ing.type !== 'bun') {
        element['__v'] += 1
      } else {
        element['__v'] = 1
      }
    })

    if (ing.type === 'bun') {
        addSelectedBuns(ing._id)
        if (selectedBun.includes(ing._id)) {
          setSelectedBun(selectedBun.filter(e => e !== ing._id));
        } else {
          setSelectedBun([ing._id]);
        }
    }

    if (ing.type !== 'bun') {
      setTopping([...topping, ing._id]);
    }

  }
  const handleModalIngredientDetails = (ing) => {
    setIngredientDetails(ing)
    setActive(true)
  }


  return (
    <div className='ml-4 mr-4'>
      <ul className={style.list}>
        {
          ingredients.map((ing) =>

            <li onClick={() => handleModalIngredientDetails(ing)} key={ing._id} style={{
              listStyleType: 'none',
              width: '272px',
              position: 'relative',
            }} className='mt-6'>
                 {
                   (selectedBun.includes(ing._id) || topping.includes(ing._id)) && (
                     <div style={{position: 'absolute', zIndex: '1', right: '0'}}>
                       <Counter count={ingredients.find(obj => obj['_id'] === ing._id)['__v']} size="default" extraClass="m-1" />
                     </div>
                   )
                 }
              <img style={{cursor: 'pointer'}} onClick={() => select(ing)} className='ml-4 mr-4' alt={ing.type} src={ing.image}/>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
              }} className='mt-1'>
                <div className={style.price}>
                  <p className='mr-1 text text_type_digits-default'>20</p>
                  <CurrencyIcon type='primary'/>
                </div>

                <h3  style={{height: '48px'}} className='text text_type_main-small mt-1'>{ing.name}</h3>

              </div>
            </li>
          )
        }
      </ul>
    </div>

  );
};

export default IngredientsList;