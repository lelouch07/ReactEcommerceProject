import { Fragment ,useContext} from "react";
import { Outlet,Link} from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from '../../components/cart-icon/cart-icon.component';
import {UserContext} from '../../contexts/user.context';
import { CartContext, CartProvider } from "../../contexts/cart.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
const Navigation = () => {
    const {currentUser}=useContext(UserContext);
    const {isCartOpen}=useContext(CartContext);
    // setCurrentUser();
    // console.log({currentUser});


    // const signOutHandler=async()=>{
    //        await signOutUser();
    //        setCurrentUser(null);
    // }
    return (
        <Fragment>

            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo"/>
                </Link>
                <div className="nav-links-container">

                <Link className="nav-link" to='/shop'>
                        SHOP
                </Link>

                {
                    currentUser?(
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                        : (<Link className="nav-link" to='/signIn'>
                                SIGN IN
                            </Link>)
                    
                }
               
               <CartIcon/>
                </div>
                {isCartOpen &&<CartDropdown/>}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;
