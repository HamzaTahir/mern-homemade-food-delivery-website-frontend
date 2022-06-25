import React, {useState, useEffect} from 'react';
import {API} from '../../config';


const ShowImage = ({item, url}) =>(
    <div className="product-img thumbnail">
        <img className="img-responsive mb-3" src={`${API}/${url}/photo/${item._id}`} alt={item.name}
         style={{width:'200px', height:'150px'}}/>
    </div>
)


export default ShowImage;