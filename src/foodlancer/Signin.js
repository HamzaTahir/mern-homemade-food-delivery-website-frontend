import React,{useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../foodlancer/core/Layout';
import {signin, authenticate, isAuthenticated} from '../foodlancer/auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";
// import { css } from "@emotion/core";
// Call it once in your app. At the root of your app is the best place
import Menu from './core/Menu';

toast.configure()
const Signin = ({history}) =>{
    const [values,setValues] = useState({
        email:'sulemanhamzatahir@gmail.com',
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
    const  {foodlancer}  = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setloading({...loadings, loading1:true})
        setValues({...values, error:false, loading:true})
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
                    history.push('/foodlancer');
                    toast.success("Logged In Successfully");
                })
            }
        })
    }

    

    const signinForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            {/* <button onClick={clickSubmit} className=" btn btn-primary">Submit</button> */}
            <button onClick={clickSubmit} className=" btn btn-primary" style={{width:'100%'}}
                className='py-2 rounded-lg'>
                <i className='fa fa-sign-in mr-1' />
                Login
            </button> 
            {/* <div style={{textAlign:'right', width:'100%'}}>
                <Link to="/foodlancer/forget/password" style={{color:'#F40009'}}>Forget Password</Link>
            </div> */}
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-7 col-7">
                    <Link to="/foodlancer/signup" style={{color:'#007bff'}}>Don't have a Account?</Link>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5" style={{textAlign:'right'}}>
                    <Link to="/foodlancer/forget/password" style={{color:'#F40009'}}>Forget Password</Link>
                </div>
            </div>
        </form>
    );

    // const showError = () =>{
    //     if(error ==="11000 duplicate key error collection: ecommerce.foodlancers index: email already exists"){
    //         setValues({...values, error:"Email Already Exist"})
    //     }
    //     return(
    //         <div className="alert alert-danger" 
    //             style={{
    //                 display:error?'':'none'
    //             }}>
    //             {error}
    //         </div>
    //     )
    // };

    // const showLoading = () =>
    //     loading && (
    //             <div className="alert alert-info">
    //               <h2>Loading...</h2>
    //             </div>
    // );
        

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
                <div className="container-fluid col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12"> 
                    <p style={{fontSize:27, fontWeight:600, textAlign:"center", margin:0, padding:0}}>Welcome!</p>
                    <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Foodlancer Login</p>
                    {/* {showError()} */}
                    {/* {showLoading()} */}
                    <div className="row" style={{marginTop:30}}>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-4">
                                <div>
                                    {signinForm()}
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"  
                                style={{height:'400px'}}>
                                {/* style={{backgroundColor:'#dae5ed', height:'400px'}}> */}
                                <img src="../foodlancer.png" className="imageCenter" 
                                    style={{width:'65%'}}/>
                            </div>
                    </div>
                </div>
            </div>  
        );
    }
};

export default Signin;
