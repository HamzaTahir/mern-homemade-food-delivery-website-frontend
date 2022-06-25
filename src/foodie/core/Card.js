import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import ShopShowImage from './ShopShowImage';
import moment from 'moment';
import {addItem, updateProduct, removeProduct} from './cartHelpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Card = ({history, product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false, showRemoveProductButton = false, setRun = f => f, run = undefined}) =>{

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
const showViewButton = (showViewProductButton) =>{
    return(
        showViewProductButton && (
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-primary mt-2 mb-2 mr-2" style={{width:'100%'}}>
                        View Product
                    </button>
                </Link>
            </div>
        )
    )
}
const showAddToCart = showAddToCartButton =>{
    return showAddToCartButton && (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <button onClick={addToCart} className="btn btn-warning mt-2 mb-2"
                style={{backgroundColor:'#36454f', color:"white", width:'100%'}}>
                    Add to Cart 
            </button>
        </div>
    );
};
const showRemoveCartButton = showRemoveProductButton =>{
    return (
        showRemoveProductButton && (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <button
                onClick={() => {
                removeProduct(product._id);
                setRun(!run); // run useEffect in parent Cart
                }}
                className="btn btn-outline-danger mt-2 mb-2"
            >
                Remove Product
            </button>
         </div>
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
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        </div>
    )
}
const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
        updateProduct(productId, event.target.value);
    }
} 
// const showImageFunction = () =>{
    // if(history.location.pathname === '/shop'){
    //     <ShopShowImage item={product} url="product"/>
    // }
    // else{
    //     <ShowImage item={product} url="product"/>
    // }

    // console.log("history.location.pathname :: " + history)
// }
    return(
            <div className="card">
            {/* <div className="card" style={{backgroundColor:'#dae5ed'}}> */}
                <div className="card-header name" style={{color:'black', fontSize:'18px', textTransform:'uppercase'}}>
                    {product.name}
                </div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"/>
                    {/* {showImageFunction()} */}
                    <p className="lead mt-2">{product.description.substring(0,100)}</p>
                    <p className="black-10">Price: {product.price} Rs.</p>
                    <p className="black-9">Category: {product.category && product.category.name}</p>
                    <p className="black-9">Kitchen Name: {product.foodlancer && product.foodlancer.kitchen}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                    {/* {showStock(product.quantity)} */}
                    <br/>
                    <div className="row">
                        {showViewButton(showViewProductButton)}
                        {showAddToCart(showAddToCartButton)}
                        {showRemoveCartButton(showRemoveProductButton)}
                    </div>
                    {showCartUpdateOptions(cartUpdate)} 
                </div>
            </div>

    )
}

export default Card;