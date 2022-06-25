import React, {Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
import {itemTotal} from './cartHelpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const isActive = (history, path) => {
    console.log("HISTORY: " + history.location.pathname);
    // console.log("PATH: " + path);
    // console.log("COMPARE: " + history.location.pathname === path);
    // console.log("COMPARE: " + history.location.pathname === path);
    // console.log(history.location.pathname.localeCompare(path));

    if(history.location.pathname ===  "/"+path){
        return {color:'#F40009'}
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) =>{
    
    // console.log("HISTORY: " + history.location.pathname);
    return(
        <div>
        <nav class="navbar navbar-expand-md"
        style={{backgroundColor:"black"}}>
            {/* <a class="navbar-brand" href="#" style={{color:"white"}}>KHANSAMA</a> */}
            <Link to="/">
                <img src="../../logo.png" style={{width:120, height:50}}/>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon" style={{border: '1px solid white', borderRadius: 5}}></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto" style={{marginLeft:10}}>
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "")} to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "shop")} to="/shop">Shop</Link>
                    </li>
                    {/* {isAuthenticated() && isAuthenticated().user.role === 0 && ( */}
                        <li className="nav-item">
                            <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "dashboard")} to="/dashboard">Dashboard</Link>
                        </li>
                    {/* )} */}
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "cart")} to="/cart">Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "contact")} to="/contact">Contact Us</Link>
                    </li>
                    {/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "admin/dashboard")} to="/admin/dashboard" >Dashboard</Link>
                        </li>
                    )} */}
                </ul>
                    <ul className="navbar-nav">
                    {!isAuthenticated() && (
                        <Fragment> 
                            <li className="nav-item">
                                <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "signin")} to="/signin">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "signup")}to="/signup">Sign Up</Link>
                            </li>
                        </Fragment>
                    )}
                {isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor:'pointer', color:'#ffffff'}} 
                                onClick = {()=> signout(()=>{
                                    history.push('/');
                                    toast.success("Logout Successfully");
                                })}>
                                Sign Out
                            </span>
                        </li>
                )}
                </ul>
            </div>
        </nav>
    </div>
    )
};
  
export default withRouter(Menu);
