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
  const { overwatchCards } = useSelector((state: RootState) => state.card);

  const { overwatch: registeredOverwatchNickname } = useSelector(
    (state: RootState) => state.user.games,
  );

  let cardLength = 0;

  if (overwatchCards) {
    cardLength = overwatchCards.length;
  }

  const arrayForDummies = new Array(12 - cardLength)
    .fill(0)
    .map((value, i) => `dummies_${i}`);

  return (
    <CardsWrapper>
      {overwatchCards &&
        overwatchCards.map((aCard: any) => {
          return (
            <Link
              key={aCard.id}
              to={
                aCard.finished === 'true' &&
                aCard.memberList.includes(registeredOverwatchNickname)
                  ? `${aCard.id}/review`
                  : `${aCard.id}`
              }
              state={{ background: location }}
              style={{ textDecoration: 'none', background: 'fixed' }}
            >
              <Card
                item={aCard}
                key={aCard.id}
                expired={aCard.expired === 'true'}
              />
            </Link>
          );
        })}
      {arrayForDummies.map((item) => (
        <DummyCard key={item} />
      ))}
    </CardsWrapper>
  );
};

export default CardListContainer;

const CardsWrapper = styled(MuiBox)(() => ({
  width: '100%',
  minHeight: 'calc(100vh - 386px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  padding: '16px 0 0 8px',
  overflowY: 'auto',
})) as typeof MuiBox;

const DummyCard = styled(MuiBox)(() => ({
  width: '360px',
  height: '270px',
})) as typeof MuiBox;
