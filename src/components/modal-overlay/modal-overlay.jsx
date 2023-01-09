import React from 'react';
import styles from "../modal-overlay/modal-overlay.module.css";

const ModalOverlay = ({active, children, setActive}) => {
  return (
    <div className={active ? styles.modal_active + ' ' + styles.modal : styles.modal} onClick={() => setActive()}>
      {children}
    </div>
  );
};

export default ModalOverlay;