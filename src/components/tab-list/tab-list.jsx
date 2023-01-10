import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tab-list.module.css";
import PropTypes from "prop-types";

const TabList = ({ scrollMain, scrollSauce, scrollBuns }) => {
  const [current, setCurrent] = React.useState("Булки");

  return (
    <div className={styles.tabs}>
      <div onClick={scrollBuns}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
      </div>

      <div onClick={scrollSauce}>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>

      <div onClick={scrollMain}>
        <Tab value="Начинки" active={current === "Начинки"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </div>
  );
};

TabList.propTypes = {
  scrollMain: PropTypes.func,
  scrollSauce: PropTypes.func,
  scrollBuns: PropTypes.func,
}

export default TabList;
