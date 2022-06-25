import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../admin/core/Layout';
import {signin, authenticate, isAuthenticated, facebooklogin, googlesignin} from '../admin/auth/index';
// import {signin, authenticate, isAuthenticated, facebooklogin, googlesignin} from '../foodie/auth/index';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// import { ToastContainer, toast } from 'react-toastify';
// import { ToastProvider, useToasts } from 'react-toast-notifications'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './core/Menu';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

toast.configure()
const Signin = ({history}) =>{
    const [values,setValues] = useState({
        email:'sulemanhamzatahir1111@gmail.com',
        password:'111111',
        error:'',
        loading:false,
        redirectToReferrer:false
    });
    const [loadings, setloading] = useState({
        loading1: false,
    })
    const {loading1} = loadings
    const {email, password, error, loading, redirectToReferrer} = values;
    // const  {user}  = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        setloading({...loadings, loading1:true})
        signin({email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, loading:false})
                setloading({...loadings, loading1:false})
                toast.error(data.error);
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values, redirectToReferrer:true})
                    setloading({...loadings, loading1:false})
                    history.push('/admin/dashboard');
                })
                toast.success("Logged In Successfully");
            }
        })
    }

    

    const signinForm = () =>(
        <form>
            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            {/* <button onClick={clickSubmit} className=" btn btn-primary">Submit</button> */}
            <button onClick={clickSubmit} className=" btn btn-primary" style={{width:'100%'}}
                className='py-2 rounded-lg'>
                <i className='fa fa-sign-in mr-1' />
                Login
            </button> 
            {/* <div style={{textAlign:'right', width:'100%'}}>
                <Link to="/admin/forget/password" style={{color:'#F40009'}}>Forget Password</Link>
            </div> */}
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-7">
                    <Link to="/admin/signup" style={{color:'#007bff'}}>Don't have a Account?</Link>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5" style={{textAlign:'right'}}>
                    <Link to="/admin/forget/password" style={{color:'#F40009'}}>Forget Password</Link>
                </div>
            </div>
        </form>
    );

    const showError = () =>{
        if(error ==="11000 duplicate key error collection: ecommerce.admins index: email already exists"){
            setValues({...values, error:"Email Already Exist"})
        }
        return(
            <div className="alert alert-danger" 
                style={{
                    display:error?'':'none'
                }}>
                {error}
            </div>
        )
    };

    const showLoading = () =>
        loading && (
                <div className="alert alert-info">
                  <h2>Loading...</h2>
                </div>
    );

    // const redirectUser = () =>{
    //     if(redirectToReferrer === true){
    //        if(user && user.role === 1){
    //             return <Redirect to="/admin/dashboard"/>
    //        }
    //        else{
    //             return <Redirect to="/user/dashboard"/>
    //        }
    //     }
    //     if(isAuthenticated()){
    //         return <Redirect to="/"/>
    //      }
    // }
    const responseFacebook = (response) => {
        const {name, email} = response;
        // console.log(name + " " + email);
        if(response === undefined || response === ''){
            console.log("No User is sent in Response by FB");
            toast.error("No FB account is attach");
        }
        else{
            setloading({...loadings, loading1:true})
            facebooklogin({name, email})
            .then(data =>{
                if(data.error){
                    setValues({...values, error:data.error, loading:false})
                    setloading({...loadings, loading1:false})
                    toast.error(data.error);
                }
                else{
                    authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        setloading({...loadings, loading1:false})
                        toast.success("Logged In Successfully");
                        history.push('/admin/dashboard');
                    })
                }
            })
        }
    }
    const responseGoogle = (response) => {
        // console.log(response);
        // console.log(response.profileObj.email);
        // console.log(response.profileObj.name);
        const {name, email} = response.profileObj;
        // console.log(name + " " + email);
        if(response === undefined || response === ''){
            console.log("No User is sent in Response by Google");
            toast.error("No Google account is attach");
        }
        else{
            setloading({...loadings, loading1:true})
            googlesignin({name, email})
            .then(data =>{
                if(data.error){
                    setValues({...values, error:data.error, loading:false})
                    setloading({...loadings, loading1:false})
                    toast.error(data.error);
                }
                else{
                    authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        setloading({...loadings, loading1:false})
                        toast.success("Logged In Successfully");
                        history.push('/admin/dashboard');
                    })
                }
            })
        }
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
            <Menu/>
            {/* <Layout/> */}
            <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{
                }}> 
                <p style={{fontSize:27, fontWeight:600, textAlign:"center", margin:0, padding:0}}>Welcome!</p>
                <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Admin Login</p>
                {/* {showError()} */}
                {/* {showLoading()} */}
                <div className="row" style={{marginTop:30}}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                            <div>
                                {signinForm()}
                            </div>
                            <br/>
                            <div className="text" style={{marginBottom:5}}>
                                External Login
                            </div>
                            <div>
                                <FacebookLogin
                                    appId="116202456910700"
                                    autoLoad={false}
                                    fields="name,email"
                                    callback={responseFacebook}
                                    icon="fa-facebook mr-1"
                                    cssClass="fb_styling py-2 rounded-lg"
                                />
                                <p style={{width:'100%', textAlign:'center', margin:0, padding:0}}>&nbsp; OR &nbsp;</p> 
                                <GoogleLogin
                                    clientId="839424098921-u1gs7fj2bn15tva426lojvva0hbpbuv5.apps.googleusercontent.com"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='py-2 rounded-lg'
                                        style={{width:'100%'}}>
                                        <div className='rounded-full '>
                                            <i className='fa fa-google mr-1' />
                                            Login with Google
                                        </div>
                                        </button>
                                    )}
                                ></GoogleLogin>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"  
                            style={{height:'465px'}}>
                            {/* style={{backgroundColor:'#dae5ed', height:'465px'}}> */}
                            <img src="../admin.png" className="imageCenter" 
                                style={{width:'65%'}}/>
                        </div>
                </div>
            </div>
        </div>   
        );
    }
};
  
export default Signin;
