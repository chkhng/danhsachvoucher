import React from 'react';
import { Tabs } from 'antd';
import CARD from './card.js';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Khả Dụng',
    children: <CARD />,
  },
  {
    key: '2',
    label: 'Đã Quá Hạn',
    children: 'Content of Tab Pane 2',
  },
];
const TAB = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default TAB;
