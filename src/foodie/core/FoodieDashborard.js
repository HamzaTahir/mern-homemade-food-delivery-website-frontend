import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {getPurchaseHistory, read} from './apiFoodie';

import moment from 'moment';
const Dashboard = () =>{
    const [history, setHistory] = useState([]);
    const [values, setValues] = useState({
        name:'',
        email:'',
    }); 
    const {name, email} = values
    const  {user:{_id}}  = isAuthenticated();
    const {token} = isAuthenticated()
    
    const init = (foodieId, token) =>{
        // console.log(foodieId + "  " +token);
        getPurchaseHistory(foodieId, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setHistory(data);
            }   
        })
        read(_id, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }
            else{
                setValues({...values, name: data.name, email: data.email})
            }   
        })
    }

    useEffect (()=>{
      init(_id, token);      
    },[])

    const userLinks = () =>{
        return(
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item ">
                       <Link className="nav-link" to="/cart" style={{color:"black"}}>My Cart</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to={`/profile/${_id}`} style={{color:"black"}}>Update Profile</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to={`/order/eta/`} style={{color:"black"}}>View Order's ETA</Link>
                    </li>
                </ul>
            </div>
        );
    };
    const userInfo = () =>{
        return(
                <div className="card mb-5">
                    <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item ">
                            Name: {name}
                        </li>
                        <li className="list-group-item ">
                            Email: {email}
                        </li>
                        <li className="list-group-item ">
                            Role: User
                        </li>
                    </ul>
                </div>
        );
    };
    const userPurchaseHistory = history => {
        if(history.length > 0){
            return (
                <div className="card mb-5">
                    <h3 className="card-header">Purchase history</h3>
                    <div style={{height: "500px", overflowY: "scroll"}}>
                        <ul className="list-group">
                            <li className="list-group-item">
                                {history.map((h, i) => {
                                    return (
                                    <div className="mt-5" key={i} style={{borderBottom:"2px solid indigo"}}>
                                            <h6>Order Id: {h._id}</h6>
                                            <hr />
                                            {h.products.map((p, i) => {
                                                return (
                                                    <div key={i}>
                                                        <h6>Product name: {p.name}</h6>
                                                        <h6>Product price: {p.price}Rs.</h6>
                                                        <h6>Purchased date: {moment(p.createdAt).fromNow()}</h6>
                                                        <br/>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="card mb-5">
                    <h3 className="card-header">Purchase history</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <p>No Purchase History</p>
                        </li>
                    </ul>
                </div>
            );
        }
    };
    
    return(
        // <Layout title="User Dashboard" description={`Hello ${name}`} className="container-fluid">
        //     <div className="row">
        //         <div className="col-3">
        //             {userLinks()}
        //         </div>
        //         <div className="col-9">
        //             {userInfo()}
        //             {userPurchaseHistory()}
        //         </div>
        //     </div>
        // </Layout>
        <div>
            <Layout/>
            <div className="container-fluid" style={{margin:10}}>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-12">
                        {userLinks()}
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
                        {userInfo()}
                        {/* {history} */}
                        {userPurchaseHistory(history)}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;