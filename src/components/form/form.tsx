import React, {FC, ReactNode} from 'react';
import style from "./form.module.css";

type TFormProps = {
    formName: string
    children?: ReactNode
}
const Form: FC<TFormProps> = ({children, formName}) => {
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