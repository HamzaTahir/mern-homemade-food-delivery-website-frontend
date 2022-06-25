import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories, list} from './apiCore';
import Card from './Card';

const Search = () =>{
    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false
    })
    const {categories, category, search, results, searched} =data;

    const loadCategories = () =>{
        getCategories()
        .then(data =>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setData({...data, categories:data})
            }
        })
    }
    useEffect(()=>{
        loadCategories();
    },[])
    
    const handleChange = name => event =>{
        setData({...data, [name]:event.target.value, searched:false});
    }
    const searchData = () =>{
        // console.log(search, category);
        if(search){
            list({search: search || undefined, category: category})
            .then(response =>{
                if(response.error){
                    console.log(response.error);
                }
                else{
                    setData({...data, results:response, searched:true});
                    console.log(results);
                }
            })
        }
    }
    const searchSubmit = (e) =>{
        e.preventDefault();
        searchData();

    }
    const searchedProducts = (results = []) =>{
        return(
            <div style={{margin:10}}>
                <h2 className="mb-4" style={{width:'100%', textAlign:'center'}}>{searchMessage(searched, results)}</h2>
                {/* <div className="row ml-3" style={{marginLeft:10, marginRight:10}}>
                    {results.map((product, i)=>(
                        <Card key={i} product={product}/>
                    ))}
                </div> */}
                <div className="row" style={{marginLeft:10, marginRight:10}}>
                    {results.map((product, i)=>(
                        <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
                            <Card key={i} product={product}/>
                        </div>
                    ))}
                </div>
            </div>
        )        
    }
    const searchMessage = (searched, results) =>{
        if(searched && results.length > 0 && results.length > 1){
            return `Found ${results.length} Prodcuts`
        }
        if(searched && results.length == 1){
            return `Found ${results.length} Prodcut`
        }
        if(searched && results.length < 1){
            return `No Found Prodcut`
        }
        
    }
    const searchForm = () =>(
        <form onSubmit={searchSubmit} style={{margin:10}}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}  style={{fontSize:18}}> 
                            <option value="All">All</option>
                            {categories.map((c, i)=>(
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange('search')}
                     placeholder="Search by Name"  style={{fontSize:18}}/>
                </div>
                <div className="btn input-group-append" style={{border:'none'}}>
                    <button className="input-group-text"  style={{fontSize:18}}>Search</button>
                </div>
            </span>
        </form>
    );
    return (
        <div className="row">
            <div className="container mb-3">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
};


export default Search;