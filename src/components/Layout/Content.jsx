import React from 'react';
import styled from 'styled-components';

const Content = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px 10px;
  overflow: scroll;
`;

export default Content;
