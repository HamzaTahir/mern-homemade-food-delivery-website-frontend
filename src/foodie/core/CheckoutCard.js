import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImageCheckout';
import moment from 'moment';
import {addItem, updateProduct, removeProduct} from './cartHelpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Card = ({product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false, showRemoveProductButton = false, setRun = f => f, run = undefined}) =>{

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
const showViewButton = (showViewProductButton) =>{
    return(
        showViewProductButton && (
            <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-primary mt-2 mb-2 mr-2">
                    View Product
                </button>
            </Link>
        )
    )
}
const showAddToCart = showAddToCartButton =>{
    return showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-warning mt-2 mb-2"
        style={{backgroundColor:'#36454f', color:"white"}}>
            Add to Cart 
        </button>
    );
};
const showRemoveCartButton = showRemoveProductButton =>{
    return (
        showRemoveProductButton && (
          <button
            onClick={() => {
              removeProduct(product._id);
              setRun(!run); // run useEffect in parent Cart
            }}
            className="btn btn-outline-danger mt-2 mb-2"
          >
            Remove Product
          </button>
        )
      );
};
const addToCart = () =>{
    addItem(product, ()=>{
        setRedirect(true);
        toast.info("Product Added Into Cart");
    })
}
const shouldRedirect = redirect =>{
    if(redirect){
        return <Redirect to="/cart"/>
        // toast.info("Product Added Into Cart");
    }
}

const showStock = (quantity) =>{
    return quantity > 0 ? 
    <span className="badge badge-primary badge-pill">In Stock</span>
    :
    <span className="badge badge-primary badge-pill">Out Of Stock</span>
}
const showCartUpdateOptions = cartUpdate =>{
    return cartUpdate && (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} min="1" max="5" maxLength="1"/>
            </div>
        </div>
    )
}
const handleChange = productId => event => {
    if(event.target.value > 5){
        toast.error("Product quantity should be less then equal to 5");
    }
    else{
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateProduct(productId, event.target.value);
        }
    }
} 
    return(
            <div className="row" style={{color:'black', fontSize:'18px', margin:10, borderBottom: '2px solid #B2022F'}}>
                    {shouldRedirect(redirect)}
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
                    <ShowImage item={product} url="product"/>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">
                    <p className="lead mt-2">Product Name: {product.name}</p>
                    <p className="black-10">Product Price: {product.price} Rs.</p>
                    <p className="black-9">Product Category: {product.category && product.category.name}</p>
                    {/* <p className="black-8">Product Added on {moment(product.createdAt).fromNow()}</p> */}
                    <p className="lead mt-2">Product Description: {product.description.substring(0,400)}</p>

                    {/* {showStock(product.quantity)} */}
                    <br/>
                    {showViewButton(showViewProductButton)}
                    {showAddToCart(showAddToCartButton)}
                    {showRemoveCartButton(showRemoveProductButton)}
                    {showCartUpdateOptions(cartUpdate)} 
                </div>
            </div>

    )
}

export default Card;


// <div className="card">
// <div className="card-header name" style={{color:'black', fontSize:'18px', textTransform:'uppercase'}}>
//     {product.name}
// </div>
// <div className="card-body">
//     {shouldRedirect(redirect)}
//     <ShowImage item={product} url="product"/>
//     <p className="lead mt-2">{product.description.substring(0,100)}</p>
//     <p className="black-10">Price: {product.price} Rs.</p>
//     <p className="black-9">Category: ${product.category && product.category.name}</p>
//     <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
//     {/* {showStock(product.quantity)} */}
//     <br/>
    // {showViewButton(showViewProductButton)}
    // {showAddToCart(showAddToCartButton)}
    // {showRemoveCartButton(showRemoveProductButton)}
    // {showCartUpdateOptions(cartUpdate)} 
// </div>
// </div>