import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// mui
import { styled } from '@mui/system';
import MuiBox from '@mui/material/Box';

import { RootState } from 'store';
import Card from './Card';

const CardListContainer = () => {
  const location = useLocation();
  const { cards } = useSelector((state: RootState) => state.card);

  return (
    <CardsWrapper>
      {cards &&
        cards.map((aCard: any) => {
          return (
            <Link
              key={aCard.id}
              to={`${aCard.id}`}
              state={{ background: location }}
              style={{ textDecoration: 'none', background: 'fixed' }}
            >
              <Card item={aCard} key={aCard.id} />
            </Link>
          );
        })}
    </CardsWrapper>
  );
};

export default CardListContainer;

const CardsWrapper = styled(MuiBox)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '8px 0 0 8px',
})) as typeof MuiBox;
