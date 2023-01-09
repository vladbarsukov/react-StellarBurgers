import React from 'react';
import styles from "./Modal.module.css"
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? styles.modal_active + ' ' + styles.modal : styles.modal} onClick={() => setActive(false)}>
      <div className={active ? styles.modal_content_active + ' ' + styles.modal_content : styles.modal_content} onClick={e => e.stopPropagation()}>
        <div  onClick={() => setActive(false)}  className={styles.close_icon}>
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;