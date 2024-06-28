import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './SquareNumberInput.css'; // Ensure this file contains the necessary styles for your previous UI
import axios from 'axios';

const SixDigitInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || localStorage.getItem('userEmail');
  const firstName = location.state?.firstName;
  const lastName = location.state?.lastName;
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [error, setError] = useState(null);

  const initialType = searchParams.get('type');
  const [type, setType] = useState(initialType);

  const resendOTP = async () => {
    try {
      if (type === 'signup') {
        await axios.post(
          'http://150.95.104.20:9997/verify/mail/sign-up/send-otp-customer',
          { email, firstName, lastName },
        );
      } else if (type === 'signin') {
        await axios.post(
          'http://150.95.104.20:9997/verify/mail/sign-in/send-otp-customer',
          { email },
        );
      }
      setTimeLeft(180);
      setType(initialType);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpCode = digits.join('');
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://150.95.104.20:9997/verify/mail/${type === 'signup' ? 'sign-up' : 'sign-in'}/verify-otp-customer`,
        { email, otpCode, firstName, lastName },
      );
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
      console.log(response.data.data.accessToken);
      navigate('/card');
    } catch (error) {
      console.error('OTP verification failed', error);
      setError('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

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
        <button type="submit" className="submit-button" disabled={loading}>
          {type === 'signup' ? 'Đăng Ký' : 'Đăng Nhập'}
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
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SixDigitInput;
