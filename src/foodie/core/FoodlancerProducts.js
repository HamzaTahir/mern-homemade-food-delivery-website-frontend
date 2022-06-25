import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getFoodlancerProducts} from './apiCore';
import Card from './Card';
import Search from './Search';
import { css } from "@emotion/core";
import {listRelated} from './apiCore';
import PulseLoader from "react-spinners/PulseLoader";
const FoodlancerProducts = ({match}) =>{
    const [foodlancerProducts, setFoodlancerProducts] = useState([])
    const [error, setError] = useState(false)
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const [relatedProduct, setRelatedProduct] = useState([]);
    const loadFoodlancerProducts = () =>{
        // console.log(match.params.foodlancerId)
        setloading({...loadings, loading1:true})
        getFoodlancerProducts(match.params.foodlancerId)
        .then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                setError(data.error);
            }
            else{
                setloading({...loadings, loading1:true})
                setFoodlancerProducts(data.product);
                // console.log(data.product)
                listRelated(data._id)
                .then(data=>{
                    if(data.error){
                        setloading({...loadings, loading1:false})
                        setError(data.error)
                    }
                    else{
                    setloading({...loadings, loading1:false})
                    setRelatedProduct(data)
                    }
                })
            }
        })
    }
    useEffect(()=>{
        loadFoodlancerProducts();
    }, [])

 
    if(loading1 === true ){
        return(
            <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
                <PulseLoader
                    // css={override}
                    size={15}
                    color={"#F40009"}
                    loading={true}
                />
                {/* <img src="../../logo3.png" style={{width:150, height:80}}/> */}
            </div>
        )
    }
    else{
            return(
            <Layout title="Foodlancer Products" description="Node React E-Commerce App" className="container-fluid">
                
                {/* <div className="row" style={{marginLeft:10, marginRight:10}}> */}
                    {/* <div className="col-8"> */}
                        <h2 className="mb-4" style={{marginLeft:20, textAlign:'left', fontWeight:'600'}}>Foodlancer Products</h2>
                        <div className="row">
                        {/* <div className="row" style={{marginLeft:10, marginRight:10}}> */}
                            {foodlancerProducts.map((product, i)=>(
                                <div key={i} className="m-2">
                                    <Card product={product}/>
                                </div>
                            ))}
                        </div>
                    {/* </div> */}
                    {/* <div className="col-4">
                        <h2>Related Products</h2>
                            {relatedProduct.map((product, i)=>(
                                <div key={i} className="mb-3">
                                    <Card product={product}/>
                                </div>
                            ))}
                        </div>
                    </div> */}
            </Layout>
        )
    }
}
  
export default FoodlancerProducts;
