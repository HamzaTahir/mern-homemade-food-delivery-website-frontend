import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import {authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {readFoodlancers, updateFoodlancers} from './apiAdmin'; 

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
        readFoodlancers(userId, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }
            else{
                setValues({...values, name: data.name, email: data.email})
            }   
        })
    }
    useEffect(() =>{
        init(match.params.foodlancerId)
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
            <button className='btn btn-primary' onClick={clickSubmit}>Submit</button>
        </form>
    )
    const handleChange = name => (e) =>{
        setValues({...values, error: false, [name]: e.target.value})
    }
    const clickSubmit = (e) =>{
        e.preventDefault()
        updateFoodlancers(_id, match.params.foodlancerId, token, {name, email, password}).then(data =>{
                if(data.error){
                console.log(data.error)
            }
            else{ 
                    setValues({...values, name: data.name, email: data.email, success:true})
            }
        })
    }
    const redirectUser = (success) =>{
        if(success){
            return <Redirect to="/admin/foodlancers"/>
        }
    }
    return(
        <Layout title="Profile" description="Update Your Profile" className="container-fluid">
            <h2 className="mb-4">Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};


export default Profile;