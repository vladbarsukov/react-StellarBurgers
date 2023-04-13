import React, {FC} from 'react';
import styles from "../modal-overlay/modal-overlay.module.css";

type TModalOverlayProps = {
  closePopup: () => void;
  children: React.ReactNode;
}
const ModalOverlay: FC<TModalOverlayProps> = ({children, closePopup}) => {
  return (
    <div className={styles.modal_active + ' ' + styles.modal} onClick={() => closePopup()}>
      {children}
    </div>
  );
};

export default ModalOverlay;