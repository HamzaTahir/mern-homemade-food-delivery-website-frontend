import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {readAdmins, updateAdmins} from './apiAdmin'; 

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = ({match}) =>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        success:false
    });
    const {user:{_id}, token} = isAuthenticated()
    const {name, email, password, error, success} = values
    const init = (userId) =>{
        // console.log(userId) 
        readAdmins(userId, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }
            else{
                setValues({...values, name: data.name, email: data.email})
            }   
        })
    }
    useEffect(() =>{
        init(match.params.adminId)
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
        updateAdmins(_id, match.params.adminId, token, {name, email, password}).then(data =>{
                if(data.error){
                console.log(data.error)
            }
            else{ 
                setValues({...values, name: data.name, email: data.email, success:true})
                toast.success("Admin Updated Successfully.")
            }
        })
    }
    const redirectUser = (success) =>{
        if(success){
            return <Redirect to="/admin/dashboard"/>
        }
    }
    return(
        <Layout title="Profile" description="Update Your Profile" className="container-fluid">
            <div className="col-md-8 offset-md-2">
                <h2 className="mb-4">Profile Update</h2>
                {profileUpdate(name, email, password)}
                {redirectUser(success)}
            </div>
        </Layout>
    );
};


export default Profile;