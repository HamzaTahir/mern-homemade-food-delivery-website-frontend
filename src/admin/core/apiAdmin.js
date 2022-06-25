import {API} from '../../config';

export const createCategory = (userId, token, category) =>{
    // console.log(name, email, password);
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })
}

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

export const listFoodies = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/list/foodies/${userId}`,{
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

export const listFoodlancers = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/foodlancers/list/${userId}`,{
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

export const listAdmins = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admins/list/${userId}`,{
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


export const updateStatusValues = (userId, token, orderId, status) =>{
    // console.log(name, email, password);
    return fetch(`${API}/order/${orderId}/status/${userId}`,{
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


export const removeFoodies = (adminId, foodieId, token) =>{
    return fetch(`${API}/admin/remove/foodie/${adminId}/${foodieId}`,{
        method:"DELETE",
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


export const readFoodie = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/get/foodie/${userId}`,{
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

export const updateFoodie = (adminId, userId, token, user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/update/foodie/${adminId}/${userId}`,{
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


export const removeFoodlancers = (adminId, foodlancerId, token) =>{
    return fetch(`${API}/admin/remove/foodlancer/${adminId}/${foodlancerId}`,{
        method:"DELETE",
        headers:{
            Accept:'application/json',
            "Content-Type": "application/json",
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


export const readFoodlancers = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/get/foodlancer/${userId}`,{
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



// export const readFoodlancers = (adminId, userId, token, user) =>{
//     // console.log(name, email, password);
//     return fetch(`${API}/admin/update/foodlancer/${adminId}/${userId}`,{
//         method:"PUT",
//         headers:{
//             Accept:'application/json',
//             "Content-Type": "application/json",
//             Authorization:`Bearer ${token}`
//         },
//         body: JSON.stringify(user)
//     })
//     .then(response =>{
//         return response.json();
//     })
//     .catch(err =>(
//         console.log(err)
//     ));
// };

export const updateFoodlancers = (adminId, userId, token, user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/update/foodlancer/${adminId}/${userId}`,{
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

export const readAdmins = (userId, token) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/get/admin/${userId}`,{
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
};

export const removeAdmins = (currentAdminId, adminId, token) =>{
    return fetch(`${API}/admin/remove/admin/${adminId}`,{
        method:"DELETE",
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
};

export const updateAdmins = (adminId, userId, token, user) =>{
    // console.log(name, email, password);
    return fetch(`${API}/admin/update/admin/${userId}`,{
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