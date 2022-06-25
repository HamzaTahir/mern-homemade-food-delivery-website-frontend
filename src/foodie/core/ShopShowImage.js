import React, {useState, useEffect} from 'react';
import {API} from '../../config';


const ShopShowImage = ({item, url}) =>(
    <div className="product-img thumbnail">
        <img className="img-responsive mb-3" src={`${API}/${url}/photo/${item._id}`} alt={item.name}
         style={{height:'260px', width:'380px'}}/>
    </div>
)


export default ShopShowImage;