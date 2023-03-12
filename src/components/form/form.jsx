import React from 'react';
import style from "./form.module.css";

const Form = ({children, formName}) => {
  return (
    <div>
      <div className={style.content}>
        <h1 className={"text text_type_main-medium"}>{formName}</h1>
        <form className={`${style.form}`}>
          {children}
        </form>
      </div>
    </div>
  );
};

export default Form;