
import {data} from './data.js'
// import React,{useState} from 'react';

function COUPON () {

  const ID = Object.groupBy(data,({id})=>id);

  console.log(ID);

  return (
    <div>
      <p></p>
      {Object.keys(ID).map((id) => (
        <div key={id}>
          <h2>ID: {id}</h2>
          <ul>{ID[id].map((item, index) => (
              <li key={index}>
                Coupon: {item.coupon.couponCode}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default COUPON;
