import { createContext,useReducer } from "react";
// import { useEffect } from "react";

const addCartItem=(cartItems,productToAdd)=>{
    //find if the cart items contains the product to add
    const existingCartItem=cartItems.find((cartItem)=>cartItem.id===productToAdd.id)
    //if found increment the quantity
    if(existingCartItem){
        return cartItems.map((cartItem)=> cartItem.id===productToAdd.id ?
        {...cartItem,quantity:cartItem.quantity+1}
        : cartItem
        );
    }
    //return the array with modified cartItems 
    return [...cartItems,{...productToAdd,quantity:1}];
}

const removeWholeItem=(cartItems,cartItemToRemove)=>{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if(existingCartItem)
    {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

}

const removeCartItem=(cartItems,cartItemToRemove)=>{
    //find cart item to remove
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    //check if quantity is equal to 1,if it is remove that item from the cart
    if(existingCartItem.quantity===1)
    {
        return cartItems.filter(cartItem=>cartItem.id!==cartItemToRemove.id)
    }

    //return back cart items with matching cart  with decrement 
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

}

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{},
    cartItems:[],
    addItemToCart:()=>{},
    removeItemToCart:()=>{},
    removeWholeItemToCart:()=>{},
    cartCount:0,
    cartTotal:0,
})


const CART_ACTION_TYPES={
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN',
}


const INITIAL_STATE={
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],
    isCartOpen: false,

}

const cartReducer=(state,action)=>{

    const {type,payload}=action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload,
            }
        default:
            throw new Error(`Unhandled type of ${type} in cart reducer`)
    }
}


export const CartProvider=({children})=>{
   

    const [{ cartItems, isCartOpen, cartCount, cartTotal },dispatch]=useReducer(cartReducer,INITIAL_STATE);


    const updateCartItemsReducer=(newCartItems)=>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        dispatch({type:CART_ACTION_TYPES.SET_CART_ITEMS,payload:{cartItems:newCartItems,cartTotal:newCartTotal,cartCount:newCartCount}});
    }


    const addItemToCart=(product)=>{
        const newCartItems=(addCartItem(cartItems,product));
        updateCartItemsReducer(newCartItems);
    }
    const removeItemToCart=(cartItemToRemove)=>{
        const newCartItems=(removeCartItem(cartItems,cartItemToRemove));
        updateCartItemsReducer(newCartItems);
    }
    const removeWholeItemToCart=(cartItemToRemove)=>{
        const newCartItems=(removeWholeItem(cartItems,cartItemToRemove));
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen=(bool)=>{
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN,payload:bool})
    }

    const value={
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        removeItemToCart,
        removeWholeItemToCart,
        cartTotal,
    };
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}