import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts, getKitchens} from './apiCore';
import Card from './Card';
import CardFoodlancer from './CardFoodlancer';
import Search from './Search';
import Footer from './Footer';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const Home = () =>{
    const [productsBySell, setproductsBySell] = useState([])
    const [productsByArrival, setproductsByArrival] = useState([])
    const [kitchensBySell, setkitchensBySell] = useState([])
    const [error, setError] = useState(false)
    const [loading, setloading] = useState({
        loading1: false,
        loading2: false,
        loading3: false
    })
    const {loading1, loading2, loading3} = loading
    const loadProductsBySell = () =>{
        setloading({...loading, loading1:true})
        getProducts('sold')
        .then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setproductsBySell(data);
                setloading({...loading, loading1:false})
            }
        })
    }
    const loadProductsByArrival = () =>{
        setloading({...loading, loading2:true})
        getProducts('createdAt')
        .then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setproductsByArrival(data);
                setloading({...loading, loading2:false})
            }
        })
    }
    const loadKitchensBySell = () =>{
        setloading({...loading, loading3:true})
        getKitchens('sold')
        .then(data =>{
            if(data.error){
                setError(data.error);
            }
            else{
                setkitchensBySell(data.foodlancer);
                // console.log(data.foodlancer)
                setloading({...loading, loading3:false})
            }
        })
    }
    useEffect(()=>{
        loadKitchensBySell();
        loadProductsByArrival();
        loadProductsBySell();
    }, [])
    // const override = css`
    // flex: 1,
    // margin-top:240,
    // justify-content: 'center',
    // align-items:'center'
    //     `;
 
    if(loading1 === true || loading2 === true || loading3 === true){
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
            <div>
                <Layout title="Foodie Home" description="Node React E-Commerce App" className="container-fluid">
                <div
                    style={{
                        backgroundImage: `url(../newimg/3.jpg)`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        width:'100%',
                        height:'500px',
                    }}>
                    {/* <p style={{color:'black', width:'100%', textAlign:'center'}}>KHANSAMA HOME</p> */}
                    <p style={{width:'100%', textAlign:'center', paddingTop:10}}>
                        <img src="./logo.png" style={{width:150, height:80}}/>
                    </p>
                </div>
                    {/* {showLoading()} */}
                    <Search/>
                    <h2 className="mb-4" style={{marginLeft:20, textAlign:'left', fontWeight:'600'}}>Top Kitchens</h2>
                    <div className="row" style={{marginLeft:10, marginRight:10}}>
                        {kitchensBySell.map((kitchen, i)=>(
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <CardFoodlancer foodlancer={kitchen}/>
                            </div>
                        ))}
                    </div>
                    <h2 className="mb-4" style={{marginLeft:20, textAlign:'left', fontWeight:'600'}}>New Arrivals</h2>
                    <div className="row" style={{marginLeft:10, marginRight:10}}>
                        {productsByArrival.map((product, i)=>(
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                                <Card product={product}/>
                            </div>
                        ))}
                    </div>
                    <h2 className="mb-4" style={{marginLeft:20, textAlign:'left', fontWeight:'600'}}>Best Sellers</h2>
                    <div className="row" style={{marginLeft:10, marginRight:10}}>
                        {productsBySell.map((product, i)=>(
                            <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3"> 
                                <Card key={i} product={product}/>
                            </div>
                        ))}
                    </div>
                </Layout>
                <Footer/>
            </div>
        )
    }
}
  
export default Home;
