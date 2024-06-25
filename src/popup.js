import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Login from './login.js';

const POPUP = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        open={isModalOpen}
        footer=""
        onCancel={() => setIsModalOpen(!isModalOpen)}
      >
        <Login />
      </Modal>
    </>
  );
};
export default POPUP;
