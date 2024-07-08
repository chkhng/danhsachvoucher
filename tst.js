import { Button, Card, Col, Form, Input, Modal, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import statement
import { verifyAccessToken } from './TokenService';

const CARD = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [registerName, setRegisterName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await verifyAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get(
          'http://150.95.104.20:9997/deal-promotion/get-all-deal-promotion?pageNum=1&pageSize=8&isGetAll=false&statuses=ACTIVE',
        );
        console.log(response.data.data);
        setVouchers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch vouchers', error);
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handlePhoneSubmit = async (values) => {
    const { phone } = values;
    try {
      const requestBody = {
        phone,
        source: 'DANG_KY_OTP',
      };
      console.log('Sending OTP with request body:', requestBody);

      const response = await axios.post(
        'http://150.95.104.20:9997/user/send-otp-customer',
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('OTP sent:', response.data);
      setPhoneNumber(phone);
      setIsPhoneModalVisible(false);
      setIsOtpModalVisible(true);
    } catch (error) {
      console.error('Failed to send OTP', error);
      alert('Failed to send OTP.');
    }
  };

  const handleOtpSubmit = async (values) => {
    const { otp } = values;
    try {
      const response = await axios.post(
        'http://150.95.104.20:9997/user/verify-otp-customer',
        {
          phone: phoneNumber,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('OTP verified:', response.data);

      // Save phone number to localStorage after successful OTP verification
      const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
      storedProfile.phone = phoneNumber;
      localStorage.setItem('profile', JSON.stringify(storedProfile));

      setIsOtpModalVisible(false);
      registerVoucherWithPhone(phoneNumber, selectedVoucher);
    } catch (error) {
      console.error('Failed to verify OTP', error);
      alert('Failed to verify OTP.');
    }
  };

  const registerVoucherWithPhone = async (phone, voucher) => {
    if (!voucher || !accessToken) return;

    try {
      const response = await axios.post(
        'http://150.95.104.20:9997/deal-promotion/register-use-deal-promotion',
        {
          dealPromotionId: voucher.id,
          email: email,
          phone: phone,
          registerName: registerName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Coupon registered:', response.data);
      alert('Coupon registered successfully!');
    } catch (error) {
      console.error('Failed to register coupon', error);
      alert('Failed to register coupon.');
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const storedProfile = JSON.parse(localStorage.getItem('profile'));
        if (!storedProfile) {
          console.error('Profile information not found in localStorage');
          return;
        }

        setUserId(storedProfile.id);
        setEmail(storedProfile.email);
        setRegisterName(`${storedProfile.firstName} ${storedProfile.lastName}`);
        setPhoneNumber(storedProfile.phone);

        const response = await axios.post(
          'http://150.95.104.20:9997/user/get-my-voucher',
          {
            type: 'ALL',
            userId: storedProfile.id,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response);
      } catch (error) {
        alert(error);
        console.error('Failed to fetch data', error);
      }
    }

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const showModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleUseVoucher = async (voucher) => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (!storedProfile || !storedProfile.phone) {
      setSelectedVoucher(voucher);
      setIsPhoneModalVisible(true);
    } else {
      await registerVoucher(voucher);
    }
  };

  const registerVoucher = async (voucher) => {
    if (!voucher || !accessToken) return;

    try {
      const response = await axios.post(
        'http://150.95.104.20:9997/deal-promotion/register-use-deal-promotion',
        {
          dealPromotionId: voucher.id,
          email: email,
          phone: phoneNumber,
          registerName: registerName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Coupon registered:', response.data);
      alert('Coupon registered successfully!');
    } catch (error) {
      console.error('Failed to register coupon', error);
      alert('Failed to register coupon.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
  };

  const handlePhoneCancel = () => {
    setIsPhoneModalVisible(false);
  };

  const handleOtpCancel = () => {
    setIsOtpModalVisible(false);
  };

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleString('en-GB', options);
  };

  return (
    <div>
      <Row gutter={24}>
        {vouchers.map((el) => (
          <Col span={8} key={el.id}>
            <Card style={{ marginBottom: '24px' }} bordered>
              <div style={{ display: 'flex' }}>
                <img
                  src={el.imagePath}
                  alt={el.title}
                  style={{
                    width: '30%',
                    height: 'auto',
                    marginRight: '16px',
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div className="company">{el.business.businessName}</div>
                  <div className="coupon">{el.coupon?.couponCode}</div>
                  <div>{el.numberRegistered} Phiếu giảm giá đã phát hành</div>
                  <div>{el.title}</div>
                </div>
              </div>
              <div className="voucher-footer">
                <Button type="link" onClick={() => showModal(el)}>
                  Điều Kiện
                </Button>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '16px',
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => handleUseVoucher(el)}
                    disabled={el.numberRegistered >= el.maxRegistration}
                  >
                    Sử Dụng
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedVoucher && (
        <Modal
          open={isModalVisible}
          footer={null}
          onCancel={handleCancel}
          width={600}
        >
          <div style={{ display: 'flex' }}>
            <img
              src={selectedVoucher.imagePath}
              alt={selectedVoucher.title}
              style={{ width: '230px', height: '170px', marginRight: '16px' }}
            />
            <div style={{ flex: 1 }}>
              <div>
                <div className="company" style={{ fontWeight: 'bold' }}>
                  {selectedVoucher.business.businessName}
                </div>
                <h2>{selectedVoucher.title}</h2>
                <div style={{ marginBottom: '8px' }}>
                  Sử dụng đến: {formatDate(selectedVoucher.expiredAt)}
                </div>
                <div>Mã: #{selectedVoucher.coupon?.couponCode}</div>
              </div>
            </div>
          </div>
          <ul>
            <h3>Điều kiện sử dụng</h3> <li>Áp dụng cho tất cả các dịch vụ</li>
            <h3>Điều khoản sử dụng</h3>
            <li>
              Giá hiển thị tại Wisere là giá tham khảo - tuỳ theo số lượng
              khuyến mãi và loại dịch vụ sử dụng tại địa điểm sử dụng dịch vụ,
              giá có thể thay đổi
            </li>
            <li>Địa điểm sử dụng dịch vụ đưa ra quyết định cuối cùng</li>
            <li>
              Wisere là nền tảng đặt lịch trực tuyến, chúng tôi không cung cấp
              dịch vụ và không chịu trách nhiệm về chất lượng dịch vụ tại địa
              điểm cung cấp dịch vụ
            </li>
          </ul>
        </Modal>
      )}
      <Modal
        open={isPhoneModalVisible}
        title="Nhập số điện thoại của bạn"
        onCancel={handlePhoneCancel}
        footer={[
          <Button key="cancel" onClick={handlePhoneCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="phoneForm"
            htmlType="submit"
          >
            Gửi OTP
          </Button>,
        ]}
      >
        <Form id="phoneForm" onFinish={handlePhoneSubmit}>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isOtpModalVisible}
        title="Nhập mã OTP của bạn"
        onCancel={handleOtpCancel}
        footer={[
          <Button key="cancel" onClick={handleOtpCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" form="otpForm" htmlType="submit">
            Xác Nhận
          </Button>,
        ]}
      >
        <Form id="otpForm" onFinish={handleOtpSubmit}>
          <Form.Item
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <Input placeholder="Mã OTP" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CARD;
