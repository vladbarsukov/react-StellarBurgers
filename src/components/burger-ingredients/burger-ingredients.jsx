import React, { useRef, useCallback, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import TabList from "../tab-list/tab-list";
import IngredientsList from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";
import {IngredientsDataContext} from "../../services/app-context";
import {useSelector} from "react-redux";
import {filterIngredients} from "../../utils/filterIngredients";


const BurgerIngredients = ({ openPopup, setIngredientDetails}) => {
  const {data} = useContext(IngredientsDataContext)


  const { items } = useSelector(
    state => state.ingredients
  );

  const mainRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);

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
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(items, "bun")} />
        </div>
        <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
          Соусы
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(items, "sauce")}  />
        </div>
        <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
          Начинки
        </h2>
        <div>
          <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(items, "main")} />
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  openPopup: PropTypes.func,
  setIngredientDetails: PropTypes.func,
}

export default BurgerIngredients;



















// import React, { useRef, useCallback, useContext } from "react";
// import styles from "./burger-ingredients.module.css";
// import TabList from "../tab-list/tab-list";
// import IngredientsList from "../ingredients-list/ingredients-list";
// import PropTypes from "prop-types";
// import {IngredientsDataContext} from "../../services/app-context";
// import {useSelector} from "react-redux";
//
//
// const BurgerIngredients = ({ openPopup, setIngredientDetails}) => {
//   const {data} = useContext(IngredientsDataContext)
//
//
//   const { items } = useSelector(
//     state => state.ingredients
//   );
//
//
//
//   const filterIngredients = useCallback((filteredObj, filter) => {
//     return filteredObj.filter((x) => x.type === filter);
//   }, []);
//
//   const mainRef = useRef(null);
//   const saucesRef = useRef(null);
//   const bunsRef = useRef(null);
//
//   const scrollMain = () => {
//     mainRef.current.scrollIntoView({behavior: "smooth"});
//   };
//
//   const scrollSauce = () => {
//     saucesRef.current.scrollIntoView({behavior: "smooth"});
//   };
//
//   const scrollBuns = () => {
//     bunsRef.current.scrollIntoView({behavior: "smooth"});
//   };
//
//   return (
//     <div className={styles.main}>
//       <h1 className={"text text_type_main-large mb-5"}>Соберите бургер</h1>
//       <div>
//         <TabList scrollMain={scrollMain} scrollSauce={scrollSauce} scrollBuns={scrollBuns} />
//       </div>
//       <div className={styles.list}>
//         <h2 ref={bunsRef} className={"mt-10 text text_type_main-medium"}>
//           Булки
//         </h2>
//         <div>
//           <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(data.ingredients.data, "bun")} />
//         </div>
//         <h2 ref={saucesRef} className={"mt-10 text text_type_main-medium"}>
//           Соусы
//         </h2>
//         <div>
//           <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(data.ingredients.data, "sauce")}  />
//         </div>
//         <h2 ref={mainRef} className={"mt-10 text text_type_main-medium"}>
//           Начинки
//         </h2>
//         <div>
//           <IngredientsList setIngredientDetails={setIngredientDetails} openPopup={openPopup} ingredients={filterIngredients(data.ingredients.data, "main")} />
//         </div>
//       </div>
//     </div>
//   );
// };
//
// BurgerIngredients.propTypes = {
//   openPopup: PropTypes.func,
//   setIngredientDetails: PropTypes.func,
// }
//
// export default BurgerIngredients;
