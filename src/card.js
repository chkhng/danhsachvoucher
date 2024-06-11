import React from 'react';
import { Card, Col, Row } from 'antd';
import TITLE from './title.js';

const CARD = () => (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered>
          Card content
        </Card>
      </Col>
    </Row>
  );
  export default CARD;
