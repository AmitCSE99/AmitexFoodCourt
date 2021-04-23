import React, { useContext,useState } from "react";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from './Checkout';
const Cart = (props) => {
  const [isCheckout,setIsCheckout]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [didSubmit,setDidSubmit]=useState(false)
  const cartCtx = useContext(CartContext);
  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  };

  const orderHandler=()=>{
    setIsCheckout(true);

  }

  const orderSubmitHandler=async(userData)=>{
    setIsSubmitting(true);
    await fetch('https://react-http-b8047-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body:JSON.stringify({
        user:userData,
        orderedItems:cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
        ></CartItem>
      ))}
    </ul>
  );

  const modalContent= <React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout&& <Checkout onConfirm={orderSubmitHandler} onCancel={props.onCloseCart}></Checkout>}
      {!isCheckout&& <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>}
  </React.Fragment>

  const isSubmiitingModalContent=<p>Confirming your orders</p>
  const didSubmitModalContent=<React.Fragment>
    <p>Order Confirmed!!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>Close</button>
    </div>
  </React.Fragment>


  return (
    <Modal onClose={props.onCloseCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmiitingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}

    </Modal>
  );
};
export default Cart;
