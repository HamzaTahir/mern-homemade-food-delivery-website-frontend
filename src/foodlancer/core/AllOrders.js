import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {FoodlancerlistOrders, FoodlancergetStatusValues, updateStatusValues} from './apiFoodlancer';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const Order = () =>{
    const [orders, setOrders] = useState([])
    const [count, setCount] = useState(0)
    const [statusValues, setstatusValues] = useState([])
    const {user, token} = isAuthenticated()
    
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadOrders = () =>{
        setloading({...loadings, loading1:true})
        FoodlancerlistOrders(user._id, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                setOrders(data)
            }
        })
    }
    const loadStatusValues = () =>{
        FoodlancergetStatusValues(user._id, token).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setstatusValues(data)
            }
        })
    }

    useEffect(()=>{
        loadOrders()
        loadStatusValues()
    },[])

    const showOrdersLength = () =>{
        // setCount(num)
        if(orders.length === 0){
            return(
                <h4 className="text-danger display-4" style={{textAlign:'center'}}>No Order Yet</h4>
            )
        }
        else{
            return (
                <h4 className="text-success display-4" style={{textAlign:'center'}}>Total Orders: {orders.length}</h4>
            )
        }
    }
    
    const showInput = (key, value) =>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepand">
                <div className="input-group-text">
                    {key}
                </div>
            </div>
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    )
    const handleStatusChange = (e, orderId) =>{
        // console.log("Update Order Status")
        setloading({...loadings, loading1:true})
        updateStatusValues(user._id, token, orderId, e.target.value).then(data=>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log('Status Update Failed')
            }
            else{
                setloading({...loadings, loading1:false})
                toast.success("Order Status Updated Successfully.")
                loadOrders()
            }
        })
    }
    const showStatus = (o) =>(
        <div className = "form-group">
            <h3 className = "mark mb-4">Status: {o.status}</h3>
            <select className = "form-control" onChange = {(e)=>(handleStatusChange(e, o._id))}>
                <option>Update Status</option>
                {statusValues.map((status, index)=>(
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    )
    if(loading1 === true){
        return(
            <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <PulseLoader
                    // css={override}
                    size={15}
                    color={"#F40009"}
                    loading={true}
                />
                {/* <img src="../../logo3.png" style={{width:150, height:80}}/> */}
            </div>
        )
    }
    else{  
        return(
            <Layout title="All Orders" description="You Can Manage All The Orders Here" className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showOrdersLength()}
                        {orders.map((order, orderIndex)=>{
                            // count = count + 1
                                return(
                                    <div key={orderIndex}>
                                        {order.products.map((product, productIndex)=>{
                                            // count = count + 1;
                                            // setCount(count+1)
                                            // {count}
                                            if(product.foodlancer === user._id){
                                                return(
                                                    <div className="mt-5" key={orderIndex} style={{borderBottom:"5px solid indigo"}}>
                                                        <h2 className="mb-5">
                                                            {/* Order # {showOrderNumber()}  */}
                                                        </h2>
                                                        <h2 className="mb-5">
                                                            <span className="bg-primary">
                                                                Order ID: {order._id} 
                                                            </span>
                                                        </h2>
                                                        <ul className="list-group mb-2">
                                                            <li className="list-group-item">
                                                                Oder By: {order.user.name}
                                                            </li>
                                                            <li className="list-group-item">
                                                            {showStatus(order)}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Transaction ID: {order.transaction_id}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Total Amount: ${order.amount}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Order Created On: {moment(order.createdAt).fromNow()}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Delivery Address: {order.address}
                                                            </li>
                                                        </ul>
                                                        <h3 className="mt-4 mb-4 font-italic">
                                                            Total Products In The Order {order.products.length}
                                                        </h3>
                                                        <div className="mb-4" key={productIndex} style={{padding:'20px', border:'1px solid indigo'}}>
                                                            {/* {user._id} */}
                                                            {showInput('Product Name', product.name)}
                                                            {showInput('Product Price', product.price)}
                                                            {showInput('Product Quantity', product.count)}
                                                            {showInput('Product Id', product._id)}
                                                            {showInput('Foodlancer Id', product.foodlancer)}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                        })}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Order;