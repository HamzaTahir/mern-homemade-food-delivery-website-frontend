import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import {forgetPassword} from '../auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()


const ForgetPassword = ({match}) =>{
    const [values, setValues] = useState({
        email:'',
        error:false,
        success:false
    }); 
    const {email, error, success} = values
    const forgetButton = () =>{
        forgetPassword({email})
        .then(data =>{
            if(data.error){
                setValues({...values, error: true})
                toast.error(data.error);
            }
            else{
                setValues({...values, success: true})
                toast.success("Password Reset Email Has Been Sent Successfully");
            }   
        })
    }
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
    }
    return(
        <div>
            <Layout/>
             <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{marginTop:30}}>
                <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Foodlancer Forget Password</p>
                <div className='form-group'>
                    <label className="text-muted">Enter Your Email</label>
                    <input type='email' onChange={handleChange('email')} className='form-control' value={email}/>
                </div>
                <button className='btn btn-primary' onClick={forgetButton}>Send Reset Email</button>
                  {/* {JSON.stringify(values.success)} */}
            </div>
        </div>
    );
};

export default ForgetPassword;
