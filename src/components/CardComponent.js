import React from 'react';
import { Card, Col, Button } from 'antd';

const CardComponent = ({ voucher, showModal, handleUseVoucher }) => {
  return (
    <Col span={8} key={voucher.id}>
      <Card style={{ marginBottom: '24px' }} bordered>
        <div style={{ display: 'flex' }}>
          <img
            src={voucher.imagePath}
            alt={voucher.title}
            style={{
              width: '30%',
              height: 'auto',
              marginRight: '16px',
            }}
          />
          <div style={{ flex: 1 }}>
            <div className="company">{voucher.business.businessName}</div>
            <div className="coupon">{voucher.coupon?.couponCode}</div>
            <div>{voucher.numberRegistered} Phiếu giảm giá đã phát hành</div>
            <div>{voucher.title}</div>
          </div>
        </div>
        <div className="voucher-footer">
          <Button type="link" onClick={() => showModal(voucher)}>
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
              onClick={() => handleUseVoucher(voucher)}
              disabled={voucher.numberRegistered >= voucher.maxRegistration}
            >
              Sử Dụng
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default CardComponent;
