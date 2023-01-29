import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredients-list.module.css";
import IngredientsItem from "../ingredients-item/IngredientsItem";


const IngredientsList = ({ ingredients}) => {

  return (
    <ul className={`${styles.list} ml-4 mr-4`}>
      {ingredients.map((ing) => (
       <IngredientsItem key={ing._id} ing={ing}/>
      ))}
    </ul>
  );
};

IngredientsList.propTypes = {
  ingredients: PropTypes.array.isRequired,
  setIngredientDetails: PropTypes.func,
  openPopup: PropTypes.func,
}

export default IngredientsList;

