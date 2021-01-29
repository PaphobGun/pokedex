import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import { Row, Col } from 'antd';

import Layout from 'components/Layout';
import PokeCard from 'components/PokeCard';
import SearchModal from 'components/SearchModal';
import ModalMessage from 'components/ModalMessage';

const Pokedex = () => {
  const [searchText, setSearchText] = useState('');
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [selectedPokeList, setSelectedPokeList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: response, error } = useSWR(
    'http://localhost:3030/api/cards',
    axios
  );

  useEffect(() => {
    if (error) {
      // API Down
      setErrorMessage(error.message);
      setIsOpenErrorModal(true);
    }
  }, [error]);

  const filteredPokeList = useMemo(() => {
    return response?.data?.cards.filter(
      ({ name, subtype, id: apiId }) =>
        (name?.toLowerCase().includes(searchText?.toLowerCase()) ||
          subtype?.toLowerCase()?.includes(searchText?.toLowerCase())) &&
        !selectedPokeList.find(({ id }) => id === apiId)
    );
  }, [response, searchText, selectedPokeList]);

  const handleOnClickAdd = () => {
    setIsOpenSearchModal(true);
  };

  const handleOnCloseModal = () => {
    setIsOpenSearchModal(false);
  };

  const handleOnChangeSearch = (value) => {
    setSearchText(value);
  };

  const handleOnCloseErrorModal = () => {
    setIsOpenErrorModal(false);
  };

  const handleOnAddPoke = (poke) => {
    setSelectedPokeList((prevSelected) => {
      if (!prevSelected.find(({ id }) => id === poke.id)) {
        return [...prevSelected, poke];
      } else {
        return [...prevSelected];
      }
    });
  };

  const handleOnDelPoke = (selectedId) => {
    setSelectedPokeList((prevSelected) => {
      return [...prevSelected.filter(({ id }) => id !== selectedId)];
    });
  };

  return (
    <Layout onClickFooter={handleOnClickAdd}>
      <PokedexWrapper>
        <Row gutter={[16, 16]}>
          {selectedPokeList?.map(
            ({ id, name, imageUrlHiRes, hp, attacks, weaknesses }) => (
              <Col span={12} key={id}>
                <PokeCard
                  id={id}
                  name={name}
                  image={imageUrlHiRes}
                  hp={hp}
                  attacks={attacks}
                  weaknesses={weaknesses}
                  deleteable
                  withStyled
                  onDelPoke={handleOnDelPoke}
                />
              </Col>
            )
          )}
        </Row>
      </PokedexWrapper>
      <SearchModal
        onAddPoke={handleOnAddPoke}
        searchValue={searchText}
        onChangeSearch={handleOnChangeSearch}
        open={isOpenSearchModal}
        onCancel={handleOnCloseModal}
        dataSource={filteredPokeList}
      />
      <ModalMessage
        open={isOpenErrorModal}
        onCancel={handleOnCloseErrorModal}
        message={errorMessage}
      />
    </Layout>
  );
};

const PokedexWrapper = styled.div``;

export default Pokedex;
