import React, { useState } from 'react';

const product = [
    {'title':'cabbage','isFruit':false,'id':1},
    {'title':'apple','isFruit':true,'id':2},
    {'title':'potato','isFruit':false,'id':3}

]
export function Shopping({count , handleClick}){
    const list_item = product.map(p =>
        <li key = {p.id}
            style = {{
                color : p.isFruit ? 'pink':'blue'
            }}>
            {p.title}</li>
        );
        
    return (
        <>
        <ul>{list_item}</ul>
      <   button onClick={handleClick}> {count}</button>
        </>
    
    
    )


}