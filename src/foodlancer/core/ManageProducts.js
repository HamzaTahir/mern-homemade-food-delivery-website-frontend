import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getFoodlancerProducts, deleteProduct } from "./apiFoodlancer";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    // const [length, setLength] = useState(0)
    const { user, token } = isAuthenticated();

    const [loadings, setloading] = useState({
        loading1: false, 
        noProducts:false
    })
    const {loading1} = loadings
    const loadProducts = () => {
        setloading({...loadings, loading1:true})
        getFoodlancerProducts(user._id).then(data => {
            if (data.error) {
                setloading({...loadings, loading1:false})
                console.log(data.error);
            } else {
                setloading({...loadings, loading1:false})
                setProducts(data);
                // setLength(products.length)
            }
        });
    };

    const destroy = productId => {
        setloading({...loadings, loading1:true})
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                setloading({...loadings, loading1:false})
                console.log(data.error);
            } else {
                setloading({...loadings, loading1:false})
                toast.success("Product is Deleted Successfully.")
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);
    const noProductsFunction = () =>{
        return(
            <div style={{textAlign:'center'}}>
                <h4>No Products</h4>
            </div>
        )
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
        return (
            <Layout
                title="Manage Your Products"
                description="You Can Manage All Your Products Hete"
                className="container-fluid"
            >
                <div className="row">
                    { //Check if message failed
                        (products.length!==0)? 
                        <div className="col-12"> 
                            <ul className="list-group">
                                <li className="list-group-item d-flex justify-content-between align-items-center">
                                    <div className="col-xl-8 ol-lg-8 col-md-6 col-sm-6 col-6">
                                        <h5>Product Name</h5>
                                    </div>
                                    <div className="col-xl-2 ol-lg-2 col-md-3 col-sm-3 col-3">
                                        <h5>Product Update</h5>
                                    </div>
                                    <div className="col-xl-1 ol-lg-1 col-md-3 col-sm-3 col-3">
                                        <h5>Product Delete</h5>
                                    </div>
                                </li>                                       
                            </ul>
                            <ul className="list-group">
                                {products.map((p, i) => {
                                        return(
                                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                                 <div className="col-xl-8 ol-lg-8 col-md-6 col-sm-6 col-6">
                                                    <strong>{p.name}</strong>
                                                </div>
                                                <div className="col-xl-1 ol-lg-1 col-md-3 col-sm-3 col-3">
                                                    <Link to={`/foodlancer/product/update/${p._id}`}>
                                                        <span className="badge badge-warning badge-pill">
                                                            Update
                                                        </span>
                                                    </Link>
                                                </div>
                                                <div className="col-xl-1 ol-lg-1 col-md-3 col-sm-3 col-3">
                                                    <span
                                                        onClick={() => destroy(p._id)}
                                                        className="badge badge-danger badge-pill"
                                                    >
                                                        Delete
                                                    </span>
                                                </div>
                                            </li>
                                        )
                                })}
                            </ul>
                            <br />
                        </div> 
                        : 
                        <div className="col-12" style={{textAlign:'center'}}> 
                            <h4>No Products</h4>
                        </div> 
                    }
                </div> 
            </Layout>
        );
    }
};

export default ManageProducts;