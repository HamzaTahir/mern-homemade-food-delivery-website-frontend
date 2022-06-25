import {API} from '../../config';
import queryString from 'query-string';
// import { use } from '../../../../fyp_project/routes/foodie';

export const read = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodie/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}

export const getPurchaseHistory = (foodieId, token) =>{
    // console.log(foodieId + "  " + token);
    return fetch(`${API}/orders/by/foodie/${foodieId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}

export const update = (userId, token, user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodie/update/${userId}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>(
        console.log(err)
    ));
};

export const updateUser = (user, next) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};


export const checkETA = (orderId, token, userId) =>{
    // console.log(name, email, password);
    return fetch(`${API}/order/eta/${orderId}/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "*",
            Authorization:`Bearer ${token}`
        },
        // body: JSON.stringify(userId)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>(
        console.log(err)
    ));
};

export const contact = (contactForm, token) =>{
    // console.log(contactForm);
    return fetch(`${API}/foodie/contact/`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(contactForm)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>(
        console.log(err)
    ));
};
