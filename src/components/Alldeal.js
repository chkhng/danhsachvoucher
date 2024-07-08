import { Button, Card, Col, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { data } from './Data.js';

const { TabPane } = Tabs;

const DealsPage = () => {
  const [loading, setLoading] = useState(true);
  setLoading(true);
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>sdsa</p>
      <h2>{data.length} Kết quả</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Địa điểm" key="1">
          <Row gutter={24}>
            {data.map((voucher) => (
              <Col span={8} key={voucher.id}>
                <Card
                  cover={<img alt={voucher.title} src={voucher.imagePath} />}
                  bordered={false}
                >
                  <Card.Meta
                    title={voucher.business.businessName}
                    description={voucher.title}
                  />
                  <p>{voucher.vouchersIssued} Phiếu giảm giá đã phát hành</p>
                  <Button type="primary">Xem Chi Tiết</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Ưu đãi" key="2">
          <Row gutter={24}>
            {data.map((voucher) => (
              <Col span={8} key={voucher.id}>
                <Card
                  cover={<img alt={voucher.title} src={voucher.imagePath} />}
                  bordered={false}
                >
                  <Card.Meta
                    title={voucher.business.businessName}
                    description={voucher.title}
                  />
                  <p>{voucher.vouchersIssued} Phiếu giảm giá đã phát hành</p>
                  <Button type="primary">Xem Chi Tiết</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DealsPage;
