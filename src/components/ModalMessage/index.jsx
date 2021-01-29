import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const ModalMessage = ({ message, open, onCancel }) => {
  return (
    <ModalWrapper visible={open} onCancel={onCancel} maskClosable footer={null}>
      {message}
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Modal)``;

export default ModalMessage;
