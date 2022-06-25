import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../foodie/core/Layout';
import {signup, authenticate, facebooksignup, googlesignup} from '../foodie/auth/index';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// or
// import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()

const Signup = () =>{
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name, email, password, error, success} = values;

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false})
        signup({name, email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, success:false})
                toast.error(data.error);
            }
            else{
                setValues({...values, name:'', email:'', password:'', error:'', success:true})
                toast.success("Sign Up In Successfully");
            }
        })
    }
 
    

    const signupForm = () =>(
        <form>
            <div className="form-group">
                <label className="text">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className=" btn btn-primary" style={{width:100}}>Sign Up</button>
        </form>
    );

    const showError = () =>{
        if(error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
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

    const showSuccess = () =>(
        <div className="alert alert-info" 
            style={{
                display:success?'':'none'
            }}>
            Account is Created. <Link to="/signin">Please Signin</Link>
        </div>
    );

    const responseFacebook = (response) => {
        const {name, email} = response;
        // console.log(name + " " + email);
        if(response === undefined || response === ''){
            console.log("No User is sent in Response by FB");
        }
        else{
            facebooksignup({name, email})
            .then(data =>{
                if(data.error){
                    if(error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                        setValues({...values, error:"Email Already Exist"})
                        toast.error(data.error);
                    }
                    else{
                        setValues({...values, error:data.error, loading:false})
                        toast.error(data.error);
                    }
                }
                else{
                    authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        toast.success("Sign Up In Successfully");
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
        }
        else{
            googlesignup({name, email})
            .then(data =>{
                if(data.error){
                    if(error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                        setValues({...values, error:"Email Already Exist"})
                        toast.error(data.error);
                    }
                    else{
                        setValues({...values, error:data.error, loading:false})
                        toast.error(data.error);
                    }
                }
                else{
                    authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        toast.success("Sign Up In Successfully");
                    })
                }
            })
        }
    }
    return(
        // <Layout title="Signup" description="Node React E-Commerce App Signup" className="container col-md-8 offset-md-2">
        //     {showSuccess()}
        //     {showError()}
        //     {signupForm()}
        //     {error}
        //     {/* {JSON.stringify(values)} */}
        // </Layout>
        <div>
        <Layout/>
        <div className="container col-md-8" style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}> 
            <p style={{fontSize:27, fontWeight:600, textAlign:"center", margin:0, padding:0}}>Welcome!</p>
            <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Foodie Sign Up</p>
            {showSuccess()}
            {/* {showError()} */}
            <div className="row" style={{marginTop:30}}>
                      <div className="col-6">
                        {signupForm()}
                      </div>
                      <div className="col-6">
                        <div className="text-muted">
                            External Sign Up
                        </div>
                        <div style={{margin:10}}>
                            <FacebookLogin
                                appId="116202456910700"
                                autoLoad={false}
                                fields="name,email"
                                callback={responseFacebook}
                                icon="fa-facebook mr-1"
                                cssClass="fb_styling py-2 rounded-lg"
                            />
                            {/* <span>&nbsp; OR &nbsp;</span>  */}
                            <p style={{width:'100%', textAlign:'center', margin:0, padding:0}}>&nbsp; OR &nbsp;</p> 
                            {/* <GoogleLogin
                                clientId="839424098921-u1gs7fj2bn15tva426lojvva0hbpbuv5.apps.googleusercontent.com"
                                buttonText="Sign Up with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            /> */}
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
                  </div>
            </div>
            <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{
                //   position: 'absolute', left: '50%', top: '50%',
                //   transform: 'translate(-50%, -50%)'
                }}> 
                <p style={{fontSize:27, fontWeight:600, textAlign:"center", margin:0, padding:0}}>Welcome!</p>
                <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Foodie Login</p>
                  {/* {showError()} */}
                  {showLoading()}
                  <div className="row" style={{marginTop:30}}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div>
                                {signupForm()}
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
                                 {/* <FacebookLogin
                                    appId="116202456910700"
                                    autoLoad={false}
                                    fields="name,email"
                                    callback={responseFacebook}
                                    cssClass="fb_styling"
                                    render={renderProps => (
                                        <button
                                            onClick={renderProps.onClick}
                                            className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                                            style={{width:'100%'}}>
                                            <div className=' p-2 rounded-full '>
                                                <i class="fa fa-google" aria-hidden="true">
                                                    Sign In with Facebook
                                                </i>
                                            </div>
                                        </button>
                                    )}
                                /> */}
                                <p style={{width:'100%', textAlign:'center', margin:0, padding:0}}>&nbsp; OR &nbsp;</p> 
                                {/* <GoogleLogin
                                    clientId="839424098921-u1gs7fj2bn15tva426lojvva0hbpbuv5.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                /> */}
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
                            style={{backgroundColor:'#dae5ed'}}>
                            <img src="./logo2.png" className="imageCenter" 
                                style={{width:'65%'}}/>
                        </div>
                  </div>
            </div>
        </div>
    );
};

// const Signup = () =>(
//     <Layout title="Signup" description="Node React E-Commerce App Signup">
//         {API}
//     </Layout>
// )
  
export default Signup;
