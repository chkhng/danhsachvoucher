import {
  AppleOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isEvent1, setIsEvent1] = useState('');
  const [isEvent2, setIsEvent2] = useState('');
  const [isEvent3, setIsEvent3] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('profile');
    if (isLoggedIn) {
      navigate('/card');
      console.log(isLoggedIn);
    } else {
      setLoadingPage(false);
    }
  }, [navigate]);

  if (loadingPage) {
    return <>Loading</>;
  }

  const handleSubmit = async (values) => {
    const { email, firstName, lastName } = values;
    setLoading(true);
    try {
      await axios.post(
        'http://150.95.104.20:9997/verify/mail/sign-up/send-otp-customer',
        { email, firstName, lastName },
      );
      navigate('/otp?type=signup', { state: { email, firstName, lastName } });
    } catch (error) {
      console.error('Sign up failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <img src={require('./logo_wisere.png')} alt="Wisere" className="logo" />
      <h1>Tạo tài khoản mới</h1>
      <p>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
      <div className="social-login-buttons">
        <Button icon={<GoogleOutlined />} className="social-button">
          Google
        </Button>
        <Button icon={<FacebookOutlined />} className="social-button">
          Facebook
        </Button>
        <Button icon={<AppleOutlined />} className="social-button">
          Apple
        </Button>
      </div>
      <p>or</p>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: false }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              type: 'firstName',
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input
            placeholder="Tên"
            onChange={(e) => setIsEvent1(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              type: 'lastName',
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input
            placeholder="Họ"
            onChange={(e) => setIsEvent2(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input a valid email!',
            },
          ]}
        >
          <Input
            placeholder="Địa chỉ email"
            onChange={(e) => setIsEvent3(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="agreedToTerms" valuePropName="checked">
          <Checkbox onChange={(e) => setAgreedToTerms(e.target.checked)}>
            Đồng ý với <Link to="/terms">điều kiện sử dụng</Link> và{' '}
            <Link to="/privacy">chính sách</Link> của Wisere
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            disabled={
              !isEvent1 || !isEvent2 || !isEvent3 || !agreedToTerms || loading
            }
            loading={loading}
          >
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccount;
