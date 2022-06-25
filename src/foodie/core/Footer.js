import { Link } from "react-router-dom";
// import {isAuthenticated} from '../auth/index';
// const  {user:{_id}}  = isAuthenticated();

const Footer = () =>{
    return(
        <div>
                <footer id="footer" className="footer" style={{backgroundColor:'black'}}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-sm-12 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms">
                                <div className="footer-single">
                                    <img className="mb-2" src="../logo.png" 
                                         style={{height:70, display: 'block', 
                                                marginLeft: 'auto',marginRight: 'auto', 
                                                width: '30%'}}/>
                                    <p style={{textAlign:'center'}}>
                                        Third Party Solution to facilitate Food Lancers and Foodies. <br/>Homemade food for Food Lovers
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms" data-wow-delay="600ms">
                                <div className="footer-single">
                                    <h6>Explore</h6>
                                    <ul style={{margin:0, padding:0}}>
                                        <li><Link to="/" style={{color:'white'}}>Home</Link></li>
                                        <li><Link to="/dashboard" style={{color:'white'}}>Dashboard</Link></li>
                                        <li><Link to="/shop" style={{color:'white'}}>Shop</Link></li>
                                        <li><Link to="/contact" style={{color:'white'}}>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms" data-wow-delay="600ms">
                                <div className="footer-single">
                                    <h6>Important Links</h6>
                                    <ul style={{margin:0, padding:0}}>
                                        <li><Link to="/cart" style={{color:'white'}}>Cart</Link></li>
                                        <li><Link to="/dashboard" style={{color:'white'}}>Update Profile</Link></li>
                                        <li><Link to="/order/eta/" style={{color:'white'}}>Order ETA</Link></li>
                                        <li><Link to="/contact" style={{color:'white'}}>Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                            {/* <div className="col-md-3 col-sm-6 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms" data-wow-delay="300ms">
                                <div className="footer-single">
                                    <h6>Subscribe </h6>
                                    <form action="#" className="subscribe">
                                        <input type="text" name="subscribe" id="subscribe" placeholder="Enter Your Email"/>
                                        <input type="submit" value="&#8594;" id="subs"/>
                                    </form>
                                    <p>Subscribe Our News Letter To Get News About New Homemade Food</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="copyright text-center">
                                    Copyright © 2021. All rights reserved. Designed & Developed by Suleman & Usman With <span><i class="fas fa-heart" style={{color:'#F40009'}}></i></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    )
}
export default Footer;