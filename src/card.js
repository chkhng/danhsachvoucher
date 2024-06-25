import React, { useState } from 'react';
import { Card, Col, Row, Modal, Button } from 'antd';
import dayjs from 'dayjs';
import { data } from './data.js';

const CARD = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const showModal = (voucher) => {
    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD/MM/YYYY HH:mm');
  };

  return (
    <div>
      <Row gutter={24}>
        {data.map((el) => (
          <Col span={8} key={el.id}>
            <Card style={{ marginBottom: '24px' }} bordered>
              <div style={{ display: 'flex' }}>
                <img
                  src={el.imagePath}
                  alt={el.title}
                  style={{ width: '30%', height: 'auto', marginRight: '16px' }}
                />
                <div style={{ flex: 1 }}>
                  <div className="company">{el.business.businessName}</div>
                  <div className="coupon">#{el.coupon.couponCode}</div>
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
                    alignItems: 'center',
                  }}
                >
                  <button className="voucher-button">Sử Dụng</button>
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
                <div>Mã: #{selectedVoucher.coupon.couponCode}</div>
              </div>
            </div>
          </div>
          <ul>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button
              style={{ flex: 1, marginRight: '10px' }}
              onClick={handleCancel}
            >
              Huỷ
            </Button>
            <Button type="primary" style={{ flex: 1 }} onClick={handleOk}>
              Sử dụng
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CARD;
