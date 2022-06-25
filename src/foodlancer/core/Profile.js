import React, {useEffect, useState} from 'react';
import Layout from '../core/Layout';
import {authenticate, isAuthenticated} from '../auth/index';
import {Link, Redirect} from 'react-router-dom';
import {readFoodlancers, updateFoodlancers, updateUser} from './apiFoodlancer'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({match}) =>{
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        photo:'',
        error:false,
        success:false,
        formData:''
    }); 
    const {token} = isAuthenticated()
    const {name, email, password, error, success, formData, photo} = values
    const init = (userId) =>{
        // console.log(userId) 
        readFoodlancers(userId, token).then(data =>{
            if(data.error){
                setValues({...values, error: true})
            }
            else{
                setValues({...values, name: data.name, email: data.email, formData:new FormData()})
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
            <div className="form-group">
                <label className="text-muted">Foodlancer Image</label><br></br>
                <label className="btn btn-secondary">
                    <input type="file" className="" onChange={handleChange('photo')} name="photo" accept="image/*"/>
                </label>
            </div>
            <button className='btn btn-primary' onClick={clickSubmit}>Update</button>
        </form>
    )
    const handleChange = name => (event) =>{
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        // formData.set(name, value);
        setValues({...values, error: false, [name]: value})
    }
    const clickSubmit = (e) =>{
        e.preventDefault()
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('photo', photo);
        // console.log(formData);
        // console.log(name + email + password);
        updateFoodlancers(match.params.foodlancerId, token, formData).then(data =>{
            // updateFoodlancers(match.params.foodlancerId, token, {name, email, password}).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{ 
                updateUser(data, ()=>{
                    toast.success("Foodlancer is Updated")
                    setValues({...values, name: data.name, email: data.email, success:true})
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
            return <Redirect to="/foodlancer"/>
            // localStorage.setItem('jwt', JSON.stringify(data))
            // init(match.params.foodieId)
            // authenticate(data, ()=>{
            //     setValues({data})
            // })
        }
    }
    return(
        <Layout title="Foodlancer Profile" description="Update Your Profile" className="container-fluid">
            <div className="container col-md-8"> 
                <h2 className="mb-4">Profile Update</h2>
                {profileUpdate(name, email, password)}
                {redirectUser(success)}
            </div>
        </Layout>
    );
};


export default Profile;