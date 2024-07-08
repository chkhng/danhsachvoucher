import { Button, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchVouchers, getMyVoucher } from './API.js';
import dealsPage from './Alldeal.js';
import CARD from './Card.js';
import { data } from './Data.js';
import { splitDataByExpiry } from './Expired.js';
import { verifyAccessToken } from './TokenService';

const { expiredCoupons } = splitDataByExpiry(data);
const TAB = () => {
  const navigate = useNavigate();
  const [activeVouchers, setActiveVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataVourcher, setDataVourcher] = useState([]);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('profile');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/');
  };

  const fetchActiveVouchers = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const storedProfile = JSON.parse(localStorage.getItem('profile'));
      const data = await getMyVoucher('ALL', storedProfile.id, accessToken);
      const { activeCoupons } = splitDataByExpiry(data);
      setActiveVouchers(activeCoupons);
    } catch (error) {
      console.error('Failed to fetch active vouchers', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchExpiredVouchers = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const storedProfile = JSON.parse(localStorage.getItem('profile'));
      const data = await getMyVoucher('EXPIRED', storedProfile.id, accessToken);
      const { expiredCoupons } = splitDataByExpiry(data);
      setActiveVouchers(expiredCoupons);
    } catch (error) {
      console.error('Failed to fetch expired vouchers', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllVouchers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchVouchers();
      const { dealsPage } = splitDataByExpiry(data);
      setActiveVouchers(dealsPage);
    } catch (error) {
      console.error('Failed to fetch all vouchers', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchAccessToken = async () => {
      const token = await verifyAccessToken();
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchVouchersData = async () => {
      try {
        const data = await fetchVouchers();
        setDataVourcher(data);
        setIsLoading(true);
      } catch (error) {
        console.error('Failed to fetch vouchers', error);
        setIsLoading(false);
      }
    };

    fetchVouchersData();
  }, []);

  const items = [
    {
      key: '1',
      label: 'Tất Cả',
      children: (
        <CARD op={dealsPage} loading={isLoading} dataVourcher={dataVourcher} />
      ),
    },
    {
      key: '2',
      label: 'Khả Dụng',
      children: (
        <CARD
          dataVourcher={activeVouchers}
          loading={isLoading}
          accessToken={accessToken}
        />
      ),
    },
    {
      key: '3',
      label: 'Đã Quá Hạn',
      children: <CARD dataVourcher={expiredCoupons} loading={isLoading} />,
    },
  ];

  const handleTabChange = (key) => {
    if (key === '1') {
      fetchAllVouchers();
    } else if (key === '2') {
      fetchActiveVouchers();
    } else if (key === '3') {
      fetchExpiredVouchers();
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'left' }}>
      <Tabs
        defaultActiveKey="1"
        style={{ flexGrow: 1 }}
        onChange={handleTabChange}
      >
        {items.map((item) => (
          <Tabs.TabPane tab={item.label} key={item.key}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
      <Button onClick={handleLogout} style={{ marginLeft: '10px' }}>
        Logout
      </Button>
    </div>
  );
};

export default TAB;
