import React from 'react';
import Menu from './Menu';
import '../../styles.css';

const Layout = ({title = 'Title', description = 'Description', children, className }) =>(
    <div className="overflow-hidden" style={{overflow: 'hidden'}}>
        <Menu/>
        {/* <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div> */}
        <div className={className} style={{padding:0, margin:0}}>
            {children}
        </div>
        
    </div>

)
  
export default Layout;
