import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../foodie/core/Layout';
import {signup, authenticate, facebooksignup, googlesignup} from '../foodie/auth/index';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
// or
// import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()

const Signup = ({history}) =>{
    const [values,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });
    const [loading, setloading] = useState({
        loading1: false,
    })
    const {loading1} = loading
    const {name, email, password, error, success} = values;

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false})
        setloading({...loading, loading1:true})
        signup({name, email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, success:false})
                if(data.error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                    setValues({...values, error:"Email Already Exist"})
                    setloading({...loading, loading1:false})
                    toast.error("Email Already Exist");
                }
                else{
                    setValues({...values, error:data.error})
                    setloading({...loading, loading1:false})
                    toast.error(data.error);
                }
            }
            else{
                setValues({...values, name:'', email:'', password:'', error:'', success:true})
                // history.push('/login');
                setloading({...loading, loading1:false})
                toast.success("KHANSAMA Send You Email Kindly Activate Your Account");
                setValues({...values, name:'', email:'', password:''})
                // toast.success("Sign Up In Successfully");
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
            {/* <button onClick={clickSubmit} className=" btn btn-primary" style={{width:100}}>Sign Up</button> */}
            <button onClick={clickSubmit} className=" btn btn-primary" style={{width:'100%'}}
                className='py-2 rounded-lg'>
                <i className='fa fa-sign-in mr-1' />
                Sign Up
            </button>
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
            setloading({...loading, loading1:true})
            facebooksignup({name, email})
            .then(data =>{
                if(data.error){
                    if(error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                        setValues({...values, error:"Email Already Exist"})
                        setloading({...loading, loading1:false})
                        toast.error("Email Already Exist");
                    }
                    else{
                        setValues({...values, error:data.error, loading:false})
                        setloading({...loading, loading1:false})
                        toast.error(data.error);
                    }
                }
                else{
                    // authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        // toast.success("Sign Up In Successfully");
                        setloading({...loading, loading1:false})
                        toast.success("KHANSAMA Send You Email Kindly Activate Your Account");
                    // })
                }
                setValues({...values, name:'', email:'', password:''})
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
            setloading({...loading, loading1:true})
            googlesignup({name, email})
            .then(data =>{
                if(data.error){
                    if(error === "11000 duplicate key error collection: khansama.foodies index: email already exists"){
                        setValues({...values, error:"Email Already Exist"})
                        setloading({...loading, loading1:false})
                        toast.error(data.error);
                    }
                    else{
                        setValues({...values, error:data.error, loading:false})
                        setloading({...loading, loading1:false})
                        toast.error(data.error);
                    }
                }
                else{
                    // authenticate(data, ()=>{
                        setValues({...values, redirectToReferrer:true})
                        // toast.success("Sign Up In Successfully");
                        setloading({...loading, loading1:false})
                        toast.success("KHANSAMA Send You Email Kindly Activate Your Account");
                    // })
                }
                setValues({...values, name:'', email:'', password:''})
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
            <Layout/>
                <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12" style={{
                    }}> 
                    <p style={{fontSize:27, fontWeight:600, textAlign:"center", margin:0, padding:0}}>Welcome!</p>
                    <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Foodie SignUp</p>
                        {/* {showError()} */}
                        {showSuccess()}
                        <div className="row" style={{marginTop:30}}>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                                <div>
                                    {signupForm()}
                                </div> 
                            <div className="row">
                                <div className="col-12" style={{textAlign:'right'}}>
                                    <Link to="/signin" style={{color:'#007bff'}}>Have a Account? Login here</Link>
                                </div>
                            </div>
                                <br/>
                                <div className="text" style={{marginBottom:5}}>
                                    External SignUp
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
                                                SignUp with Google
                                            </div>
                                            </button>
                                        )}
                                    ></GoogleLogin>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"  
                                style={{height:'465px'}}>
                                {/* style={{backgroundColor:'#dae5ed', height:'465px'}}> */}
                                <img src="./logo2.png" className="imageCenter" 
                                    style={{width:'65%'}}/>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
};

  
export default Signup;
