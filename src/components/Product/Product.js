import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) => {
    const {name,seller,price,stock, img} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
           <div>
           <h3 className="product-name">{name}</h3>
           <br/>
           <p className="seller"><small>By : {seller}</small></p>
           <h4 className="price">Price : $ {price}</h4>
           <p className="stock"><small>{stock} left in stock - Buy soon</small></p>
           <button className="main-button" onClick={()=>props.handlingProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} />  Add to cart</button>
           </div>
        </div>
    );
};

export default Product;