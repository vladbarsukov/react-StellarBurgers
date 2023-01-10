import React from 'react';
import styles from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({isPopupOpen, children, closePopup}) => {
  return (
    <div className={styles.modal_active + ' ' + styles.modal} onClick={() => closePopup()}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  isPopupOpen: PropTypes.bool,
  closePopup: PropTypes.func,
  children: PropTypes.element,
}

export default ModalOverlay;