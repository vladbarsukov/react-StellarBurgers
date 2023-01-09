import React, {useEffect} from 'react';
import styles from "./modal.module.css"
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
const Modal = ({active, setActive, children}) => {

  useEffect(() => {
    const closeByEsc = (e) => {
      if(e.key === "Escape"){
        setActive()
      }
    }
    window.addEventListener('keydown', closeByEsc)
    return () => window.removeEventListener('keydown', closeByEsc)
  },[])

  return (
    <ModalOverlay active={active} setActive={setActive} >
      <div className={active ? styles.modal_content_active + ' ' + styles.modal_content : styles.modal_content} onClick={e => e.stopPropagation()}>
        <div  onClick={() => setActive(false)}  className={styles.close_icon}>
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.element,
}

export default Modal;