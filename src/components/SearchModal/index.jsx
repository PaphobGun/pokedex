import React from 'react';
import { Modal, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import PokeCard from 'components/PokeCard';
import SearchIcon from 'search.png';

const SearchModal = ({
  onAddPoke,
  searchValue,
  onChangeSearch,
  open,
  onCancel,
  dataSource = [],
}) => {
  const handleOnChangeSearchValue = (e) => {
    onChangeSearch(e.target.value);
  };

  return (
    <BasicModal
      visible={open}
      onCancel={onCancel}
      maskClosable
      footer={null}
      closable={false}
    >
      <div className="wrapper">
        <div className="input">
          <StyledInput
            value={searchValue}
            onChange={handleOnChangeSearchValue}
            suffix={
              <img src={SearchIcon} width={30} height={30} alt="search" />
            }
            placeholder="Find Pokemon with name or subtype"
          />
        </div>
        <div className="content">
          {dataSource?.map(
            ({ id, name, imageUrlHiRes, hp, attacks, weaknesses }, index) => (
              <Row key={index} className="item">
                <Col span={18}>
                  <PokeCard
                    id={id}
                    name={name}
                    image={imageUrlHiRes}
                    hp={hp}
                    attacks={attacks}
                    weaknesses={weaknesses}
                  />
                </Col>
                <Col offset={4} span={2}>
                  <span
                    className="add-btn"
                    onClick={() =>
                      onAddPoke({
                        id,
                        name,
                        imageUrlHiRes,
                        hp,
                        attacks,
                        weaknesses,
                      })
                    }
                  >
                    Add
                  </span>
                </Col>
              </Row>
            )
          )}
        </div>
      </div>
    </BasicModal>
  );
};

const BasicModal = styled(Modal)`
  width: 800px !important;
  padding-right: 30px;

  .content {
    margin-top: 10px;
    padding: 10px;
    height: 580px;
    overflow: scroll;

    .item {
      padding: 10px;
      background-color: #f3f4f7;
      box-shadow: 0 8px 8px #d5d6cd;
      margin-bottom: 30px;

      .add-btn {
        display: none;
        cursor: pointer;
        font-size: 20px;
        color: #ec5656;
      }

      &:hover .add-btn {
        display: inline-block;
      }
    }

    .item:hover {
      box-shadow: 0 10px 10px #aeaeae;
    }
  }
`;

const StyledInput = styled(Input)`
  &.ant-input-affix-wrapper:hover,
  &.ant-input-affix-wrapper-focused {
    border-color: unset;
    box-shadow: none;
  }
`;

export default SearchModal;
