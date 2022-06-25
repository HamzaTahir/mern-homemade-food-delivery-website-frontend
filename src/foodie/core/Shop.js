import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Layout from './Layout';
import Card from './Card';
import {getCategories} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import {prices} from './fixedPrices';
import {getFilteredProducts} from './apiCore';
import Footer from './Footer';
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const Shop = () =>{
    const [myFilters, setMyFilters] = useState({
        filters: {
            category:[],
            price:[]
        }
    });
    const [loading, setloading] = useState({
        loading1: false,
        loading2: false,
        loading3: false
    })
    const {loading1, loading2, loading3} = loading
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);

    useEffect(()=>{
        init();
        loadFilterResults(skip, limit, myFilters.filters);
    },[])
    
    const init = () =>{
        setloading({...loading, loading1:true})
        getCategories()
        .then(data=>{
            if(data.error){
                setError(data.error);
            }
            else{
                setCategories(data);
                setloading({...loading, loading1:false})
            }
        })
    }
    const handlePrice = value =>{
        const data = prices;
        let array = [];
        
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
    }
    const handleFilters = (filters, filterBy) =>{
        // console.log("Shop " + filters + " " + filterBy);
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;
        
        if(filterBy == 'price'){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilterResults(myFilters.filters);
        setMyFilters(newFilters);

    }

    const loadFilterResults = (newFilters) =>{
        // console.log(newFilters);
        setloading({...loading, loading2:true})
        getFilteredProducts(skip, limit, newFilters)
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
                setloading({...loading, loading2:false})
            }
        })
    }
    const loadMore = () =>{
        // console.log(newFilters);
        let toSkip = skip + limit;
        setloading({...loading, loading3:true})
        getFilteredProducts(toSkip, limit, myFilters.filters)
        .then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(0);
                setloading({...loading, loading3:false})
            }
        })
    }
    const loadMoreButton = () =>{
        return(
            size > 0 && size >= limit && (
                <div style={{width:'100%', textAlign:'center'}}>
                    <button className="btn btn-warning mb-5" onClick={loadMore}>Load More</button>
                </div>
            )
        );
    }

    if(loading1 === true){
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
                <Layout title="Shop" description="Search and Find Books of Your Choice" className="container-fluid">
                    <div
                        style={{
                            backgroundImage: `url(../newimg/15.jpg)`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width:'100%',
                            height:'500px',
                        }}>
                        {/* <p style={{color:'black', width:'100%', textAlign:'center'}}>KHANSAMA HOME</p> */}
                        <p style={{width:'100%', textAlign:'center', paddingTop:10}}>
                        <Link href="/">
                            <img src="./logo.png" style={{width:150, height:80}}/>
                        </Link>
                        </p>
                    </div>
                    <div className="row" style={{margin:10}}>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                            <div>
                                <h4>Filter by Categories</h4>
                                <ul>
                                    <Checkbox categories={categories} handleFilters= { filters => handleFilters(filters, "category")}/>
                                </ul>
                            </div>
                            <div>
                                <h4>Filter by Prices</h4>
                                <RadioBox prices={prices} handleFilters= { filters => handleFilters(filters, "price")}/>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-12">
                            <h4 className="mb-4">Products</h4>
                            <div className="row">
                                {filteredResults.map((product, i)=>(
                                    <div key={i} className="mr-2 mb-2">
                                        <Card key={i} product={product}/>
                                    </div>
                                ))}
                            </div>
                            <hr/>
                            {loadMoreButton()}
                            {/* {JSON.stringify(filteredResults)} */}
                        </div>
                    </div>
                </Layout>
                {/* <Footer/> */}
            </div>

        )
    }
}

export default Shop;