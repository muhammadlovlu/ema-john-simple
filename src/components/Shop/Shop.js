import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
const Shop = () => {
   const first10 = fakeData.slice(0,5);
   const [products, setProducts] = useState(first10);
   const [cart, setCart] = useState([]);

const handleAddProduct = (product)=> {
    console.log('product added from event Handler', product);
    const newCart = [...cart, product];
    setCart(newCart);
}

    return (
        <div className="shop-container">
              <div className="product-container">
     
                    {
                     products.map(product => <Product handlingProduct={handleAddProduct} product={product} key={product.key}></Product>)    
                    }
      
              </div>
             
               <div className="cart-container">
                   <Cart updatingCart={cart}></Cart>
               </div>
        </div>
    );
};

export default Shop;