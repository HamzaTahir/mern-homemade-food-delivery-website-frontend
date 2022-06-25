import React, {useState, useEffect} from 'react';


const Checkbox = ({categories, handleFilters}) =>{

    const [checked, setCheck] = useState([]);

    const handleToggle = c => () =>{
        const currentCategoryId = checked.indexOf(c);   // return first index or -1     
        const newCheckedCategoryId = [...checked];
        //if currently checked was not already in checked state then push 
        // else pull/ takeoff
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c);
        }
        else{
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(newCheckedCategoryId);
        setCheck(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);

    }

    return categories.map((category, i)=>(
        <li className="list-unstyled" key={i}>
            <input onChange={handleToggle(category._id)} value={checked.indexOf(category._id === -1)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{category.name}</label>
        </li>
    ))
}


export default Checkbox;