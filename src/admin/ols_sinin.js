import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../admin/core/Layout';
import {signin, authenticate, isAuthenticated} from '../admin/auth/index';

 
const Signin = () =>{
    const [values,setValues] = useState({
        email:'sulemanhamzatahir1111@gmail.com',
        password:'111111',
        error:'',
        loading:false,
        redirectToReferrer:false
    });

    const {email, password, error, loading, redirectToReferrer} = values;
    // const  {user}  = isAuthenticated();

    const handleChange = name => event =>{
        setValues({...values, error:false, [name]: event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signin({email, password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, loading:false})
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values, redirectToReferrer:true})
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
            <button onClick={clickSubmit} className=" btn btn-primary">Submit</button>
        </form>
    );

    const showError = () =>{
        if(error ==="11000 duplicate key error collection: ecommerce.users index: email already exists"){
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

    return(
        <Layout title="Admin Signin" description="Node React E-Commerce App Signin" className="container col-md-8 offset-md-2">
            <div className="container col-md-8" style={{
            //   position: 'absolute', left: '50%', top: '50%',
            //   transform: 'translate(-50%, -50%)'
            }}> 
            <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Admin Sign In</p>
              {showLoading()}
              {showError()}
              {signinForm()}
            </div>
            {/* {redirectUser()} */}
            {/* {JSON.stringify(values)} */}
        </Layout>
        // <div>
        // <Layout/>
        //    <div className="container col-md-8" style={{
        //       position: 'absolute', left: '50%', top: '50%',
        //       transform: 'translate(-50%, -50%)'
        //     }}> 
        //     <p style={{fontSize:27, fontWeight:600, textAlign:"center"}}>KHANSAMA Admin Sign In</p>
        //       {showLoading()}
        //       {showError()}
        //       {signinForm()}
        //     </div>
        // </div>
    );
};

// const Signup = () =>(
//     <Layout title="Signup" description="Node React E-Commerce App Signup">
//         {API}
//     </Layout>
// )
  
export default Signin;
