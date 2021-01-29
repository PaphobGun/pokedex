import React from 'react';
import styled from 'styled-components';

import Header from 'components/Layout/Header';
import Footer from 'components/Layout/Footer';
import Content from 'components/Layout/Content';

const Layout = ({ children, onClickFooter }) => {
  return (
    <LayoutWrapper>
      <Header />
      <Content>{children}</Content>
      <Footer onClick={onClickFooter} />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Layout;
