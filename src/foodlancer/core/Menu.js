import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth/index';
// import {itemTotal} from './cartHelpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const isActive = (history, path) => {
    console.log("HISTORY: " + history.location.pathname);
    if(history.location.pathname === "/foodlancer"+path){
        return {color:'#F40009'}
    }
    else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) =>{
    // console.log("HISTORY: " + history.location.pathname);
    return( <div>
        <nav class="navbar navbar-expand-md"
        style={{backgroundColor:"black"}}>
            {/* <a class="navbar-brand" href="#" style={{color:"white"}}>KHANSAMA</a> */}
            <Link to="/foodlancer">
                <img src="../../logo.png" style={{width:120, height:50}}/>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon" style={{border: '1px solid white', borderRadius: 5}}></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav mr-auto" style={{marginLeft:10}}>
            {/* <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "")} to="/foodlancer" >Home</Link>
            </li> */}
            {/* <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "shop")} to="/shop" >Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, "/cart")} to="/cart" >Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
            </li> */}
            {/* {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "user/dashboard")} to="/user/dashboard" >Dashboard</Link>
                </li>
            )} */}
            {/* {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "admin/dashboard")} to="/admin/dashboard" >Dashboard</Link>
                </li>
            )} */}
             {/* {isAuthenticated() && isAuthenticated().user.role === 1 && ( */}
                <li className="nav-item">
                    <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "")} to="/foodlancer">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "contact")} to="/foodlancer/contact">Contact Us</Link>
                </li>
            {/* )} */}
            </ul>
                <ul className="navbar-nav">
            {!isAuthenticated() && (
                <Fragment> 
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "/signin")} to="/foodlancer/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{fontSize:17, color:"white"},isActive(history, "/signup")}to="/foodlancer/signup">Sign Up</Link>
                    </li>
                </Fragment>
            )}
           {/* {isAuthenticated()  && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <span className="nav-link" style={{cursor:'pointer', color:'#ffffff'}} 
                        onClick = {()=> signout(()=>{
                            history.push('/foodlancer/');
                         })}>
                        Sign Out
                    </span>
                </li>
           )} */}
           {isAuthenticated() && (
                        <li className="nav-item">
                            <span className="nav-link" style={{cursor:'pointer', color:'#ffffff'}} 
                                onClick = {()=> signout(()=>{
                                    history.push('/foodlancer/signin');
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
