import { Button, Form, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);

  const handleSubmit = async (values) => {
    const { email } = values;
    setLoading(true);
    try {
      const response = await axios.post(
        'http://150.95.104.20:9997/verify/mail/sign-in/send-otp-customer',
        {
          email,
        },
      );

      const userData = response.data?.data?.user;
      if (userData) {
        const profile = {
          id: userData.id,
          createdAt: userData.createdAt,
          avatarPath: userData.avatarPath,
          dateOfBirth: userData.dateOfBirth,
          deletedAt: userData.deletedAt,
          email: userData.email,
          firstName: userData.firstName,
          gender: userData.gender,
          isVerified: userData.isVerified,
          lastName: userData.lastName,
          password: userData.password,
          phone: userData.phone,
          provider: userData.provider,
          providerId: userData.providerId,
          searchValue: userData.searchValue,
          status: userData.status,
          updatedAt: userData.updatedAt,
        };
        localStorage.setItem('profile', JSON.stringify(profile));
      }

      navigate('/otp?type=signin', { state: { email } });
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('profile');
    if (isLoggedIn) {
      navigate('/card');
    } else {
      setLoadingPage(false);
    }
  }, [navigate]);

  if (loadingPage) {
    return <>Loading</>;
  }

  return (
    <div className="login-container">
      <button>
        <Link to="/">Trở lại</Link>
      </button>
      {/* <button to="/"> Trở lại</button> */}
      <h1>Đăng nhập</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
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
          <Input placeholder="Địa chỉ email" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
