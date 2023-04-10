import React, {FC, useEffect, useMemo} from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ADD_ITEMS_TO_CONSTRUCTOR,
  pushData,
  SWAP_ITEM
} from "../../services/actions/BurgerConstructor";
import {useDrop} from "react-dnd";
import ConstructorItem from "../constructor-item/constructor-item";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {INCREASE_ITEM} from "../../services/actions/BurgerIngredients";
import {useNavigate} from "react-router-dom";
import {useProvideAuth} from "../../services/auth";
import {SET_USER_LOADED} from "../../services/actions/user";
import {useDispatch, useSelector} from "../../services/hooks";
import {TIngredient} from "../../services/types/Data";

type TBurgerConstructorProps = {};
const BurgerConstructor: FC<TBurgerConstructorProps> = () => {
  const auth = useProvideAuth()
  const init = async ():Promise<void> => {
    // Вызовем запрос getUser и изменим состояние isUserLoaded
    await auth.getUser();
    dispatch({
      type: SET_USER_LOADED,
    })
  };
  useEffect(() => {
    // При монтировании компонента запросим данные о пользователе
    init()
        .then(() =>
            dispatch({type: SET_USER_LOADED,})
        );
  }, []);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.User);
  const { selectedBun, selectedToppings, orderDetails, postRequest} = useSelector(
      state => state.ingredientsConstructor
  );
  const [, dropTarget] = useDrop({
    accept: "ing",
    drop(item: TIngredient) {
      addIngredientToConstructor(item)
    },
  });

  const moveToppingItem = (dragIndex: number, hoverIndex: number): void => {
    dispatch({
      type: SWAP_ITEM,
      index: {dragIndex, hoverIndex}
    });
  }

  const addIngredientToConstructor = (ing: TIngredient):void => {
    dispatch({
      type: INCREASE_ITEM,
      _id: ing._id,
      ingType: ing.type,
    }, );
    dispatch({
      type: ADD_ITEMS_TO_CONSTRUCTOR,
      selectedIngredients: ing,
    });
  };
  const priceCalculator = useMemo(() => (topping: TIngredient[], bun: TIngredient | null) => {
    return  topping?.reduce((prev: number, next: TIngredient) => prev + next.price, 0) + (bun ? bun.price * 2 || 0 : 0)
  },[])

  const post = ():void => {
    const ingredients: string[] = selectedToppings.reduce((acc:string[], ing: TIngredient) => {
      acc.push(ing._id);
      return acc;
    }, []);
    if (selectedBun) {
      ingredients.push(selectedBun._id);
    }
    dispatch(pushData(ingredients));
  };

  return (
      <div>
        <div ref={dropTarget} className={`${styles.main} mt-25 ml-10`}>
          <div className={`mb-4 ml-6 ${styles.bun}`}>
            {selectedBun ?
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${selectedBun?.name} (верх)`} price={selectedBun?.price}
                    thumbnail={selectedBun?.image}
                />
                : null }
          </div>

          <ul  className={`${styles.list} mb-4`}>
            { selectedToppings.map((ing: TIngredient, index: number) => (
                <ConstructorItem moveToppingItem={moveToppingItem} index={index} key={index} ing={ing}/>
            ))}
          </ul>

          <div className={`mb-4 ml-6 ${styles.bun}`}>
            {selectedBun ?
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${selectedBun?.name} (низ)`}
                    price={selectedBun?.price}
                    thumbnail={selectedBun?.image}
                />
                : null }
          </div>

          <div className={`mt-6 ${styles.orderPrice}`}>
            <div className={`mr-10 ${styles.price}`}>
              <p className={"text text_type_digits-medium mr-2"}>{priceCalculator(selectedToppings, selectedBun)}</p>
              <CurrencyIcon type="primary" />
            </div>
            <div className={"mr-10"}>
              <Button onClick={() => user ?  post() : navigate('/login')} htmlType="button" type="primary" size="large">
                Оформить заказ
              </Button>
            </div>

          </div>
        </div>
        {((orderDetails !== null) || postRequest) ? (
            <Modal close={'order'}>
              <OrderDetails />
            </Modal>
        ) : null}
      </div>
  );
};

export default BurgerConstructor;
