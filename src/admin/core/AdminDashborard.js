import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';

const AdminDashboard = () =>{

    const  {user:{_id, name, email, role}}  = isAuthenticated();
    
    const adminLinks = () =>{
        return(
            <div className="card">
                <h3 className="card-header">User Links</h3>
                <ul className="list-group">
                    <li className="list-group-item ">
                        <Link className="nav-link" to={`update/admin/profile/${_id}`}>Update Profile</Link>
                    </li>
                    <li className="list-group-item ">
                       <Link className="nav-link" to="/admin/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/create/product">Create products</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/orders">All Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/orders/new">New Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/orders/accept">Accepted Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/orders/cancel">Cancelled Orders</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/admins">All Admins</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/foodlancers">All Foodlancers</Link>
                    </li>
                    <li className="list-group-item ">
                        <Link className="nav-link" to="/admin/foodies">All Foodies</Link>
                    </li>
                </ul>
            </div>
        );
    };
    const adminInfo = () =>{
        return(
                <div className="card mb-5">
                    <h3 className="card-header">User Information</h3>
                    <ul className="list-group">
                        <li className="list-group-item ">
                            Name: {name}
                        </li>
                        <li className="list-group-item ">
                            Email: {email}
                        </li>
                        <li className="list-group-item ">
                            Role: {role === 2 ? 'Admin':'User'}
                        </li>
                    </ul>
                </div>
        );
    };
    // const userPurchaseHistory = () =>{
    //     return(
    //         <div className="card mb-5">
    //             <h3 className="card-header">Purchase History</h3>
    //             <ul className="list-group">
    //                 <li className="list-group-item ">
    //                     History
    //                 </li>
    //             </ul>
    //         </div>
    //     );
    // };
    return(
        // <Layout title="Admin Dashboard" description={`Hello ${name}`} className="container-fluid">
        //     <div className="row">
        //         <div className="col-3">
        //             {adminLinks()}
        //         </div>
        //         <div className="col-9">
        //             {adminInfo()}
        //             {/* {userPurchaseHistory()} */}
        //         </div>
        //     </div>
        // </Layout>
        <div>
            <Layout/>
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-12">
                    {adminLinks()}
                </div>
                <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12">
                    {adminInfo()}
                    {/* {userPurchaseHistory()} */}
                </div>
            </div>
        </div>
    );
};


export default AdminDashboard;