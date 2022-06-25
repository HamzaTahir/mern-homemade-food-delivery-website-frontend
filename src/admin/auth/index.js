import {API} from '../../config';

export const signup = (user) =>{
    // console.log(user);
    return fetch(`${API}/admin/signup`,{
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
        console.log("error : " + err);
    })
}

export const signin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/signin`,{
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
        return fetch(`${API}/admin/signout`, {
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
    return fetch(`${API}/admin/forget/password`,{
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

    return fetch(`${API}/admin/reset/password`,{
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


export const facebooklogin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/facebooklogin`,{
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

export const facebooksignup = (user) =>{
    console.log(user);
    return fetch(`${API}/admin/facebooksignup`,{
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
// google
export const googlesignin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/googlelogin`,{
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

export const googlesignup = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/googlesignup`,{
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

export const activateAccount = (token) =>{
    // console.log("TOKEN" + token);
    return fetch(`${API}/admin/email-activate/${token}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            // "Content-Type": "application/json"
        },
        body:JSON.stringify(token)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
};