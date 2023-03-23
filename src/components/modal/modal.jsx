import React, {useEffect} from 'react';
import styles from "./modal.module.css"
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {CLOSE_ORDERS_MODAL, CLOSE_USER_ORDERS_MODAL} from "../../services/actions/wsActions";
import {closeOrderModal} from "../../services/reducers/BurgerConstructor";
import {closeBurgerIngredientsModal} from "../../services/reducers/IngredientDetails";
const Modal = ({close, children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeIngredientPopup = () => {
    dispatch(closeBurgerIngredientsModal())
    navigate('/')
  }

  const closeOrderPopup = () => {
    dispatch(closeOrderModal())
  }

  const closeUserOrdersPopup = () => {
    dispatch({
      type: CLOSE_USER_ORDERS_MODAL,
    })
    navigate('/profile/orders')
  }
  const closeOrdersPopup = () => {
    dispatch({
      type: CLOSE_ORDERS_MODAL,
    })
    navigate('/feed')
  }
  const closePopup = () => {
    if (close === 'ingredient') {
      return closeIngredientPopup()

    }
    if (close === 'order') {
      return closeOrderPopup()
    }
    if (close === 'userOrders') {
      return closeUserOrdersPopup()
    }
    if (close === 'orders') {
      return closeOrdersPopup()
    }
  }


  useEffect(() => {

    const closeByEsc = (e) => {
      if(e.key === "Escape"){
        closePopup()
      }
    }
    window.addEventListener('keydown', closeByEsc)
    return () => window.removeEventListener('keydown', closeByEsc)
  },[close, closePopup])

  return (
    <ModalOverlay closePopup={closePopup} >
      <div className={styles.modal_content_active + ' ' + styles.modal_content} onClick={e => e.stopPropagation()}>
        <div  onClick={() =>{closePopup()} }  className={styles.close_icon}>
          <CloseIcon type="primary"/>
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  close: PropTypes.string
}

export default Modal;