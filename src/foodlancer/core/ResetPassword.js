import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import {resetPassword} from '../auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()


const ResetPassword = ({history, match}) =>{
    const [values, setValues] = useState({
        password:'',
        token: match.params.tokenId,
        error:false,
        success:false
    }); 
    const {password, token, error, success} = values
    const forgetButton = () =>{
        resetPassword({password, token})
        .then(data =>{
            if(data.error){
                setValues({...values, error: true})
                toast.error(data.error);
            }
            else{
                setValues({...values, success: true})
                history.push('/foodlancer/signin')
                toast.success("New Password has been set Successfully");
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
                <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Foodlancer New Password</p>
                <div className='form-group'>
                <label className="text-muted">Password</label>
                    <input type='password' onChange={handleChange('password')} className='form-control' value={password}/>
                </div>
                <button className='btn btn-primary' onClick={forgetButton}>Set New Password</button>
            </div>
        </div>
    );
};

export default ResetPassword;
