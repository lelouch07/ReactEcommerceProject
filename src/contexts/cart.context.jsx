import { createContext,useState } from "react";
import { useEffect } from "react";

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

export const CartProvider=({children})=>{
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartTotal,setCartTotal]=useState(0);

    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems]);
    
    useEffect(()=>{
        const newCartTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0)
        setCartTotal(newCartTotal);
    },[cartItems]);


    const addItemToCart=(product)=>{
        setCartItems(addCartItem(cartItems,product));
    }
    const removeItemToCart=(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }
    const removeWholeItemToCart=(cartItemToRemove)=>{
        setCartItems(removeWholeItem(cartItems,cartItemToRemove));
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