import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const Product = (props) => {

    const { name, seller, price, stock, img, key } = props.product;
    return (
        <div className='product row'>
            <div className="col-lg-4 col-sm-8">
                <img src={img} alt="" />
            </div>
            <div className="col-lg-8 ">
                <h3 className="product-name"><Link to={"/product/" + key}>{name}</Link></h3>
                <br />
                <p className="seller"><small>By : {seller}</small></p>
                <h4 className="price">Price : $ {price}</h4>
                <p className="stock"><small>{stock} left in stock - Buy soon</small></p>

                {props.showAddToCart && <button className="main-button" onClick={() => props.handlingProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} />  Add to cart</button>}

            </div>
        </div>
    );
};

export default Product;