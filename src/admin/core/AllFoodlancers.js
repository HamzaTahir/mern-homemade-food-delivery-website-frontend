import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listFoodlancers, removeFoodlancers} from './apiAdmin';
import moment from 'moment';
// import foodlancer from '../../../../fyp_project/models/foodlancer';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const AllFoodlancers = () =>{
    const [foodlancers, setFoodlancers] = useState([])
    const {user, token} = isAuthenticated()
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadFoodlancers = () =>{
        setloading({...loadings, loading1:true})
        listFoodlancers(user._id, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                setFoodlancers(data)
            }
        })
    }

    useEffect(()=>{
        loadFoodlancers()
    },[])

    const showFoodlancersLength = () =>{
        if(foodlancers.length > 0){
            return(
                <h4 className="text-danger display-2">Total Foodlancers: {foodlancers.length}</h4>
            )
        }
        else{
            return (
                <h4 className="text-danger">No Foodlancer</h4>    
            )
        }
    }
    const removeFoodie = (foodlancerId) =>{
        setloading({...loadings, loading1:true})
        removeFoodlancers(user._id, foodlancerId, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                // setDeleteFoodie(data)
                toast.success("Order Status Updated Successfully.")
                loadFoodlancers()
            }
        })
    }
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
            <Layout title="All Foodlancers" description={`Hello ${user.name}, You Can Manage All Foodlancers Here`} className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showFoodlancersLength()}
                        {foodlancers.map((foodlancer, foodlancerIndex)=>{
                            return(
                                <div className="mt-5" key={foodlancerIndex} style={{borderBottom:"5px solid indigo"}}>
                                    <h2 className="mb-5">
                                        <span className="bg-primary">
                                            Foodlancers ID: {foodlancer._id} 
                                        </span>
                                    </h2>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            Foodlancers Name: {foodlancer.name}
                                        </li>
                                        <li className="list-group-item">
                                            Foodlancers Email: {foodlancer.email}
                                        </li>
                                        <li className="list-group-item">
                                            Foodlancers Account Created On: {moment(foodlancer.createdAt).fromNow()}
                                        </li>
                                    </ul>
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-warning mt-2 mb-2">
                                                <Link style={{color:"black", textDecoration:'none'}} to={`foodlancer/update/profile/${foodlancer._id}`}>Update</Link>
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-danger mt-2 mb-2" onClick={() => {removeFoodie(foodlancer._id) }}>
                                            Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default AllFoodlancers;