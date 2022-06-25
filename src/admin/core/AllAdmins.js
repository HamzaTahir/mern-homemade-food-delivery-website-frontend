import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listAdmins, removeAdmins} from './apiAdmin';
import moment from 'moment';
// import foodlancer from '../../../../fyp_project/models/foodlancer';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const AllAdmins = () =>{
    const [admins, setAdmins] = useState([])
    const {user, token} = isAuthenticated()
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadAdmins = () =>{
        setloading({...loadings, loading1:true})
        listAdmins(user._id, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                setAdmins(data)
            }
        })
    }

    useEffect(()=>{
        loadAdmins()
    },[])

    const showAdminsLength = () =>{
        if(admins.length > 0){
            return(
                <h4 className="text-danger display-2">Total Admins: {admins.length}</h4>
            )
        }
        else{
            return (
                <h4 className="text-danger">No Admins</h4>    
            )
        }
    }
    const removeAdmin = (adminId) =>{
        setloading({...loadings, loading1:true})
        removeAdmins(user._id, adminId, token).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                console.log(data.error)
            }
            else{
                setloading({...loadings, loading1:false})
                // setDeleteFoodie(data)
                toast.success("Order Status Updated Successfully.")
                loadAdmins()
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
            <Layout title="All Foodlancers" description={`Hello ${user.name}, You Can Manage All Admins Here`} className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showAdminsLength()}
                        {admins.map((admin, adminIndex)=>{
                            return(
                                <div className="mt-5" key={adminIndex} style={{borderBottom:"5px solid indigo"}}>
                                    <h2 className="mb-5">
                                        <span className="bg-primary">
                                            Admin ID: {admin._id} 
                                        </span>
                                    </h2>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">
                                            Admin Name: {admin.name}
                                        </li>
                                        <li className="list-group-item">
                                            Admin Email: {admin.email}
                                        </li>
                                        <li className="list-group-item">
                                            Admin Account Created On: {moment(admin.createdAt).fromNow()}
                                        </li>
                                    </ul>
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-warning mt-2 mb-2">
                                                <Link style={{color:"black", textDecoration:'none'}} to={`update/admin/profile/${admin._id}`}>Update</Link>
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-danger mt-2 mb-2" onClick={() => {removeAdmin(admin._id) }}>
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

export default AllAdmins;