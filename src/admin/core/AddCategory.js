import React, { useState } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddCategory = () =>{
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from localstorage

    const {user, token} = isAuthenticated();
    
    const newCategoryForm = () =>(
        // <form  onClick={clickSubmit}>
        <form>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text" className="form-control"  onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button onClick={clickSubmit} className=" btn btn-outline-primary">Create Category</button>
        </form>
    )

    const handleChange = (e) =>{
        setError('');
        setName(e.target.value);
    }

    const clickSubmit = (e) =>{
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to api to create category   

        createCategory(user._id, token, {name})
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setError('')
                setSuccess(true)
                toast.success("Category is Created Successfully.")
               
            }
        })
    }
    
    const showError = () =>{
        if(error){
            return(
                <div className="alert alert-danger" >
                    Category Should be Unique 
                </div>
            )
        }
    };

    const showSuccess = () =>{
        if(success){
            return(
                <div className="alert alert-info">
                  <h2>Category is Created</h2>
                </div>
            )
        }
    };
    
    const goBack = () =>{
       return(
           <div className="mt-5">
               <Link to="/admin/dashboard" className="text-primary">Back to Dashboard</Link>
           </div>
       )
    };

    return(
        <Layout title="Create Category" description="Add New Category Here" className="container">
           <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* {showSuccess()} */}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
           </div>
        </Layout>
    );
};


export default AddCategory;