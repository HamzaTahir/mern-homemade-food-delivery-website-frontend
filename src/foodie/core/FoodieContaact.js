import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout';
import {authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {read, contact, contactUser} from './apiFoodie'; 
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()

const FoodieContaact = ({match, history}) =>{
    const [values, setValues] = useState({
        role:0,
        name:'',
        email:'',
        query:'',
        error:false,
        success:false
    }); 
    const {token} = isAuthenticated()
    const {role, name, email, query, error, success} = values
    // const init = (userId) =>{
    //     // console.log(userId) 
    //     read(userId, token).then(data =>{
    //         if(data.error){
    //             setValues({...values, error: true})
    //             toast.error(data.error);
    //         }
    //         else{
    //             setValues({...values, name: data.name, email: data.email})
    //             toast.success(data);
    //         }   
    //     })
    // }
    // useEffect(() =>{
        // init(match.params.foodieId)
    // },[])
    const queryForm = (name, email, query) =>(
        <form className="mb-2">
            <div className='form-group'>
                <label className="text-muted">Name</label>
                <input type='text' onChange={handleChange('name')} className='form-control' value={name} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input type='email' onChange={handleChange('email')} className='form-control' value={email} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Query</label>
                <textarea type='text' rows="10" col="50" onChange={handleChange('query')} className='form-control' value={query} />
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Send Query</button>
        </form>
    )
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
    }
    const clickSubmit = (e) =>{
        e.preventDefault()
        if(name !== "" && email!=="" && query!==""){
            contact({role, name, email, query}, token).then(data =>{
                if(data.error){
                    console.log(data.error)
                    toast.error(data.error)
                }
                else{ 
                        setValues({...values, name: data.name, email: data.email, success:true})
                        history.push('/dashboard')
                        toast.success("Query is Submitted. We will Contact you as soon as possible")
                }
            })
        }
        else{
            toast.error("Please Fill all Fields")
        }
    }
    const redirectUser = (success) =>{
        if(success){
            return <Redirect to="/dashboard/"/>
        }
    }
    return(
        <div>
            <Layout title="Profile" description="contact Your Profile" className="container-fluid">
                <div className="container col-md-8" style={{marginTop:10}}> 
                    <h2 className="mb-4">Contact Us</h2>
                    {queryForm(name, email, query)}
                    {/* {redirectUser(success)} */}
                </div>
            </Layout>
            <Footer/>
        </div>
    );
};


export default FoodieContaact;