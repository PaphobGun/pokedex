import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderWrapper>
      <Title>My Pokedex</Title>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  z-index: 50;
  padding: 10px 200px;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.75);
`;

const Title = styled.div`
  text-align: center;
  font-size: 40px;
`;

export default Header;
