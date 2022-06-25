import React,{useEffect, useState} from 'react';
import Layout from './Layout';
import {activateAccount} from '../auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()


const Activation = ({history, match}) =>{
    const [values, setValues] = useState({
        error:false,
        success:false
    }); 
    // useEffect(()=>{
    //     let token = match.params.tokenId;
    // },[])
    const activationButton = () =>{
        // console.log("HERE :: ");
        // console.log("MATCH :: " + match.params.tokenId);
        activateAccount(match.params.tokenId)
        // activateAccount()
        .then(data =>{
            if(data.error){
                setValues({...values, error:true})
                if(data.error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                    toast.error("Email Already Exist");
                }
                else{
                    toast.error(data.error);
                }
                // setValues({...values, error: true})
                // toast.error(data.error);
            }
            else{
                setValues({...values, success: true})
                history.push('/signin')
                toast.success("Account is Activated. Kindly Login");
            }   
        })
    }
    return(
           <div>
               {/* <Layout/> */}
               <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{marginTop:30}}>
                    <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Foodie Email Activation</p>
                    <div className="row" style={{marginTop:30}}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className='form-group'>
                                {/* <button className='btn btn-primary' onClick={clickSubmit}>Submit</button> */}
                                <p style={{fontSize:27, fontWeight:600}}>Click Here to Activate Your Account</p>
                                <button className='btn btn-primary' onClick={activationButton}>Activate Account</button>
                                {/* <button onClick={activateAccount()}>Activate Account</button> */}
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"  
                            style={{backgroundColor:'#dae5ed', height:'465px'}}>
                            <img src="../../email-1.png" className="imageCenter" 
                                style={{width:'65%'}}/>
                        </div>
                        {/* {JSON.stringify(values.success)} */}
                    </div>
                </div>
           </div>
    );
};

export default Activation;
