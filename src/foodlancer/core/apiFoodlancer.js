import {API} from '../../config';

export const createProduct = (userId, token, product) =>{
    // console.log(name, email, password);
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}
export const FoodlancercreateProduct = (userId, token, product) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getCategories = (userId, token, product) =>{
    // console.log(name, email, password);
    return fetch(`${API}/categories`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const listOrders = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/order/list/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const FoodlancerlistOrders = (userId, token) =>{
    // console.log(name, email, password); 
    return fetch(`${API}/foodlancer/order/list/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const FoodlancerlistOrdersByOrderStatus = (userId, token, orderStatus) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/order/list/${userId}/${orderStatus}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}


export const getStatusValues = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/order/status-values/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}


export const FoodlancergetStatusValues = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/order/status-values/${userId}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        }
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const updateStatusValues = (userId, token, orderId, status) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/order/${orderId}/status/${userId}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            "Content-Type": 'application/json',
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

// crud on products

export const getProducts = (userId, token, product) =>{
    // console.log(name, email, password);
    return fetch(`${API}/products?limit=undefined`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const getFoodlancerProducts = (userId) =>{
    // console.log(userId);
    return fetch(`${API}/${userId}/products?limit=undefined`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const deleteProduct = (productId, userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:'application/json',
            "Content-Type": 'application/json',
            Authorization:`Bearer ${token}`
        }

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const getProduct = (productId) =>{
    // console.log(name, email, password);
    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}
export const updateProduct = (productId, userId, token, product) =>{
    // console.log(name, email, password);
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: product

    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}
export const readFoodlancers = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/${userId}`,{
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

export const readFoodlancersOrdersInformation = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancer/orders/information/${userId}`,{
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

export const updateFoodlancers = (userId, token, user) =>{
    // console.log(user);
    return fetch(`${API}/foodlancer/update/${userId}`,{
        method:"PUT",
        headers:{
            Accept:'application/json',
            // "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: user
        // body: JSON.stringify(user)
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
            auth.user.photo = undefined;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};

export const contact = (contactForm, token) =>{
    // console.log(contactForm);
    return fetch(`${API}/foodlancer/contact/`,{
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
