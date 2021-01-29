import React from 'react';
import styled from 'styled-components';

const Footer = ({ onClick = () => {} }) => {
  return (
    <FooterWrapper>
      <div className="icon-wrapper" onClick={onClick}>
        +
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  z-index: 50;
  height: 50px;
  box-shadow: 0px -8px 4px -6px #d9333387;
  background-color: #ec5656;
  position: relative;

  .icon-wrapper {
    font-size: 70px;
    color: #fff;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #ec5656;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%, -50%);
  }
`;

export default Footer;
