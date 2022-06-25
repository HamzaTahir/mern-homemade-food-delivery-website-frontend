import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts, getBraintreeClientToken, processPayment, createOrder} from './apiCore';
import Card from './Card';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from './cartHelpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
toast.configure()
const Checkout = ({history, products}) =>{

    const [data, setData] = useState({
        loading: false,
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:'undefined'
    })
    const {address} = data;
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    // console.log("history :: " + history)

    const getToken = (userId, token) =>{
        getBraintreeClientToken(userId, token)
        .then(data =>{
            if(data.error){
                if(data.error === "Foodie not Found"){
                    setData({...data, error:"Signin to Purchase Items"})
                }
                else{
                    setData({...data, error:data.error})
                }
                // setData({...data, error: data.error})
            }
            else{
                setData({clientToken:data.clientToken})
            }
        })
    }
    
    useEffect(()=>{
        getToken(userId, token);
    },[])

    const getTotal = () =>{
        return products.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price;
        },0);
    };
    const handleAddress = event =>{
        // console.log("Delivery Address GET from form :: " + event.target.value)
        setData({...data, address: event.target.value})
    }
    const showCheckout = () => {
        return isAuthenticated() ? (
        <div>
            {showDropIn()}
        </div>
    ) : (
        <Link to="/signin" style={{margin:10}}>
            <button className="btn btn-primary">
                Sign in To Checkout
            </button>
        </Link>
    )}
    // console.log("Delivery Address: " + deliveryAddress)
    // console.log("Address: " + address)
    const buy = () =>{
        let deliveryAddress = data.address;
        if(address === undefined || address === 'undefined'){
            toast.error("Kindly Add Delivery Address");
            // return;
        }
        else{
            // send nonce to your server
            // nonce = data.instance.requestPaymentMethod()

            let nonce;
            let getNonce = data.instance
            .requestPaymentMethod()
            .then(data =>{
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, care number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log('Send Nonce And Total To Process: ',nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount:getTotal(products)
                };
                processPayment(userId, token, paymentData)
                .then(response =>{
                    
                    console.log(products)
                    const createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    }
                    // create order
                    createOrder(userId, token, createOrderData)
                    .then(response =>{
                        // empty cart
                        emptyCart(() => {
                            console.log("Payment Success And Empty Cart");
                        });
                        setData({ loading: false, success: true});
                        // <Redirect to='/'/>
                        history.push('/');
                        // console.log("this.props :: " + this.props)
                        // console.log("history :: " + history)
                        toast.success("Thanks! Your payment was Successfull!");

                    })
                })
                .catch(error =>{
                    console.log(error);
                    setData({loading: false});
                })
            })
            .catch(error =>{
                // console.log("Drop In Error: " + error)
                setData({...data, error:error.message})
            });
        }
    };

    const showError = error =>(
        <div className="alert alert-danger" style={{margin:10,display: error ? "" : "none"}}>
            {error}
        </div>
    );
    const showSuccess = success =>(
        <div className="alert alert-info" style={{margin:10,display: success ? "" : "none"}}>
            Thanks! Your payment was Successfull! 
        </div>
    );
    const showLoading = loading =>(
        <div className="alert alert-danger" style={{display: loading ? "" : "none"}}>
            Loading!
        </div>
    );
    const showDropIn = () =>(
        <div onBlur={() => setData({...data, error:""})}>
            {data.clientToken != null && products.length > 0 ? (
                <div className="row" style={{margin:10}}>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form=group">
                            <h2 style={{width:'100%', textAlign:'center'}}>
                                Delivery Information
                            </h2>
                            <label className="text-muted">Delivery Address:</label>
                            <textarea 
                                onChange={handleAddress}
                                className="form-control"
                                value={address}
                                placeholder="Type Your Delivery Address Here..."
                                // required="required"
                                maxlength="300"
                                // rows="12"
                                rows="5"
                            />
                       </div>
                   </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <h2 style={{width:'100%', textAlign:'center'}}>
                            Checkout Information
                        </h2>
                        <DropIn options={{
                            authorization:data.clientToken
                        }} onInstance = {instance => data.instance = instance}/>
                        <button className="btn btn-success btn-block" onClick={buy}>
                            Pay
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
    return (
        <div>
            <h2 style={{width:'100%', marginLeft:10}}>
                Total Bill: {getTotal()} Rs.
            </h2>
            {showSuccess(data.success)}
            {/* {showLoading(data.loading)} */}
            {showError(data.error)}
            {showCheckout()}
        </div>
    )
};

export default Checkout;