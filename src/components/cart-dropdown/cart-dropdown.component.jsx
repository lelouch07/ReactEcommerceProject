import {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {CartContext} from '../../contexts/cart.context';
import './cart-dropdown.styles.scss'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
const CartDropdown=()=>{
    const { cartItems, isCartOpen, setIsCartOpen }=useContext(CartContext);
    const navigate=useNavigate();
    const goToCheckoutHandler=()=>{
        setIsCartOpen(!isCartOpen);
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.length ?(
                        cartItems.map((cartItem)=>(
                            <CartItem key={cartItem.id} cartItem={cartItem}/>
                        ))
                    ):(
                        <span className='empty-message'>Your Cart is empty</span>
                    )
                }
            </div>
            <Button onClick={goToCheckoutHandler}>Go to CheckOut</Button>
        </div>
    )
}
export default CartDropdown;