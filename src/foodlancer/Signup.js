import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../foodlancer/core/Layout';
import {signup} from '../foodlancer/auth/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from './core/Menu';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const Signup = ({history}) =>{
    const [values,setValues] = useState({
        name:'',
        kitchen:'',
        email:'',
        password:'',
        error:'',
        success:false,
        photo:'',
        formData:new FormData()
    });
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    
    const {name, kitchen, email, password, error, success, photo, formData} = values;

    const handleChange = name => event =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        // formData.set(name, value);
        setValues({...values, error:false, [name]: value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setloading({...loadings, loading1:true})
        setValues({...values, error:false})
        formData.set('name', name);
        formData.set('kitchen', kitchen);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('photo', photo);
        // signup(formData)
        signup(formData)
        .then(data =>{
            if(data.error){
                if(data.error === "11000 duplicate key error collection: khansama.foodlancers index: email already exists"){
                    setloading({...loadings, loading1:false})
                    setValues({...values, error:"Email Already Exist", success:false})
                    toast.error("Email Already Exist");
                }
                else{
                    setloading({...loadings, loading1:false})
                    setValues({...values, error:data.error, success:false})
                    toast.error(data.error);
                }

            }
            else{
                setloading({...loadings, loading1:false})
                setValues({...values, name:'', kitchen:'', email:'', password:'', error:'', success:true})
                toast.success("Sign Up In Successfully. Kindly Login");
                history.push('/foodlancer/signin')
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
                <label className="text">Kitchen Name</label>
                <input onChange={handleChange('kitchen')} type="text" className="form-control" value={kitchen}/>
            </div>
            <div className="form-group">
                <label className="text">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Product Image</label><br></br>
                <label className="btn btn-secondary">
                    <input type="file" className="" onChange={handleChange('photo')} name="photo" accept="image/*"/>
                </label>
            </div>
            {/* <button onClick={clickSubmit} className=" btn btn-primary">Submit</button> */}
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
                    <p style={{fontSize:23, fontWeight:500, textAlign:"center", margin:0, padding:0}}>Foodlancer SignUp</p>
                        {/* {showError()} */}
                        {/* {showSuccess()} */}
                        <div className="row" style={{marginTop:30}}>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div>
                                    {signupForm()}
                                </div>
                                <div className="row">
                                    <div className="col-12 mb-2" style={{textAlign:'right'}}>
                                        <Link to="/foodlancer/signin" style={{color:'#007bff'}}>Have a Account? Login here</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"  
                                style={{height:'440px'}}>
                                {/* style={{backgroundColor:'#dae5ed', height:'440px'}}> */}
                                <img src="../foodlancer.png" className="imageCenter" 
                                    style={{width:'65%'}}/>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
};

// const Signup = () =>(
//     <Layout title="Signup" description="Node React E-Commerce App Signup">
//         {API}
//     </Layout>
// )
  
export default Signup;
