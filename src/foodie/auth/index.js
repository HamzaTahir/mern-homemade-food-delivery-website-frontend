import {API} from '../../config';

export const signup = (user) =>{
    // console.log(user);
    return fetch(`${API}/signup`,{
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
    return fetch(`${API}/signin`,{
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

export const facebooklogin = (user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/facebooklogin`,{
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
    // console.log(name, email, password);
    return fetch(`${API}/facebooksignup`,{
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
    return fetch(`${API}/googlelogin`,{
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
    return fetch(`${API}/googlesignup`,{
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
        // var check = JSON.stringify(data)
        // console.log(check.user)
        // if(typeof(check.user) !== undefined && check.name != null){
            localStorage.setItem('jwt', JSON.stringify(data));
        // }

        // console.log(JSON.stringify(data))
        //localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}

export const signout = (next) =>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
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
        // var check = JSON.parse(localStorage.getItem('jwt'))

        // console.log("CHECK NAME :: " + check.user.name)
        // console.log("CHECK :: " + JSON.parse(localStorage.getItem('jwt')))
        // if(check.user.name !== undefined || check.user.name !== 'undefined'){
            return JSON.parse(localStorage.getItem('jwt'))
        // }
    }
    else{
        return false;
    }
}


export const activateAccount = (token) =>{
    // console.log("TOKEN" + token);
    return fetch(`${API}/email-activate/${token}`,{
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

export const forgetPassword = (email) =>{
    // console.log(user);
    return fetch(`${API}/forget/password`,{
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

    return fetch(`${API}/reset/password`,{
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