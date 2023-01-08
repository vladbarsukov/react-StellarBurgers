import React from 'react';
import style from "./Modal.module.css"
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? style.modal_active + ' ' + style.modal : style.modal} onClick={() => setActive(false)}>

      <div className={active ? style.modal_content_active + ' ' + style.modal_content : style.modal_content} onClick={e => e.stopPropagation()}>
        <div  onClick={() => setActive(false)}  className={style.close_icon}>
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;