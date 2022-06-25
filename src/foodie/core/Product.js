import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Footer from './Footer';
import {listRelated, read, showViewProductButton} from './apiCore';
import Card from './Card';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const Product = (props) =>{
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loadings, setloading] = useState({
        loading1: false, 
    })
    const {loading1} = loadings
    const loadSingleProduct = productId =>{
        setloading({...loadings, loading1:true})
        read(productId).then(data =>{
            if(data.error){
                setloading({...loadings, loading1:false})
                setError(data.error);
            }
            else{
                setloading({...loadings, loading1:true})
                setProduct(data);
                // fetch related products
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
        });
    }
    useEffect(()=>{
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    },[props])
    
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
            <div>
                <Layout title={product && product.name} description={product && product.description && product.description.substring(0,100)} className="container-fluid">
                    <div className="row" style={{marginLeft:10, marginRight:10}}>
                        <div className="col-8">
                            <h2 className="" style={{textAlign:'left', fontWeight:'600'}}>Product Details</h2>
                            { product && product.description && <Card product={product} showViewProductButton={false}/> }
                        </div>
                        <div className="col-4">
                            <h2>Related Products</h2>
                            {relatedProduct.map((product, i)=>(
                                <div key={i} className="mb-3">
                                    <Card product={product}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </Layout>
                {/* <Footer/> */}
            </div>
        )
    }
}

export default Product;