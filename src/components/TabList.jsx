import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./TabList.module.css";

const TabList = (arr) => {
  const [current, setCurrent] = React.useState('Булки')
  console.log(arr)


  return (
    <div className={style.tabs}>
      {/*{arr.map((arr, index) =>(<p key={index}>{arr}</p>)*/}
      {/*    // (<Tab value={arr} active={current === {arr}} onClick={setCurrent}>*/}
      {/*    //   {arr}*/}
      {/*    // </Tab>)*/}

        {/*)}*/}
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};

export default TabList;