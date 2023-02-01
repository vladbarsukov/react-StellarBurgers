import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-list.module.css";
import PropTypes from "prop-types";

const TabList = ({ scrollMain, scrollSauce, scrollBuns }) => {
  const [current, setCurrent] = React.useState("bun");

  return (
    <div className={styles.tabs}>
      <div onClick={scrollBuns}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
      </div>

      <div onClick={scrollSauce}>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>

      <div onClick={scrollMain}>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </div>
  );
};

TabList.propTypes = {
  scrollMain: PropTypes.func.isRequired,
  scrollSauce: PropTypes.func.isRequired,
  scrollBuns: PropTypes.func.isRequired,
}

export default TabList;
