import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../admin/core/Layout';
import {signup} from '../admin/auth/index';


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
            }
            else{
                setValues({...values, name:'', email:'', password:'', error:'', success:true})
            }
        })
    }

    

    const signupForm = () =>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className=" btn btn-primary">Submit</button>
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


    return(
        <Layout title="Admin Signup" description="Node React E-Commerce App Signup" className="container col-md-8 offset-md-2">
            <div className="container col-md-8" style={{
            //   position: 'absolute', left: '50%', top: '50%',
            //   transform: 'translate(-50%, -50%)'
            }}> 
            <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Admin Sign Up</p>
            {showSuccess()}
            {showError()}
            {signupForm()}
            {error} 
            </div>
            {/* {JSON.stringify(values)} */}
        </Layout>
        // <div>
        // <Layout/>
        //    <div className="container col-md-8" style={{
        //       position: 'absolute', left: '50%', top: '50%',
        //       transform: 'translate(-50%, -50%)'
        //     }}> 
        //     <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Admin Sign Up</p>
        //     {showSuccess()}
        //     {showError()}
        //     {signupForm()}
        //     {error} 
        //     </div>
        // </div>
    );
};

// const Signup = () =>(
//     <Layout title="Signup" description="Node React E-Commerce App Signup">
//         {API}
//     </Layout>
// )
  
export default Signup;
