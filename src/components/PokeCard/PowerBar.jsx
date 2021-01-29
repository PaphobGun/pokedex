import React from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';

const PowerBar = ({ value }) => {
  return (
    <CustomProgess
      strokeColor="#f3701A"
      format={(percent) => percent}
      percent={value}
      trailColor="#e4e4e4"
      strokeWidth={20}
    />
  );
};

const CustomProgess = styled(Progress)`
  .ant-progress-outer {
    margin-right: unset;
    padding-right: unset;
  }

  .ant-progress-text {
    display: none;
  }
`;

export default PowerBar;
