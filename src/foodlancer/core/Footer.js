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
                                        eusmod tempor incididunt ut labore et dolore magna aliqua. 
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                                        laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms" data-wow-delay="600ms">
                                <div className="footer-single">
                                    <h6>Explore</h6>
                                    <ul style={{margin:0, padding:0}}>
                                        <li><a href="#" style={{color:'white'}}>Inside Us</a></li>
                                        <li><a href="#" style={{color:'white'}}>Flickr</a></li>
                                        <li><a href="#" style={{color:'white'}}>Google</a></li>
                                        <li><a href="#" style={{color:'white'}}>Forum</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-xs-12 wow fadeInUp animated" data-wow-duration="500ms" data-wow-delay="600ms">
                                <div className="footer-single">
                                    <h6>Important Links</h6>
                                    <ul style={{margin:0, padding:0}}>
                                        <li><a href="#" style={{color:'white'}}>Inside Us</a></li>
                                        <li><a href="#" style={{color:'white'}}>Flickr</a></li>
                                        <li><a href="#" style={{color:'white'}}>Google</a></li>
                                        <li><a href="#" style={{color:'white'}}>Forum</a></li>
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
                                    Copyright © 2021. All rights reserved. Designed & Developed by Suleman & Usman With <span><i class="fa fa-heart" style={{color:'#F40009'}}></i></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
    )
}
export default Footer;