import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import SixDigitInput from './components/Emailotp.js';
import Login from './components/Login.js';
import CreateAccount from './components/Signup.js';
import TAB from './components/Tab.js';
import Homepage from './components/Home.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<SixDigitInput />} />
          <Route path="/card" element={<TAB />} />
          <Route path="/place" element={<Homepage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
