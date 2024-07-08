import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('profile');
    navigate('/');
  };

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default Logout;
