import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadProducts = () => {
        setloading({...loadings, loading1:true})
        getProducts().then(data => {
            if (data.error) {
                setloading({...loadings, loading1:false})
                console.log(data.error);
            } else {
                setloading({...loadings, loading1:false})
                setProducts(data);
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
                title="Manage Products"
                description="Your Can Manage All Products Hete"
                className="container-fluid"
            >
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">
                            Total {products.length} products
                        </h2>
                        <hr />
                        <ul className="list-group">
                            {products.map((p, i) => (
                                <li
                                    key={i}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div className="col-8">
                                        <strong>{p.name}</strong>
                                    </div>
                                    <div className="col-2">
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <span className="badge badge-warning badge-pill">
                                                Update
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="col-2">
                                        <span
                                            onClick={() => destroy(p._id)}
                                            className="badge badge-danger badge-pill"
                                        >
                                            Delete
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <br />
                    </div>
                </div>
            </Layout>
        );
    }
};

export default ManageProducts;