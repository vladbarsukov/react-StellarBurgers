import React, { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";

const BurgerIngredients = ({ setActive, setIngredientDetails, ingredientsData = [] }) => {
  const [buns, setBuns] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [main, setMain] = useState([]);

  useEffect(() => {
    setBuns(ingredientsData.filter((x) => x.type === "bun"));
    setSauces(ingredientsData.filter((x) => x.type === "sauce"));
    setMain(ingredientsData.filter((x) => x.type === "main"));
  }, [ingredientsData]);

  const [selectedBuns, setSelectedBuns] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  const mainRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);

  const addSelectedBuns = (bun) => {
    setSelectedBuns(bun);
  };

  const addSelectedTopping = (topping) => {
    setSelectedToppings([...selectedToppings, topping]);
  };

  const scrollMain = () => {
    mainRef.current.scrollIntoView();
  };

  const scrollSauce = () => {
    saucesRef.current.scrollIntoView();
  };

  const scrollBuns = () => {
    bunsRef.current.scrollIntoView();
  };

  return (
    <div className={styles.main}>
      <h1 className={"text text_type_main-large mb-5"}>Соберите бургер</h1>
      <div>
        <TabList scrollMain={scrollMain} scrollSauce={scrollSauce} scrollBuns={scrollBuns} />
      </div>
      <div className={styles.list}>
        <h2 ref={bunsRef} className={"mt-10 text text_type_main-medium"}>
          Булки
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} setActive={setActive} ingredients={buns} addSelectedBuns={addSelectedBuns} addSelectedTopping={addSelectedTopping} />
        </div>
        <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
          Соусы
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} setActive={setActive} ingredients={sauces} />
        </div>
        <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
          Начинки
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} setActive={setActive} ingredients={main} />
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
