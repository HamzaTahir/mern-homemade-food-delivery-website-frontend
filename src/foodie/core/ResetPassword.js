import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import {resetPassword} from '../auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()


const ResetPassword = ({history, match}) =>{
    const [values, setValues] = useState({
        password:'',
        token: match.params.tokenId,
        error:false,
        success:false
    }); 
    const [loadings, setloading] = useState({
        loading1: false,
    })
    const {loading1} = loadings 
    const {password, token, error, success} = values
    const forgetButton = () =>{
        setloading({...loadings, loading1:true})
        resetPassword({password, token})
        .then(data =>{
            if(data.error){
                setValues({...values, error: true})
                setloading({...loadings, loading1:false})
                toast.error(data.error);
            }
            else{
                setValues({...values, success: true})
                setloading({...loadings, loading1:false})
                history.push('/signin')
                toast.success("New Password has been set Successfully");
            }   
        })
    }
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
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
            <div>
                <Layout/>
                <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{marginTop:30}}>
                    <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Foodie New Password</p>
                    <div className='form-group'>
                    <label className="text-muted">Password</label>
                        <input type='password' onChange={handleChange('password')} className='form-control' value={password}/>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button className='btn btn-primary' onClick={forgetButton} style={{width:'100%'}}>
                                Set New Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ResetPassword;
