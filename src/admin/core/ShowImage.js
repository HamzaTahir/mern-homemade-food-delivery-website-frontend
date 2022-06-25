import React, {useState, useEffect} from 'react';
import {API} from '../../config';


const ShowImage = ({item, url}) =>(
    <div className="product-img thumbnail" style={{height:'200px', width:'400px'}}>
    {/* <div className="product-img thumbnail" style={{height:'260px', width:'370px'}}> */}
        <img className="img-responsive mb-3" src={`${API}/${url}/photo/${item._id}`} alt={item.name}
        style={{height:'200px', width:'400px', objectFit: 'contain'}}/>
    </div>
)


export default ShowImage;  