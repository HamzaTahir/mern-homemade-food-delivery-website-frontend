import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getCart, itemTotal, removeProduct } from './cartHelpers';
import Card from './CheckoutCard';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = ({history}) => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = () =>{
        return(
            <div style={{marginLeft:10}}>
                <h2>
                    Your Cart Has {`${items.length}`} Items
                </h2>
                <h5><Link to="/shop">Continue Shopping</Link></h5>
                <h4 style={{width:'100%', textAlign:'center'}}>Your Cart Summary</h4>
                <hr/>
                {items.map((product, i)=>(
                    <Card key={i} product={product} showAddToCartButton = {false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run}/>
                ))}
            </div>
        )
    }
    const noItemsMessage = () =>(
        <div>
            <h2 style={{width:'100%', textAlign:'center'}}>
                Your Cart is Empty
            </h2>
            <h4 style={{width:'100%', textAlign:'center'}}>
                <Link to="/shop">Continue Shopping</Link>
            </h4>
        </div>
    )
    return (
        <Layout title="Shopping Cart" description="Manage Your Cart Items. Add, Remove, Checkout or Continue Shopping" className="container-fluid">
            <div className="row mt-2">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">  
                    {items.length > 0 ? showItems():noItemsMessage()}
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">  
                    {/* <h2 className="mb-4">Your Cart Summary</h2> */}
                    <hr/>
                    <Checkout products={items} history={history}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;