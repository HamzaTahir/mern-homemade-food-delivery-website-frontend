import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {createProduct} from './apiAdmin';
import {getCategories} from './apiAdmin';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = () =>{
    //destructure user and token from localstorage

    const {user, token} = isAuthenticated();
    
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    });

    const {name, description, price, categories, category, shipping, quantity,loading,
           error, createdProduct, redirectToProfile, formData} = values;

    // get categories
    const init = () =>{
        getCategories()
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error});
            }
            else{
                setValues({...values, categories:data, error:'', formData:new FormData()});
            }
        })
    }
    
    useEffect(()=>{
        init();
    },[])


    const newProductForm = () =>(
        // <form  onClick={clickSubmit}>
        <form className="mb-3" onSubmit= {clickSubmit} >
            <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name} autoFocus required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea className="form-control" onChange={handleChange('description')} value={description} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product price</label>
                <input type="number" className="form-control" onChange={handleChange('price')} value={price} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Category</label>
                <select className="form-control" onChange={handleChange('category')} required>
                    <option>Please Select Category</option>
                    {categories && categories.map((data, i) =>(
                        <option key={i} value={data._id}>{data.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Shipping</label>
                <select className="form-control" onChange={handleChange('shipping')} required>
                    <option>Please Select Category</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Quantty</label>
                <input type="number" className="form-control" onChange={handleChange('quantity')} value={quantity} required/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Image</label><br></br>
                <label className="btn btn-secondary">
                    <input type="file" className="" onChange={handleChange('photo')} name="photo" accept="image/*"/>
                </label>
            </div>
            <button className=" btn btn-outline-primary">Create Product</button>
        </form>
    )

    const handleChange = name => event =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value)
        setValues({...values, error:'', [name]:value});
    }

    const clickSubmit = event =>{
        event.preventDefault();
        setValues({...values, error:'', loading:false});
        // // make request to api to create category   
        formData.set("foodlancer", user._id);
        createProduct(user._id, token, formData)
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, createdProduct:''});
            }
            else{
                setValues({...values,  name:'', description:'', price:'', quantity:'', photo:'', error:'',
                          loading:false, createdProduct:name});
                toast.success("Product is Created Successfully.")
                          // console.log("createProduct: " + createProduct);
            }
        })
    }
    
    const showError = () =>(
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error} 
        </div>
    );

    const showSuccess = () =>{
        return(
        <div className="alert alert-info" style={{display: createdProduct ? "" : "none"}}>
                <h2>{`${createdProduct}`} is Created</h2>
            </div>
        )
    };
    
    const showLoading = () =>{
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>) 
    };

    const goBack = () =>{
       return(
           <div className="mt-5">
               <Link to="/admin/dashboard" className="text-primary">Back to Dashboard</Link>
           </div>
       )
    };

    return(
        <Layout title="Create Product" description="Add New Product Here" className="container">
           <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* {showSuccess()} */}
                    {showError()}
                    {newProductForm()}
                    {showLoading()}
                    {goBack()}
                </div>
           </div>
        </Layout>
    );
};


export default AddProduct;