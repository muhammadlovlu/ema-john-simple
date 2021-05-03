import React from 'react';
const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    // let total = cart.reduce((total,cart)=> total + cart.price* cart.quantity, 0);
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    // shipping const start
    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    // shipping const end

    // tax start
    let tax = total / 10;
    // tax end

    const formatingNumber = num => {
        return num.toFixed(2);
    }
    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Items Ordered :{cart.length}</h3>
            <p>Total Price : {formatingNumber(total)}</p>
            <p>Shipping Charges : {shipping} </p>
            <p>TAX + VAT : {formatingNumber(tax)}</p>
            <p>Grand Total : {formatingNumber(total + shipping + tax)}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;