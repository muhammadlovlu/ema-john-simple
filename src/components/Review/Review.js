import React, { useEffect, useState } from 'react';

import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';

import RemoveItem from '../RemoveItem/RemoveItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {

    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('/shipment');
        // setCart([]);
        // setOrderPlaced(true)
        // processOrder();
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        }, []);
        setCart(cartProducts);


    }, []);

    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} alt="" />
    }

    return (
        <>

            <div className="row">
                <div className="col-lg-8 row-cols-sm-12">
                    {
                        cart.map(pd => <RemoveItem product={pd} key={pd.key} removeProduct={removeProduct}></RemoveItem>)
                    }
                    {
                        thankyou
                    }
                </div>
                <div className="col-lg-4 row-cols-sm-12">
                    <h1>{cart.length}</h1>
                    <Cart cart={cart}>
                        <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Review;