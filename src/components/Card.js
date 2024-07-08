import { Button, Form, Input, Modal, Row } from 'antd';
import React, { useState } from 'react';
import { registerVoucherWithPhone, sendOTP, verifyOTP } from './API';
import CardComponent from './CardComponent';

const CARD = ({ dataVourcher }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const token = localStorage.getItem('accessToken');

  const storedProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const fullName = `${storedProfile.firstName} ${storedProfile.lastName}`;

  const handlePhoneSubmit = async (values) => {
    const { phone } = values;
    try {
      console.log('Sending OTP with phone:', phone);
      await sendOTP(phone, token);
      console.log('OTP sent');
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
      await verifyOTP(phoneNumber, otp, token);
      console.log('OTP verified');
      localStorage.setItem('profile', JSON.stringify(storedProfile));

      setIsOtpModalVisible(false);
      await registerVoucherWithPhone(
        selectedVoucher.id,
        storedProfile.email,
        phoneNumber,
        fullName,
        token,
      );
      alert('Coupon registered successfully!');
    } catch (error) {
      console.error('Failed to verify OTP', error);
      alert('Failed to verify OTP.');
    }
  };

  const showModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleUseVoucher = async (voucher) => {
    if (!storedProfile || !storedProfile.phone) {
      setSelectedVoucher(voucher);
      setIsPhoneModalVisible(true);
    } else {
      await registerVoucherWithPhone(
        voucher.id,
        storedProfile.email,
        storedProfile.phone,
        fullName,
        token,
      );
      alert('Coupon registered successfully!');
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
        {dataVourcher?.map((el) => (
          <CardComponent
            key={el.id}
            voucher={el}
            showModal={showModal}
            handleUseVoucher={handleUseVoucher}
          />
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
            <h3>Điều kiện sử dụng</h3>
            <li>Áp dụng cho tất cả các dịch vụ</li>
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
