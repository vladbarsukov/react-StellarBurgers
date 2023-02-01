import React from "react";
import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  return (
    <div className={style.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={style.content}>
          <div className={"mr-5 mt-10"}>
            <BurgerIngredients />
          </div>
          <div>
            <BurgerConstructor />
          </div>
        </main>
        </DndProvider>
    </div>
  );
}

export default App;