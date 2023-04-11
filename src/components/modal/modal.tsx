import React, {FC, useCallback, useEffect} from 'react';
import styles from "./modal.module.css"
import { CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from "../modal-overlay/modal-overlay";
import {CLOSE_BURGER_INGREDIENT_MODAL} from "../../services/actions/IngredientDetails";
import {useDispatch} from "react-redux";
import {CLOSE_ORDER_MODAL} from "../../services/actions/BurgerConstructor";
import {useNavigate} from "react-router-dom";
import {CLOSE_ORDERS_MODAL, CLOSE_USER_ORDERS_MODAL} from "../../services/actions/wsActions";

type TModalProps = {
  close: string;
  children: React.ReactNode;
}
const Modal: FC<TModalProps> = ({close, children}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeIngredientPopup = useCallback(() => {
    dispatch({
      type: CLOSE_BURGER_INGREDIENT_MODAL,
    })
    navigate('/')
  }, [dispatch, navigate])

  const closeOrderPopup = useCallback(() => {
    dispatch({
      type: CLOSE_ORDER_MODAL,
    })
  }, [dispatch])

  const closeUserOrdersPopup = useCallback(() => {
    dispatch({
      type: CLOSE_USER_ORDERS_MODAL,
    })
    navigate('/profile/orders')
  }, [dispatch, navigate])
  const closeOrdersPopup = useCallback(() => {
    dispatch({
      type: CLOSE_ORDERS_MODAL,
    })
    navigate('/feed')
  }, [dispatch, navigate])

  const closePopup = useCallback(() => {
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
  }, [close, closeIngredientPopup, closeOrderPopup, closeUserOrdersPopup, closeOrdersPopup])


  useEffect(() => {

    const closeByEsc = (e: KeyboardEvent) => {
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


export default Modal;