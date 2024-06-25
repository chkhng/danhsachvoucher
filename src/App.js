import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SixDigitInput from './emailotp.js';
import Login from './login';
import CreateAccount from './signup.js';
import { tab } from '@testing-library/user-event/dist/tab.js';
import TAB from './tab.js';

// import { testApi } from './services/test';
// import LOGIN from './login.js';
// import TITLE from './title.js';
// import COUPON from './coupon.js';

function App() {
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const result = await testApi();
  //         console.log(result);
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  return (
    <div>
      {/* <SixDigitInput /> */}
      {/* <POPUP /> */}
      {/* <h1>Danh Sách Voucher</h1>
      <TAB /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<CreateAccount />} />
          <Route path="/" element={<POPUP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<SixDigitInput />} />
           */}
          <Route path="/" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<SixDigitInput />} />
          <Route path="/card" element={<TAB />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
