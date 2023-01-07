import React from 'react';
import style from "./Modal.module.css"
const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? style.modal_active + ' ' + style.modal: style.modal} onClick={() => setActive(false)}>
      <div className={active ? style.modal_content_active + ' ' + style.modal_content: style.modal_content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;