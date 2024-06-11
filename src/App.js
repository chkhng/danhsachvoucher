import React from 'react'
import './App.css';
import TAB from './tab.js'
import TITLE from './title.js';
import COUPON from './coupon.js';

function App() {
  return (
    <div >
      <h1>Danh Sách Voucher</h1>
      <TAB/>
      <TITLE/>
      <COUPON/>
    </div>  
  );
}

export default App;
