import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listFoodies, getStatusValues, updateStatusValues, removeFoodies, updateFoodies} from './apiAdmin';
import moment from 'moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const AllFoodies = () =>{
    const [foodies, setFoodies] = useState([])
    const [statusValues, setstatusValues] = useState([])
    const [deleteFoodie, setDeleteFoodie] = useState('false')
    const {user, token} = isAuthenticated()
    
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadFoodies = () =>{
        setloading({...loadings, loading1:true})
        listFoodies(user._id, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                setFoodies(data)
            }
        })
    }
    // const loadStatusValues = () =>{
    //     getStatusValues(user._id, token).then(data =>{
    //         if(data.error){
    //             console.log(data.error)
    //         }
    //         else{
    //             setstatusValues(data)
    //         }
    //     })
    // }

    useEffect(()=>{
        loadFoodies()
        // loadStatusValues()
    },[])

    const showFoodiesLength = () =>{
        if(foodies.length > 0){
            return(
                <h4 className="text-danger display-2">Total Foodies: {foodies.length}</h4>
            )
        }
        else{
            return (
                <h4 className="text-danger">No Foodie</h4>    
            )
        }
    }
    // const showInput = (key, value) =>(
    //     <div className="input-group mb-2 mr-sm-2">
    //         <div className="input-group-prepand">
    //             <div className="input-group-text">
    //                 {key}
    //             </div>
    //         </div>
    //         <input type="text" value={value} className="form-control" readOnly/>
    //     </div>
    // )
    // const handleStatusChange = (e, orderId) =>{
    //     // console.log("Update Order Status")
    //     updateStatusValues(user._id, token, orderId, e.target.value).then(data=>{
    //         if(data.error){
    //             console.log('Status Update Failed')
    //         }
    //         else{
    //             loadFoodies()
    //         }
    //     })
    // }
    // const showStatus = (o) =>(
    //     <div className = "form-group">
    //         <h3 className = "mark mb-4">Status: {o.status}</h3>
    //         <select className = "form-control" onChange = {(e)=>(handleStatusChange(e, o._id))}>
    //             <option>Update Status</option>
    //             {statusValues.map((status, index)=>(
    //                 <option key={index} value={status}>
    //                     {status}
    //                 </option>
    //             ))}
    //         </select>
    //     </div>
    // )
    // const updateFoodie = () =>{
    //     // updateFoodies(user._id, token).then(data =>{
    //     //     if(data.error){
    //     //         console.log(data.error)
    //     //     }
    //     //     else{
    //     //         setFoodies(data)
    //     //     }
    //     // })
    // }
    
    const removeFoodie = (foodieId) =>{
        setloading({...loadings, loading1:true})
        removeFoodies(user._id, foodieId, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                // setDeleteFoodie(data)
                toast.success("Order Status Updated Successfully.")
                loadFoodies()
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
            <Layout title="All Foodies" description={`Hello ${user.name}, You Can Manage All Foodies Here`} className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showFoodiesLength()}
                        {foodies.map((foodie, foodieIndex)=>{
                            return(
                                <div className="mt-5" key={foodieIndex} style={{borderBottom:"5px solid indigo"}}>
                                    <h2 className="mb-5">
                                        <span className="bg-primary">
                                            Foodie ID: {foodie._id} 
                                        </span>
                                    </h2>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            Foodie Name: {foodie.name}
                                        </li>
                                        <li className="list-group-item">
                                            Foodie Email: {foodie.email}
                                        </li>
                                        <li className="list-group-item">
                                            Foodie Account Created On: {moment(foodie.createdAt).fromNow()}
                                        </li>
                                    </ul>
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-warning mt-2 mb-2">
                                                <Link style={{color:"black", textDecoration:'none'}} to={`foodie/update/profile/${foodie._id}`}>Update</Link>
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-danger mt-2 mb-2" onClick={() => {removeFoodie(foodie._id) }}>
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

export default AllFoodies;