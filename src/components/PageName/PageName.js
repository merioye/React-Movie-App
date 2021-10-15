import React from 'react';
import './pagename.css';

const PageName = (props)=>{
    return(
        <p className='page-name'>{props.name}</p>
    );
}

export default PageName;