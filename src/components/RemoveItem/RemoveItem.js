import React from 'react';

const RemoveItem = (props) => {
    const { name, seller, price, stock, img, quantity, key } = props.product;
    const reviewItemStyle = { borderBottom: '1px solid red' };
    return (
        <div style={reviewItemStyle}>
            <div className="row">
                <div className="col-lg-6 row-cols-sm-12">
                    <h4>{name}</h4>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <img src={img} alt="" />
                    </div>
                    <div className=" col-lg-4 col-md-6 col-sm-12">
                        <p>Seller : {seller}</p>
                        <p>Item Price : {price}</p>
                        <p>Total Stock : {stock}</p>
                        <p>Quantity : {quantity}</p>
                        <button className="main-button" onClick={() => props.removeProduct(key)}>Remove Item</button>
                    </div>
                </div>
            </div>



        </div>
    );
};

export default RemoveItem;