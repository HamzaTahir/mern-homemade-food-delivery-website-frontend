import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getFoodlancerProfile} from './apiCore';
import Search from './Search';
import ShowImage from './ShowImage';

const FoodlancerProfile = ({match}) =>{
    const [foodlancer, setFoodlancerProfile] = useState([])
    const [error, setError] = useState(false)

    const loadFoodlancerProducts = () =>{
        // console.log(match.params.foodlancerId)
        getFoodlancerProfile(match.params.foodlancerId)
        .then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setFoodlancerProfile(data.foodlancer);
                console.log(data.foodlancer)
            }
        })
    }
    useEffect(()=>{
        loadFoodlancerProducts();
    }, [])

    return(
        <Layout title="Foodlancer Products" description="Node React E-Commerce App" className="container-fluid">
            <h2 className="mb-4" style={{margin:10}}>Foodlancer Profile</h2>
            <div className="row" style={{margin:10}}>
                <div className="card">
                    <div className="card-header name" style={{color:'black', textTransform: "uppercase", textAlign: 'center'}}>
                        {foodlancer.kitchen}<span style={{textTransform: 'lowercase'}}>'s</span> Kitchen
                    </div>
                    <div className="card-body">
                        <ShowImage item={foodlancer} url="foodlancer/kitchen"/>
                        {/* <ShowImage item={product} url="product"/> */}
                        <p className="black-10">Owner Name: {foodlancer.name}</p>
                        <br/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
  
export default FoodlancerProfile;
