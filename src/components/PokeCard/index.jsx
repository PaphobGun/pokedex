import React, { useMemo, memo } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import PowerBar from 'components/PokeCard/PowerBar';
import CuteImg from 'cute.png';

const PokeCard = memo(
  ({
    id,
    name,
    image,
    hp = 0,
    attacks = [],
    weaknesses = [],
    deleteable = false,
    withStyled = false,
    onDelPoke = () => {},
  }) => {
    const cappedHp = useMemo(() => {
      if (hp === 'None') {
        return 0;
      }

      return hp > 100 ? 100 : hp;
    }, [hp]);

    const transformedAttack = useMemo(() => {
      const productLen = attacks.length * 50;
      return productLen > 100 ? 100 : productLen;
    }, [attacks]);

    const transformedWeakness = useMemo(() => {
      const weakProductLen = weaknesses.length * 100;
      return weakProductLen > 100 ? 100 : weakProductLen;
    }, [weaknesses]);

    const happiness = useMemo(() => {
      const totalDamage = attacks.reduce((acc, curr) => {
        const damage = curr['damage']?.match(/\d+/g)?.length
          ? +curr['damage']?.match(/\d+/g)[0]
          : 0;

        return acc + damage;
      }, 0);

      const happinessValue =
        (cappedHp / 10 + totalDamage / 10 + 10 - weaknesses.length) / 5;

      let happinessCmp = [];

      for (let i = 0; i < Math.round(happinessValue); i++) {
        happinessCmp.push(
          <img key={i} src={CuteImg} width={30} height={30} alt={i} />
        );
      }

      return happinessCmp;
    }, [cappedHp, attacks, weaknesses]);

    return (
      <PokeCardWrapper withStyled={withStyled}>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <img className="poke-img" src={image} alt={name} />
          </Col>
          <Col span={14} className="poke-info">
            <Row>
              <Col span={22} className="name">
                {name}
              </Col>
              <Col
                span={2}
                className={`close-btn ${!deleteable ? 'hide' : ''}`}
                onClick={() => {
                  onDelPoke(id);
                }}
              >
                X
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={6}>HP</Col>
              <Col span={18}>
                <PowerBar value={cappedHp} />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={6}>STR</Col>
              <Col span={18}>
                <PowerBar value={transformedAttack} />
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={6}>WEAK</Col>
              <Col span={18}>
                <PowerBar value={transformedWeakness} />
              </Col>
            </Row>
            <Row>
              <Col className="happiness" span={24}>
                {happiness}
              </Col>
            </Row>
          </Col>
        </Row>
      </PokeCardWrapper>
    );
  }
);

const PokeCardWrapper = styled.div`
  padding: 10px;
  background-color: ${({ withStyled }) => (withStyled ? '#f3f4f7' : 'unset')};
  box-shadow: ${({ withStyled }) =>
    withStyled ? '0 8px 8px #d5d6cd' : 'unset'};

  &:hover {
    box-shadow: ${({ withStyled }) =>
      withStyled ? '0 10px 10px #aeaeae' : 'unset'};
  }

  .poke-img {
    width: 100%;
    height: auto;
  }

  .poke-info {
    .name {
      font-size: 20px;
    }

    .close-btn {
      display: none;
      cursor: pointer;
    }

    .close-btn:hover {
      color: #ec5656;
    }

    .close-btn.hide {
      display: none !important;
    }

    .happiness {
      margin-top: 20px;

      img {
        margin-right: 4px;
      }
    }
  }

  &:hover .close-btn {
    display: inline-block;
  }
`;

export default PokeCard;
