import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import FoodieHome from './foodie/core/Home';
import FoodieSignup from './foodie/Signup';
import FoodieSignin from './foodie/Signin';
import FoodieProfile from './foodie/core/Profile';
import FoodlancerProfile from './foodlancer/core/Profile';
import FoodieActivation from './foodie/core/Activation';
import AdminActivation from './admin/core/AdminActivation';

import FoodieForgetPassword from './foodie/core/ForgetPassword';
import FoodieResetPassword from './foodie/core/ResetPassword';

import FoodlancerForgetPassword from './foodlancer/core/ForgetPassword';
import FoodlancerResetPassword from './foodlancer/core/ResetPassword';

import AdminForgetPassword from './admin/core/ForgetPassword';
import AdminResetPassword from './admin/core/ResetPassword';



// import AdminProfile from './admin/core/Profile/Profile';

import FoodlancerHome from './foodlancer/core/Home';
import FoodlancerSignup from './foodlancer/Signup';
import FoodlancerSignin from './foodlancer/Signin';
import FoodlancerAllOrders from './foodlancer/core/AllOrders';
import FoodlancerCancelOrder from './foodlancer/core/CancelOrder';
import FoodlancerNewOrder from './foodlancer/core/NewOrder';
import FoodlancerAcceptOrder from './foodlancer/core/AcceptOrder';
import FoodlancerShippedOrder from './foodlancer/core/ShippedOrder';
import FoodlancerProcessingOrder from './foodlancer/core/ProcessingOrder';
import FoodlancerDeliveredOrder from './foodlancer/core/DeliveredOrder';
import AdminAllOrders from './admin/core/AllOrders';
import AdminCancelOrder from './admin/core/CancelOrder';
import AdminNewOrder from './admin/core/NewOrder';
import AdminAcceptOrder from './admin/core/AcceptOrder';

import AdminHome from './admin/core/Home';
import AdminSignup from './admin/Signup';
import AdminSignin from './admin/Signin';
import ManageProducts from './admin/core/ManageProducts';
import FoodieProfileInAdmin from './admin/core/FoodieProfile';
import FoodlancerProfileInAdmin from './admin/core/FoodlancerProfile';
import AdminProfileInAdmin from './admin/core/AdminProfile';


import FoodlancerAddProduct from './foodlancer/core/AddProduct';

import UpdateProduct from './admin/core/UpdateProduct';
import FoodlancerManageProducts from './foodlancer/core/ManageProducts';
import FoodlancerUpdateProduct from './foodlancer/core/UpdateProduct';

import FoodieDashborard from './foodie/core/FoodieDashborard'
import FoodlancerDashboard from './foodlancer/core/FoodlancerDashborard'
import AdminDashboard from './admin/core/AdminDashborard'

import FoodiePrivateRoute from './foodie/auth/PrivateRoute';
import FoodlancerPrivateRoute from './foodlancer/auth/PrivateRoute';
import AdminPrivateRoute from './admin/auth/PrivateRoute';

// import AdminRoute from './auth/AdminRoute';

// import Menu from './core/Menu';
import AddCategory from './admin/core/AddCategory'
import AllFoodies from './admin/core/AllFoodies'
import AllFoodlancers from './admin/core/AllFoodlancers'
import AllAdmins from './admin/core/AllAdmins'
import AddProduct from './admin/core/AddProduct'
import Shop from './foodie/core/Shop';
import Product from './foodie/core/Product';
import Cart from './foodie/core/Cart';
import Orders from './admin/core/Orders';
import ETA from './foodie/core/ETA';
// import Profile from './user/Profile';
import FoodlancerProducts from './foodie/core/FoodlancerProducts'
import FoodlancerProfileInFoodie from './foodie/core/FoodlancerProfile'
import FoodieContaact from './foodie/core/FoodieContaact'
import FoodlancerContaact from './foodlancer/core/FoodlancerContact'

const Routes = () =>{
    return(
        <BrowserRouter>
        {/* <Menu/> */}
            <Switch>
                <Route path="/" exact component={FoodieHome}></Route>
                <Route path="/signin" exact component={FoodieSignin}></Route>
                <Route path="/signup" exact component={FoodieSignup}></Route>
                {/* <Route path="/authentication/activate/" exact component={FoodieActivation}></Route> */}
                <Route path="/authentication/activate/:tokenId" exact component={FoodieActivation}></Route>
                
                <Route path="/forget/password" exact component={FoodieForgetPassword}></Route>
                <Route path="/authentication/reset/password/:tokenId" exact component={FoodieResetPassword}></Route>
                
                <Route path="/foodlancer/forget/password" exact component={FoodlancerForgetPassword}></Route>
                <Route path="/foodlancer/authentication/reset/password/:tokenId" exact component={FoodlancerResetPassword}></Route>
                
                <Route path="/admin/forget/password" exact component={AdminForgetPassword}></Route>
                <Route path="/admin/authentication/reset/password/:tokenId" exact component={AdminResetPassword}></Route>
                <Route path="/admin/authentication/activate/:tokenId" exact component={AdminActivation}></Route>
                
                
                {/* <Route path="/foodlancer" exact component={FoodlancerHome}></Route> */}
                <Route path="/foodlancer/signin" exact component={FoodlancerSignin}></Route>
                <Route path="/foodlancer/signup" exact component={FoodlancerSignup}></Route>

                <Route path="/admin" exact component={AdminHome}></Route>
                <Route path="/admin/signin" exact component={AdminSignin}></Route>
                <Route path="/admin/signup" exact component={AdminSignup}></Route>

                <Route path="/shop" exact component={Shop}></Route>
                <Route path="/product/:productId" exact component={Product}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                
                {/* <PrivateRoute path="/profile/:userId" exact component={Profile}/> */}
                {/* <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/> */}
                <AdminPrivateRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                <AdminPrivateRoute path="/admin/create/category" exact component={AddCategory}/>
                <AdminPrivateRoute path="/admin/create/product" exact component={AddProduct}/>
                <AdminPrivateRoute path="/admin/orders" exact component={AdminAllOrders}/>
                <AdminPrivateRoute path="/admin/orders/cancel" exact component={AdminCancelOrder}/>
                <AdminPrivateRoute path="/admin/orders/new" exact component={AdminNewOrder}/>
                <AdminPrivateRoute path="/admin/orders/accept" exact component={AdminAcceptOrder}/>
                <AdminPrivateRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminPrivateRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                <AdminPrivateRoute path="/admin/admins" exact component={AllAdmins}/>
                <AdminPrivateRoute path="/admin/foodlancers" exact component={AllFoodlancers}/>
                <AdminPrivateRoute path="/admin/foodies" exact component={AllFoodies}/>
                <AdminPrivateRoute path="/admin/foodie/update/profile/:foodieId" exact component={FoodieProfileInAdmin}/>
                <AdminPrivateRoute path="/admin/foodlancer/update/profile/:foodlancerId" exact component={FoodlancerProfileInAdmin}/>
                <AdminPrivateRoute path="/admin/update/admin/profile/:adminId" exact component={AdminProfileInAdmin}/>
                
                <FoodlancerPrivateRoute path="/foodlancer" exact component={FoodlancerDashboard}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders" exact component={FoodlancerAllOrders}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/new" exact component={FoodlancerNewOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/cancel" exact component={FoodlancerCancelOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/accept" exact component={FoodlancerAcceptOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/shipped" exact component={FoodlancerShippedOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/delivered" exact component={FoodlancerDeliveredOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/orders/processing" exact component={FoodlancerProcessingOrder}/>
                <FoodlancerPrivateRoute path="/foodlancer/create/product" exact component={FoodlancerAddProduct}/>
                <FoodlancerPrivateRoute path="/foodlancer/profile/:foodlancerId" exact component={FoodlancerProfile}/>
                <FoodlancerPrivateRoute path="/foodlancer/products" exact component={FoodlancerManageProducts}/>
                <FoodlancerPrivateRoute path="/foodlancer/product/update/:productId" exact component={FoodlancerUpdateProduct}/>
                <Route path="/foodlancer/contact" exact component={FoodlancerContaact}/>
                
                <FoodiePrivateRoute path="/dashboard" exact component={FoodieDashborard}/>
                <FoodiePrivateRoute path="/profile/:foodieId" exact component={FoodieProfile}/>
                <FoodiePrivateRoute path="/order/eta" exact component={ETA}/>
                <Route path="/foodlancer/products/:foodlancerId" exact component={FoodlancerProducts}/>
                <Route path="/profile/foodlancer/:foodlancerId" exact component={FoodlancerProfileInFoodie}/>
                <Route path="/contact" exact component={FoodieContaact}/>
                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;