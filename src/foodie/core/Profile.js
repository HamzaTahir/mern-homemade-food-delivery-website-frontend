import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout';
import {authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {read, update, updateUser} from './apiFoodie'; 
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
// Call it once in your app. At the root of your app is the best place
toast.configure()

const Profile = ({match}) =>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    }); 
    const {token} = isAuthenticated()
    const {name, email, password, error, success} = values
    const init = (userId) =>{
        // console.log(userId) 
        read(userId, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
                toast.error(data.error);
            }
            else{
                setValues({...values, name: data.name, email: data.email})
                toast.success(data);
            }   
        })
    }
    useEffect(() =>{
        init(match.params.foodieId)
    },[])
    const profileUpdate = (name, email, password) =>(
        <form>
            <div className='form-group'>
                <label className="text-muted">Name</label>
                <input type='text' onChange={handleChange('name')} className='form-control' value={name}/>
            </div>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input type='email' onChange={handleChange('email')} className='form-control' value={email}/>
            </div>
            <div className='form-group'>
                <label className="text-muted">Password</label>
                <input type='password' onChange={handleChange('password')} className='form-control' value={password}/>
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Update</button>
        </form>
    )
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
    }
    const clickSubmit = (e) =>{
        e.preventDefault()
        update(match.params.foodieId, token, {name, email, password}).then(data =>{
            if(data.error){
                console.log(data.error)
                toast.error(data.error)
            }
            else{ 
                updateUser(data, ()=>{
                    setValues({...values, name: data.name, email: data.email, success:true})
                    toast.success("Foodie is Updated")
                })
                // localStorage.removeItem('jwt');
                // localStorage.setItem('jwt', JSON.stringify(data))
                // init(match.params.foodieId)
                // redirectUser(data)
            }
        })
    }
    const redirectUser = (success) =>{
        if(success){
            return <Redirect to="/dashboard/"/>
            // localStorage.setItem('jwt', JSON.stringify(data))
            // init(match.params.foodieId)
            // authenticate(data, ()=>{
            //     setValues({data})
            // })
        }
    }
    return(
        <Layout title="Profile" description="Update Your Profile" className="container-fluid">
            <div className="container col-md-8" style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}> 
                <h2 className="mb-4">Profile Update</h2>
                {profileUpdate(name, email, password)}
                {redirectUser(success)}
            </div>
        </Layout>
    );
};


export default Profile;