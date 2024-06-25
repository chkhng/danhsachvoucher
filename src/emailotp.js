// SixDigitInput.js
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import './SquareNumberInput.css';
import axios from 'axios';

const SixDigitInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('userEmail');
  const firstName =
    location.state?.firstName || localStorage.getItem('firstName');
  const lastName = location.state?.lastName || localStorage.getItem('lastName');
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [searchParams] = useSearchParams();
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const resendOTP = async () => {
    try {
      await axios.post(
        'http://150.95.104.20:9997/verify/mail/sign-up/send-otp-customer',
        { email, firstName, lastName },
      );
      setTimeLeft(180);
    } catch (error) {
      console.error('Failed to resend OTP', error);
    }
  };

  const handleDigitChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = digits.join('');
    const type = searchParams.get('type');

    try {
      if (type === 'signup') {
        await axios.post(
          'http://150.95.104.20:9997/verify/mail/sign-up/verify-otp-customer',
          { email, otpCode, firstName, lastName },
        );
        navigate('/card');
      } else {
        await axios.post(
          'http://150.95.104.20:9997/verify/mail/sign-in/verify-otp-customer',
          { email, otpCode, firstName, lastName },
        );
        navigate('/card');
      }
    } catch (error) {
      console.error(`${type === 'signup' ? 'Sign up' : 'Login'} failed`, error);
    }
  };

  return (
    <div className="six-digit-input">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="OTP">
            <p>
              Mã xác thực được gửi đến email <strong>{email}.</strong>
            </p>
            <p>Vui lòng nhập OTP để xác thực.</p>
          </div>

          <div className="inputbox">
            {digits.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="digit-input"
              />
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">
          {searchParams.get('type') === '/signup' ? 'Đăng Ký' : 'Đăng Nhập'}
        </button>
        <div className="OTP">
          <p>Mã OTP sẽ hết hạn trong {timeLeft} Giây.</p>
          <p>
            Chưa nhận được mã?{' '}
            <span className="resend-link" onClick={resendOTP}>
              Gửi lại
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SixDigitInput;
