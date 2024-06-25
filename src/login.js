// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       'http://150.95.104.20:9997/verify/mail/sign-in/send-otp-customer',
  //       { email },
  //     );
  //     navigate('/otp?type=login', { state: { email } });
  //   } catch (error) {
  //     console.error('login failed');
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //     await axios.post(
  //       'http://150.95.104.20:9997/verify/mail/sign-in/send-otp-customer',
  //       { email },
  //     );
  //   } catch (error) {
  //     console.error('Failed to resend OTP', error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://150.95.104.20:9997/verify/mail/sign-in/send-otp-customer',
        { email },
      );
      navigate('/otp?type=signin', { state: { email } });
    } catch (error) {
      console.error('Sign in failed', error);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Nhập Email của bạn"
          className="email-input"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className="submit-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
