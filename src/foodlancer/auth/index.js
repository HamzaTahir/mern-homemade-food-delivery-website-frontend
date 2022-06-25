import {API} from '../../config';

export const signup = (user) =>{ 
    // console.log(user);
    return fetch(`${API}/foodlancer/signup`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            // "Content-Type": "application/json"
        },
        body:user
        // body:JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log("error : " + err);
    })
}

export const signin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/signin`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}


export const authenticate = (data, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/foodlancer/signout`, {
            method:"GET",
        })
        .then(response =>{
            console.log("Signout: ", response);
        })
        .catch(err =>{
            console.log("Error: ", err);
        })
    }
}

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }
    else{
        return false;
    }
}

export const forgetPassword = (email) =>{
    // console.log(user);
    return fetch(`${API}/foodlancer/forget/password`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body:JSON.stringify(email)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log("error : " + err);
    })
}

export const resetPassword = (values) =>{
    // console.log(user);
    const {password, token} = values

    return fetch(`${API}/foodlancer/reset/password`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json"
        },
        body:JSON.stringify(values)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log("error : " + err);
    })
}