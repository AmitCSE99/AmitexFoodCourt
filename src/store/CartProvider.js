import {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState={
    items:[],
    totalAmount:0
}

const CartReducer=(state,actions)=>{
    if(actions.type=='ADD'){
        
        const updatedTotalAmount=state.totalAmount+actions.item.price*actions.item.amount;
        const existingCartIndex=state.items.findIndex(item=>item.id===actions.item.id);
        const existingCartItem=state.items[existingCartIndex];

        let updatedItems;
        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+actions.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartIndex]=updatedItem;
        }else{
            updatedItems=state.items.concat(actions.item);
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if(actions.type==='REMOVE'){
        const existingCartIndex=state.items.findIndex(item=>item.id===actions.id);
        const existingItem=state.items[existingCartIndex];
        const updatedAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount==1){
            updatedItems=state.items.filter(item=>item.id!=actions.id);
        }else{
            const updatedItem={...existingItem,amount:existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingCartIndex]=updatedItem;
        }
        return {
            items:updatedItems,
            totalAmount:updatedAmount
        }
    }
    if(actions.type==='CLEAR'){
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider=props=>{

    const [cartState,dispatchCartState]=useReducer(CartReducer,defaultCartState);

    const addItemToCartHandler=(item)=>{
        dispatchCartState({type:'ADD',item:item})
    }
    const removeItemFromCartHandler=(id)=>{
        dispatchCartState({type:'REMOVE',id:id})
    }
    
    const clearCartHandler=()=>{
        dispatchCartState({type:'CLEAR'});
    }

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler,
        clearCart:clearCartHandler

    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}
export default CartProvider;