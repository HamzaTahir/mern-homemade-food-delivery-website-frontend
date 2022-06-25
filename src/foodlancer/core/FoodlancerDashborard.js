import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {readFoodlancers, readFoodlancersOrdersInformation} from './apiFoodlancer';
// import order from '../../../../fyp_project/models/order';

const AdminDashboard = () =>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        error:''
    });   
    const [FoodlancerInfo, setFoodlancerInfo] = useState({
        orderArray:[],
        orders:0,
        soldProducts:0,
        income:0,
        errorInfo:''
    })
    const {name, email, error} = values
    const {orderArray, orders, soldProducts, income, errorInfo} = FoodlancerInfo
    const  {user:{_id, role}}  = isAuthenticated();
    const {token} = isAuthenticated()

    const readFoodlancersFunction = (foodlancer, token) =>{
        readFoodlancers(_id, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }
            else{
                setValues({...values, name: data.name, email: data.email})
            }   
            console.log("NAME :: " + values.name)
        })
    }

    const readFoodlancersOrdersInformationFunction = () =>{
        readFoodlancersOrdersInformation(_id, token).then(data =>{
            if(data.error){
                setFoodlancerInfo({...FoodlancerInfo, errorInfo: true})
            }
            else{
                // setValues({...values, orderArray: data.ordersArray})
                // console.log(orderArray)
                // console.log("data.ordersArray :: " + data.ordersArray);
                let o = data.ordersArray.length;
                let p = 0;
                let inc = 0;
                for(var i=0; i<data.ordersArray.length; i++){
                    p = p + data.ordersArray[i].count;
                    inc = inc + data.ordersArray[i].price;
                }
                setFoodlancerInfo({...FoodlancerInfo, orders: o, soldProducts: p, income: inc})
            }   
        })
    }

    useEffect (()=>{
        readFoodlancersFunction(_id, token);     
        readFoodlancersOrdersInformationFunction(_id, token);     
         
    },[])


    const adminLinks = () =>{
        return(
            <div className="card">
                <h3 className="card-header">Foodlancer Links</h3>
                <ul className="list-group">
                    {/* <li className="list-group-item ">
                       <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li> */}
                    <li className="list-group-item ">
                        <Link className="nav-link" to={`/foodlancer/profile/${_id}`}>Update Profile</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/create/product">Create products</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders">All Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/new">New Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/accept">Accepted Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/processing">Processing Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/shipped">Shipped Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/delivered">Delivered Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/foodlancer/orders/cancel">Cancelled Orders</Link>
                    </li>
                </ul>
            </div>
        );
    };
    const adminInfo = () =>{
        return(
                <div>
                    <div className="card mb-5">
                        <h3 className="card-header">Foodlancer Profile Information</h3>
                        <ul className="list-group">
                            <li className="list-group-item ">
                                Name: {name}
                            </li>
                            <li className="list-group-item ">
                                Email: {email}
                            </li>
                            <li className="list-group-item ">
                                Role: {role === 1 ? 'Foodlancer':'Admin'}
                            </li>
                        </ul>
                    </div>
                    <div className="card mb-5">
                        <h3 className="card-header">Foodlancer Order Information</h3>
                        <ul className="list-group">
                            <li className="list-group-item ">
                                Total Orders: {orders}
                            </li>
                            <li className="list-group-item ">
                                Total Products Sold: {soldProducts}
                            </li>
                            <li className="list-group-item ">
                                Total Income: {income}Rs.
                            </li>
                        </ul>
                    </div>
                </div>

        );
    };
    // const userPurchaseHistory = () =>{
    //     return(
    //         <div className="card mb-5">
    //             <h3 className="card-header">Purchase History</h3>
    //             <ul className="list-group">
    //                 <li className="list-group-item ">
    //                     History
    //                 </li>
    //             </ul>
    //         </div>
    //     );
    // };
    return(
        // <Layout title="Admin Dashboard" description={`Hello ${name}`} className="container-fluid">
        //     <div className="row">
        //         <div className="col-3">
        //             {adminLinks()}
        //         </div>
        //         <div className="col-9">
        //             {adminInfo()}
        //             {/* {userPurchaseHistory()} */}
        //         </div>
        //     </div>
        // </Layout>
        <div>
            <Layout/>
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-12">
                    {adminLinks()}
                </div>
                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
                    {adminInfo()}
                    {/* {userPurchaseHistory()} */}
                </div>
            </div>
        </div>
    );
};


export default AdminDashboard;