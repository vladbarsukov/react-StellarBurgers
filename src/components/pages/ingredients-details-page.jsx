import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIngredientsRequest, onResponse} from "../../utils/api";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ADD_INGREDIENT_DETAILS} from "../../services/actions/IngredientDetails";

const IngredientsDetailsPage = () => {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState(null);
  const { id } = useParams()
  const { items } = useSelector(
    state => state.ingredients
  );
  useEffect(()=> {
    console.log(id)
    loadIngredientInfo()
  },[])

  const loadIngredientInfo = useCallback(
    () => {
      getIngredientsRequest().then(onResponse).then(ingredients => {
        // setIngredient(ingredients.data.find(({ _id }) => _id === id));
        dispatch({
          type: ADD_INGREDIENT_DETAILS,
          item: ingredients.data.find(({ _id }) => _id === id),
        });
      });
    },
    [id]
  );

  return (
    <div>
      <h2>'1'</h2>
      {/*<IngredientDetails item={ingredient}/>*/}
    </div>
  );
};

export default IngredientsDetailsPage;