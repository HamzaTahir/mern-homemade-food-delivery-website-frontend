import {API} from '../../config';
import queryString from 'query-string';
// import foodlancer from '../../../../fyp_project/models/foodlancer';

export const getProducts = sortBy =>{
    // console.log(name, email, password);
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:"GET", 
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}
export const getFoodlancerProducts = foodlancerId =>{
    // console.log(foodlancerId);
    return fetch(`${API}/foodlancer/products/${foodlancerId}`,{
        method:"GET", 
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}
export const getFoodlancerProfile = foodlancerId =>{
    // console.log(foodlancerId);
    return fetch(`${API}/profile/foodlancer/${foodlancerId}`,{
        method:"GET", 
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}
export const getKitchens = sortBy =>{
    // console.log(name, email, password);
    return fetch(`${API}/kitchens?sortBy=${sortBy}&order=desc&limit=6`,{
        method:"GET", 
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
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
export const getFilteredProducts = (skip, limit, filters = {}) =>{
    // console.log(name, email, password);
    const data = {
        skip, 
        limit, 
        filters
    }
    return fetch(`${API}/products/by/search`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

export const list = params =>{
    // console.log(name, email, password);
    const query = queryString.stringify(params);
    // console.log("query : " + query);
    return fetch(`${API}/products/search?${query}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}

export const read = (productId) =>{
    // console.log(name, email, password);
    return fetch(`${API}/product/${productId}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
}
export const listRelated = (productId) =>{
    // console.log(name, email, password);
    return fetch(`${API}/products/related/${productId}`,{
        method:"GET",
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}
export const getBraintreeClientToken = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/braintree/getToken/${userId}`,{
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
    .catch(err =>{
        console.log(err);
    })
}
export const processPayment = (userId, token, paymentData) =>{
    // console.log(name, email, password);
    return fetch(`${API}/braintree/payment/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>(
        console.log(err)
    ));
};
export const createOrder = (userId, token, createOrder) =>{
    console.log(createOrder);
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({order: createOrder})
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>(
        console.log(err)
    ));
};