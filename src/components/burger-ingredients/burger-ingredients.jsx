import React, { useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";


const BurgerIngredients = ({ openPopup, setIngredientDetails, ingredientsData}) => {
  const [ingredients, setIngredients] = useState({
    buns: [],
    sauces: [],
    main: [],
  })

  const filterIngredients = (filteredObj, filter) => {
    return filteredObj.filter((x) => x.type === filter)
  }

  useEffect(() => {
    setIngredients({
      buns: filterIngredients(ingredientsData, "bun"),
      sauces: filterIngredients(ingredientsData, "sauce"),
      main: filterIngredients(ingredientsData, "main")
    })
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
    mainRef.current.scrollIntoView({behavior: "smooth"});
  };

  const scrollSauce = () => {
    saucesRef.current.scrollIntoView({behavior: "smooth"});
  };

  const scrollBuns = () => {
    bunsRef.current.scrollIntoView({behavior: "smooth"});
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
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={ingredients.buns} addSelectedBuns={addSelectedBuns} addSelectedTopping={addSelectedTopping} />
        </div>
        <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
          Соусы
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={ingredients.sauces} />
        </div>
        <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
          Начинки
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={ingredients.main} />
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  openPopup: PropTypes.func,
  setIngredientDetails: PropTypes.func,
  ingredientsData: PropTypes.array.isRequired,
}

export default BurgerIngredients;
