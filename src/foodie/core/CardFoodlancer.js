import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
const Card = ({foodlancer}) =>{

const showViewButton = () =>{
    return(
            <Link to={`/foodlancer/products/${foodlancer._id}`} className="mr-2">
                <button className="btn btn-primary mt-2 mb-2 mr-2">
                    View Products
                </button>
            </Link>
        )
}
const showViewProfile = () =>{
    return(
        <Link to={`/profile/foodlancer/${foodlancer._id}`} className="mr-2">
            <button className="btn btn-warning mt-2 mb-2"
            style={{backgroundColor:'#36454f', color:"white"}}>
                View Profile
            </button>
        </Link>
    )
        
};

    return(
            <div className="card">
                <div className="card-header name" style={{color:'black', textTransform: "uppercase", textAlign: 'center'}}>
                    {foodlancer.kitchen}
                    {/* {foodlancer.kitchen}<span style={{textTransform: 'lowercase'}}>'s</span> Kitchen */}
                </div>
                <div className="card-body">
                    <ShowImage item={foodlancer} url="foodlancer/kitchen"/>
                    <p className="black-10 mt-2">Owner Name: {foodlancer.name}</p>
                    <br/>
                    {showViewButton()}
                    {showViewProfile()}
                </div>
            </div>

    )
}

export default Card;